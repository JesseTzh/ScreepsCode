const creepManager = require('manager.creep');
const tools = require('utils.tools');
const mount = require('utils.mount');
const logger = require('utils.log').getLogger("main");
const constructionLink = require('construction.link');
const constructionTower = require('construction.tower');

module.exports.loop = function () {
    //挂载原型扩展
    mount();

    tools.energySourceMonitor();

    for (let roomName in Game.rooms) {
        tools.globalEnergyMonitor(roomName);

        //Creeps 管理
        creepManager.manageCreep(roomName);

        //Creeps 工作
        for (var name in Game.creeps) {
            Game.creeps[name].work();
            //tools.test(Game.creeps[name]); 
        }

        //建筑管理
        constructionTower.towerWork();
        //constructionLink.linkTransfer();
    }

    logger.info("---------------------------------------------- Game Time: " + Game.time + "----------------------------------------------")

}