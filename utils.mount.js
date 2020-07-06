const mountCreep = require('Creep_Extension');
const logger = require('utils.log').getLogger("mount");
const creepConfigs = require('config.creep');

// 挂载所有的额外属性和方法
function mount() {
    logger.info("重新挂载原型扩展...");
    global.hasExtension = true
    mountCreep();
}

function clearMemory() {
    logger.info("正在清除内存数据...")
    delete Memory.rooms;
    for (let name in Memory.creeps) {
        if (!(name in creepConfigs)) {
            delete Memory.creeps[name];
            logger.debug('删除不存在的Creep记录:', name);
        }
    }
}

function createOrder() {
    logger.info("正在创建订单...")
    Game.market.createOrder({
        type: ORDER_SELL,
        resourceType: RESOURCE_OXIDANT,
        price: 0.45,
        totalAmount: 32200,
        roomName: "E9S21"
    });
}

function sendJob(){
    Game.rooms['E6S22'].terminal.send(RESOURCE_ENERGY, 100000, 'E9S21');
}

module.exports = function () {
    if (!global.hasExtension) {
        clearMemory();

        mount();

        //createOrder();

        //sendJob();
    }
}