const tools = require('utils.tools');
const mount = require('utils.mount');
const logger = require('utils.log').getLogger("main");
const constructionLink = require('construction.link');
const constructionTower = require('construction.tower');
const creepManager = require('Creep_Manager');

module.exports.loop = function () {
    //挂载原型扩展
    mount();

    //矿点余量监测
    tools.energySourceMonitor();

    //是否有AI占领者
    tools.detectRoomInvaderCore();
    
    //建筑管理
    constructionTower.towerWork();
    constructionLink.linkTransfer();

    //Creep管理
    creepManager.creepManager();

    for (let roomName in Game.rooms) {
        //房间可用能量监测
        tools.globalEnergyMonitor(roomName);
    }
    //Creeps 工作
    for (var name in Game.creeps) {
        Game.creeps[name].work();
    }
    logger.info("---------------------------------------------- Game Time: " + Game.time + "----------------------------------------------")
}