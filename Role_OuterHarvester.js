const logger = require('utils.log').getLogger("OuterHarvester");

module.exports = config => ({
    // 采集能量矿
    source: creep => {
        // 要去的房间
        const room = Game.rooms[config.targetRoomName]
        // 如果该房间不存在就先往房间走
        if (!room) {
            creep.moveTo(new RoomPosition(config.pathFinderPoint[0][0], config.pathFinderPoint[0][1], config.targetRoomName))
            return;
        }
        const source = Game.getObjectById(config.sourceId);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.say("⛏");
            creep.moveTo(source);
        }
    },
    // 存储能量逻辑
    target: creep => {
        const target = Game.getObjectById(config.targetId);
        if (target) {
            if(target.hits < target.hitsMax){
                //挖矿之余捎带维护自己的Container
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                return;
            }
            const result = creep.transfer(target, RESOURCE_ENERGY);
            if (result === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})