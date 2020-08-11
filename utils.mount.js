const mountCreepExtension = require('Creep_Extension');
const mountRoomExtension  = require('Room_Extension');
const logger = require('utils.log').getLogger("mount");
const creepConfigs = require('config.creep');
const databaseInit = require('Database_Initialization');

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
    databaseInit.init();
}

function createOrder() {
    logger.info("正在创建订单...")
    Game.market.createOrder({
        type: ORDER_SELL,
        resourceType: RESOURCE_LEMERGIUM_BAR,
        price: 0.99,
        totalAmount: 100000,
        roomName: "E8S25"
    });
}

function sendJob(){
    logger.info("正在执行传输任务...")
    Game.rooms['E8S23'].terminal.send(RESOURCE_ENERGY, 130000, 'E6S22');
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