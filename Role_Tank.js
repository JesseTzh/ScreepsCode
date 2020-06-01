const logger = require('utils.log').getLogger("Tank");
const creepTemplateConfigs = require('config.creep.template')

module.exports = config => ({
    // 自我治疗
    source: creep => {
        logger.info(creep.name + "血量过低，退回治疗")
        creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.safeRoomName))
        //TODO 移动至另外的房间
        if (creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
    },
    // 去挨揍
    target: creep => {
        //防止在地图边缘进进出出
        if (creep.avoidGoBackRoom()) {
            return;
        }
        logger.info(creep.name + "去挨揍")
        if (creep.room.name !== config.targetRoomName) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[1][0], config.pathFinderPoint[1][1], config.targetRoomName), {
                reusePath: 10, visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#fff',
                    lineStyle: 'dashed',
                    strokeWidth: .15,
                    opacity: .1
                }
            })
        }
        creep.heal(creep);
        creep.say("🤕");
    },
    // 状态切换条件
    switch: creep => {
        // creep 血量降低到50%以下 && creep 之前的状态为“工作”
        if (creep.hits / creep.hitsMax < 0.5 && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 血量回满 && creep 之前的状态为“不工作”
        if (creep.hits === creep.hitsMax && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})