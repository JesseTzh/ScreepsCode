const SYS_CONFIG = require('config.system.setting');
const logger = require('utils.log').getLogger("manager.creep");
const creepConfigs = require('config.creep');

function manageCreep(roomName) {
    for (name in creepConfigs) {
        if (!Game.creeps[name]) {
            logger.debug("⚡ Now:" + Game.rooms[roomName].energyAvailable);
            logger.debug("⚡ Max:" + Game.rooms[roomName].energyCapacityAvailable);
            if (Game.rooms[roomName].energyAvailable >= 300) {
                logger.debug('Reborning a creep : ', name);

                const creepTemplate = require('manager.creep.template').genTemplate(roomName);
                if(name.search("over") != -1){
                    var template = creepTemplate.getMoverTemplate();
                }else{
                    var template = creepTemplate.getDefaultTemplate();
                }

                var result = Game.spawns[SYS_CONFIG.SPAWN_NAME].spawnCreep(template, name, { memory: { room: roomName } });
                if (result != 0) {
                    logger.warn("Reborn creep error! Error Code: " + result)
                }
            }
            return;
        }
    }
}

module.exports = {
    manageCreep: manageCreep
};