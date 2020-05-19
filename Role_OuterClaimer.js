const logger = require('utils.log').getLogger("OuterClaimer");
const CONFIG = require('config')

module.exports = config => ({
    // 预订Controller
    source: creep => {
        for (let n = 0; n < config.sourceId.length; n++) {
            // 要去的房间
            const room = Game.rooms[config.targetRoomName[n]]
            // 如果该房间不存在就先往房间走
            if (!room) {
                creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
                return;
            }
            var source = Game.getObjectById(config.sourceId[n])
            if (source) {
                if (source.reservation < 5000 || !source.reservation) {
                    if (creep.reserveController(source) == ERR_NOT_IN_RANGE) {
                        creep.emoji("🔔");
                        creep.moveTo(source);
                    }
                }
            }
        }

    },
    // 存储能量逻辑
    target: creep => {
        creep.emoji("🚫");
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})