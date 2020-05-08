const logger = require('utils.log').getLogger("new_role.mover");
const SYS_CONFIG = require('config.system.setting');

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        //从最近的Link中提取能量
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK && structure.store[RESOURCE_ENERGY] > 0 && structure.id != sourceId);
            }
        });
        if (source == null) {
            logger.warn("Mover can not find energy in Link!");
            source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
        }
        if (source && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("🚚");
            creep.moveTo(source);
        }
    },
    // 转移
    target: creep => {
        //优先供给 SPAWN/EXTENSION/TOWER
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        //如果 SPAWN/EXTENSION/TOWER 都已满
        if (target == null) {
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
            creep.guiDebug("🚬");
            //闲着没事做就去翻新自己
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
                }
            });
            if(target.renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})