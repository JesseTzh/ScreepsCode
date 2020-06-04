const CONFIG = require('config')

function detectOuterRoom() {
    if (!CONFIG.EXTERNAL_ROOMS) {
        return
    }
    for (let roomName in CONFIG.EXTERNAL_ROOMS) {
        for (let i = 0; i < CONFIG.EXTERNAL_ROOMS[roomName][0].length; i++) {
            const room = Game.rooms[CONFIG.EXTERNAL_ROOMS[i][0]];
            // if (!room) {
            //     let message = '丢失房间 ' + CONFIG.EXTERNAL_ROOMS[i] + '的视野，请注意！'
            //     logger.info(message)
            //     Game.notify(message);
            //     continue
            // }
            let target = room.find(FIND_HOSTILE_STRUCTURES);
            if (!target.length) {
                target = room.find(FIND_HOSTILE_CREEPS);
            }
            if (target && target.length) {
                //logger.info("侦测到敌人入侵！")
                Memory.creeps["Dps_01"].RebornFlag = "Yes";
                Memory.creeps["Dps_01"].TargetRoom = CONFIG.EXTERNAL_ROOMS[i];
            }
        }
    }
}