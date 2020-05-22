const logger = require('utils.log').getLogger("OuterBuilder");

function getEnergyFromStorage(creep, sourceId) {
    var source = Game.getObjectById(sourceId)
    if (source && source.store[RESOURCE_ENERGY] > 0) {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.emoji("🔽");
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
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE)
                        && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.emoji("🔽");
                    creep.moveTo(target);
                }
            }
                //如果在其他房间，直接就地采矿
                // const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                // if (target) {
                //     logger.info(creep.name + "尝试就地取材");
                //     var result = creep.harvest(target);
                //     if (result == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(target);
                //     } else if (result != OK) {
                //         getEnergyFromStorage(creep, config.sourceId);
                //     }
                // }
                var source = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_RAMPART;
                    }
                });
                if (source) {
                    if (creep.dismantle(source) == ERR_NOT_IN_RANGE) {
                        creep.emoji("🔨")
                        creep.moveTo(source);
                    }
                }
            }
        },
        // 建造或维修
        target: creep => {
            if (!creep.memory.transferFlag && config.transferRoom) {
                if (config.transferRoom && creep.room.name != config.transferRoom) {
                    creep.emoji("🏴");
                    creep.moveTo(new RoomPosition(6, 48, config.transferRoom))
                    return;
                } else if (creep.room.name == config.transferRoom) {
                    creep.memory.transferFlag = true;
                }
            } else if (!config.transferRoom || creep.memory.transferFlag) {
                if (creep.room.name != config.targetRoomName) {
                    creep.emoji("🚩");
                    creep.moveTo(new RoomPosition(16, 14, config.targetRoomName))
                    return;
                }
            }
            if (creep.room.name == config.targetRoomName) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    creep.emoji("🌇");
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
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
                creep.emoji("🈳");
                creep.memory.RebornFlag = "No";
            }
        },
    // 状态切换条件
    switch: creep => creep.updateState()
    })