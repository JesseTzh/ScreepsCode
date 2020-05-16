const logger = require('utils.log').getLogger("new_role.harvester");
const CONFIG = require('config')

function goOtherRoom(creep) {
    // 要占领的房间
    const room = Game.rooms['E5S22']
    // 如果该房间不存在就先往房间走
    if (!room) {
        creep.moveTo(new RoomPosition(24, 30, 'E5S22'))
        return false;
    } else {
        return true;
    }
}

module.exports = sourceId => ({
    // 采集能量矿
    source: creep => {
        if (!goOtherRoom(creep)) {
            //没到指定房间，继续走
            return;
        }
        var source = Game.getObjectById('5bbcad3a9099fc012e636e4d')
        if (creep.reserveController(source) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("🔔");
            creep.moveTo(source);
        }
    },
    // 存储能量逻辑
    target: creep => {
        creep.guiDebug("🚫");
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})