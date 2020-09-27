const logger = require('utils.log').getLogger("Factory");
const CONFIG = require('config');
const CONFIG_FACTORY = require('config.construction.factory')

function factoryWork() {
    if (!CONFIG_FACTORY) {
        logger.warn("配置文件中找不到FACTORY的信息！");
        return;
    }
    for (let roomName in CONFIG_FACTORY) {
        const room = Game.rooms[roomName];
        const factory = Game.getObjectById(Game.rooms[roomName].getFactory());
        //当前没有生产产品,根据工厂内所含资源开始指派生产产品
        if (!Game.rooms[roomName].memory.production) {
            let production = null;
            //能量要高于600才能生产
            if (factory.store.getUsedCapacity(RESOURCE_ENERGY) > 600) {
                //如果矿物储量高于500则开始生产压缩矿物
                if (factory.store.getUsedCapacity(Game.getObjectById(room.getMineral()).mineralType) > 500) {
                    production = CONFIG.DEFAULT_PRODUCTION[roomName];
                } else {
                    production = RESOURCE_BATTERY;
                }
            } else {
                logger.debug("房间[" + roomName + "]工厂没有足够能量开展生产");
            }
            room.memory.production = production;
        }
        if (room.memory.production && ((room.memory.production === RESOURCE_BATTERY && Game.time % 11 === 0) || (room.memory.production !== RESOURCE_BATTERY && Game.time % 21 === 0))) {
            const produceResult = factory.produce(Game.rooms[roomName].memory.production);
            if (produceResult === ERR_NOT_ENOUGH_RESOURCES) {
                logger.debug("房间[" + roomName + "]工厂原料消耗完毕");
                room.memory.production = null;
            } else if (produceResult === OK) {
                logger.info(`房间[${roomName}]工厂正在生产：[${Game.rooms[roomName].memory.production}]`)
            } else {
                logger.warn("房间[" + roomName + "]工厂生产出现其他错误，错误代码：" + produceResult);
            }
        }
    }
}

module.exports = {
    factoryWork: factoryWork
};