const logger = require('utils.log').getLogger("Construction.Factory");
const CONFIG = require('config');

// 工厂工作间隔时间
const interval = 21
// 工厂生产产品
const production = RESOURCE_ZYNTHIUM_BAR

function factoryWork() {
    if (!CONFIG.FACTORY) {
        logger.warn("配置文件中找不到FACTORY的信息！")
        return;
    }
    if (Game.time % interval === 0) {
        const factory = Game.getObjectById(CONFIG.FACTORY.E6S22);
        //调用
        const result = factory.produce(production);
        if (result === ERR_NOT_ENOUGH_RESOURCES) {
            logger.info("工厂原料消耗完毕")
        } else if (result === OK) {
            logger.debug("工厂开始生产")
        } else {
            logger.info("工厂生产出现其他错误，错误代码：" + result)
        }
    }
}

module.exports = {
    factoryWork: factoryWork
};