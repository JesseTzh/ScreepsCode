/**
 * Creep个性化配置文件
 *      参数
 *      genMode:
 *          "Auto":自适应生成，只能传入能量消耗上限以及是否按照已铺好路来生成，适合前期使用
 *          "Config":自定义部件生成，可以传入指定部件数量，但容易因能量不足而重生失败，推荐运营稳定后使用
 *      energyMax:能量消耗上限
 *      roadFlag:是否按照已铺好路的情况来生成,如果是自适应生成模板则必须填写
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
    Harvester_E6S22_0: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Harvester_E6S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    // Room 2
    Harvester_E9S21_0: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Harvester_E9S21_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    // Room 3
    Harvester_E8S23_0: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Harvester_E8S23_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    // Room 4
    Harvester_E8S25_0: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    Harvester_E8S25_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    // Room 5
    Harvester_E9S23_0: ({
        genMode: "Auto",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "EastGuar",
        roomName: "E9S23"
    }),
    Harvester_E9S23_1: ({
        genMode: "Auto",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "EastGuar",
        roomName: "E9S23"
    }),


    /**
     *   Upgrader模板文件
     */
    // Room 1
    Upgrader_E6S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 15], [MOVE, 12], [CARRY, 4]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    // Room 2
    Upgrader_E9S21_1: ({
        genMode: "Config",
        partsSet: [[WORK, 15], [MOVE, 12], [CARRY, 4]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    // Room 3
    Upgrader_E8S23_1: ({
        genMode: "Config",
        partsSet: [[WORK, 15], [MOVE, 12], [CARRY, 4]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    // Room 4
    Upgrader_E8S25_1: ({
        genMode: "Config",
        partsSet: [[WORK, 20], [MOVE, 16], [CARRY, 12]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    // Upgrader_E8S25_2: ({
    //     genMode: "Config",
    //     partsSet: [[WORK, 20], [MOVE, 16], [CARRY, 12]],
    //     spawnName: "Downtown",
    //     roomName: "E8S25"
    // }),
    // Room5
    Upgrader_E8S25_1: ({
        genMode: "Config",
        partsSet: [[WORK, 20], [MOVE, 16], [CARRY, 12]],
        spawnName: "Downtown",
        roomName: "E9S23"
    }),

    /**
     *   Builder模板文件
     */
    Builder_E6S22: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Builder_E9S21: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Builder_E8S23: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Builder_E8S25: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    Builder_E9S23: ({
        genMode: "Auto",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "EastGuar",
        roomName: "E9S23"
    }),

    Dismantler_01: ({
        genMode: "Config",
        partsSet: [[WORK, 25], [MOVE, 25]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),

    /**
     *   Mover模板文件
     */
    Mover_E6S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 10], [CARRY, 20]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Mover_E6S22_2: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 17], [CARRY, 33]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Mover_02: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 15], [CARRY, 30]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Mover_03: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 15], [CARRY, 30]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    Mover_E8S25: ({
        genMode: "Config",
        partsSet: [[WORK, 0], [MOVE, 15], [CARRY, 30]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),

    /**
     *   OuterHarvester模板文件
     */
    OuterHarvester_E5S21_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_E5S21_02: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_E5S22: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_E6S23: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterHarvester_E9S23_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterHarvester_E9S23_2: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterHarvester_E8S24: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterHarvester_E7S23: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterHarvester_E8S21: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),
    OuterHarvester_E9S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),
    OuterHarvester_E9S22_2: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 6], [CARRY, 2]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),

    OuterClaimer_E6S22_1: ({
        genMode: "Config",
        partsSet: [[MOVE, 2], [CLAIM, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterClaimer_E6S22_2: ({
        genMode: "Config",
        partsSet: [[MOVE, 2], [CLAIM, 2]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterClaimer_E9S21_1: ({
        genMode: "Config",
        partsSet: [[MOVE, 3], [CLAIM, 3]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),
    OuterClaimer_E8S23_1: ({
        genMode: "Config",
        partsSet: [[MOVE, 2], [CLAIM, 2]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),

    OuterBuilder_E6S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    OuterBuilder_E6S22_2: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    OuterBuilder_E6S22_3: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    OuterBuilder_E6S22_4: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    OuterBuilder_E9S21_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    OuterBuilder_E8S23_1: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterBuilder_E8S25: ({
        genMode: "Config",
        partsSet: [[WORK, 6], [MOVE, 16], [CARRY, 10]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),

    OuterMover_E5S21_1: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_E5S21_2: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_E5S22: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_E6S23: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    OuterMover_E8S24: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),
    OuterMover_E7S23: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    OuterMover_E8S21: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 16], [CARRY, 30]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),
    OuterMover_E9S22_1: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 11], [CARRY, 21]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),
    OuterMover_E9S22_2: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 16], [CARRY, 30]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),

    Tank_01: ({
        genMode: "Config",
        partsSet: [[MOVE, 25], [HEAL, 25]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),

    ResidentDefender_E6S22: ({
        genMode: "Config",
        partsSet: [[ATTACK, 10], [MOVE, 10]],
        spawnName: "Home-Top",
        roomName: "E6S22"
    }),
    ResidentDefender_E8S23: ({
        genMode: "Config",
        partsSet: [[ATTACK, 10], [MOVE, 10]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    ResidentDefender_E9S21: ({
        genMode: "Config",
        partsSet: [[ATTACK, 10], [MOVE, 10]],
        spawnName: "NewLandCenter",
        roomName: "E9S21"
    }),

    Colonist: ({genMode: "Config", partsSet: [[MOVE, 2], [CLAIM, 1]], spawnName: "ThirdCenter", roomName: "E8S23"}),

    Miner_01: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 10], [CARRY, 10]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    Miner_02: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 10], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    Miner_04: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 10], [CARRY, 10]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    Miner_03: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 10], [CARRY, 10]],
        spawnName: "TheThirdWorld",
        roomName: "E8S23"
    }),

    SpecialMover_E9S21: ({
        genMode: "Config",
        partsSet: [[MOVE, 5], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    SpecialMover_E6S22: ({
        genMode: "Config",
        partsSet: [[MOVE, 5], [CARRY, 10]],
        spawnName: "ControllerCenter",
        roomName: "E6S22"
    }),
    SpecialMover_E8S23_1: ({
        genMode: "Config",
        partsSet: [[MOVE, 5], [CARRY, 5]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    SpecialMover_E8S25: ({
        genMode: "Config",
        partsSet: [[MOVE, 5], [CARRY, 5]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),

    RemoteUpgrader: ({
        genMode: "Config",
        partsSet: [[WORK, 1], [MOVE, 2], [CARRY, 1]],
        spawnName: "Home",
        roomName: "E6S22"
    }),
    RemoteUpgrader_E8S25_1: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    RemoteUpgrader_E8S25_2: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "ThirdCenter",
        roomName: "E8S23"
    }),
    RemoteUpgrader_E8S25: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "Downtown",
        roomName: "E8S25"
    }),
    RemoteHarvester_E8S23: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
    RemoteHarvester_E8S25: ({
        genMode: "Config",
        partsSet: [[WORK, 10], [MOVE, 20], [CARRY, 10]],
        spawnName: "NewLand",
        roomName: "E9S21"
    }),
}