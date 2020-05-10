const logger = require('utils.log').getLogger("util.tool");
const SYS_CONFIG = require('config.system.setting');

function globalEnergyMonitor(roomName){
    var energySurplus = Game.rooms[roomName].energyAvailable / Game.rooms[roomName].energyCapacityAvailable;
    Game.rooms[roomName].memory.energySurplus = energySurplus;
    if(energySurplus >= SYS_CONFIG.ENERGY_ALERT_NUM){
        Game.rooms[roomName].memory.energyAlert == null ? Game.rooms[roomName].memory.energyAlert = 1 : Game.rooms[roomName].memory.energyAlert -= 1;
        //Game.rooms[roomName].memory.energyAlert -= 1;
    }else{
        Game.rooms[roomName].memory.energyAlert == null ? Game.rooms[roomName].memory.energyAlert = 1 : Game.rooms[roomName].memory.energyAlert += 1;
        //Game.rooms[roomName].memory.energyAlert += 1;
    }
}

module.exports = {
    globalEnergyMonitor:globalEnergyMonitor
};