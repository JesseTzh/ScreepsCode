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
    Game.market.createOrder({
        type: ORDER_SELL,
        resourceType: RESOURCE_BATTERY,
        price: 1.00,
        totalAmount: 4500,
        roomName: "E6S22"
    });
}

module.exports = function (roomName) {
    if (!global.hasExtension) {
        clearMemory();

        mount();

        //createOrder();
    }
}