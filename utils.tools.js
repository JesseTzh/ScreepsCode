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
        if (source.ticksToRegeneration == 1) {
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
    for (let i = 0; i < CONFIG.OUTSIDEROOM.length; i++) {
        if (Memory.creeps["Dps_01"] && Memory.creeps["Dps_01"].RebornFlag && Memory.creeps["Dps_01"].RebornFlag != "Yes") {
            var room = Game.rooms[CONFIG.OUTSIDEROOM[i]]
            if(!room){
                //缺失对应房间视野
                Game.notify('丢失房间 ' + CONFIG.OUTSIDEROOM[i] + '的视野，请注意！');
                continue
            }
            let target = room.find(FIND_HOSTILE_STRUCTURES);
            if (!target.length) {
                target = Game.rooms[CONFIG.OUTSIDEROOM[i]].find(FIND_HOSTILE_CREEPS);
            }
            if (target && target.length) {
                logger.info("发现敌人！")
                Memory.creeps["Dps_01"].RebornFlag = "Yes";
                Memory.creeps["Dps_01"].TargetRoom = CONFIG.OUTSIDEROOM[i];
            }
        }
    }
}
module.exports = {
    globalEnergyMonitor: globalEnergyMonitor,
    energySourceMonitor: energySourceMonitor,
    detectRoomInvaderCore: detectRoomInvaderCore
};