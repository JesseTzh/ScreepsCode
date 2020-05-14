const logger = require('utils.log').getLogger("new_role.upgrader");
const SYS_CONFIG = require('config.system.setting');

module.exports = sourceId => ({
    // 提取能量矿
    source: creep => {
        var source = Game.getObjectById(sourceId);
        if (source == null || source.store.getUsedCapacity(RESOURCE_ENERGY) < 1) {
            logger.warn(creep.name + ': 默认取能建筑存量为空或找不到指定的取能建筑！')
            source = null;
        }
        if (source == null) {
            //默认取能建筑为空，尝试从其他冗余储能建筑提取能量
            logger.info(creep.name + "尝试从冗余建筑获取");
            source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            //冗余储能建筑也为空，若在配置文件中允许，则从 EXTENSION/SPAWN 提取能量
            if (source == null && SYS_CONFIG.ALLOW_UPGRADER_FROM_SE) {
                logger.info(creep.name + "尝试从 EXTENSION/SPAWN 获取");
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.stopWorkTime = 0;
                creep.guiDebug("🔽");
                creep.moveTo(source);
            }
        } else {
            creep.guiDebug("🚬");
            logger.warn(creep.name + "找不到可用的取能设施")
            creep.memory.stopWorkTime == null ? creep.memory.stopWorkTime = 0 : creep.memory.stopWorkTime += 1;
            creep.selfFix();
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