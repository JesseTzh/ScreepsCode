const logger = require('utils.log').getLogger("ResidentDefender");

module.exports = config => ({
    //战备状态
    source: creep => {
        const roomName = creep.getTemplateConfig("roomName")
        //如果没有回到出生房间
        if (creep.room.name != roomName) {
            creep.moveTo(new RoomPosition(25, 25, roomName));
        } else {
            creep.selfFix();
        }
    },
    //战时状态
    target: creep => {
        const targetRoomName = creep.memory.TargetRoom;
        // 如果没有抵达目标房间
        if (creep.room.name != targetRoomName) {
            creep.moveTo(new RoomPosition(25, 25, targetRoomName));
        } else {
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
        }
    },
    // 状态切换条件
    switch: creep => {
        //没有发现守卫房间有入侵出现，进入战备状态
        if ((!creep.memory.Target || creep.memory.Target === "No") && creep.memory.working) {
            creep.memory.working = false
        }
        //发现有入侵出现，进入战时状态
        if ((creep.memory.Target && creep.memory.Target === "Yes") && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})