const logger = require('utils.log').getLogger("new_role.upgrader");
const SYS_CONFIG = require('config.system.setting');

module.exports = config => ({
    // 提取能量矿
    source: creep => {
        //新房间利用遗产迅速发展
        if (config.pickEnergy) {
            //首先检查有没有丢弃在地上的资源
            var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (!source) {
                //如果没有则检查有没有建筑废墟
                source = creep.pos.findClosestByRange(FIND_RUINS, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            } else {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.say("🚮");
                    creep.moveTo(source);
                }
                return;
            }
            //再没有则检查建筑
            if (!source) {
                source = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        }
        //正常状态从指定建筑拿去能量
        if (!source || !config.pickEnergy) {
            var source = Game.getObjectById(config.sourceId);
            if (!source || source.store.getUsedCapacity(RESOURCE_ENERGY) < 1) {
                logger.warn(creep.name + ': 默认取能建筑存量为空或找不到指定的取能建筑！')
                source = null;
            }
            if (!source) {
                //默认取能建筑为空，尝试从其他冗余储能建筑提取能量
                logger.info(creep.name + "尝试从冗余建筑获取");
                source = Game.getObjectById(config.backUpSourceId);
                //冗余储能建筑也为空，若在配置文件中允许，则从 EXTENSION/SPAWN 提取能量
                if (!source && SYS_CONFIG.ALLOW_UPGRADER_FROM_SE) {
                    logger.info(creep.name + "尝试从 EXTENSION/SPAWN 获取");
                    source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store[RESOURCE_ENERGY] > 0;
                        }
                    });
                }
            }
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        } else {
            creep.say("🚬");
            logger.warn(creep.name + "找不到可用的取能设施")
            creep.selfFix();
        }

    },
    // 升级Controller
    target: creep => {
        const controller = creep.room.controller
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.say("💡");
            creep.moveTo(controller);
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})