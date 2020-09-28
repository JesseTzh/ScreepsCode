const logger = require('utils.log').getLogger("Worker");

function getSource(creep) {
    let source = null;
    if (creep.room.memory.direction === "Out") {
        source = Game.getObjectById(creep.room.getFactory());
    } else if (creep.room.memory.direction === "In") {
        source = creep.room.storage;
    }
    return source;
}

function getTarget(creep){
    let target = null;
    if (creep.room.memory.direction === "Out") {
        target = creep.room.terminal;
    } else if (creep.room.memory.direction === "In") {
        target = Game.getObjectById(creep.room.getFactory());
    }
    return target;
}

module.exports = ({
    // 拿取货物逻辑
    source: creep => {
        //首先检测身上有没有上次任务剩余资源
        if (!creep.cleanBag(creep.room.memory.moveResource)) {
            return;
        }
        const source = getSource(creep);
        if (source) {
            creep.say("🔽");
            if (source.store[creep.room.memory.moveResource] === 0) {
                creep.memory.working = true;
                return;
            }
            const actionResult = creep.withdraw(source, creep.room.memory.moveResource);
            if (actionResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else if (actionResult === ERR_NOT_ENOUGH_RESOURCES) {
                creep.room.memory.moveResource = null;
            } else if (actionResult !== OK) {
                logger.debug(`\n当前运输物品：${creep.room.memory.moveResource}\n当前Creep携带量：${creep.store.getUsedCapacity(creep.room.memory.moveResource)}\n当前总空间:${creep.store.getCapacity(creep.room.memory.moveResource)}`)
                logger.creepLog(creep, "拿取资源", actionResult);
            }
        } else {
            logger.debug(`[${creep.name}]没有被指派工作目标！`);
        }
    },
    // 存储货物逻辑
    target: creep => {
        const target = getTarget(creep);
        if (target) {
            creep.say("🔼");
            const actionResult = creep.transfer(target, creep.room.memory.moveResource);
            if (actionResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else if (actionResult === ERR_FULL) {
                //当工厂存储满后，直接重新筛选要搬运的资源
                creep.room.memory.moveResource = null;
            } else if (actionResult !== OK) {
                logger.info(`[${creep}]存储结果出错：${actionResult}`);
                logger.info(`[${creep.name}]当前被指派搬运物品：${creep.room.memory.moveResource}`);
            }
        } else {
            logger.debug(`[${creep.name}]缺失存储货物目标`);
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.store[creep.room.memory.moveResource] === 0 && creep.memory.working) {
            creep.memory.working = false;
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.store.getUsedCapacity(creep.room.memory.moveResource) === creep.store.getCapacity(creep.room.memory.moveResource) && !creep.memory.working) {
            creep.memory.working = true;
        }
        return creep.memory.working;
    }
})