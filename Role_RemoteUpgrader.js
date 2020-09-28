const logger = require('utils.log').getLogger("RemoteUpgrader");
const creepTemplateConfigs = require('config.creep.template')

module.exports = config => ({
    // 从出生点拿去矿物或者去目标房间就地取材
    source: creep => {
        const creepTemplateConfig = creepTemplateConfigs[creep.name];
        let source = creep.room.storage;
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
    target: creep => {
        if (creep.moveToOtherRoom(config.transferRoom, config.targetRoomName)) {
            const controller = creep.room.controller;
            const result = creep.upgradeController(controller);
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            } else if (result !== OK) {
                logger.warn(`[${creep.name}]升级控制器失败！错误代码[${result}]`);
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState()
})