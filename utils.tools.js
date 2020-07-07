const logger = require('utils.log').getLogger("util.tool");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

// 此函数可检测房间可用能量是否低于 ENERGY_ALERT_RATIO 警报值
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

// 此函数可监测房间能量矿每轮刷新是否未挖完
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

// 此函数可返回传入对象的具体类型
function getType(obj) {
    var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
    if(type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
    if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
    if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
    return type;
}

function cleanMemory(){
    for (let name in Memory.rooms) {
        delete Memory.rooms[name].Harvester;
    }
}

module.exports = {
    globalEnergyMonitor: globalEnergyMonitor,
    energySourceMonitor: energySourceMonitor,
    getType: getType,
    cleanMemory: cleanMemory
};