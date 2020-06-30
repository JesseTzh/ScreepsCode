const CONFIG = require('config');
const logger = require('utils.log').getLogger("Watcher");

function beginWatch() {
    // 监测外矿房间敌人
    defenseOuterRoom();
    // 监测Storage剩余容量
    storageMonitor();
    // 监测Mine是否刷新
    mineMonitor();
    // 监测领地房间是否有建筑工地
    constructionSiteMonitor();
    // 监测外矿房间是否需要OuterBuilder,但考虑CPU消耗等问题，暂放弃
    //outerRoomConstructionSiteMonitor();
}

function defenseOuterRoom() {
    // 检测是否有对应的外矿配置文件
    if (!CONFIG.EXTERNAL_ROOMS) {
        return
    }
    // 遍历控制的房间列表（非外矿房间）
    for (let roomName in CONFIG.EXTERNAL_ROOMS) {
        // 控制房间所对应的外矿房间遍历
        for (let i = 0; i < CONFIG.EXTERNAL_ROOMS[roomName][0].length; i++) {
            // 外矿房间名称
            let externalRoomName = CONFIG.EXTERNAL_ROOMS[roomName][0][i];
            // 外矿房间对象
            let room = Game.rooms[externalRoomName];
            // 丢失此外矿房间视野
            if (!room) {
                let message = '丢失房间[' + externalRoomName + ']的视野，请注意！';
                logger.info(message);
                //发送邮件通知外矿视野丢失
                //Game.notify(message);
                continue;
            }
            // 首先检测是否有敌对 Creep
            let target = room.find(FIND_HOSTILE_CREEPS);
            if (!target.length) {
                // 再检测是否有要塞核心刷出
                target = room.find(FIND_HOSTILE_STRUCTURES);
            }
            if (target && target.length) {
                logger.info("侦测到[" + externalRoomName + "]有敌人入侵！")
                if (Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]]) {
                    Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]].TargetRoom = externalRoomName;
                }
            }
        }
    }
}

function storageMonitor() {
    // 检测是否有对应的Storage配置文件
    if (!CONFIG.STORAGE) {
        return
    }
    for (let roomName in CONFIG.STORAGE) {
        let storage = Game.getObjectById(CONFIG.STORAGE[roomName]);
        if (storage.store.getFreeCapacity() / STORAGE_CAPACITY < 0.1) {
            let message = "房间[" + roomName + "]的Storage剩余储量不足10%，请及时处理！";
            logger.info(message);
            //发送邮件通知
            Game.notify(message);
        }
    }
}

function mineMonitor() {
    // 检测是否有对应的Mine配置文件
    if (!CONFIG.MINE) {
        return
    }
    for (let roomName in CONFIG.MINE) {
        let mine = Game.getObjectById(CONFIG.MINE[roomName][0]);
        if (mine.mineralAmount > 0 || (mine.mineralAmount === 0 && mine.ticksToRegeneration <= 30)) {
            Memory.creeps[CONFIG.MINE[roomName][1]].RebornFlag = "Yes";
        } else {
            Memory.creeps[CONFIG.MINE[roomName][1]].RebornFlag = "No";
        }
    }
}

function constructionSiteMonitor() {
    // 检测是否有对应的配置文件
    if (!CONFIG.ROOMS_BUILDER) {
        return
    }
    for (let roomName in CONFIG.ROOMS_BUILDER) {
        const constructionSite = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES);
        if (constructionSite.length > 0) {
            Memory.creeps[CONFIG.ROOMS_BUILDER[roomName][0]].RebornFlag = "Yes";
        } else {
            Memory.creeps[CONFIG.ROOMS_BUILDER[roomName][0]].RebornFlag = "No";
        }
    }
}

function outerRoomConstructionSiteMonitor(){
    // 检测是否有对应的配置文件
    if (!CONFIG.OUTER_ROOMS_BUILDER) {
        return
    }
    // 遍历控制的房间列表（非外矿房间）
    for (let roomName in CONFIG.OUTER_ROOMS_BUILDER) {

    }
}

module.exports = {
    beginWatch: beginWatch
};