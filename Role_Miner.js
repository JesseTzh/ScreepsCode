const logger = require('utils.log').getLogger("Miner");

module.exports = ({
    // 采集矿物
    source: creep => {
        const source = Game.getObjectById(creep.room.getMineral())
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.say("⛏");
            creep.moveTo(source);
        }
    },
    // 存储矿物逻辑
    target: creep => {
        let target;
        target = creep.room.storage;
        if (target) {
            if (creep.transfer(target, Game.getObjectById(creep.room.getMineral()).mineralType) === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            }
        } else {
            logger.info(creep.name + "找不到可以储存矿物的建筑！");
        }
    },
    // 状态切换条件 
    switch: creep => {
        //creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.store[Game.getObjectById(creep.room.getMineral()).mineralType] === 0 && creep.memory.working) {
            creep.memory.working = false
        }
        //creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.store[Game.getObjectById(creep.room.getMineral()).mineralType] === creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})