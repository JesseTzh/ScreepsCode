const logger = require('utils.log').getLogger("Factory");
const CONFIG = require('config');
const CONFIG_FACTORY = require('config.construction.factory')

function factoryWork() {
    if (!CONFIG_FACTORY) {
        logger.warn("配置文件中找不到FACTORY的信息！");
        return;
    }
    for (let roomName in CONFIG_FACTORY) {
        if (!Game.rooms[roomName].memory.production) {
            // 工厂停止工作
            continue;
        }
        if (Game.time % 21 === 0) {
            let factory = Game.getObjectById(Game.rooms[roomName].getFactory());
            let produceResult = factory.produce(Game.rooms[roomName].memory.production);
            if (produceResult === ERR_NOT_ENOUGH_RESOURCES) {
                logger.info("房间[" + roomName + "]工厂原料消耗完毕");
            } else if (produceResult === OK) {
                logger.info(`房间[${roomName}]工厂正在生产：[${CONFIG_FACTORY[roomName].Production}]`)
            } else {
                logger.warn("房间[" + roomName + "]工厂生产出现其他错误，错误代码：" + produceResult);
            }
        }
    }
}

module.exports = {
    factoryWork: factoryWork
};