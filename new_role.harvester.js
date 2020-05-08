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
            logger.debug("The closest link is already full!!");
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            //如所有 EXTENSION/SPAWN 都已放满则存入 STORAGE
            if (target == null) {
                logger.debug("Spawn and extensions are both full,transfer to storage.");
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE;
                    }
                });
            }
        }
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🏭");
                creep.moveTo(target);
            }
        }

    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})