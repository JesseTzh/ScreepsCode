const logger = require('utils.log').getLogger("ResidentDefender");

module.exports = config => ({
    // 前往要作战的房间
    source: creep => {
        //如果没有入侵的敌人则去自我修复
        if(!creep.memory.Target || creep.memory.Target === "No"){
            creep.selfFix();
        }
        if (!creep.memory.TargetRoom) {
            // 守望者
            creep.moveTo(new RoomPosition(25, 25, config.targetRoomName));
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.TargetRoom));
        }
    },
    // 去打架
    target: creep => {
        //如果没有入侵的敌人则去自我修复
        if(!creep.memory.Target || creep.memory.Target === "No"){
            creep.selfFix();
        }
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
            logger.debug(creep.name + "：目标房间[" + creep.room.name + "]已肃清！");
            creep.memory.Target = "No";
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 没有抵达目标房间 && creep 之前的状态为“工作”
        if (creep.room.name !== creep.memory.TargetRoom && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 抵达目标房间 && creep 之前的状态为“不工作”
        if ((creep.room.name === creep.memory.TargetRoom && !creep.memory.working) || (creep.room.name === creep.memory.TargetRoom && !creep.memory.working)) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})