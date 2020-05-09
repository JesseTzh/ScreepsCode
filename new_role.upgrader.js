const logger = require('utils.log').getLogger("new_role.upgrader");
const SYS_CONFIG = require('config.system.setting');

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        var source = Game.getObjectById(sourceId)
        if (source.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            logger.warn("Upgrader source is empty!")
            source = null;
        }
        //长时间停止工作，备用计划
        if (creep.memory.stopWorkTime > 20) {
            logger.error(creep.memory.stopWorkTime + "ticks has no thing to do.Change to Plan B");
            source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store[RESOURCE_ENERGY] > 0;
                }
            });
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🚚");
                creep.moveTo(source);
            }
        }else{
            creep.guiDebug("🚬");
            creep.memory.stopWorkTime == null ? creep.memory.stopWorkTime = 0 : creep.memory.stopWorkTime += 1;
        }

    },
    // 升级Controller
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("💡");
            creep.moveTo(controller);
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})