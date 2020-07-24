const logger = require('utils.log').getLogger("Colonists");

module.exports = config => ({
    // 前往目标房间
    source: creep => {
        creep.moveToOtherRoom(config.transferRoom, config.targetRoomName);
    },
    // 殖民目标房间
    target: creep => {
        if (creep.room.controller) {
            const result = creep.claimController(creep.room.controller);
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } else if (result === OK) {
                const message = `殖民${creep.room}已成功！`
                logger.info(message);
                Game.notify(message);
            } else {
                logger.info(`[${creep.name}]殖民状况：`)
            }
        } else {
            logger.info(`${creep.room}没有Controller,请检查配置文件！`)
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 未抵达目标房间 && creep 之前的状态为“工作”
        if (creep.room.name !== config.targetRoomName && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 已抵达目标房间 && creep 之前的状态为“不工作”
        if (creep.room.name === config.targetRoomName && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})