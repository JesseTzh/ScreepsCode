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

function test(creep) {
    var testWithFilter = 0;
    for (let i = 0; i < 10; i++) {
        let before = Game.cpu.getUsed();
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        let after = Game.cpu.getUsed() - before;
        testWithFilter += after;
    }
    testWithFilter = testWithFilter / 10;
    logger.info("filter测试结果：" + testWithFilter);
    //测试结果：0.03CPU左右
}

function detectRoomInvaderCore() {
    for (let i = 0; i < CONFIG.OUTSIDEROOM.length; i++) {
        if (!Game.rooms[CONFIG.OUTSIDEROOM[i]]) {
            return
        }
        let target = Game.rooms[CONFIG.OUTSIDEROOM[i]].find(FIND_HOSTILE_STRUCTURES);
        if (target && target.length) {
            logger.info("发现敌人核心！")
            Memory.creeps["Dps_01"].RebornFlag == "Yes";
            Memory.creeps["Dps_01"].TargetRoom = CONFIG.OUTSIDEROOM[i];
        }
    }
}
module.exports = {
    globalEnergyMonitor: globalEnergyMonitor,
    test: test,
    energySourceMonitor: energySourceMonitor,
    detectRoomInvaderCore: detectRoomInvaderCore
};