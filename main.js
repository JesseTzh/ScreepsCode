const tools = require('utils.tools');
const mount = require('utils.mount');
const logger = require('utils.log').getLogger("main");
const constructionLink = require('Construction_Link');
const constructionTower = require('Construction_Tower');
const constructionFactory = require('Construction_Factory')
const constructionTerminal = require('Construction_Terminal')
const creepManager = require('Creep_Manager');

module.exports.loop = function () {
    //挂载原型扩展
    mount();

    //建筑管理
    constructionTower.towerWork();
    constructionLink.linkTransfer();
    //constructionFactory.factoryWork();
    //constructionTerminal.terminalWork();

    //Creeps 工作
    for (let name in Game.creeps) {
        Game.creeps[name].work();
    }

    //Creep管理
    creepManager.creepManager();

    //是否有AI占领者
    tools.detectRoomInvaderCore();

    logger.info("---------------------------------------------- Game Time: " + Game.time + "----------------------------------------------")
}