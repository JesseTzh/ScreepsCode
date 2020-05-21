const logger = require('utils.log').getLogger("Dps");

module.exports = config => ({
    // 前往要作战的房间
    source: creep => {
        logger.info(creep.name + "正在前往目标房间")
        creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
    },
    // 去挨揍
    target: creep => {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (target) {
            logger.info(creep.name + " ：骑兵连，进攻！！！")
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            logger.info(creep.name + "找不到要攻击的对象")
        }
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.room.name !=  config.targetRoomName && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.room.name ==  config.targetRoomName && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})