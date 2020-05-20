const harvester = require('Role_Harvester')
const upgrader = require('Role_Upgrader')
const builder = require('new_role.builder')
const mover = require('new_role.mover')
const CONFIG = require('config')
const outerharvester = require('Role_OuterHarvester')
const claimer = require('Role_OuterClaimer')
const outbuilder = require('Role_OuterBuilder')
const miner = require('Role_Miner')
const outmover = require('Role_OuterMover')


module.exports = {

    //Miner_01: miner({ sourceId: CONFIG.MINE[0] }),

    /**
     *   Harvester配置文件
     *      参数：
     *          sourceId:默认能量采集点
     *          targetId:默认能量储存点，一般为紧邻Source的Link，初期可设置为Spawn
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    Harvester_01: harvester({ sourceId: CONFIG.ENERGY_SOURCE[0], targetId: CONFIG.LINK[0][0], backUpTargetId: CONFIG.STORAGE[0] }),
    Harvester_02: harvester({ sourceId: CONFIG.ENERGY_SOURCE[1], targetId: CONFIG.LINK[1][0], backUpTargetId: CONFIG.STORAGE[0] }),

    /**
     *   Upgrader配置文件，默认需要传入一个距离 Controller 较近的能量存储设备，例如Link
     */
    Upgrader_01: upgrader({ sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0], backUpSourceId: CONFIG.STORAGE[0] }),
    Upgrader_02: upgrader({sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0],backUpSourceId: CONFIG.STORAGE[0]}),


    /**
     *   Builder配置文件，默认需要传入一个冗余能量存储设备作为建造资源提取处，config文件中可配置是否允许进一步从其他建筑提取能量
     */
    //Builder_01: builder(CONFIG.STORAGE[0]),
    //Builder_02: builder(CONFIG.STORAGE[0]),

    /**
     *   Mover配置文件，默认需要传入一个不允许从中提取能量的储能建筑ID，一般为 Controller 默认升级取能建筑
     */
    Mover_01: mover(CONFIG.UPGRADE_ENERGY_SOURCE[0]),

    OuterHarvester_01: outerharvester({ sourceId: '5bbcad3a9099fc012e636e4e', targetRoomName: "E5S22", targetId: '5ec3b0b2504f48fa334fe4ea', pathFinderPoint: [[49, 21]] }),
    OuterHarvester_02: outerharvester({ sourceId: '5bbcad489099fc012e637092', targetRoomName: "E6S23", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[38, 0]] }),
    OuterHarvester_03: outerharvester({ sourceId: '5bbcad489099fc012e637092', targetRoomName: "E6S23", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[38, 0]] }),
    //OuterHarvester_04: outerharvester({ sourceId: '5bbcad3a9099fc012e636e4b', targetRoomName: "E5S21", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[32, 49]] }),
    //OuterHarvester_05: outerharvester({ sourceId: '5bbcad3a9099fc012e636e49', targetRoomName: "E5S21", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[32, 49]] }),

    OuterClaimer_01: claimer({ sourceId: ['5bbcad3a9099fc012e636e4d','5bbcad489099fc012e637091'], targetRoomName: ['E5S22','E6S23'], pathFinderPoint: [[49, 21]] }),

    //OuterBuilder: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E6S23", pathFinderPoint: [[38, 1]] }),

    OuterMover: outmover({ sourceId: '5ec3b0b2504f48fa334fe4ea', targetRoomName: "E5S22", targetId: CONFIG.STORAGE[0]})
}