/**
 *   工厂工作配置文件
 *      参数：
 *          WorkFlag: 工厂是否工作
*           Production: 工厂生产产品
*           Interval: 工厂工作冷却时间
 *
 */
module.exports = {
    E6S22:({
        WorkFlag: true,
        Production: RESOURCE_BATTERY,
        Interval: 11
    }),
    E9S21:({
        WorkFlag: false,
        Production: RESOURCE_OXIDANT,
        Interval: 21
    }),
    E8S23:({
        WorkFlag: false,
        Production: RESOURCE_REDUCTANT,
        Interval: 21
    })
}