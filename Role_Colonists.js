const logger = require('utils.log').getLogger("Colonists");

module.exports = config => ({
    // 前往中转房间
    source: creep => {
        if (!creep.memory.transferFlag && config.transferRoom) {
            if (config.transferRoom && creep.room.name !== config.transferRoom) {
                creep.say("🏴");
                creep.moveTo(new RoomPosition(16, 14, config.transferRoom))
            } else if (creep.room.name === config.transferRoom) {
                creep.memory.transferFlag = true;
            }
        } else {
            if (creep.room.name !== config.targetRoomName) {
                creep.say("🚩");
                creep.moveTo(new RoomPosition(25, 25, config.targetRoomName))
            } else if (creep.room.name === config.targetRoomName && creep.room.controller) {
                if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    const result = creep.moveTo(creep.room.controller);
                    logger.info(result)
                }
            }
        }
    },
    // 去挨揍
    target: creep => {

    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.room.name !== config.targetRoomName && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上能量满了 && creep 之前的状态为“不工作”
        if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})