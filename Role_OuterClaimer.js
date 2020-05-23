const logger = require('utils.log').getLogger("OuterClaimer");

module.exports = config => ({
    // 预订Controller
    source: creep => {
        if (!creep.memory.claimTargetNum) {
            //保存当前要预订的控制器编号，直到当前控制器预定值满
            creep.memory.claimTargetNum = 0;
        } else if (config.sourceId[creep.memory.claimTargetNum] == null) {
            //没有更多控制器了，从第一个控制器开始重新预订
            creep.memory.claimTargetNum = 0;
        }
        // 要去的房间
        const room = Game.rooms[config.targetRoomName[creep.memory.claimTargetNum]]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(25, 25, config.targetRoomName[creep.memory.claimTargetNum]))
            return;
        }
        var source = Game.getObjectById(config.sourceId[creep.memory.claimTargetNum])
        if (source) {
            if (!source.reservation || source.reservation.ticksToEnd < CONTROLLER_RESERVE_MAX) {
                if (creep.reserveController(source) == ERR_NOT_IN_RANGE) {
                    creep.say("🔔");
                    creep.moveTo(source);
                }else if(creep.reserveController(source) == ERR_INVALID_TARGET){
                    creep.attackController(source)
                }
            }
        }
        if (source.reservation && source.reservation.ticksToEnd == CONTROLLER_RESERVE_MAX - 1) {
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