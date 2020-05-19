const logger = require('utils.log').getLogger("OuterClaimer");
const CONFIG = require('config')

module.exports = config => ({
    // 预订Controller
    source: creep => {
        if (!creep.memory.claimTargetNum) {
            //保存当前要预订的控制器编号，直到当前控制器预定值满
            creep.memory.claimTargetNum = 0;
        }
        // 要去的房间
        const room = Game.rooms[config.targetRoomName[creep.memory.claimTargetNum]]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName[creep.memory.claimTargetNum]))
            return;
        }
        var source = Game.getObjectById(config.sourceId[creep.memory.claimTargetNum])
        if (source) {
            if (!source.reservation || source.reservation.ticksToEnd < 5000) {
                if (creep.reserveController(source) == ERR_NOT_IN_RANGE) {
                    creep.emoji("🔔");
                    creep.moveTo(source);
                }
            } else if (source.reservation && source.reservation.ticksToEnd == 5000) {
                //当前控制器预定时间已满，换下一个
                creep.memory.claimTargetNum += 1;
            }
        } else {
            //没有更多控制器了，从第一个控制器开始重新预订
            creep.memory.claimTargetNum = 0;
        }
    },
    // 存储能量逻辑
    target: creep => {
        creep.emoji("🚫");
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})