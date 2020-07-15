const logger = require('utils.log').getLogger("Database");
const CONFIG = require('config');
const RoomData = require('Room_Data');

function init() {
    var roomDataMap = new Map();
    for (let claimRoomName of CONFIG.CLAIM_ROOM) {
        let roomData = new RoomData().initData(claimRoomName);
        if (roomData) {
            roomDataMap.set(claimRoomName, roomData);
        } else {
            logger.error("房间[" + claimRoomName + "]数据初始化失败!");
        }
    }
    global.roomData = roomDataMap;
}

function creepDataInit(){

}

module.exports = {
    init: init
}