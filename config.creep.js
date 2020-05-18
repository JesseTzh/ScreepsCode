const harvester = require('new_role.harvester')
const upgrader = require('new_role.upgrader')
const builder = require('new_role.builder')
const mover = require('new_role.mover')
const CONFIG = require('config')
const outharvester = require('Role_OuterHarvester')
const outclainer = require('Role_OuterClaimer')
const outbuilder = require('Role_OuterBuilder')
const miner = require('Role_Miner')


module.exports = {
    
    Miner_01: miner({ sourceId: CONFIG.MINE[0] }),

    /**
     *   矿工配置文件，需传入一个指定Energy ID
     */
    Harvester_01: harvester(CONFIG.ENERGY_SOURCE[0]),
    Harvester_02: harvester(CONFIG.ENERGY_SOURCE[1]),

    /**
     *   升级工配置文件，默认需要传入一个距离 Controller 较近的能量存储设备，例如Link
     */
    Upgrader_01: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    Upgrader_02: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),
    //Upgrader_03: upgrader(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    /**
     *   建筑工配置文件，默认需要传入一个冗余能量存储设备作为建造资源提取处，config文件中可配置是否允许进一步从其他建筑提取能量
     */
    //Builder_01: builder(CONFIG.STORAGE[0]),
    //Builder_02: builder(CONFIG.STORAGE[0]),

    /**
     *   搬运工配置文件，默认需要传入一个不允许从中提取能量的储能建筑ID，一般为 Controller 默认升级取能建筑
     */
    Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    OuterHarvester_01: outharvester('5bbcad3a9099fc012e636e4e'),
    OuterHarvester_02: outharvester('5bbcad3a9099fc012e636e4e'),

    OuterClaimer_01: outclainer(''),

    OuterBuilder: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E5S22", pathFinderPoint: [[48, 21]] }),
}