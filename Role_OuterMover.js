const logger = require('utils.log').getLogger("OuterMover");

module.exports = config => ({
    // 获取能量矿
    source: creep => {
        // 要去的房间
        const room = Game.rooms[config.targetRoomName]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(25, 25, config.targetRoomName))
            return;
        }
        var source = Game.getObjectById(config.sourceId)
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        } else {
            logger.warn(creep.name + "找不到对应的取能建筑！");
        }
    },
    // 存储能量逻辑
    target: creep => {
        //在外房间沿途修理Road
        var target = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => structure.hits / structure.hitsMax <= 0.9 && structure.structureType === STRUCTURE_ROAD
        });
        if (target.length) {
            logger.debug(creep.name + "正在维护沿途道路！");
            if (creep.repair(target[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0]);
            }
        } else {
            target = Game.getObjectById(config.targetId);
            if (target) {
                const result = creep.transfer(target, RESOURCE_ENERGY)
                if (result === ERR_NOT_IN_RANGE) {
                    creep.say("🔼");
                    creep.moveTo(target);
                } else if (result === ERR_FULL) {
                    //目标储存建筑已满，迫不得已丢弃资源以保持外矿运转
                    creep.drop(RESOURCE_ENERGY);
                }
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})