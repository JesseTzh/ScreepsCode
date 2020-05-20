// 引入 creep 配置项
const creepConfigs = require('config.creep');
const SYS_CONFIG = require('config.system.setting');
const logger = require('utils.log').getLogger("extension.creep");
const creepTemplateConfigs = require('config.creep.template')

// 自定义的 Creep 的拓展
const creepExtension = {
    work() {
        this.memory.liveTicks == null ? this.memory.liveTicks = 1 : this.memory.liveTicks += 1;
        // 检查 creep 内存中的角色是否存在
        if (!(this.name in creepConfigs)) {
            logger.error(`找不到 ${this.name} 所对应的劳工配置！`);
            this.selfRecycle();
            return;
        }
        // 获取对应配置项
        const creepConfig = creepConfigs[this.name];
        // 获取是否工作
        const working = creepConfig.switch ? creepConfig.switch(this) : true
        // 执行对应操作
        if (working) {
            if (creepConfig.target) creepConfig.target(this)
        }
        else {
            if (creepConfig.source) creepConfig.source(this)
        }
    },
    updateState() {
        // creep 身上没有能量 && creep 之前的状态为“工作”
        if (this.store[RESOURCE_ENERGY] == 0 && this.memory.working) {
            this.memory.working = false
        }
        // creep 身上能量满了 && creep 之前的状态为“不工作”
        if (this.store[RESOURCE_ENERGY] == this.store.getCapacity() && !this.memory.working) {
            this.memory.working = true
        }
        return this.memory.working
    },
    emoji(word) {
        if (SYS_CONFIG.EMOJI_DEGUB_MODE) {
            this.say(word);
        }
    },
    selfFix(){
        if (this.ticksToLive < 1400) {
            //闲着没事做就去续命
            var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (target && target.renewCreep(this) == ERR_NOT_IN_RANGE) {
                this.emoji("🐸");
                logger.info(this.name + "正在续命...");
                this.moveTo(target);
                return;
            } else {
                logger.info(this.name + "续不动了...");
            }
        }
    },
    selfRecycle(){
        var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });
        if(!target){
            const creepTemplateConfig = creepTemplateConfigs[name];
            target = Game.spawns[creepTemplateConfig.spawnName];
        }
        if (target && target.recycleCreep(this) == ERR_NOT_IN_RANGE) {
            this.emoji("🌍");
            logger.info(this.name + "正在将自己回收再利用...");
            this.moveTo(target);
            return;
        } else{
            logger.info(this.name + "无法回收自己");
        }
    }
}

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}