const logger = require('utils.log').getLogger("new_role.harvester");
const SYS_CONFIG = require('config.system.setting');

module.exports = sourceId => ({
    // 采集能量矿
    source: creep => {
        const source = Game.getObjectById(sourceId)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("⛏️");
            creep.moveTo(source);
        }
    },
    // 存储能量逻辑
    target: creep => {
        const source = Game.getObjectById(sourceId);
        //根据所配置的矿点ID，优先存储在离矿点最近的Link内
        var target = source.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_LINK;
            }
        });
        //如Link已满则存储至最近的 EXTENSION/SPAWN/TOWER
        if (target == null || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            logger.debug(creep.name + "距离矿点最近Link不存在/已存满，转存至最近的 EXTENSION/SPAWN/TOWER");
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            //如所有 EXTENSION/SPAWN 都已放满则存入 STORAGE/CONTAINER
            if (target == null) {
                logger.debug(creep.name + "其余建筑已满，转存入冗余储能建筑 STORAGE/CONTAINER");
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
        }
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🏭");
                creep.moveTo(target);
            }
        } else {
            //所有建筑已满，无法继续存入矿物，一般存在于前期没有冗余能量存储建筑的情况
            logger.warn(creep.name + "找不到可用的储能设备！")
            creep.guiDebug("🈵");
        }

    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})