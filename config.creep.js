const harvester = require('Role_Harvester')
const upgrader = require('Role_Upgrader')
const builder = require('Role_Builder')
const mover = require('Role_Mover')
const CONFIG = require('config')
const outerharvester = require('Role_OuterHarvester')
const claimer = require('Role_OuterClaimer')
const outbuilder = require('Role_OuterBuilder')
const miner = require('Role_Miner')
const outmover = require('Role_OuterMover')
const tank = require('Role_Tank')
const dps = require('Role_Dps')
const colonist = require('Role_Colonists')
const dismantler = require('Role_Dismantler')
const specialMover = require('Role_SpecialMover')


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
        targetId: CONFIG.LINK[0][0],
        backUpTargetId: CONFIG.STORAGE[0],
        towerList: CONFIG.TOWER.E6S22
    }),
    Harvester_02: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E6S22[1],
        targetId: CONFIG.LINK[1][0],
        backUpTargetId: CONFIG.STORAGE[0],
        towerList: CONFIG.TOWER.E6S22
    }),

    Harvester_03: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E9S21[0],
        targetId: CONFIG.LINK[3][0],
        backUpTargetId: CONFIG.STORAGE[1],
        towerList: CONFIG.TOWER.E9S21
    }),
    Harvester_04: harvester({
        sourceId: CONFIG.ENERGY_SOURCE.E9S21[1],
        targetId: CONFIG.LINK[2][0],
        backUpTargetId: CONFIG.STORAGE[1],
        towerList: CONFIG.TOWER.E9S21
    }),

    Harvester_05: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[0], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    //Harvester_06: harvester({sourceId: CONFIG.ENERGY_SOURCE[4], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    //Harvester_07: harvester({sourceId: CONFIG.ENERGY_SOURCE[4], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    Harvester_08: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    Harvester_09: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),
    Harvester_10: harvester({sourceId: CONFIG.ENERGY_SOURCE.E8S23[1], targetId: '5ecb8fa0b61e17c73bb11aa8'}),

    /**
     *   Mover配置文件
     *      参数：
     *          sourceId:数组形式存储允许Mover提取能量的建筑ID
     *          storageId:冗余资源存放建筑
     *          upgradeId:房间内升级 Controller 所用 Link id，初期没有可不填写
     *          towerList:所在房间 Tower 列表
     */
    Mover_01: mover({
        sourceId: [CONFIG.LINK[0][0], CONFIG.LINK[1][0]],
        storageId: CONFIG.STORAGE[0],
        upgradeId: CONFIG.LINK[0][1],
        towerList: CONFIG.TOWER.E6S22
    }),
    Mover_02: mover({
        sourceId: [CONFIG.LINK[2][0], CONFIG.LINK[3][0]],
        storageId: CONFIG.STORAGE[1],
        upgradeId: CONFIG.LINK[2][1],
        towerList: CONFIG.TOWER.E9S21
    }),

    /**
     *   Upgrader配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          backUpSourceId:备用取能建筑，一般为Storage，初期可不填写
     */
    Upgrader_01: upgrader({sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0], backUpSourceId: CONFIG.STORAGE[0]}),
    Upgrader_02: upgrader({sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0], backUpSourceId: CONFIG.STORAGE[0]}),
    //Upgrader_03: upgrader({ sourceId: CONFIG.STORAGE[0], pickEnergy: false}),

    Upgrader_04: upgrader({
        sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[1],
        backUpSourceId: CONFIG.STORAGE[1],
        pickEnergy: false
    }),
    // Upgrader_05: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[1],
    //     backUpSourceId: CONFIG.STORAGE[1],
    //     pickEnergy: false
    // }),
    // Upgrader_06: upgrader({
    //     sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[1],
    //     backUpSourceId: CONFIG.STORAGE[1],
    //     pickEnergy: false
    // }),

    Upgrader_07: upgrader({sourceId: CONFIG.STORAGE[2], pickEnergy: false}),
    Upgrader_08: upgrader({sourceId: CONFIG.STORAGE[2], pickEnergy: false}),
    Upgrader_09: upgrader({sourceId: CONFIG.STORAGE[2], pickEnergy: false}),
    //Upgrader_10: upgrader({ sourceId: '5e7566b6b89bce0502f335b3', pickEnergy: true }),

    /**
     *   Builder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     */
    Builder_01: builder({sourceId: CONFIG.STORAGE[0]}),
    //Builder_02: builder({sourceId: CONFIG.STORAGE[1]}),
    //Builder_03: builder({sourceId: CONFIG.STORAGE[2]}),

    //Dismantler_01: dismantler({targetId: '5e03302a1aeb2bbc557741b2', targetRoom: 'E7S24', pathFinderPoint: [[1, 11]]}),

    /**
     *   OuterClaimer配置文件
     *      参数：
     *          sourceId:数组形式储存要预订的Controller
     *          targetRoomName:Controller所对应房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterClaimer_01: claimer({
        sourceId: ['5bbcad3a9099fc012e636e4d', '5bbcad3a9099fc012e636e4a'],
        targetRoomName: ['E5S22', 'E5S21'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_02: claimer({
        sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'],
        targetRoomName: ['E6S23', 'E5S22'],
        pathFinderPoint: [[25, 25]]
    }),
    OuterClaimer_03: claimer({
        sourceId: ['5bbcad7a9099fc012e637579', '5bbcad7b9099fc012e63757c'],
        targetRoomName: ['E9S22', 'E9S23'],
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
    OuterHarvester_01: outerharvester({
        sourceId: '5bbcad3a9099fc012e636e4e',
        targetRoomName: "E5S22",
        targetId: '5ecd370cbf1f897d90245bba',
        pathFinderPoint: [[49, 21]]
    }),
    OuterHarvester_02: outerharvester({
        sourceId: '5bbcad489099fc012e637092',
        targetRoomName: "E6S23",
        targetId: '5ecde80240d0a7281605c524',
        pathFinderPoint: [[38, 0]]
    }),
    //OuterHarvester_03: outerharvester({ sourceId: '5bbcad489099fc012e637092', targetRoomName: "E6S23", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[38, 0]] }),
    OuterHarvester_04: outerharvester({
        sourceId: '5bbcad3a9099fc012e636e4b',
        targetRoomName: "E5S21",
        targetId: '5ecd4a0ca732bfde348a4171',
        pathFinderPoint: [[32, 49]]
    }),
    OuterHarvester_05: outerharvester({
        sourceId: '5bbcad3a9099fc012e636e49',
        targetRoomName: "E5S21",
        targetId: '5ecd3a5309a32af5bf13a261',
        pathFinderPoint: [[32, 49]]
    }),

    /**
     *   OuterBuilder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    //OuterBuilder: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E5S22" }),
    //OuterBuilder_1: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E5S21" }),
    OuterBuilder_2: outbuilder({ sourceId: CONFIG.STORAGE[1], targetRoomName: "E9S22" }),

    /**
     *   OuterMover配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的外矿房间名称
     *          targetId:能量存储目标建筑
     */
    OuterMover_01: outmover({
        sourceId: '5ecd370cbf1f897d90245bba',
        targetRoomName: "E5S22",
        targetId: CONFIG.STORAGE[0]
    }),
    OuterMover_02: outmover({
        sourceId: '5ecd4a0ca732bfde348a4171',
        targetRoomName: "E5S21",
        targetId: CONFIG.STORAGE[0]
    }),
    OuterMover_03: outmover({
        sourceId: '5ecd3a5309a32af5bf13a261',
        targetRoomName: "E5S21",
        targetId: CONFIG.STORAGE[0]
    }),
    OuterMover_04: outmover({
        sourceId: '5ecde80240d0a7281605c524',
        targetRoomName: "E6S23",
        targetId: CONFIG.STORAGE[0]
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
     *   Dps配置文件
     *      参数：
     *          targetRoomName:所要去攻击的房间名称
     *          pathFinderPoint:辅助寻路点位
     */
    Dps_01: dps({targetRoomName: "E5S22", pathFinderPoint: [[38, 1]]}),

    /**
     *   Colonist配置文件
     *      参数：
     *          targetRoomName:所要去占领的房间名称
     */
    //Colonist: colonist({ targetRoomName: "E8S23",transferRoom: "E9S23"}),

    /**
     *   Miner配置文件
     *      参数：
     *          sourceId:矿物采集点
     *          targetId:默认矿物储存点，如果为空则会自动设置为当前房间的Storage
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    Miner_01: miner({sourceId: CONFIG.MINE[0], targetId: '5ecf025a177943db1cb47e1e'}),

    // SpecialMover_01: specialMover({
    //     sourceId: '5e7566b6b89bce0502f335b3',
    //     targetRoomName: "E8S23",
    //     targetId: CONFIG.STORAGE[1],
    //     resourceType: RESOURCE_UTRIUM
    // }),
    // SpecialMover_02: specialMover({
    //     sourceId: CONFIG.FACTORY[0],
    //     targetRoomName: "E6S22",
    //     targetId: CONFIG.TERMINAL[0],
    //     resourceType: RESOURCE_BATTERY
    // }),
}