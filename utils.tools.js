const logger = require('utils.log').getLogger("util.tool");
const SYS_CONFIG = require('config.system.setting');
const CONFIG = require('config')

function globalEnergyMonitor(roomName) {
    var energySurplus = Game.rooms[roomName].energyAvailable / Game.rooms[roomName].energyCapacityAvailable;
    Game.rooms[roomName].memory.energySurplus = energySurplus;
    if (energySurplus >= SYS_CONFIG.ENERGY_ALERT_NUM) {
        Game.rooms[roomName].memory.energyAlert == null ? Game.rooms[roomName].memory.energyAlert = 1 : Game.rooms[roomName].memory.energyAlert -= 1;
        //Game.rooms[roomName].memory.energyAlert -= 1;
    } else {
        Game.rooms[roomName].memory.energyAlert == null ? Game.rooms[roomName].memory.energyAlert = 1 : Game.rooms[roomName].memory.energyAlert += 1;
        //Game.rooms[roomName].memory.energyAlert += 1;
    }
}

function energySourceMonitor(){
    for (let i = 0; i < CONFIG.ENERGY_SOURCE.length; i++) {
        let source = Game.getObjectById(CONFIG.ENERGY_SOURCE[i]);
        if(source.energy / source.ticksToRegeneration > 10){
            logger.info(source.id + "挖矿过慢")
        }else{
            logger.info(source.id + "挖矿正常")
        }
        if(source.ticksToRegeneration <= 10){
            logger.info(source.id + "剩余矿物：" + source.energy)
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
module.exports = {
    globalEnergyMonitor: globalEnergyMonitor,
    test: test,
    energySourceMonitor: energySourceMonitor
};