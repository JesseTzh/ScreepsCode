const logger = require('utils.log').getLogger("Tank");

module.exports = config => ({
    // 自我治疗
    source: creep => {
        logger.info(creep.name + "去治疗")
        creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.safeRoomName))
        //TODO 移动至另外的房间
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
    },
    // 去挨揍
    target: creep => {
        logger.info(creep.name + "去挨揍")
        if (creep.room.name != config.targetRoomName) {
            let before = Game.cpu.getUsed();
            creep.moveTo(new RoomPosition(config.pathFinderPoint[1][0], config.pathFinderPoint[1][1], config.targetRoomName), {
                reusePath: 10, visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#fff',
                    lineStyle: 'dashed',
                    strokeWidth: .15,
                    opacity: .1
                }
            })
            let after = Game.cpu.getUsed() - before;
            logger.info("CPU USED:" + after)
        } else {
            var result = creep.heal(creep);
            logger.info("治疗结果：" + result)
            creep.emoji("🤕");
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.hits / creep.hitsMax < 0.5 && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.hits == creep.hitsMax && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})