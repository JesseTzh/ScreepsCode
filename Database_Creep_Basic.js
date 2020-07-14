const harvester = require('Role_Harvester')
const upgrader = require('Role_Upgrader')
const builder = require('Role_Builder')
const mover = require('Role_Mover')
const miner = require('Role_Miner')
const guard = require('Role_Guard')

module.exports = {

    /**
     *   Harvester配置文件
     *      参数：
     *          sourceId:默认能量采集点
     *          targetId:默认能量储存点，一般为紧邻Source的Link，初期可设置为Spawn
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     *          towerList:所在房间 Tower 列表
     */
    Harvester_E6S22_0: harvester,
    Harvester_E6S22_1: harvester,

    Harvester_E9S21_0: harvester,
    Harvester_E9S21_1: harvester,

    Harvester_E8S23_0: harvester,
    Harvester_E8S23_1: harvester,

    Harvester_E8S25_0: harvester,
    Harvester_E8S25_1: harvester,

    /**
     *   Mover配置文件
     *      参数：
     *          sourceId:数组形式存储允许Mover提取能量的建筑ID
     *          storageId:冗余资源存放建筑
     *          upgradeId:房间内升级 Controller 所用 Link id，初期没有可不填写
     *          towerList:所在房间 Tower 列表
     */
    Mover_E6S22_1: mover,
    Mover_E6S22_2: mover,
    Mover_02: mover,
    Mover_03: mover,
    Mover_E8S25: mover,

    /**
     *   Upgrader配置文件
     *      参数：
     *          sourceId:默认取能建筑
     *          backUpSourceId:备用取能建筑，一般为Storage，初期可不填写
     */
    Upgrader_E6S22_1: upgrader,
    Upgrader_E9S21_1: upgrader,
    // Upgrader_E9S21_2: upgrader,
    Upgrader_E8S23_1: upgrader,
    //Upgrader_E8S23_2: upgrader,
    Upgrader_E8S25_1: upgrader,
    Upgrader_E8S25_2: upgrader,


    /**
     *   Builder配置文件
     *      参数：
     *          sourceId:默认取能建筑
     */
    Builder_E6S22: builder,
    Builder_E9S21: builder,
    Builder_E8S23: builder,
    Builder_E8S25: builder,

    /**
     *   ResidentDefender配置文件
     *
     *   已实现无参数化
     *
     */
    ResidentDefender_E6S22: guard,
    ResidentDefender_E8S23: guard,
    ResidentDefender_E9S21: guard,

    /**
     *   Miner配置文件
     *      参数：
     *          sourceId:矿物采集点
     *          targetId:默认矿物储存点，如果为空则会自动设置为当前房间的Storage
     *          backUpTargetId:备用能量储存点，一般为Storage，初期可不填写
     */
    Miner_01: miner,
    Miner_02: miner,
    Miner_03: miner,
    Miner_04: miner,
}