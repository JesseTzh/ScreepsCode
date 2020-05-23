const logger = require('utils.log').getLogger("Dps");

module.exports = config => ({
    // 前往要作战的房间
    source: creep => {
        var source = Game.getObjectById(config.storageId)
        if (source && source.store[RESOURCE_ENERGY] > 0) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        }else{
            logger.info(creep.name + "找不到可以取能的建筑");
        }
    },
    // 去挨揍
    target: creep => {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (target) {
            logger.info(creep.name + " ：骑兵连，进攻！！！")
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            logger.info(creep.name + "找不到要攻击的对象")
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.room.name !=  config.targetRoomName && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上能量满了 && creep 之前的状态为“不工作”
        if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})