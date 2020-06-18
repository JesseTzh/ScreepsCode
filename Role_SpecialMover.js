const logger = require('utils.log').getLogger("SpecialMover");

module.exports = config => ({
    // 拿去货物逻辑
    source: creep => {
        // 将身上与当前任务不符的物品类型丢弃
        for (let resourceType in creep.carry) {
            if (resourceType !== config.resourceType) {
                creep.drop(resourceType)
            }
        }
        // 要去的房间
        const room = Game.rooms[config.targetRoomName]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(25, 25, config.targetRoomName))
            return;
        }
        const source = Game.getObjectById(config.sourceId);
        if (source) {
            if (source.store[config.resourceType] === 0) {
                creep.memory.working = true;
                return;
            }
            if (creep.withdraw(source, config.resourceType) === ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        } else {
            logger.warn(creep.name + "找不到对应的取货建筑！");
        }
    },
    // 存储货物逻辑
    target: creep => {
        const target = Game.getObjectById(config.targetId);
        if (target) {
            if (creep.transfer(target, config.resourceType) === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件
    switch: creep => {
        // creep 身上没有矿物 && creep 之前的状态为“工作”
        if (creep.store[config.resourceType] === 0 && creep.memory.working) {
            creep.memory.working = false
        }
        // creep 身上矿物满了 && creep 之前的状态为“不工作”
        if (creep.store[config.resourceType] === creep.store.getCapacity() && !creep.memory.working) {
            creep.memory.working = true
        }
        return creep.memory.working
    }
})