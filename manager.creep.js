const SYS_CONFIG = require('config.system.setting');
const logger = require('utils.log').getLogger("manager.creep");
const creepConfigs = require('config.creep');
//const creepTemplate = require('config.creep.template')

function manageCreep(roomName) {
    if (Game.time % 100 == 0) {
        //TODO
    }
    for (name in creepConfigs) {
        if (!Game.creeps[name]) {
            //logger.info(name)
            if (Game.rooms[roomName].energyAvailable >= 300) {
                logger.info(name)
                const creepTemplate = require('manager.creep.template').genTemplate(roomName);
                if (name.search("Mover") != -1) {
                    var template = creepTemplate.getMoverTemplate(SYS_CONFIG.ROAD_FLAG);
                } else if (name.search("OuterHarvester_01") != -1) {
                    var template = creepTemplate.getWorkerTemplate(SYS_CONFIG.ROAD_FLAG);
                } else if (name.search("OuterClaimer") != -1) {
                    var template = creepTemplate.getOrderTemplate(false);
                } else if (name.search("Builder_") != -1) {
                    var template = creepTemplate.getDefaultTemplate(false);
                } else if (name.search("OuterB") != -1 || name.search("OuterHarvester") != -1) {
                    var template = creepTemplate.getDefaultTemplate(false);
                } else if (name.search("Miner_01") != -1　&& Game.rooms[roomName].memory.MinerRebornFlag != false) {
                    var template = creepTemplate.getDefaultTemplate(false);
                } else if (name.search("Up") != -1) {
                    var template = creepTemplate.getUpgraderTemplate(SYS_CONFIG.ROAD_FLAG);
                } else {
                    var template = creepTemplate.getWorkerTemplate(SYS_CONFIG.ROAD_FLAG);
                }
                delete Memory.creeps[name];
                var result = Game.spawns[SYS_CONFIG.SPAWN_NAME].spawnCreep(template.sort(), name, { memory: { room: roomName } });
                if (result != OK) {
                    logger.warn(name + " 重生失败！错误代码：" + result)
                } else {
                    logger.info('正在重生 : ' + name);
                }
            }
            return;
        }
    }
}

module.exports = {
    manageCreep: manageCreep
};