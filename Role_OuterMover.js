const logger = require('utils.log').getLogger("OuterMover");

module.exports = config => ({
    // 获取能量矿
    source: creep => {
        // 要去的房间
        const room = Game.rooms[config.targetRoomName]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
            return;
        }
        var source = Game.getObjectById(config.sourceId)
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.emoji("🔽");
                creep.moveTo(source);
            }
        } else {
            logger.warn(creep.name + "找不到对应的取能建筑！");
        }
    },
    // 存储能量逻辑
    target: creep => {
        if (creep.room.name == config.targetRoomName) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                return;
            }
        }
        var target = Game.getObjectById(config.targetId);
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.emoji("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})