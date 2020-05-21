const logger = require('utils.log').getLogger("Role_Mover");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

function freeJob(creep) {
    //寻找遗弃资源
    var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if (target && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
        logger.info(creep.name + "发现遗弃资源！");
        var result = creep.pickup(target)
        if (result == ERR_NOT_IN_RANGE) {
            creep.emoji("🚮");
            creep.moveTo(target);
        } else if (result == OK && target.resourceType != RESOURCE_ENERGY) {
            //如果捡到了除了能量之外的资源要去清理背包
            creep.memory.NeedCleanBag = true;
        }
        return;
    } else if (!target) {
        //尝试提取墓碑中的资源
        target = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
            filter: (structure) => {
                return structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (target && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            logger.info(creep.name + "发现墓碑资源！");
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return;
        }
    }
    if (!target) {
        logger.info(creep.name + "找不到被遗弃的资源！尝试续命...");
        creep.selfFix();
    }
}

function cleanBag(storageId) {
    var bagFlag = true;
    for (let resourceType in creep.carry) {
        if (resourceType != RESOURCE_ENERGY) {
            bagFlag = false;
            let target = Game.getObjectById(storageId);
            if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                logger.info(creep.name + "正在清理背包");
                creep.emoji("🧺");
                creep.moveTo(target);
            };
        }
    }
    if (bagFlag) {
        //背包已清理干净
        creep.memory.NeedCleanBag = false;
    }
}

//检查是否是Spawn未满但Extension已满
function energyCheck(creep) {
    const spawnCheck = creep.room.find(FIND_MY_SPAWNS, {
        filter: (structure) => {
            return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })
    const extensionCheck = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION && structure.store[RESOURCE_ENERGY] > 0;
        }
    })
    if (spawnCheck && extensionCheck) {
        return true;
    }
}

module.exports = config => ({
    // 提取能量矿
    source: creep => {
        if (creep.memory.NeedCleanBag) {
            cleanBag(config.storageId);
            return;
        }
        //如果未达房间能量上限
        if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
            //优先从冗余储能建筑提取能量：只有未达房间能量上限时才从 STORAGE 中提取能量，只有达到房间能量上限才向 STORAGE 储存能量，避免原地举重现象
            var source = Game.getObjectById(config.storageId)
            if (!source || source.store[RESOURCE_ENERGY] == 0) {
                //冗余储能建筑消耗完毕，使用Link中的能量
                for (let i = 0; i < config.sourceId.length; i++) {
                    source = Game.getObjectById(config.sourceId[i]);
                    if (source.store[RESOURCE_ENERGY] > 0) {
                        break;
                    }
                }
            }
            //以上建筑能量均消耗完毕，考虑将能量倾斜至 SPWAN
            if (!source && energyCheck(creep)) {
                logger.info(creep.name + "尝试将 EXTENSION 中的能量优先转移至 SPAWN");
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION && structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
            //如果达到房间能量上限，并且Link当前储量超过一半时，直接从Link中提取
        } else if (creep.room.energyAvailable == creep.room.energyCapacityAvailable && SYS_CONFIG.ALLOW_STORE_ENERGY) {
            var source;
            for (let i = 0; i < config.sourceId.length; i++) {
                source = Game.getObjectById(config.sourceId[i]);
                if (source.store[RESOURCE_ENERGY] > 0) {
                    break;
                }
            }
        }
        if (source && source.store[RESOURCE_ENERGY] > 0) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.emoji("🔽");
                creep.moveTo(source);
            }
        } else {
            logger.info(creep.name + "找不到可以提取能量的建筑，切换为自由工作");
            freeJob(creep);
        }
    },
    // 转移
    target: creep => {
        if (creep.memory.NeedCleanBag) {
            cleanBag(config.storageId);
            return;
        }
        //优先供给 SPAWN
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (!target) {
            //SPAWN 已满，再向EXTENSION供能
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        if (!target) {
            //按照配置文件中的参数为能量低于一定比例的Tower冲能
            if (CONFIG.TOWER) {
                for (let i = 0; i < CONFIG.TOWER.length; i++) {
                    var tower = Game.getObjectById(CONFIG.TOWER[i]);
                    if (tower.room == creep.room) {
                        if (tower.store[RESOURCE_ENERGY] / TOWER_CAPACITY <= SYS_CONFIG.TOWER_ENERGY_NEED) {
                            target = tower;
                        }
                    }
                }
            }
        }
        //如果 SPAWN/EXTENSION/TOWER 都已满,根据config文件配置的参数决定是否进一步将能量存入 冗余能量存储建筑
        if (!target && SYS_CONFIG.ALLOW_STORE_ENERGY) {
            //如果没有设置默认冗余资源存放建筑，则搜寻距离最近的 STORAGE/ CONTAINER
            if (!config.storageId) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
            } else {
                target = Game.getObjectById(config.storageId);
            }
        }
        if (target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.emoji("🔼");
                creep.moveTo(target);
            }
        } else {
            logger.info(creep.name + "找不到需要存入能量的建筑，切换为自由工作");
            freeJob(creep);
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})