const CONFIG = require('config');
const logger = require('utils.log').getLogger("Watcher");
const Observer = require('Construction_Observer');

function beginWatch() {

    // const cpuUsedBefore = Game.cpu.getUsed();

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

    //监测者探测外界房间
    observer();
    // const cpuUsed = Game.cpu.getUsed() - cpuUsedBefore;
    // logger.info("守望者CPU用量：" + cpuUsed)
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
            //检测对应守卫是否已经是战时状态
            if (Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]] && Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]].Target != "Yes") {
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
                    logger.info("侦测到[" + externalRoomName + "]有敌人入侵！");
                    Game.notify("侦测到[" + externalRoomName + "]有敌人入侵！");
                    Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]].TargetRoom = externalRoomName;
                    Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]].Target = "Yes";
                }
            } else if(!Memory.creeps[CONFIG.EXTERNAL_ROOMS[roomName][1][0]]){
                logger.info("没有检测到[" + externalRoomName + "]房间对应守卫[" + CONFIG.EXTERNAL_ROOMS[roomName][1][0] + "]");
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
        // 内存中是否有对应建造者记录（起码出生过一次）
        if (Memory.creeps[CONFIG.ROOMS_BUILDER[roomName][0]]) {
            const constructionSite = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES);
            // 房间内有建筑工地，则允许建造者重生
            if (constructionSite.length > 0) {
                Memory.creeps[CONFIG.ROOMS_BUILDER[roomName][0]].RebornFlag = "Yes";
            } else {
                Memory.creeps[CONFIG.ROOMS_BUILDER[roomName][0]].RebornFlag = "No";
            }
        }
    }
}

function outerRoomConstructionSiteMonitor() {
    // 检测是否有对应的配置文件
    if (!CONFIG.OUTER_ROOMS_BUILDER) {
        return
    }
    // 遍历控制的房间列表（非外矿房间）
    for (let roomName in CONFIG.OUTER_ROOMS_BUILDER) {

    }
}

function observer() {
    // 检测是否有对应的配置文件
    if (!CONFIG.OBSERVER_ROOMS) {
        return
    }
    for (let roomName in CONFIG.OBSERVER_ROOMS) {
        let roomNum = Game.time % CONFIG.OBSERVER_ROOMS[roomName][0].length;
        Observer.observerWork(CONFIG.OBSERVER_ROOMS[roomName][0][roomNum], CONFIG.OBSERVER_ROOMS[roomName][1]);
        if (roomNum === 0) {
            roomNum = CONFIG.OBSERVER_ROOMS[roomName][0].length;
        }
        // 上一 tick 探测的房间这一 tick 才是可见
        let room = Game.rooms[CONFIG.OBSERVER_ROOMS[roomName][0][roomNum - 1]];
        if (!room) {
            logger.warn("房间[" + CONFIG.OBSERVER_ROOMS[roomName][0][roomNum] + "]未能成功侦测！");
            continue;
        }
        const target = room.find(FIND_STRUCTURES, {
            filter: {structureType: STRUCTURE_POWER_BANK}
        });
        if (target.length) {
            const message = "房间[" + CONFIG.OBSERVER_ROOMS[roomName][0][roomNum] + "]发现超能！";
            logger.info(message)
            //Game.notify(message);
        }
    }
}

module.exports = {
    beginWatch: beginWatch
};