const logger = require('utils.log').getLogger("OuterBuilder");
const creepTemplateConfigs = require('config.creep.template')

module.exports = config => ({
    // 从出生点拿去矿物或者去目标房间就地取材
    source: creep => {
        const creepTemplateConfig = creepTemplateConfigs[creep.name];
        if (creep.room.name == creepTemplateConfig.roomName) {
            var source = Game.getObjectById(config.sourceId);
        } else {
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
            //都没有，则就地采矿
            if (!source) {
                const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (target) {
                    logger.info(creep.name + "尝试就地取材");
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } 
                    return;
                }else{
                    logger.info(creep.name + "找不到可以采的能量矿");
                }
            }
            if (!source) {
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
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
        }
    },
    // 建造或维修
    target: creep => {
        if(creep.avoidGobackRoom()){
            return;
        }
        if (config.transferRoom && !creep.memory.transferFlag) {
            if (creep.room.name != config.transferRoom) {
                creep.say("🏴");
                creep.moveTo(new RoomPosition(25, 25, config.transferRoom))
                return;
            } else if (creep.room.name == config.transferRoom) {
                creep.memory.transferFlag = true;
            }
        } else if (creep.memory.transferFlag || !config.transferRoom) {
            if (creep.room.name != config.targetRoomName) {
                creep.say("🚩");
                creep.moveTo(new RoomPosition(25, 25, config.targetRoomName))
                return;
            }
        }
        if (creep.room.name == config.targetRoomName) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                creep.say("🌇");
                var r = creep.build(targets[0])
                if (r == ERR_NOT_IN_RANGE) {
                    var r = creep.moveTo(targets[0])
                }

            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                });
                if (targets.length) {
                    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        if (!targets) {
            logger.warn(creep.name + "找不到可建造的建筑点！");
            creep.say("🈳");
            creep.memory.RebornFlag = "No";
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})