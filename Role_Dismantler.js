const logger = require('utils.log').getLogger("Role_Builder");
const SYS_CONFIG = require('config.system.setting');

module.exports = config => ({
    // 拆迁
    source: creep => {
        var source = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if(source) {
            if(creep.withdraw(source) === ERR_NOT_IN_RANGE) {
                creep.say("🔽")
                creep.moveTo(source);
            }
        }
    },
    // 建造
    target: creep => {
        var target = Game.getObjectById(config.targetId)
        if (target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})