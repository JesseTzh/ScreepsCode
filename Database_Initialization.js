const logger = require('utils.log').getLogger("Database");
const CONFIG = require('config');
const RoomData = require('Room_Data');
const BASIC_CREEP = require('Database_Creep_Basic');
const ADVANCED_CREEP = require('Database_Creep_Advanced');
const tool = require('utils.tools');

function init() {
    //房间数据初始化
    roomDataInit();
    //Creep数据初始化
    creepDataInit();
}

function creepDataInit() {
    let creepDataMap = new Map();
    for (let roomName of CONFIG.CLAIM_ROOM) {
        let creepArray = [];
        //基础Creep遍历
        for (let creepName in BASIC_CREEP[roomName]) {
            creepArray.push(creepName);
        }
        //进阶Creep遍历
        for (let creepName in ADVANCED_CREEP[roomName]) {
            creepArray.push(creepName);
        }
        //将基础与进阶Creep存入同一个Map值中
        creepDataMap.set(roomName, creepArray);
    }
    global.creepData = creepDataMap;
}

function roomDataInit() {
    let roomDataMap = new Map();
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

module.exports = {
    init: init
}