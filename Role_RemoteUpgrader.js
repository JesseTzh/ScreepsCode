const logger = require('utils.log').getLogger("RemoteUpgrader");
const creepTemplateConfigs = require('config.creep.template')

module.exports = config => ({
    // 从出生点拿去矿物或者去目标房间就地取材
    source: creep => {
        const creepTemplateConfig = creepTemplateConfigs[creep.name];
        let source = Game.getObjectById(config.sourceId);
        if (!(creep.room.name === creepTemplateConfig.roomName) || !source || source.store[RESOURCE_ENERGY] === 0) {
            //首先检查有没有丢弃在地上的资源
            source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (source) {
                if (creep.pickup(source) === ERR_NOT_IN_RANGE) {
                    creep.say("🚮");
                    creep.moveTo(source);
                }
                return;
            } else {
                //如果没有则检查有没有建筑废墟
                source = creep.pos.findClosestByRange(FIND_RUINS, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
            //再没有则检查建筑
            if (!source) {
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_STORAGE || structure.structureType === STRUCTURE_TERMINAL) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        } else {
            //都没有，则就地采矿
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (target) {
                logger.debug(creep.name + "尝试就地取材");
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                return;
            } else {
                logger.info(creep.name + "在本房间内没有获取能量的方法！");
            }
        }
    },
    // 建造或维修
    target: creep => {
        let targets;
        if (creep.avoidGoBackRoom()) {
            return;
        }
        if (config.transferRoom && !creep.memory.transferFlag) {
            if (creep.room.name !== config.transferRoom) {
                creep.say("🏴");
                creep.moveTo(new RoomPosition(25, 25, config.transferRoom))
                return;
            } else if (creep.room.name === config.transferRoom) {
                creep.memory.transferFlag = true;
            }
        } else if (creep.memory.transferFlag || !config.transferRoom) {
            if (creep.room.name !== config.targetRoomName) {
                creep.say("🚩");
                creep.moveTo(new RoomPosition(25, 25, config.targetRoomName))
                return;
            }
        }
        if (creep.room.name === config.targetRoomName) {
            const controller = creep.room.controller
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.say("💡");
                creep.moveTo(controller);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})