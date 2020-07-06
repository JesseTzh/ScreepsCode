const logger = require('utils.log').getLogger("OuterBuilder");
const creepTemplateConfigs = require('config.creep.template')

module.exports = config => ({
    // 从出生点拿去矿物或者去目标房间就地取材
    source: creep => {
        const creepTemplateConfig = creepTemplateConfigs[creep.name];
        let source = Game.getObjectById(config.sourceId);
        // 如果不在出生房间或默认取能建筑无法取能
        if (!(creep.room.name === creepTemplateConfig.roomName) || !source || source.store[RESOURCE_ENERGY] === 0) {
            creep.pickEnergy();
        } else {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🔽");
                creep.moveTo(source);
            }
        }
    },
    // 建造或维修
    target: creep => {
        let targets;
        // 抵达了目标房间
        if (creep.moveToOtherRoom(config.transferRoom, config.targetRoomName)) {
            // 寻找建筑工地
            targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if (targets.length) {
                creep.say("🌇");
                let r = creep.build(targets[0]);
                if (r === ERR_NOT_IN_RANGE) {
                    r = creep.moveTo(targets[0]);
                }
                //
            } else {
                // 没有建筑工地，则寻找需维修的建筑。（Wall除外）
                targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                });
                if (targets.length) {
                    if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        // 找不到建筑工地与待维修建筑
        if (!targets) {
            logger.warn(creep.name + "找不到可建造的建筑点！");
            creep.say("🈳");
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})