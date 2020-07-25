const tools = require('utils.tools');
const mount = require('utils.mount');
const logger = require('utils.log').getLogger("main");
const constructionLink = require('Construction_Link');
const constructionTower = require('Construction_Tower');
const constructionFactory = require('Construction_Factory')
const constructionTerminal = require('Construction_Terminal')
const creepManager = require('Creep_Manager');
const watcher = require('Watcher')

module.exports.loop = function () {

    //挂载原型扩展
    mount();

    //建筑管理
    constructionTower.towerWork();
    constructionLink.linkTransfer();
    constructionFactory.factoryWork();
    //constructionTerminal.terminalWork();

    //Creeps 工作
    for (let name in Game.creeps) {
        Game.creeps[name].work();
    }

    //Creep管理
    creepManager.creepManager();

    //长夜将至，我从今开始守望
    watcher.beginWatch();

    //清理内存
    tools.cleanMemory();

    const result = Game.cpu.generatePixel();
    logger.debug(result);

    //Game.market.changeOrderPrice('5f028c760de21e2368f00c31', 0.65)

    logger.info("---------------------------------------------- 游戏时间: " + Game.time + " | 所用CPU: " + Game.cpu.getUsed().toFixed(2) + "----------------------------------------------")
}