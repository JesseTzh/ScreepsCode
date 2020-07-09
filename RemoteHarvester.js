const logger = require('utils.log').getLogger("RemoteHarvester");
const SYS_CONFIG = require('config.system.setting');

module.exports = config => ({
    // 去目标房间挖矿
    source: creep => {
        if (creep.moveToOtherRoom(config.transferRoom, config.targetRoomName)) {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (target) {
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    //填充Spawn\Extension
    target: creep => {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (!target) {
            const towerList = creep.room.getTowerList();
            if (towerList) {
                for (let i = 0; i < towerList.length; i++) {
                    let tower = Game.getObjectById(towerList[i]);
                    if (tower.store[RESOURCE_ENERGY] / TOWER_CAPACITY <= SYS_CONFIG.TOWER_ENERGY_NEED) {
                        target = tower;
                    }
                }
            }
        }
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.say("🔼");
                creep.moveTo(target);
            }
        } else {
            //房间能量恢复正常，停止重生
            logger.warn(`${creep.name} 任务已完成！`);
            creep.memory.RebornFlag = "No";
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})