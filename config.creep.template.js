/**
 * Creep个性化配置文件
 *      参数
 *      genMode: 
 *          "Auto":自适应生成，只能传入能量消耗上限以及是否按照已铺好路来生成，适合前期使用
 *          "Config":自定义部件生成，可以传入指定部件数量，但容易因能量不足而重生失败，推荐运营稳定后使用
 *      energyMax:能量消耗上限
 *      roadFlag:是否按照已铺好路的情况来生成
 *      partsSet:以二维数组的形式储存各部件个数
 *      spawnName:重生的Spawn名称
 *      roomName:Creep所归属的房间名称
 *
 */
const CONFIG = require('config')


module.exports = {

    /**
     *   Harvester模板文件
     */
    Harvester_01: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),
    Harvester_02: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),

    /**
     *   Upgrader模板文件
     */
    Upgrader_01: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),
    Upgrader_02: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),

    /**
     *   Builder模板文件
     */
    Builder_01: ({ genMode: "Config", partsSet: [[WORK, 5], [MOVE, 15], [CARRY, 10]], spawnName: "Home", roomName: "E6S22" }),
    Builder_02: ({ genMode: "Config", partsSet: [[WORK, 5], [MOVE, 15], [CARRY, 10]], spawnName: "Home", roomName: "E6S22" }),

    /**
     *   Mover模板文件
     */
    Mover_01: ({ genMode: "Config", partsSet: [[WORK, 0], [MOVE, 7], [CARRY, 15]], spawnName: "Home", roomName: "E6S22" }),
    Mover_02: ({ genMode: "Config", partsSet: [[WORK, 0], [MOVE, 7], [CARRY, 15]], spawnName: "Home", roomName: "E6S22" }),

    /**
     *   OuterHarvester模板文件
     */
    OuterHarvester_01: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),
    OuterHarvester_02: ({ genMode: "Config", partsSet: [[WORK, 6], [MOVE, 6], [CARRY, 6]], spawnName: "Home", roomName: "E6S22" }),
    OuterHarvester_03: ({ genMode: "Config", partsSet: [[WORK, 6], [MOVE, 6], [CARRY, 6]], spawnName: "Home", roomName: "E6S22" }),
    OuterHarvester_04: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),
    OuterHarvester_05: ({ genMode: "Config", partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]], spawnName: "Home", roomName: "E6S22" }),

    OuterClaimer_01: ({ genMode: "Config", partsSet: [[MOVE, 3], [CLAIM, 3]], spawnName: "Home", roomName: "E6S22" }),

    OuterBuilder: ({ genMode: "Config", partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]], spawnName: "Home", roomName: "E6S22" }),

    OuterMover_01: ({ genMode: "Config", partsSet: [[WORK, 1], [MOVE, 10], [CARRY, 20]], spawnName: "Home", roomName: "E6S22" }),
    OuterMover_02: ({ genMode: "Config", partsSet: [[WORK, 1], [MOVE, 10], [CARRY, 20]], spawnName: "Home", roomName: "E6S22" }),
    OuterMover_03: ({ genMode: "Config", partsSet: [[WORK, 1], [MOVE, 10], [CARRY, 20]], spawnName: "Home", roomName: "E6S22" }),

    Tank_01: ({ genMode: "Config", partsSet: [[TOUGH, 10], [MOVE, 15], [HEAL, 5]], spawnName: "Home", roomName: "E6S22" }),

    Dps_01: ({ genMode: "Config", partsSet: [[ATTACK, 10], [MOVE, 5]], spawnName: "Home", roomName: "E6S22" })
}