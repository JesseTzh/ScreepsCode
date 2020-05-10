const harvester = require('new_role.harvester')
const upgrader = require('new_role.upgrader')
const builder = require('new_role.builder')
const mover = require('new_role.mover')
const CONFIG = require('config')


module.exports = {

    /**
     *   矿工配置文件，需传入一个指定Energy ID
     */
    Harvester_01: harvester(CONFIG.ENERGY_SOURCE[0]),
    Harvester_02: harvester(CONFIG.ENERGY_SOURCE[0]),
    Harvester_03: harvester(CONFIG.ENERGY_SOURCE[0]),
    Harvester_04: harvester(CONFIG.ENERGY_SOURCE[1]),
    Harvester_05: harvester(CONFIG.ENERGY_SOURCE[1]),
    Harvester_06: harvester(CONFIG.ENERGY_SOURCE[1]),

    /**
     *   升级工配置文件，默认需要传入一个距离 Controller 较近的能量存储设备，Link为最佳
     */
    Upgrader_01: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    //Upgrader_02: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    Upgrader_03: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    Upgrader_04: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    /**
     *   建筑工配置文件，默认需要传入一个冗余能量存储设备作为建造资源提取处，config文件中可配置是否允许进一步从其他建筑提取能量
     */
    Builder_01: builder(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    //Builder_02: builder(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    /**
     *   搬运工配置文件，默认需要传入一个不允许从中提取能量的储能建筑ID，一般为Link接收端
     */
    //Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0])
}