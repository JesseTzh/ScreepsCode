const logger = require('utils.log').getLogger("new_role.builder");
const SYS_CONFIG = require('config.system.setting');

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        //默认状况下是从 STORGE 中提取
        const source = Game.getObjectById(sourceId)
        if (source.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            logger.info("Buidler storge is empty!")
            //根据config文件的参数看是否允许从STORGE之外的建筑提取能量
            if (SYS_CONFIG.ALLOW_BUILDE_FROM_SE) {
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        }
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.guiDebug("🚚");
            creep.moveTo(source);
        }
    },
    // 建造
    target: creep => {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            creep.guiDebug("🌇");
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.guiDebug("🈳");
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})