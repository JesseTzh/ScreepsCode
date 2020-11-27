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
        const source = Game.getObjectById(config.sourceId);
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
        let fixFlag = false;
        const roomName = creep.getTemplateConfig("roomName");
        if (creep.room.name !== roomName) {
            //在非出生房间寻找沿途需要修理的 Road
            const fixTarget = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => structure.hits / structure.hitsMax <= 0.9 && structure.structureType === STRUCTURE_ROAD
            });
            if (fixTarget.length) {
                logger.debug(creep.name + "正在维护沿途道路！");
                creep.repair(fixTarget[0]);
                fixFlag = true;
            }
        }
        //如沿途没有需要维修的 Road，则将能量运回出生房间 Storage
        if (!fixFlag) {
            let target = Game.rooms[roomName].storage;
            if (!target) {
                logger.warn(`[${creep.name}]所在房间[${creep.getTemplateConfig("roomName")}]Storage尚未建好,不建议开启外矿`);
            } else if (target.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType === STRUCTURE_TERMINAL || structure.structureType === STRUCTURE_FACTORY || structure.structureType === STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
            }
            const result = creep.transfer(target, RESOURCE_ENERGY);
            if (result === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            } else if (result === ERR_FULL) {
                //目标储存建筑已满，迫不得已丢弃资源以保持外矿运转
                creep.drop(RESOURCE_ENERGY);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})