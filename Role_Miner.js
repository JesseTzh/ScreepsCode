const logger = require('utils.log').getLogger("Miner");

module.exports = config => ({
    // 采集矿物
    source: creep => {
        const source = Game.getObjectById(config.sourceId)
        if (source && source.mineralAmount > 0) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.emoji("⛏️");
                creep.moveTo(source);
            }
        }else{
            //矿物挖光，禁止重生
            creep.room.memory.MinerRebornFlag = false;
        }
    },
    // 存储能量逻辑
    target: creep => {
        if(config.targetId){
            var target = Game.getObjectById(config.targetId);
        }else{
            var target = creep.room.storage;
        }
        if (target) {
            if (creep.transfer(target, Game.getObjectById(config.sourceId).mineralType) == ERR_NOT_IN_RANGE) {
                creep.emoji("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件 
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.store[Game.getObjectById(config.sourceId).mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.store[Game.getObjectById(config.sourceId).mineralType] == creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})