module.exports = {

    //所辖Room(已Claim的房间)
    CLAIM_ROOM: ["E6S22", "E9S21", "E8S23", "E8S25", "E9S23", "E8S26", "E7S22"],

    E6S22: ({
        BUILDER: ['Builder_E6S22'],
        STORAGE: ['']
    }),


    ROOMS_BUILDER: ({
        E6S22: ['Builder_E6S22'],
        E9S21: ['Builder_E9S21'],
        E8S23: ['Builder_E8S23'],
        E8S25: ['Builder_E8S25'],
        E9S23: ['Builder_E9S23'],
        E8S26: ['Builder_E8S26']
    }),

    // Mine 矿物 ID
    MINE: ({
        E6S22: [['5bbcb30440062e4259e93fe8'], ['Miner_01']],
        E9S21: [['5bbcb32440062e4259e9411f'], ['Miner_02']],
        E8S23: [['5bbcb31940062e4259e940b5'], ['Miner_03']],
        E8S25: [['5bbcb31940062e4259e940b7'], ['Miner_04']],
        E9S23: [['5bbcb32440062e4259e94121'], ['Miner_05']]
    }),

    // External Rooms 外矿房间列表与对应镇守的 Creeps
    EXTERNAL_ROOMS: ({
        E6S22: [["E6S23", "E5S22", "E5S21"], ["ResidentDefender_E6S22"]],
        E9S21: [["E8S21", "E9S22"], ["ResidentDefender_E9S21"]],
        E8S23: [["E9S23", "E8S24", "E7S23"], ["ResidentDefender_E8S23"]]
    }),

    //需要远程监控的房间
    OBSERVER_ROOMS: ({
        E6S22: [["E3S20", "E4S20", "E5S20", "E6S20"], ["5efb821797bdc7f2446bd95e"]]
    }),

    //房间默认生产物品
    DEFAULT_PRODUCTION: ({
        E6S22: RESOURCE_ZYNTHIUM_BAR,
        E9S21: RESOURCE_OXIDANT,
        E8S23: RESOURCE_REDUCTANT,
        E8S25: RESOURCE_LEMERGIUM_BAR,
    }),
}