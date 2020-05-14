/**
 *Creep个性化配置文件
 *
 */
const CONFIG = require('config')


module.exports = {

    /**
     *   矿工配置文件
     */
    Harvester_01: [["Template", "Worker"],
    ["Role", "Harvester"],
    ["SourceId", CONFIG.ENERGY_SOURCE[0]]
    ["BackUpSourceId", CONFIG.ENERGY_SOURCE[1]]],

    Harvester_02: [["Template", "Worker"],
    ["Role", "Harvester"],
    ["SourceId", CONFIG.ENERGY_SOURCE[1]]
    ["BackUpSourceId", CONFIG.ENERGY_SOURCE[0]]],

    /**
     *   升级工配置文件
     */
    Upgrader_01: CONFIG.UPGRADE_ENERGY_SOURCE[0],
    Upgrader_02: CONFIG.UPGRADE_ENERGY_SOURCE[0],

    /**
     *   建筑工配置文件
     */
    //Builder_01: builder(CONFIG.STORAGE[0]),
    //Builder_02: builder(CONFIG.STORAGE[0]),

    /**
     *   搬运工配置文件
     */
    //Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0])
}