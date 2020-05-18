const logger = require('utils.log').getLogger("OuterBuilder");

module.exports = config => ({
    // 采集矿物
    source: creep => {
        const source = Game.getObjectById(config.sourceId)
        if (source && source.mineralAmount > 0) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("⛏️");
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
            const targets = Game.getObjectById(config.targetId);
        }else{
            const targets = creep.romm.storage;
        }
        if (target) {
            if (creep.transfer(target, config.sourceId.mineralType) == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件 
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (this.store[config.sourceId.mineralType] == 0 && this.memory.working) {
            this.memory.working = false
        }
        // creep 身上能量满了 && creep 之前的状态为“不工作”
        if (this.store[config.sourceId.mineralType] == this.store.getCapacity() && !this.memory.working) {
            this.memory.working = true
        }
        return this.memory.working
    }
})