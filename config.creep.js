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
const guard = require('Role_Guard')
const colonist = require('Role_Colonists')
const dismantler = require('Role_Dismantler')
const specialMover = require('Role_SpecialMover')
const remoteupgrader = require('Role_RemoteUpgrader')
const remoteHarvester = require('RemoteHarvester')
const worker = require('Role_Worker')


module.exports = {

    Harvester_E6S22_0: harvester,
    Harvester_E6S22_1: harvester,

    Harvester_E9S21_0: harvester,
    Harvester_E9S21_1: harvester,

    Harvester_E8S23_0: harvester,
    Harvester_E8S23_1: harvester,

    Harvester_E8S25_0: harvester,
    Harvester_E8S25_1: harvester,

    Harvester_E9S23_0: harvester,
    Harvester_E9S23_1: harvester,

    Harvester_E8S26_0: harvester,
    Harvester_E8S26_1: harvester,

    Harvester_E7S22_0: harvester,
    Harvester_E7S22_1: harvester,

    Mover_E6S22_2: mover,
    Mover_02: mover,
    Mover_03: mover,
    Mover_E8S25: mover,
    Mover_E9S23: mover,
    Mover_E8S26: mover,
    Mover_E7S22: mover,

    Upgrader_E6S22_1: upgrader,
    Upgrader_E9S21_1: upgrader,
    Upgrader_E8S23_1: upgrader,
    Upgrader_E8S25_1: upgrader,
    Upgrader_E9S23_1: upgrader,
    //Upgrader_E9S23_2: upgrader,
    //Upgrader_E9S23_3: upgrader,
    Upgrader_E8S26_1: upgrader,
    //Upgrader_E8S26_2: upgrader,
    //Upgrader_E8S26_3: upgrader,
    Upgrader_E7S22_1: upgrader,
    Upgrader_E7S22_2: upgrader,

    Builder_E6S22: builder,
    Builder_E9S21: builder,
    Builder_E8S23: builder,
    Builder_E8S25: builder,
    Builder_E9S23: builder,
    Builder_E8S26: builder,
    Builder_E7S22: builder,

    Worker_E6S22: worker,
    Worker_E9S21: worker,
    Worker_E8S23: worker,
    Worker_E8S25: worker,
    Worker_E9S23: worker,
    //Worker_E8S26: worker,

    /**
     *   Miner配置文件
     */
    Miner_01: miner,
    Miner_02: miner,
    Miner_03: miner,
    Miner_04: miner,
    Miner_05: miner,
    Miner_06: miner,
    Miner_07: miner,

    //Dismantler_01: dismantler({targetId: '5ee80ec2125ddf483806c850', targetRoom: 'E7S25'}),

    ResidentDefender_E6S22: guard,
    ResidentDefender_E8S23: guard,
    // ResidentDefender_E9S21: guard,

    /**
     *   OuterClaimer配置文件
     *      参数：
     *          sourceId:数组形式储存要预订的Controller
     *          targetRoomName:Controller所对应房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterClaimer_E6S22_1: claimer({
        targetRoomName: ['E5S22', 'E5S21', 'E6S23'],
    }),
    // OuterClaimer_E9S21_1: claimer({
    //     targetRoomName: ['E9S22', 'E8S21'],
    // }),
    OuterClaimer_E8S23_1: claimer({
        targetRoomName: ['E7S23', 'E8S24', 'E9S24'],
    }),
    // outerClaimer_E8S25: claimer({
    //     targetRoomName: ['E7S23', 'E8S24'],
    // }),

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
    OuterHarvester_E9S24: outerharvester({
        sourceId: OUTERWORLD_CONFIG.E9S24[0][0],
        targetRoomName: "E9S24",
        targetId: OUTERWORLD_CONFIG.E9S24[0][1],
        pathFinderPoint: [[32, 49]]
    }),
    // OuterHarvester_E8S21: outerharvester({
    //     sourceId: OUTERWORLD_CONFIG.E8S21[0][0],
    //     targetRoomName: "E8S21",
    //     targetId: OUTERWORLD_CONFIG.E8S21[0][1],
    //     pathFinderPoint: [[32, 49]]
    // }),
    // OuterHarvester_E9S22_1: outerharvester({
    //     sourceId: OUTERWORLD_CONFIG.E9S22[0][0],
    //     targetRoomName: "E9S22",
    //     targetId: OUTERWORLD_CONFIG.E9S22[0][1],
    //     pathFinderPoint: [[32, 49]]
    // }),
    // OuterHarvester_E9S22_2: outerharvester({
    //     sourceId: OUTERWORLD_CONFIG.E9S22[1][0],
    //     targetRoomName: "E9S22",
    //     targetId: OUTERWORLD_CONFIG.E9S22[1][1],
    //     pathFinderPoint: [[32, 49]]
    // }),

    /**
     *   OuterBuilder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    //OuterBuilder_E6S22_1: outbuilder({sourceId: "5eb929deb5f373e902a1d7d7", targetRoomName: "E6S23"}),
    //OuterBuilder_E6S22_2: outbuilder({sourceId: "5eb929deb5f373e902a1d7d7", targetRoomName: "E5S21"}),
    // OuterBuilder_E6S22_3: outbuilder({sourceId: CONFIG.STORAGE.E6S22, targetRoomName: "E5S21"}),
    // OuterBuilder_E6S22_4: outbuilder({sourceId: CONFIG.STORAGE.E6S22, targetRoomName: "E5S21"}),
    //OuterBuilder_E9S21_1: outbuilder({sourceId: "", targetRoomName: "E7S22"}),
    //OuterBuilder_E8S23_1: outbuilder({sourceId: "5ed350c046178209ed85ec18", targetRoomName: "E9S24"}),
    //OuterBuilder_E8S25: outbuilder({sourceId: CONFIG.STORAGE.E8S25, targetRoomName: "E8S26"}),

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
    }),
    OuterMover_E5S21_2: outmover({
        sourceId: OUTERWORLD_CONFIG.E5S21[1][1],
        targetRoomName: "E5S21",
    }),
    OuterMover_E5S22: outmover({
        sourceId: OUTERWORLD_CONFIG.E5S22[0][1],
        targetRoomName: "E5S22",
    }),
    OuterMover_E6S23: outmover({
        sourceId: OUTERWORLD_CONFIG.E6S23[0][1],
        targetRoomName: "E6S23",
    }),
    OuterMover_E9S24: outmover({
        sourceId: OUTERWORLD_CONFIG.E9S24[0][1],
        targetRoomName: "E9S24",
    }),
    OuterMover_E8S24: outmover({
        sourceId: OUTERWORLD_CONFIG.E8S24[0][1],
        targetRoomName: "E8S24",
    }),
    OuterMover_E7S23: outmover({
        sourceId: OUTERWORLD_CONFIG.E7S23[0][1],
        targetRoomName: "E7S23",
    }),
    // OuterMover_E8S21: outmover({
    //     sourceId: OUTERWORLD_CONFIG.E8S21[0][1],
    //     targetRoomName: "E8S21",
    // }),
    // OuterMover_E9S22_1: outmover({
    //     sourceId: OUTERWORLD_CONFIG.E9S22[0][1],
    //     targetRoomName: "E9S22",
    // }),
    // OuterMover_E9S22_2: outmover({
    //     sourceId: OUTERWORLD_CONFIG.E9S22[1][1],
    //     targetRoomName: "E9S22",
    // }),

    /**
     *   Tank配置文件
     *      参数：
     *          safeRoomName:躲避伤害的房间名
     *          targetRoomName:所要去挨揍的房间名称
     *          pathFinderPoint:辅助寻路点位，pathFinderPoint[0][n]是安全房的坐标，pathFinderPoint[1][n]是挨揍房的坐标
     */
    // Tank_01: tank({
    //     safeRoomName: 'E8S22',
    //     targetRoomName: "E7S22",
    //     pathFinderPoint: [[1, 5], [48, 5]]
    // }),

    /**
     *   Colonist配置文件
     *      参数：
     *          targetRoomName:所要去占领的房间名称
     */
    //Colonist: colonist({ targetRoomName: "E7S22"}),


    // SpecialMover_E9S21: specialMover({
    //     sourceId: CONFIG.FACTORY.E9S21,
    //     targetRoomName: "E9S21",
    //     targetId: CONFIG.TERMINAL.E9S21,
    //     resourceType: RESOURCE_BATTERY,
    //     targetAmount: 0
    // }),
    // SpecialMover_E6S22: specialMover({
    //     sourceId: "5eb929deb5f373e902a1d7d7",
    //     targetRoomName: "E6S22",
    //     targetId: "5ec894626cfcf42a53807c7c",
    //     resourceType: RESOURCE_ENERGY,
    //     targetAmount: 0
    // }),
    // SpecialMover_E8S23_1: specialMover({
    //     sourceId: "5ed350c046178209ed85ec18",
    //     targetRoomName: "E8S23",
    //     targetId: "5ee356fc9902b64ce072c67f",
    //     resourceType: RESOURCE_ENERGY,
    //     targetAmount: 300000
    // }),
    // SpecialMover_E8S25: specialMover({
    //     sourceId: "5f06846679f58420cb17ed04",
    //     targetRoomName: "E8S25",
    //     targetId: "5f0d984e03c9fe00e2f840ed",
    //     resourceType: RESOURCE_ENERGY,
    //     targetAmount: 240000
    // }),
    // SpecialMover_E8S26: specialMover({
    //     sourceId: "5f34ad65f66708bbb31ab441",
    //     targetRoomName: "E8S26",
    //     targetId: "5f1ef584fa4dc302abc139f7",
    //     resourceType: RESOURCE_ENERGY,
    //     targetAmount: 0
    // }),

    //RemoteUpgrader: remoteupgrader({targetRoomName: "E5S21"}),
    // RemoteUpgrader_E9S21_1: remoteupgrader({targetRoomName: "E7S22"}),
    // RemoteUpgrader_E9S21_2: remoteupgrader({targetRoomName: "E7S22"}),
    //RemoteUpgrader_E8S25: remoteupgrader({targetRoomName: "E8S26"}),
    //RemoteUpgrader_E8S25_1: remoteupgrader({targetRoomName: "E8S26"}),

    //RemoteHarvester_E8S23: remoteHarvester({targetRoomName: "E8S23"}),
    //RemoteHarvester_E8S25: remoteHarvester({targetRoomName: "E8S25"}),

}