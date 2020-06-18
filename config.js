module.exports = {
    // Spawn ID 
    SPAWN: ({
        E6S22: ['5eb569554dac05ff668051db', '5ece9d3da4273f33938ce488'],
        E9S21: ['5ec7953511de04afe91a376c'],
        E8S23: ['5ecb8fa0b61e17c73bb11aa8']
    }),

    // 能量矿点 ID
    ENERGY_SOURCE: ({
        E6S22: ['5bbcad489099fc012e63708d', '5bbcad489099fc012e63708f'],
        E9S21: ['5bbcad7a9099fc012e637574', '5bbcad7a9099fc012e637576'],
        E8S23: ['5bbcad6c9099fc012e6373ee', '5bbcad6c9099fc012e6373f0']
    }),

    // Tower ID
    TOWER: ({
        E6S22: ['5eb7147d7f3603f6f5b2f2ec', '5ebbb74020844551b84bec76', '5ed23a4b3cc45f63d3f43729'],
        E9S21: ['5ec890adf62e3fe3d3b86e9c', '5ecb7fb8128a03381e973a45'],
        E8S23: ['5ed04d90ca6db6205d72ee36', '5ed621afb311b9a6046c2f82']
    }),
    // Link ID,二维数组形式储存，LINK[n][0]为发射端，LINK[n][1]为接收端 
    LINK: ({
        E6S22: [['5ebb456dc1f3759ef33fa7f0', '5ebb4f9dc6a35d97ede0467f'], ['5ec09e77a937d085837a82f3', '5ebb4f9dc6a35d97ede0467f']],
        E9S21: [['5ecba12b9eaa953a1bc89164', '5ecb8901ea5a98a5a982daa5'], ['5ed33bf970adb459fb616d55', '5ecb8901ea5a98a5a982daa5']],
        E8S23: [['5ed6288add8bd256838b9422', '5ed63d3287603b660d4ffc39'], ['5edfddc8501aa4c3dbb1272c', '5ed63d3287603b660d4ffc39']]
    }),

    // 升级 Controller 所用的能量来源
    UPGRADE_ENERGY_SOURCE: ({
        E6S22: '5ebb4f9dc6a35d97ede0467f',
        E9S21: '5ecb8901ea5a98a5a982daa5',
        E8S23: '5ed63d3287603b660d4ffc39'
    }),

    // Storage ID,一般用作冗余能量缓冲池与建筑建造能量来源
    STORAGE: ({
        E6S22: '5eb929deb5f373e902a1d7d7',
        E9S21: '5ecb7790b025b52113eef9a2',
        E8S23: '5ed350c046178209ed85ec18'
    }),

    // Mine 矿物 ID ['5bbcb30440062e4259e93fe8'],
    MINE: ({
        E6S22: '5bbcb30440062e4259e93fe8',
        E9S21: '5bbcb32440062e4259e9411f',
        E8S23: '5bbcb31940062e4259e940b5'
    }),

    // OutsideRoom 外矿房间列表
    OUTSIDEROOM: ["E6S23", "E5S22", "E5S21"],

    // Factory [''],
    FACTORY: ({
        E6S22: '5ecf025a177943db1cb47e1e',
        E9S21: '',
        E8S23: ''
    }),

    // Terminal [''],
    TERMINAL: ({
        E6S22: '5ec894626cfcf42a53807c7c',
        E9S21: '5ee2225ef1339e9ead43a0df',
        E8S23: '5ee356fc9902b64ce072c67f'
    }),

    // External Rooms 外矿房间列表与对应镇守的 Creeps
    EXTERNAL_ROOMS: ({
        E6S22: [["E6S23", "E5S22", "E5S21"]['Dps_01']],
        E9S21: [["E9S22"]['Dps_02']],
        E8S23: []
    }),
}