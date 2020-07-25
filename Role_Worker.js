const logger = require('utils.log').getLogger("Worker");

module.exports = ({
    // 拿取货物逻辑
    source: creep => {
        if (creep.memory.sourceId) {
            const source = Game.getObjectById(creep.memory.sourceId);
            if (source) {
                creep.say("🔽");
                if (source.store[creep.memory.resourceType] === 0) {
                    creep.memory.working = true;
                    return;
                }
                if (creep.withdraw(source, creep.memory.resourceType) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                logger.info(`[${creep.name}]缺失提取货物目标：[${creep.memory.sourceId}]`);
            }
        } else {
            logger.info(`未向[${creep.name}]指派 Source`)
        }
    },
    // 存储货物逻辑
    target: creep => {
        if (creep.memory.targetId) {
            const target = Game.getObjectById(creep.memory.targetId);
            // if (config.targetAmount && target.store[config.resourceType] >= config.targetAmount) {
            //     logger.info("[" + creep.name + "]目标完成！");
            //     return;
            // }
            if (target) {
                creep.say("🔼");
                if (creep.transfer(target, creep.memory.resourceType) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                logger.info(`[${creep.name}]缺失存储货物目标：[${creep.memory.targetId}]`);
            }
        } else {
            logger.info(`未向[${creep.name}]指派 Target`)
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.store[creep.memory.resourceType] === 0 && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.store[creep.memory.resourceType] === creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})