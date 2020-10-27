const logger = require('utils.log').getLogger("Database");
const CONFIG = require('config');
const RoomData = require('Room_Data');
const tool = require('utils.tools');

function init() {
    //获取房间列表
    getRoomArray();
    //房间数据初始化
    roomDataInit();
    //Creep数据初始化
    creepDataInit();
}

function creepDataInit() {
    let creepDataMap = new Map();

    global.creepData = creepDataMap;
}

function roomDataInit() {
    let roomDataMap = new Map();
    for (let claimRoomName of global.roomArray) {
        let roomData = new RoomData().initData(claimRoomName);
        if (roomData) {
            roomDataMap.set(claimRoomName, roomData);
        } else {
            logger.error("房间[" + claimRoomName + "]数据初始化失败!");
        }
    }
    global.roomData = roomDataMap;
}

function getRoomArray(){
    let roomArray = new Array();

    for(let roomName in Game.rooms){
        if(Game.rooms[roomName].controller.my){
            roomArray.push(roomName)
        }
    }
    global.roomArray = roomArray
}

module.exports = {
    init: init
}