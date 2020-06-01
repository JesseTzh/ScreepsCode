const logger = require('utils.log').getLogger("Construction.Factory");
const CONFIG = require('config')

function factoryWork() {
    if (!CONFIG.FACTORY) {
        logger.warn("配置文件中找不到FACTORY的信息！")
        return;
    }
    if(Game.time % 11 === 0){
        for (let i = 0; i < CONFIG.FACTORY.length; i++) {
            const factory = Game.getObjectById(CONFIG.FACTORY[i]);
            //调用
            const result = factory.produce(RESOURCE_BATTERY);
            if(result === ERR_NOT_ENOUGH_RESOURCES){
                logger.info("工厂原料消耗完毕")
            }else if(result === OK){
                logger.debug("工厂开始生产")
            }else{
                logger.info("工厂生产出现其他错误，错误代码：" + result)
            }
        }
    }

}

module.exports = {
    factoryWork: factoryWork
};