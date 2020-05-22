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


module.exports = {

    /**
     *   Harvester配置文件
     *      参数：
     *          sourceId:默认能量采集点
     *          targetId:默认能量储存点，一般为紧邻Source的Link，初期可设置为Spawn
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    Harvester_01: harvester({ sourceId: CONFIG.ENERGY_SOURCE[0], targetId: CONFIG.LINK[0][0], backUpTargetId: CONFIG.STORAGE[0] }),
    Harvester_02: harvester({ sourceId: CONFIG.ENERGY_SOURCE[1], targetId: CONFIG.LINK[1][0], backUpTargetId: CONFIG.STORAGE[0] }),
    Harvester_03: harvester({ sourceId: CONFIG.ENERGY_SOURCE[2], targetId: '5ec7953511de04afe91a376c', backUpTargetId: '5ec7a7741d4c766da8d5c3e8'}),
    Harvester_04: harvester({ sourceId: CONFIG.ENERGY_SOURCE[2], targetId: '5ec7953511de04afe91a376c', backUpTargetId: '5ec7a7741d4c766da8d5c3e8' }),
    //Harvester_05: harvester({ sourceId: CONFIG.ENERGY_SOURCE[2], targetId: '5ec7953511de04afe91a376c', backUpTargetId: '5ec7a7741d4c766da8d5c3e8' }),
    Harvester_06: harvester({ sourceId: CONFIG.ENERGY_SOURCE[3], targetId: '5ec7953511de04afe91a376c', backUpTargetId: '5ec7a7741d4c766da8d5c3e8' }),

    /**
     *   Mover配置文件
     *      参数：
     *          sourceId:数组形式存储允许Mover提取能量的建筑ID
     *          storageId:冗余资源存放建筑
     */
    Mover_01: mover({ sourceId: [CONFIG.LINK[0][0], CONFIG.LINK[1][0]], storageId: CONFIG.STORAGE[0], upgradeId: CONFIG.LINK[0][1] }),

    /**
     *   Upgrader配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          backUpSourceId:备用取能建筑，一般为Storage，初期可不填写
     */
    Upgrader_01: upgrader({ sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0], backUpSourceId: CONFIG.STORAGE[0] }),
    Upgrader_02: upgrader({ sourceId: CONFIG.UPGRADE_ENERGY_SOURCE[0], backUpSourceId: CONFIG.STORAGE[0] }),
    Upgrader_03: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true}),
    Upgrader_04: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: false }),
    Upgrader_05: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),
    Upgrader_06: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),
    Upgrader_07: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),
    Upgrader_08: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),
    Upgrader_09: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),
    Upgrader_10: upgrader({ sourceId: '5ec7953511de04afe91a376c', pickEnergy: true }),

    /**
     *   Builder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     */
    //Builder_01: builder({sourceId: CONFIG.STORAGE[0]}),
    //Builder_02: builder({sourceId: '5ec7953511de04afe91a376c'}),

    //Dismantler_01: dismantler({targetId: '5ec7953511de04afe91a376c'}),
    // Dismantler_02: dismantler({targetId: '5ec7a7741d4c766da8d5c3e8'}),
    // Dismantler_03: dismantler({targetId: '5ec7a7741d4c766da8d5c3e8'}),
    // Dismantler_04: dismantler({targetId: '5ec7a7741d4c766da8d5c3e8'}),

    /**
     *   Miner配置文件
     *      参数：
     *          sourceId:矿物采集点
     *          targetId:默认矿物储存点，如果为空则会自动设置为当前房间的Storage
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    //Miner_01: miner({ sourceId: CONFIG.MINE[0] }),

    /**
     *   OuterHarvester配置文件
     *      参数：
     *          sourceId:能量采集点
     *          targetRoomName:能量采集点所对应房间名称
     *          targetId:能量储存点
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterHarvester_01: outerharvester({ sourceId: '5bbcad3a9099fc012e636e4e', targetRoomName: "E5S22", targetId: '5ec4ff193cbdd7055e454d74', pathFinderPoint: [[49, 21]] }),
    OuterHarvester_02: outerharvester({ sourceId: '5bbcad489099fc012e637092', targetRoomName: "E6S23", targetId: '5ec7269d4de9cc3762c50611', pathFinderPoint: [[38, 0]] }),
    //OuterHarvester_03: outerharvester({ sourceId: '5bbcad489099fc012e637092', targetRoomName: "E6S23", targetId: CONFIG.STORAGE[0], pathFinderPoint: [[38, 0]] }),
    OuterHarvester_04: outerharvester({ sourceId: '5bbcad3a9099fc012e636e4b', targetRoomName: "E5S21", targetId: '5ec6641c44d03cd960f7370e', pathFinderPoint: [[32, 49]] }),
    OuterHarvester_05: outerharvester({ sourceId: '5bbcad3a9099fc012e636e49', targetRoomName: "E5S21", targetId: '5ec66bfdeb43912369bc0e6b', pathFinderPoint: [[32, 49]] }),

    /**
     *   OuterClaimer配置文件
     *      参数：
     *          sourceId:数组形式储存要预订的Controller
     *          targetRoomName:Controller所对应房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */
    OuterClaimer_01: claimer({ sourceId: ['5bbcad3a9099fc012e636e4d', '5bbcad3a9099fc012e636e4a'], targetRoomName: ['E5S22', 'E5S21'], pathFinderPoint: [[25, 25]] }),
    OuterClaimer_02: claimer({ sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'], targetRoomName: ['E6S23', 'E5S22'], pathFinderPoint: [[25, 25]] }),

    /**
     *   OuterBuilder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的房间名称
     *          pathFinderPoint:辅助寻路点位，尚在开发功能
     */                                                                     //E8S20
    //OuterBuilder: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E9S21", pathFinderPoint: [[23, 48]], transferRoom: "E8S20" }),
    //OuterBuilder_1: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E9S21", pathFinderPoint: [[23, 48]], transferRoom: "E8S20" }),
    OuterBuilder_2: outbuilder({ sourceId: CONFIG.STORAGE[0], targetRoomName: "E9S21", pathFinderPoint: [[23, 48]], transferRoom: "E8S20" }),

    /**
     *   OuterMover配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          targetRoomName:所要去的外矿房间名称
     *          targetId:能量存储目标建筑
     */
    OuterMover_01: outmover({ sourceId: '5ec4ff193cbdd7055e454d74', targetRoomName: "E5S22", targetId: CONFIG.STORAGE[0] }),
    OuterMover_02: outmover({ sourceId: '5ec6641c44d03cd960f7370e', targetRoomName: "E5S21", targetId: CONFIG.STORAGE[0] }),
    OuterMover_03: outmover({ sourceId: '5ec66bfdeb43912369bc0e6b', targetRoomName: "E5S21", targetId: CONFIG.STORAGE[0] }),
    OuterMover_04: outmover({ sourceId: '5ec7269d4de9cc3762c50611', targetRoomName: "E6S23", targetId: CONFIG.STORAGE[0] }),

    /**
     *   Tank配置文件
     *      参数：
     *          safeRoomName:躲避伤害的房间名
     *          targetRoomName:所要去挨揍的房间名称
     *          pathFinderPoint:辅助寻路点位，pathFinderPoint[0][n]是安全房的坐标，pathFinderPoint[1][n]是挨揍房的坐标
     */
    //Tank_01: tank({ safeRoomName: 'E7S20', targetRoomName: "E7S21", pathFinderPoint: [[12, 48], [12, 2]] })

    /**
     *   Dps配置文件
     *      参数：
     *          targetRoomName:所要去攻击的房间名称
     *          pathFinderPoint:辅助寻路点位
     */
    Dps_01: dps({ targetRoomName: "E6S23", pathFinderPoint: [[38, 1]] }),

    /**
     *   Dps配置文件
     *      参数：
     *          targetRoomName:所要去占领的房间名称
     */
    //Colonist: colonist({ targetRoomName: "E9S21",transferRoom: "E8S20"})
}