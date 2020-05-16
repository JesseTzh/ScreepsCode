const logger = require('utils.log').getLogger("new_role.mover");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

function freeJob(creep) {
    var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if (target && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
        logger.info(creep.name + "发现遗弃资源！");
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("🚮");
            creep.moveTo(target);
        }
    } else {
        logger.info(creep.name + "找不到被遗弃的资源！尝试续命...");
        creep.selfFix();
    }
}

function cleanBag(creep) {
    for (const resourceType in creep.carry) {
        if (resourceType != RESOURCE_ENERGY) {
            //此处之后要改成配置文件中的值以适配多房间情况
            let target = Game.getObjectById(CONFIG.STORAGE[0]);
            if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                logger.info(creep.name + "正在清理背包");
                creep.guiDebug("🧺");
                creep.moveTo(target);
                return true;
            };
        }

    }
}

function energyCheck(creep) {
    var spawnCheck = creep.room.find(FIND_MY_SPAWNS, {
        filter: (structure) => {
            return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })
    var extensionCheck = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION && structure.store[RESOURCE_ENERGY] > 0;
        }
    })
    if (spawnCheck && extensionCheck) {
        return true;
    }
}

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        if (SYS_CONFIG.CLEAN_BAG && cleanBag(creep)) {
            return
        }
        //如果未达房间能量上限
        if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
            //优先从冗余储能建筑提取能量
            var source = Game.getObjectById(CONFIG.STORAGE)
            if (!source || source.store[RESOURCE_ENERGY] == 0) {
                //冗余储能建筑消耗完毕，使用Link中的能量
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK && structure.store[RESOURCE_ENERGY] > 0 && structure.id != sourceId);
                    }
                });
            }
            //以上建筑能量均消耗完毕，考虑将能量倾斜至 SPWAN
            if (!source && energyCheck(creep)) {
                logger.info(creep.name + "尝试将 EXTENSION 中的能量优先转移至 SPAWN 以供续命使用");
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION && structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        } else if (creep.room.energyAvailable == creep.room.energyCapacityAvailable && SYS_CONFIG.ALLOW_MOVER_STORAGE) {
            //如果达到房间能量上限，并且Link当前储量超过一半时，直接从Link中提取
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK && (structure.store[RESOURCE_ENERGY] / structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.5) && structure.id != sourceId);
                }
            });
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🔽");
                creep.moveTo(source);
            }
        } else {
            logger.info(creep.name + "找不到可以提取能量的建筑，切换为自由工作");
            freeJob(creep);
        }
    },
    // 转移
    target: creep => {
        if (SYS_CONFIG.CLEAN_BAG && cleanBag(creep)) {
            return
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
        //如果 SPAWN/EXTENSION/TOWER 都已满
        if (!target) {
            //根据config文件配置的参数决定是否进一步将能量存入 冗余能量存储建筑
            if (SYS_CONFIG.ALLOW_MOVER_STORAGE) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
            }
        }
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🔼");
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