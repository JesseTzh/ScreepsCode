module.exports = {
    //是否允许 Builder 从指定建筑之外提取能量来进行建造
    ALLOW_BUILDE_FROM_SE: false,

    //是否允许 Mover 将多余能量存储进 STORAGE/CONTAINER （如有 STORAGE 请谨慎打开）
    ALLOW_STORE_ENERGY: true,

    //是否允许 Upgrader 从 EXTENSION/SPAWN 中提取能量，前期不建议打开，容易使 Upgrader 过度提取能量
    ALLOW_UPGRADER_FROM_SE: false,

    //是否允许矿工采集房间内其他能源点,初期Creep分配不均时建议打开
    ALLOW_HARVESTER_OTHER: false,

    //是否按照已铺好 Road 的情况生成 Creep
    ROAD_FLAG: true,

    //是否让 Mover 清理背包
    CLEAN_BAG: true,

    //允许制造 Creep 的最大能量消耗值
    MAX_CREEP_ENERGY_CONSUM: 1500,

    //日志输出等级
    LOGGER_LEVEL: "INFO",

    //房间可用能量高于多少时允许将 Link 中的能量传输给 Upgrader
    ALLOW_UPGRADER_USE_ENERGY: 0.3,

    //房间可用能量低于多少时会被监测函数记录
    ENERGY_ALERT_RATIO: 0.5,

    // Tower 剩余多少能量时允许 Mover 加进来
    TOWER_ENERGY_NEED: 0.9,

    // Tower 修理 Wall/Rampart 上限
    DEFENSE_CONSTRUCTION_HITS_LIMITS: 0.001
}