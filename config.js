module.exports = {
    //所辖Room(已Claim的房间)
    CLAIM_ROOM: ["E6S22", "E9S21", "E8S23", "E8S25"],
    ROOMS_BUILDER: ({
        E6S22: ['Builder_E6S22'],
        E9S21: ['Builder_E9S21'],
        E8S23: ['Builder_E8S23'],
        E8S25: ['Builder_E8S25']
    }),
    OUTER_ROOMS_BUILDER: ({
        E6S22: [["E6S23", "E5S22", "E5S21"], ["ResidentDefender_E6S22"]],
        E9S21: [["E8S21", "E9S22"], ["ResidentDefender_E9S21"]],
        E8S23: [["E9S23", "E8S24", "E7S23"], ["ResidentDefender_E8S23"]]
    }),

    // Spawn ID 
    SPAWN: ({
        E6S22: ['5eb569554dac05ff668051db', '5ece9d3da4273f33938ce488'],
        E9S21: ['5ec7953511de04afe91a376c'],
        E8S23: ['5ecb8fa0b61e17c73bb11aa8'],
        E8S25: ['5efb1ab4429aea09ccd7f88a']
    }),

    // Link ID,二维数组形式储存，LINK[n][0]为发射端，LINK[n][1]为接收端 
    LINK: ({
        E6S22: [['5ebb456dc1f3759ef33fa7f0', '5ebb4f9dc6a35d97ede0467f'], ['5ec09e77a937d085837a82f3', '5ebb4f9dc6a35d97ede0467f']],
        E9S21: [['5ecba12b9eaa953a1bc89164', '5ecb8901ea5a98a5a982daa5'], ['5ed33bf970adb459fb616d55', '5ecb8901ea5a98a5a982daa5']],
        E8S23: [['5ed6288add8bd256838b9422', '5ed63d3287603b660d4ffc39'], ['5edfddc8501aa4c3dbb1272c', '5ed63d3287603b660d4ffc39']],
        E8S25: [['5efde10ecbf160e9834d241b', '5f045af940c8972393458998'], ['5efde7f7d4aecd88ff156de5', '5f045af940c8972393458998']]
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
        E8S23: '5ee356fc9902b64ce072c67f'
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