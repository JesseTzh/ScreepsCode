const logger = require('utils.log').getLogger("OuterClaimer");

module.exports = config => ({
    // 预订Controller
    source: creep => {
        if (!creep.memory.claimTargetNum) {
            //从配置文件中的第一个房间控制器开始
            creep.memory.claimTargetNum = 0;
        } else if (!config.targetRoomName[creep.memory.claimTargetNum]) {
            //没有更多控制器了，从第一个控制器开始重新预订
            creep.memory.claimTargetNum = 0;
        }
        // 要去的房间
        const room = Game.rooms[config.targetRoomName[creep.memory.claimTargetNum]];
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(25, 25, config.targetRoomName[creep.memory.claimTargetNum]));
            return;
        }
        const source = Game.rooms[config.targetRoomName[creep.memory.claimTargetNum]].controller;
        if (source) {
            if (!source.reservation || source.reservation.ticksToEnd < CONTROLLER_RESERVE_MAX) {
                if (creep.reserveController(source) === ERR_NOT_IN_RANGE) {
                    creep.say("🔔");
                    creep.moveTo(source);
                } else if (creep.reserveController(source) === ERR_INVALID_TARGET) {
                    creep.attackController(source);
                }
            }
        }
        if (source.reservation && source.reservation.ticksToEnd === CONTROLLER_RESERVE_MAX - 1) {
            //当前控制器预定时间已满，换下一个
            creep.memory.claimTargetNum += 1;
        }
    },
    // 存储能量逻辑
    target: creep => {
        creep.say("🚫");
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})