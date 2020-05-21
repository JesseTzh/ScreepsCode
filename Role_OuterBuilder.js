const logger = require('utils.log').getLogger("OuterBuilder");

module.exports = config => ({
    // 采集能量矿
    source: creep => {
        if (creep.room.name != config.targetRoomName) {
            var source = Game.getObjectById(config.sourceId)
            if (source && source.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.emoji("🔽");
                    creep.moveTo(source);
                }
            }
        } else if (creep.room.name == config.targetRoomName) {
            //如果在其他房间，直接就地采矿
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (target) {
                logger.info(creep.name + "就地取材");
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    // 存储能量逻辑
    target: creep => {
        if (creep.room.name != config.targetRoomName) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
        } else if (creep.room.name == config.targetRoomName) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                creep.emoji("🌇");
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (targets) {
                    if (creep.repair(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                } else {
                    logger.warn(creep.name + "找不到可建造的建筑点！");
                    creep.emoji("🈳");
                }
            }
        }
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})