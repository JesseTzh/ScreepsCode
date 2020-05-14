/**
 *Creep个性化配置文件
 *
 */
const CONFIG = require('config')


module.exports = {

    /**
     *   矿工配置文件
     */
    Harvester_01: [["Template", "Worker"],["Role","Harvester"],["BackUpSourceId","5bbcad489099fc012e63708f"]],
    Harvester_02: [["Template", "Worker"]],
    Harvester_03: [["Template", "Worker"]],
    Harvester_04: [["Template", "Worker"]],
    Harvester_05: [["Template", "Worker"]],
    Harvester_06: [["Template", "Worker"]],

    /**
     *   升级工配置文件，默认需要传入一个距离 Controller 较近的能量存储设备，例如Link
     */
    //Upgrader_01: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    //Upgrader_02: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    //Upgrader_03: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    /**
     *   建筑工配置文件，默认需要传入一个冗余能量存储设备作为建造资源提取处，config文件中可配置是否允许进一步从其他建筑提取能量
     */
    //Builder_01: builder(CONFIG.STORAGE[0]),
    //Builder_02: builder(CONFIG.STORAGE[0]),

    /**
     *   搬运工配置文件，默认需要传入一个不允许从中提取能量的储能建筑ID，一般为 Controller 默认升级取能建筑
     */
    //Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0])
}