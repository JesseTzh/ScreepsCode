const logger = require('utils.log').getLogger("util.tool");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

function globalEnergyMonitor(roomName) {
    var energySurplus = Game.rooms[roomName].energyAvailable / Game.rooms[roomName].energyCapacityAvailable;
    Game.rooms[roomName].memory.timeCount == null ? Game.rooms[roomName].memory.timeCount = 1 : Game.rooms[roomName].memory.timeCount += 1;
    if (energySurplus >= SYS_CONFIG.ENERGY_ALERT_RATIO) {
        Game.rooms[roomName].memory.EnergyAlert == null ? Game.rooms[roomName].memory.EnergyAlert = 1 : Game.rooms[roomName].memory.EnergyAlert -= 1;
        //Game.rooms[roomName].memory.EnergyAlert -= 1;
    } else {
        Game.rooms[roomName].memory.EnergyAlert == null ? Game.rooms[roomName].memory.EnergyAlert = 1 : Game.rooms[roomName].memory.EnergyAlert += 1;
        //Game.rooms[roomName].memory.EnergyAlert += 1;
    }
}

function energySourceMonitor() {
    for (let i = 0; i < CONFIG.ENERGY_SOURCE.length; i++) {
        let source = Game.getObjectById(CONFIG.ENERGY_SOURCE[i]);
        if (source.ticksToRegeneration === 1) {
            source.room.memory.EnergyRemain == null ? source.room.memory.EnergyRemain = source.energy : source.room.memory.EnergyRemain += source.energy;
        } else {
            logger.debug(source.id + "被成功挖光")
        }
    }
}

function detectRoomInvaderCore() {
    if (!CONFIG.OUTSIDEROOM) {
        return
    }
    if(!Memory.creeps["Dps_01"] || !Memory.creeps["Dps_01"].RebornFlag){
        Memory.creeps["Dps_01"].RebornFlag = "No";
    }
    //Dps当前没有任务时，扫描外矿房间是否有 AI/玩家 入侵
    if(Memory.creeps["Dps_01"].RebornFlag === "No"){
        for (let i = 0; i < CONFIG.OUTSIDEROOM.length; i++) {
            const room = Game.rooms[CONFIG.OUTSIDEROOM[i]];
            if (!room) {
                let message = '丢失房间 ' + CONFIG.OUTSIDEROOM[i] + '的视野，请注意！'
                //丢失对应房间视野
                logger.info(message)
                Game.notify(message);
                continue
            }
            let target = room.find(FIND_HOSTILE_STRUCTURES);
            if (!target.length) {
                target = Game.rooms[CONFIG.OUTSIDEROOM[i]].find(FIND_HOSTILE_CREEPS);
            }
            if (target && target.length) {
                logger.info("侦测到敌人入侵！")
                Memory.creeps["Dps_01"].RebornFlag = "Yes";
                Memory.creeps["Dps_01"].TargetRoom = CONFIG.OUTSIDEROOM[i];
            }
        }
    }
}

function getType(obj) {
    var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
    if(type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
    if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
    if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
    return type;
}

module.exports = {
    globalEnergyMonitor: globalEnergyMonitor,
    energySourceMonitor: energySourceMonitor,
    detectRoomInvaderCore: detectRoomInvaderCore
};