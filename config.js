module.exports = {

    //所辖Room(已Claim的房间)
    CLAIM_ROOM: ["E6S22", "E9S21", "E8S23", "E8S25", "E9S23", "E8S26"],

    ROOMS_BUILDER: ({
        E6S22: ['Builder_E6S22'],
        E9S21: ['Builder_E9S21'],
        E8S23: ['Builder_E8S23'],
        E8S25: ['Builder_E8S25'],
        E9S23: ['Builder_E9S23']
    }),

    // Storage ID,一般用作冗余能量缓冲池与建筑建造能量来源
    STORAGE: ({
        E6S22: '5eb929deb5f373e902a1d7d7',
        E9S21: '5ecb7790b025b52113eef9a2',
        E8S23: '5ed350c046178209ed85ec18',
        E8S25: '5f06846679f58420cb17ed04'
    }),

    // Mine 矿物 ID
    MINE: ({
        E6S22: [['5bbcb30440062e4259e93fe8'], ['Miner_01']],
        E9S21: [['5bbcb32440062e4259e9411f'], ['Miner_02']],
        E8S23: [['5bbcb31940062e4259e940b5'], ['Miner_03']],
        E8S25: [['5bbcb31940062e4259e940b7'], ['Miner_04']]
    }),

    // Factory
    FACTORY: ({
        E6S22: '5ecf025a177943db1cb47e1e',
        E9S21: '5ee892c3288a156cdc35d70c',
        E8S23: '5eeb6d03a8562ea81a5328ee'
    }),

    // Terminal
    TERMINAL: ({
        E6S22: '5ec894626cfcf42a53807c7c',
        E9S21: '5ee2225ef1339e9ead43a0df',
        E8S23: '5ee356fc9902b64ce072c67f',
        E8S25: '5f0d984e03c9fe00e2f840ed'
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
}