const logger = require('utils.log').getLogger("Dps");

module.exports = config => ({
    // 前往要作战的房间
    source: creep => {
        if (!creep.memory.TargetRoom) {
            //creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
            logger.info(creep.name + "缺失攻击目标")
        } else {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], creep.memory.TargetRoom))
        }
    },
    // 去打架
    target: creep => {
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }
        if (target) {
            logger.info(creep.name + " ：骑兵连，进攻！！！")
            if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                creep.say("🗡️")
                creep.moveTo(target);
            }
        } else {
            logger.info(creep.name + "：目标房间已肃清！")
            creep.memory.RebornFlag = "No";
            creep.selfRecycle();
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 没有抵达目标房间 && creep 之前的状态为“工作”
        if (creep.room.name !== creep.memory.TargetRoom && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 抵达目标房间 && creep 之前的状态为“不工作”
        if ((creep.room.name === creep.memory.TargetRoom && !creep.memory.working) || (creep.room.name == creep.memory.TargetRoom && !creep.memory.working)) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})