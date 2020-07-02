const logger = require('utils.log').getLogger("Builder");
const SYS_CONFIG = require('config.system.setting');

module.exports = config => ({
    // 提取能量矿
    source: creep => {
        var source = Game.getObjectById(config.sourceId)
        if (source && source.store.getUsedCapacity(RESOURCE_ENERGY) < 1) {
            logger.info(creep.name + "默认取能建筑存量为空！")
            //根据config文件的参数看是否允许从默认能量提取建筑之外的建筑提取能量
            if (SYS_CONFIG.ALLOW_BUILDE_FROM_SE) {
                source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
            }
        }
        if (source && source.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🚚");
                creep.moveTo(source);
            }
        } else {
            logger.info(creep.name + "找不到可用的取能建筑！");
            creep.say("🈳");
        }

    },
    // 建造
    target: creep => {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            creep.say("🌇");
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            targets = creep.room.find(FIND_STRUCTURES,{
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART ) &&
                        structure.hits / structure.hitsMax <= 0.01;
                }
            })
            if(targets.length && creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})