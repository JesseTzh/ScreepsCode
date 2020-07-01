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
    // Harvester_08: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    // Harvester_09: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    // Harvester_10: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),

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
    // Mover_E6S22_2: mover({
    //     sourceId: [CONFIG.LINK.E6S22[0][0], CONFIG.LINK.E6S22[1][0]],
    //     storageId: CONFIG.STORAGE.E6S22,
    //     upgradeId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
    //     towerList: CONFIG.TOWER.E6S22
    // }),
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
    // Upgrader_01: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
    //     backUpSourceId: CONFIG.STORAGE.E6S22,
    //     pickEnergy: false
    // }),
    // Upgrader_02: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E6S22,
    //     backUpSourceId: CONFIG.STORAGE.E6S22,
    //     pickEnergy: false
    // }),
    //Upgrader_03: upgrader({sourceId: CONFIG.STORAGE.E6S22, pickEnergy: false}),

    Upgrader_04: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E9S21,
        backUpSourceId: CONFIG.STORAGE.E9S21,
        pickEnergy: false
    }),
    // Upgrader_05: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E9S21,
    //     backUpSourceId: CONFIG.STORAGE.E9S21,
    //     pickEnergy: false
    // }),
    // Upgrader_06: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E9S21,
    //     backUpSourceId: CONFIG.STORAGE.E9S21,
    //     pickEnergy: false
    // }),

    Upgrader_07: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S23,
        pickEnergy: false,
        backUpSourceId: CONFIG.STORAGE.E8S23
    }),
    // Upgrader_08: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE.E8S23,
    //     pickEnergy: false,
    //     backUpSourceId: CONFIG.STORAGE.E8S23
    // }),
    // Upgrader_09: upgrader({
    //     sourceId: CONFIG.STORAGE.E8S23,
    //     pickEnergy: false,
    //     backUpSourceId: CONFIG.STORAGE.E8S23
    // }),
    // Upgrader_10: upgrader({
    //     sourceId: CONFIG.STORAGE.E8S23,
    //     pickEnergy: false,
    //     backUpSourceId: CONFIG.STORAGE.E8S23
    // }),

    /**
     *   Builder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     */
    Builder_E6S22: builder({sourceId: CONFIG.STORAGE.E6S22}),
    Builder_E9S21: builder({sourceId: CONFIG.STORAGE.E9S21}),
    Builder_E8S23: builder({sourceId: CONFIG.STORAGE.E8S23}),

    //Dismantler_01: dismantler({targetId: '5eaec9da0d4bd50b5e5bf8b8', targetRoom: 'E8S25', pathFinderPoint: [[48, 16]]}),

    /**
     *   ResidentDefender配置文件
     *      参数：
     *          targetRoomName:默认驻守的房间名称
     *          pathFinderPoint:辅助寻路点位
     */
    ResidentDefender_E6S22: residentDefender({targetRoomName: "E5S21", pathFinderPoint: [[38, 1]]}),
    ResidentDefender_E8S23: residentDefender({targetRoomName: "E9S23", pathFinderPoint: [[38, 1]]}),
    //ResidentDefender_E9S21: residentDefender({targetRoomName: "E9S22", pathFinderPoint: [[38, 1]]}),

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
<<<<<<< HEAD
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
=======
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_E6S22_2: claimer({
        sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'],
        targetRoomName: ['E6S23', 'E5S22'],
        pathFinderPoint: [[25, 25]]
    }),
    // OuterClaimer_03: claimer({
    //     sourceId: ['5bbcad7a9099fc012e637579', '5bbcad6c9099fc012e6373e8'],
    //     targetRoomName: ['E9S22', 'E8S21'],
    //     pathFinderPoint: [[25, 25]]
    // }),
>>>>>>> 9defc0fbda19abe6debe9fb0a147f71326aebbe1
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
    // OuterHarvester_03: outerharvester({
    //     sourceId: '5bbcad7a9099fc012e637578',
    //     targetRoomName: "E9S22",
    //     targetId: '5ee70e457f28be70f7201908',
    //     pathFinderPoint: [[33, 1]]
    // }),
    // OuterHarvester_04: outerharvester({
    //     sourceId: '5bbcad3a9099fc012e636e4b',
    //     targetRoomName: "E5S21",
    //     targetId: '5ef8326d892531028bb766f6',
    //     pathFinderPoint: [[32, 49]]
    // }),
    // OuterHarvester_05: outerharvester({
    //     sourceId: '5bbcad3a9099fc012e636e49',
    //     targetRoomName: "E5S21",
    //     targetId: '5ecd3a5309a32af5bf13a261',
    //     pathFinderPoint: [[32, 49]]
    // }),
    // OuterHarvester_06: outerharvester({
    //     sourceId: '5bbcad7a9099fc012e63757a',
    //     targetRoomName: "E9S22",
    //     targetId: '5ee71c20b2cc5836ea2aa57e',
    //     pathFinderPoint: [[33, 1]]
    // }),
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

    /**
     *   OuterBuilder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterBuilder_E6S22_1: outbuilder({sourceId: CONFIG.STORAGE.E6S22, targetRoomName: "E5S21"}),
<<<<<<< HEAD
    OuterBuilder_E9S21_1: outbuilder({sourceId: CONFIG.STORAGE.E9S21, targetRoomName: "E8S21"}),
=======
    //OuterBuilder_E9S21_1: outbuilder({sourceId: CONFIG.STORAGE.E9S21, targetRoomName: "E9S22"}),
>>>>>>> 9defc0fbda19abe6debe9fb0a147f71326aebbe1
    OuterBuilder_E8S23_1: outbuilder({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),

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
    // OuterMover_03: outmover({
    //     sourceId: '5ef96777e9119e1680d20eeb',
    //     targetRoomName: "E5S21",
    //     targetId: CONFIG.STORAGE.E6S22
    // }),
    // OuterMover_04: outmover({
    //     sourceId: '5ecde80240d0a7281605c524',
    //     targetRoomName: "E6S23",
    //     targetId: CONFIG.STORAGE.E6S22
    // }),
    // OuterMover_05: outmover({
    //     sourceId: '5ee70e457f28be70f7201908',
    //     targetRoomName: "E9S22",
    //     targetId: CONFIG.STORAGE.E9S21
    // }),
    // OuterMover_06: outmover({
    //     sourceId: '5ee71c20b2cc5836ea2aa57e',
    //     targetRoomName: "E9S22",
    //     targetId: CONFIG.STORAGE.E9S21
    // }),
    OuterMover_07: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S23[0][1],
        targetRoomName: "E9S23",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_08: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S23[1][1],
        targetRoomName: "E9S23",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_09: outmover({
        sourceId: OUTERWORLD_CONFIG.E8S24[0][1],
        targetRoomName: "E8S24",
        targetId: CONFIG.STORAGE.E8S23
    }),
    OuterMover_E7S23: outmover({
        sourceId: OUTERWORLD_CONFIG.E7S23[0][1],
        targetRoomName: "E7S23",
        targetId: CONFIG.STORAGE.E8S23
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

    // SpecialMover_01: specialMover({
    //     sourceId: CONFIG.TERMINAL.E9S21,
    //     targetRoomName: "E9S21",
    //     targetId: CONFIG.STORAGE.E9S21,
    //     resourceType: RESOURCE_ENERGY
    // }),
    // SpecialMover_02: specialMover({
    //     sourceId: CONFIG.STORAGE.E6S22,
    //     targetRoomName: "E6S22",
    //     targetId: CONFIG.FACTORY.E6S22,
    //     resourceType: RESOURCE_ENERGY
    // }),
    // SpecialMover_03: specialMover({
    //     sourceId: CONFIG.STORAGE.E8S23,
    //     targetRoomName: "E6S22",
    //     targetId: CONFIG.TERMINAL.E8S23,
    //     resourceType: RESOURCE_HYDROGEN
    // }),

    RemoteUpgrader_E8S25: remoteupgrader({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),
<<<<<<< HEAD
    RemoteUpgrader_E8S25_1: remoteupgrader({sourceId: CONFIG.STORAGE.E8S23, targetRoomName: "E8S25"}),
=======
>>>>>>> 9defc0fbda19abe6debe9fb0a147f71326aebbe1
}