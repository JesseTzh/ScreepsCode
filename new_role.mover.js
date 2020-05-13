const logger = require('utils.log').getLogger("new_role.mover");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

function freeJob(creep) {
    creep.guiDebug("🚬");
    if (creep.ticksToLive < 1000) {
        //闲着没事做就去翻新自己
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN && structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (target && target.renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            return;
        } else {
            logger.info(creep.name + "没有足够能量翻新自己");
        }
    }
    var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if (target) {
        logger.info(creep.name + "发现遗弃资源！");
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        logger.info(creep.name + "找不到被遗弃的资源！");
    }
}

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK && structure.store[RESOURCE_ENERGY] > 0 && structure.id != sourceId);
            }
        });
        //默认取能建筑为空并且 SPAWN/EXTENSION 未满，则从冗余能量储存建筑中提取能量反哺
        if (source == null && creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
            logger.warn(creep.name + "默认取能建筑存量为空或找不到指定的默认取能建筑！");
            source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
        }
        if (source && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("🚚");
            creep.moveTo(source);
        } else {
            logger.info(creep.name + "找不到可以提取能量的建筑，切换为自由工作");
            freeJob(creep);
        }
    },
    // 转移
    target: creep => {
        //优先供给 SPAWN/EXTENSION
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        //SPAWN/EXTENSION 均满，按照配置文件中的参数为能量低于一定比例的Tower冲能
        if (!target) {
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