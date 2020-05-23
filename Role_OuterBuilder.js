const logger = require('utils.log').getLogger("OuterBuilder");

function getEnergyFromStorage(creep, sourceId) {
    var source = Game.getObjectById(sourceId)
    if (source && source.store[RESOURCE_ENERGY] > 0) {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say("🔽");
            creep.moveTo(source);
        }
    }
    return source;
}

module.exports = config => ({
    // 从出生点拿去矿物或者去目标房间就地取材
    source: creep => {
        if (creep.room.name != config.targetRoomName) {
            var source = getEnergyFromStorage(creep, config.sourceId);
        } else if (creep.room.name == config.targetRoomName || source.store[RESOURCE_ENERGY] == 0) {
            var source = creep.pos.findClosestByRange(FIND_RUINS, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            //捡丢弃的能量
            // if (!source) {
            //     source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            //     var result = creep.pickup(source)
            //     if (result == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(source);
            //     }
            //     return;
            // }
            // if (source) {
            //     if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.say("🔽");
            //         creep.moveTo(source);
            //     }
            // }
            // const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) &&
            //         structure.store[RESOURCE_ENERGY] > 0;
            //     }
            // });
            // if (target) {
            //     if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.say("🔽");
            //         creep.moveTo(target);
            //     }
            // }
            //直接就地采矿
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (target) {
                logger.info(creep.name + "尝试就地取材");
                var result = creep.harvest(target);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (result != OK) {
                    //getEnergyFromStorage(creep, config.sourceId);
                }
            }
        }
    },
    // 建造或维修
    target: creep => {
        if (!creep.memory.transferFlag && config.transferRoom) {
            if (config.transferRoom && creep.room.name != config.transferRoom) {
                creep.say("🏴");
                creep.moveTo(new RoomPosition(6, 48, config.transferRoom))
                return;
            } else if (creep.room.name == config.transferRoom) {
                creep.memory.transferFlag = true;
            }
        } else if (!config.transferRoom || creep.memory.transferFlag) {
            if (creep.room.name != config.targetRoomName) {
                creep.say("🚩");
                creep.moveTo(new RoomPosition(16, 14, config.targetRoomName))
                return;
            }
        }
        if (creep.room.name == config.targetRoomName) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                creep.say("🌇");
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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
            creep.selfFix();
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})