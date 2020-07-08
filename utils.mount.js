const mountCreepExtension = require('Creep_Extension');
const mountRoomExtension  = require('Room_Extension');
const logger = require('utils.log').getLogger("mount");
const creepConfigs = require('config.creep');
const Database = require('Database');

// 挂载所有的额外属性和方法
function mount() {
    logger.info("重新挂载原型扩展...");
    global.hasExtension = true
    mountCreepExtension();
    mountRoomExtension();
}

function clearMemory() {
    logger.info("正在清除内存数据...");
    delete Memory.rooms;
    for (let name in Memory.creeps) {
        if (!(name in creepConfigs)) {
            delete Memory.creeps[name];
            logger.debug('删除不存在的Creep记录:', name);
        }
    }
}

function initDatabase() {
    logger.info("正在初始化数据库...");
    Database.init();
}

function createOrder() {
    logger.info("正在创建订单...")
    Game.market.createOrder({
        type: ORDER_SELL,
        resourceType: RESOURCE_BATTERY,
        price: 2.49,
        totalAmount: 49400,
        roomName: "E6S22"
    });
}

function sendJob(){
    Game.rooms['E6S22'].terminal.send(RESOURCE_ENERGY, 100000, 'E9S21');
}

module.exports = function () {
    if (!global.hasExtension) {
        clearMemory();

        mount();

        initDatabase();

        //createOrder();

        //sendJob();
    }
}