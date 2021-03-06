const logger = require('utils.log').getLogger("Builder");
const SYS_CONFIG = require('config.system.setting');

module.exports = config => ({
    // 前往目标房间
    source: creep => {
        creep.moveTo(new RoomPosition(25, 25, config.targetRoom));
    },
    // 拆迁
    target: creep => {
        let target = Game.getObjectById(config.targetId);
        if (target) {
            let re = creep.dismantle(target)
            if (re === ERR_NOT_IN_RANGE) {
                creep.say("80!80!");
                creep.moveTo(target);
            }
        } else {
            target = creep.room.find(FIND_HOSTILE_STRUCTURES,{
                filter: (structure) => (structure.structureType !== STRUCTURE_RAMPART && structure.structureType !== STRUCTURE_WALL&& structure.structureType !== STRUCTURE_CONTROLLER)
            });
            if (target.length) {
                let re = creep.dismantle(target[0]);
                if (re === ERR_NOT_IN_RANGE) {
                    creep.say("80!80!");
                    creep.moveTo(target[0]);
                }
            } else {
                logger.info(`${creep}: ${creep.room} 已被拆光！`);
            }
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 没有抵达目标房间 && creep 之前的状态为“工作”
        if (creep.room.name !== config.targetRoom && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 抵达目标房间 && creep 之前的状态为“不工作”
        if ((creep.room.name === config.targetRoom && !creep.memory.working)) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})