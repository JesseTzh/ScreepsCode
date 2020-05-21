const logger = require('utils.log').getLogger("OuterHarvester");

module.exports = config => ({
    // 采集能量矿
    source: creep => {
        // 要去的房间
        const room = Game.rooms[config.targetRoomName]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
            return;
        }
        var source = Game.getObjectById(config.sourceId)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.emoji("⛏️");
            creep.moveTo(source);
        }
    },
    // 存储能量逻辑
    target: creep => {
        if (creep.room.name == config.targetRoomName) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
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
            var result = creep.transfer(target, RESOURCE_ENERGY)
            if (result == ERR_NOT_IN_RANGE) {
                creep.emoji("🔼");
                creep.moveTo(target);
            } else if (result == OK) {
                creep.room.memory.OuterRoomEnergy == null ? creep.room.memory.OuterRoomEnergy = 300 : creep.room.memory.OuterRoomEnergy += 300;
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})