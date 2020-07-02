const OUTERWORLD_CONFIG = require('config.outerworld')
const CONFIG = require('config')
const harvester = require('Role_Harvester')
const upgrader = require('Role_Upgrader')
const builder = require('Role_Builder')
const mover = require('Role_Mover')
const outerharvester = require('Role_OuterHarvester')
const claimer = require('Role_OuterClaimer')
const outbuilder = require('Role_OuterBuilder')
const miner = require('Role_Miner')
const outmover = require('Role_OuterMover')
const tank = require('Role_Tank')
const residentDefender = require('Role_ResidentDefender')
const colonist = require('Role_Colonists')
const dismantler = require('Role_Dismantler')
const specialMover = require('Role_SpecialMover')
const remoteupgrader = require('Role_RemoteUpgrader')


module.exports = {

    /**
     *   Harvester配置文件
     *      参数：
     *          sourceId:默认能量采集点
     *          targetId:默认能量储存点，一般为紧邻Source的Link，初期可设置为Spawn
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     *          towerList:所在房间 Tower 列表
     */
    Harvester_01: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E6S22[0],
        targetId: CONFIG.LINK.E6S22[0][0],
        backUpTargetId: CONFIG.STORAGE.E6S22,
        towerList: CONFIG.TOWER.E6S22
    }),
    Harvester_02: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E6S22[1],
        targetId: CONFIG.LINK.E6S22[1][0],
        backUpTargetId: CONFIG.STORAGE.E6S22,
        towerList: CONFIG.TOWER.E6S22
    }),

    Harvester_03: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E9S21[0],
        targetId: CONFIG.LINK.E9S21[1][0],
        backUpTargetId: CONFIG.STORAGE.E9S21,
        towerList: CONFIG.TOWER.E9S21
    }),
    Harvester_04: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E9S21[1],
        targetId: CONFIG.LINK.E9S21[0][0],
        backUpTargetId: CONFIG.STORAGE.E9S21,
        towerList: CONFIG.TOWER.E9S21
    }),

    Harvester_05: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E8S23[0],
        targetId: CONFIG.LINK.E8S23[0][0],
        backUpTargetId: CONFIG.STORAGE.E8S23,
    }),
    Harvester_06: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E8S23[1],
        targetId: CONFIG.LINK.E8S23[1][0],
        backUpTargetId: CONFIG.STORAGE.E8S23,
    }),
    //Harvester_07: harvester({sourceId: CONFIG.ENERGY_SOURCE[4], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    Harvester_E8S25_1: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S25[0], targetId: CONFIG.SPAWN.E8S25}),
    Harvester_E8S25_2: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S25[0], targetId: CONFIG.SPAWN.E8S25}),
    Harvester_E8S25_3: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S25[1], targetId: CONFIG.SPAWN.E8S25}),
    Harvester_E8S25_4: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S25[1], targetId: CONFIG.SPAWN.E8S25}),

    /**
     *   Mover配置文件
     *      参数：
     *          sourceId:数组形式存储允许Mover提取能量的建筑ID
     *          storageId:冗余资源存放建筑
     *          upgradeId:房间内升级 Controller 所用 Link id，初期没有可不填写
     *          towerList:所在房间 Tower 列表
     */
    Mover_01: mover({
        sourceId: [CONFIG.LINK.E6S22[0][0], CONFIG.LINK.E6S22[1][0]],
        storageId: CONFIG.STORAGE.E6S22,
        upgradeId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
        towerList: CONFIG.TOWER.E6S22
    }),
    Mover_E6S22_2: mover({
        sourceId: [CONFIG.LINK.E6S22[0][0], CONFIG.LINK.E6S22[1][0]],
        storageId: CONFIG.STORAGE.E6S22,
        upgradeId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
        towerList: CONFIG.TOWER.E6S22
    }),
    Mover_02: mover({
        sourceId: [CONFIG.LINK.E9S21[1][0], CONFIG.LINK.E9S21[0][0]],
        storageId: CONFIG.STORAGE.E9S21,
        upgradeId: CONFIG.UPGRADE_ENERGY_SOURCE.E9S21,
        towerList: CONFIG.TOWER.E9S21
    }),
    Mover_03: mover({
        sourceId: [CONFIG.LINK.E8S23[0][0], CONFIG.LINK.E8S23[1][0]],
        storageId: CONFIG.STORAGE.E8S23,
        upgradeId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S23,
        towerList: CONFIG.TOWER.E8S23
    }),

    /**
     *   Upgrader配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          backUpSourceId:备用取能建筑，一般为Storage，初期可不填写
     */
    Upgrader_E6S22_1: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
        backUpSourceId: CONFIG.STORAGE.E6S22,
        pickEnergy: false
    }),
    Upgrader_E9S21_1: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E9S21,
        backUpSourceId: CONFIG.STORAGE.E9S21,
        pickEnergy: false
    }),
    Upgrader_E8S23_1: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S23,
        pickEnergy: false,
        backUpSourceId: CONFIG.STORAGE.E8S23
    }),
    Upgrader_E8S23_2: upgrader({
        sourceId: CONFIG.STORAGE.E8S23,
        pickEnergy: false,
        backUpSourceId: CONFIG.STORAGE.E8S23
    }),
    Upgrader_E8S25_1: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S25,
        pickEnergy: false,
        backUpSourceId: CONFIG.SPAWN.E8S25,
    }),
    Upgrader_E8S25_2: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S25,
        pickEnergy: false,
        backUpSourceId: CONFIG.SPAWN.E8S25,
    }),


    /**
     *   Builder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     */
    Builder_E6S22: builder({sourceId: CONFIG.STORAGE.E6S22}),
    Builder_E9S21: builder({sourceId: CONFIG.STORAGE.E9S21}),
    Builder_E8S23: builder({sourceId: CONFIG.STORAGE.E8S23}),
    Builder_E8S25: builder({sourceId: CONFIG.SPAWN.E8S25}),

    //Dismantler_01: dismantler({targetId: '5eaec9da0d4bd50b5e5bf8b8', targetRoom: 'E8S25', pathFinderPoint: [[48, 16]]}),

    /**
     *   ResidentDefender配置文件
     *      参数：
     *          targetRoomName:默认驻守的房间名称
     *          pathFinderPoint:辅助寻路点位
     */
    ResidentDefender_E6S22: residentDefender({targetRoomName: "E5S21", pathFinderPoint: [[38, 1]]}),
    ResidentDefender_E8S23: residentDefender({targetRoomName: "E9S23", pathFinderPoint: [[38, 1]]}),
    ResidentDefender_E9S21: residentDefender({targetRoomName: "E9S22", pathFinderPoint: [[38, 1]]}),

    /**
     *   OuterClaimer配置文件
     *      参数：
     *          sourceId:数组形式储存要预订的Controller
     *          targetRoomName:Controller所对应房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterClaimer_E6S22_1: claimer({
        sourceId: ['5bbcad3a9099fc012e636e4a', '5bbcad3a9099fc012e636e4d'],
        targetRoomName: ['E5S21', 'E5S22'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E6S22_2: claimer({
        sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'],
        targetRoomName: ['E6S23', 'E5S22'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E9S21_1: claimer({
        sourceId: ['5bbcad7a9099fc012e637579', '5bbcad6c9099fc012e6373e8'],
        targetRoomName: ['E9S22', 'E8S21'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E6S22_2: claimer({
        sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'],
        targetRoomName: ['E6S23', 'E5S22'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E8S23_1: claimer({
        sourceId: ['5bbcad7b9099fc012e63757c', '5bbcad6c9099fc012e6373f2'],
        targetRoomName: ['E9S23', 'E8S24'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E8S23_2: claimer({
        sourceId: ['5bbcad579099fc012e637263', '5bbcad7b9099fc012e63757c'],
        targetRoomName: ['E7S23', 'E9S23'],
        pathFinderPoint: [[25, 25]]
    }),

    /**
     *   OuterHarvester配置文件
     *      参数：
     *          sourceId:能量采集点
     *          targetRoomName:能量采集点所对应房间名称
     *          targetId:能量储存点
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterHarvester_E5S21_01: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E5S21[0][0],
        targetRoomName: "E5S21",
        targetId: OUTERWORLD_CONFIG.E5S21[0][1],
        pathFinderPoint: [[49, 21]]
    }),
    OuterHarvester_E5S21_02: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E5S21[1][0],
        targetRoomName: "E5S21",
        targetId: OUTERWORLD_CONFIG.E5S21[1][1],
        pathFinderPoint: [[38, 0]]
    }),
    OuterHarvester_E5S22: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E5S22[0][0],
        targetRoomName: "E5S22",
        targetId: OUTERWORLD_CONFIG.E5S22[0][1],
        pathFinderPoint: [[38, 0]]
    }),
    OuterHarvester_E6S23: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E6S23[0][0],
        targetRoomName: "E6S23",
        targetId: OUTERWORLD_CONFIG.E6S23[0][1],
        pathFinderPoint: [[38, 0]]
    }),
    OuterHarvester_E9S23_1: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E9S23[0][0],
        targetRoomName: "E9S23",
        targetId: OUTERWORLD_CONFIG.E9S23[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E9S23_2: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E9S23[1][0],
        targetRoomName: "E9S23",
        targetId: OUTERWORLD_CONFIG.E9S23[1][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E8S24: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E8S24[0][0],
        targetRoomName: "E8S24",
        targetId: OUTERWORLD_CONFIG.E8S24[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E7S23: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E7S23[0][0],
        targetRoomName: "E7S23",
        targetId: OUTERWORLD_CONFIG.E7S23[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E8S21: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E8S21[0][0],
        targetRoomName: "E8S21",
        targetId: OUTERWORLD_CONFIG.E8S21[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E9S22_1: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E9S22[0][0],
        targetRoomName: "E9S22",
        targetId: OUTERWORLD_CONFIG.E9S22[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_E9S22_2: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E9S22[1][0],
        targetRoomName: "E9S22",
        targetId: OUTERWORLD_CONFIG.E9S22[1][1],
        pathFinderPoint: [[32, 49]]
    }),

    /**
     *   OuterBuilder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    //OuterBuilder_E6S22_1: outbuilder({sourceId: CONFIG.STORAGE.E6S22, targetRoomName: "E6S23"}),
    //OuterBuilder_E9S21_1: outbuilder({sourceId: CONFIG.STORAGE.E9S21, targetRoomName: "E9S22"}),
    //OuterBuilder_E8S23_1: outbuilder({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),

    /**
     *   OuterMover配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的外矿房间名称
     *          targetId:能量存储目标建筑
     */
    OuterMover_E5S21_1: outmover({
        sourceId: OUTERWORLD_CONFIG.E5S21[0][1],
        targetRoomName: "E5S21",
        targetId: CONFIG.STORAGE.E6S22
    }),
    OuterMover_E5S21_2: outmover({
        sourceId: OUTERWORLD_CONFIG.E5S21[1][1],
        targetRoomName: "E5S21",
        targetId: CONFIG.STORAGE.E6S22
    }),
    OuterMover_E5S22: outmover({
        sourceId: OUTERWORLD_CONFIG.E5S22[0][1],
        targetRoomName: "E5S22",
        targetId: CONFIG.STORAGE.E6S22
    }),
    OuterMover_E6S23: outmover({
        sourceId: OUTERWORLD_CONFIG.E6S23[0][1],
        targetRoomName: "E6S23",
        targetId: CONFIG.STORAGE.E6S22
    }),
    OuterMover_E9S23_1: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S23[0][1],
        targetRoomName: "E9S23",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_E9S23_1: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S23[1][1],
        targetRoomName: "E9S23",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_E8S24: outmover({
        sourceId: OUTERWORLD_CONFIG.E8S24[0][1],
        targetRoomName: "E8S24",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_E7S23: outmover({
        sourceId: OUTERWORLD_CONFIG.E7S23[0][1],
        targetRoomName: "E7S23",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_E8S21: outmover({
        sourceId: OUTERWORLD_CONFIG.E8S21[0][1],
        targetRoomName: "E8S21",
        targetId: CONFIG.STORAGE.E9S21
    }),
    OuterMover_E9S22_1: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S22[0][1],
        targetRoomName: "E9S22",
        targetId: CONFIG.STORAGE.E9S21
    }),
    OuterMover_E9S22_2: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S22[1][1],
        targetRoomName: "E9S22",
        targetId: CONFIG.STORAGE.E9S21
    }),

    /**
     *   Tank配置文件
     *      参数：
     *          safeRoomName:躲避伤害的房间名
     *          targetRoomName:所要去挨揍的房间名称
     *          pathFinderPoint:辅助寻路点位，pathFinderPoint[0][n]是安全房的坐标，pathFinderPoint[1][n]是挨揍房的坐标
     */
    // Tank_01: tank({
    //     safeRoomName: 'E7S20',
    //     targetRoomName: "E7S21",
    //     pathFinderPoint: [[12, 48], [13, 2]]
    // }),

    /**
     *   Colonist配置文件
     *      参数：
     *          targetRoomName:所要去占领的房间名称
     */
    //Colonist: colonist({ targetRoomName: "E8S25",transferRoom: "E8S24"}),

    /**
     *   Miner配置文件
     *      参数：
     *          sourceId:矿物采集点
     *          targetId:默认矿物储存点，如果为空则会自动设置为当前房间的Storage
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    Miner_01: miner({sourceId: CONFIG.MINE.E6S22[0], targetId: CONFIG.FACTORY.E6S22}),
    Miner_02: miner({sourceId: CONFIG.MINE.E9S21[0], targetId: CONFIG.TERMINAL.E9S21}),
    Miner_03: miner({sourceId: CONFIG.MINE.E8S23[0], targetId: CONFIG.TERMINAL.E8S23}),

    SpecialMover_E9S21: specialMover({
        sourceId: CONFIG.STORAGE.E9S21,
        targetRoomName: "E9S21",
        targetId: CONFIG.FACTORY.E9S21,
        resourceType: RESOURCE_ENERGY,
        targetAmount: 20000
    }),
    SpecialMover_E6S22: specialMover({
        sourceId: CONFIG.STORAGE.E6S22,
        targetRoomName: "E6S22",
        targetId: "5efd2c410e8b880928227657",
        resourceType: RESOURCE_ENERGY
    }),
    SpecialMover_E8S23: specialMover({
        sourceId: "5ead1b29f90795131096919c",
        targetRoomName: "E8S25",
        targetId: CONFIG.STORAGE.E8S23,
        resourceType: RESOURCE_LEMERGIUM
    }),

    RemoteUpgrader_E8S25: remoteupgrader({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),
    RemoteUpgrader_E8S25_1: remoteupgrader({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),
}