/**
 *Creep个性化配置文件
 *
 */
const CONFIG = require('config')


module.exports = {

    /**
     *   Harvester模板文件
     */
    Harvester_01: ({}),

    /**
     *   Upgrader配置文件
     */
    Upgrader_01: CONFIG.UPGRADE_ENERGY_SOURCE[0],
    Upgrader_02: CONFIG.UPGRADE_ENERGY_SOURCE[0],

    /**
     *   Builder配置文件
     */
    //Builder_01: builder(CONFIG.STORAGE[0]),
    //Builder_02: builder(CONFIG.STORAGE[0]),

    /**
     *   Mover配置文件
     */
    //Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0])
}