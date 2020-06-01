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

module.exports = {

    /**
     *   Harvester模板文件
     */
    // Room 1
    Harvester_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Harvester_02: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    // Room 2
    Harvester_03: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 7], [CARRY, 4]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Harvester_04: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 7], [CARRY, 4]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    // Room 3
    Harvester_05: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_06: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_07: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_08: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_09: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_10: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),

    /**
     *   Upgrader模板文件
     */
    // Room 1
    Upgrader_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Upgrader_02: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Upgrader_03: ({
        genMode: "Config",
        partsSet: [[WORK, 8], [MOVE, 9], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    // Room 2
    Upgrader_04: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Upgrader_05: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Upgrader_06: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 6], [CARRY, 6]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    // Room 3
    Upgrader_07: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 6], [CARRY, 8]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Upgrader_08: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 6], [CARRY, 8]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Upgrader_09: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 6], [CARRY, 8]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Upgrader_10: ({
        genMode: "Config",
        partsSet: [[WORK, 3], [MOVE, 6], [CARRY, 3]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),

    /**
     *   Builder模板文件
     */
    Builder_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 25], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Builder_02: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 6], [CARRY, 6]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Builder_03: ({
        genMode: "Config",
        partsSet: [[WORK, 4], [MOVE, 8], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),

    Dismantler_01: ({
        genMode: "Config",
        partsSet: [[WORK, 25], [MOVE, 25]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),

    /**
     *   Mover模板文件
     */
    Mover_01: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 15], [CARRY, 30]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Mover_02: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 10], [CARRY, 20]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),

    /**
     *   OuterHarvester模板文件
     */
    OuterHarvester_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_02: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    OuterHarvester_03: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 6], [CARRY, 6]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    OuterHarvester_04: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_05: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),

    OuterClaimer_01: ({genMode: "Config", partsSet: [[MOVE, 2], [CLAIM, 2]], spawnName: "Home-Top", roomName: "E6S22"}),
    OuterClaimer_02: ({genMode: "Config", partsSet: [[MOVE, 3], [CLAIM, 3]], spawnName: "Home-Top", roomName: "E6S22"}),
    OuterClaimer_03: ({genMode: "Config", partsSet: [[MOVE, 2], [CLAIM, 2]], spawnName: "NewLand", roomName: "E9S21"}),

    OuterBuilder: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    OuterBuilder_1: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    OuterBuilder_2: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),

    OuterMover_01: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_02: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_03: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_04: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home",
        roomName: "E6S22"
    }),

    Tank_01: ({
        genMode: "Config",
        partsSet: [[MOVE, 15], [HEAL, 15]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),

    Dps_01: ({genMode: "Config", partsSet: [[ATTACK, 10], [MOVE, 10]], spawnName: "Home-Top", roomName: "E6S22"}),

    Colonist: ({genMode: "Config", partsSet: [[MOVE, 2], [CLAIM, 1]], spawnName: "NewLand", roomName: "E9S21"}),

    Miner_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 10], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),

    SpecialMover_01: ({
        genMode: "Config",
        partsSet: [[MOVE, 15], [CARRY, 15]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    SpecialMover_02: ({
        genMode: "Config",
        partsSet: [[MOVE, 5], [CARRY, 10]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
}