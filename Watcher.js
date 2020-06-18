const CONFIG = require('config')
const logger = require('utils.log').getLogger("Watcher");

function detectOuterRoom() {
    if (!CONFIG.EXTERNAL_ROOMS) {
        return
    }
    for (let roomName in CONFIG.EXTERNAL_ROOMS) {
        // logger.info(roomName)
        // logger.info(CONFIG.EXTERNAL_ROOMS[roomName])
        // for (let i = 0; i < CONFIG.EXTERNAL_ROOMS[roomName][0].length; i++) {
        //     const room = Game.rooms[CONFIG.EXTERNAL_ROOMS[i][0]];
        //     logger.info(room)
        //     // let target = room.find(FIND_HOSTILE_STRUCTURES);
            // if (!target.length) {
            //     target = room.find(FIND_HOSTILE_CREEPS);
            // }
            // if (target && target.length) {
            //     Memory.creeps["Dps_01"].RebornFlag = "Yes";
            //     Memory.creeps["Dps_01"].TargetRoom = CONFIG.EXTERNAL_ROOMS[i];
            // }
        //}
    }
}

module.exports = {
    detectOuterRoom: detectOuterRoom
};