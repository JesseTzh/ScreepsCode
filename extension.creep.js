// 引入 creep 配置项
const creepConfigs = require('config.creep');
const SYS_CONFIG = require('config.system.setting');
const logger = require('utils.log').getLogger("extension.creep");

// 自定义的 Creep 的拓展
const creepExtension = {
    work() {
        // 检查 creep 内存中的角色是否存在
        if (!(this.name in creepConfigs)) {
            logger.error(`找不到 ${this.name} 所对应的劳工配置！`);
            return;
        }
        // 获取对应配置项
        const creepConfig = creepConfigs[this.name];
        // 没准备的时候就执行准备阶段
        if (!this.memory.ready) {
            // 有准备阶段配置则执行
            if (creepConfig.prepare && creepConfig.isReady) {
                creepConfig.prepare(this)
                this.memory.ready = creepConfig.isReady(this)
            }
            // 没有就直接准备完成
            else this.memory.ready = true
            return
        }
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
    guiDebug(word) {
        if (SYS_CONFIG.GUIDEBUGMODE) {
            this.say(word);
        }
    }
}

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}