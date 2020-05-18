const logger = require('utils.log').getLogger("OuterHarvester");
const CONFIG = require('config')

function goOtherRoom(creep) {
    // 要占领的房间
    const room = Game.rooms['E5S22']
    // 如果该房间不存在就先往房间走
    if (!room) {
        creep.moveTo(new RoomPosition(25, 25, 'E5S22'))
        return false;
    } else {
        return true;
    }
}

function goBackHome(creep){
    
}

module.exports = sourceId => ({
    // 采集能量矿
    source: creep => {
        if (!goOtherRoom(creep)) {
            //没到指定房间，继续走
            return;
        }
        var source = Game.getObjectById(sourceId)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.guiDebug("⛏️");
            creep.moveTo(source);
        }
    },
    // 存储能量逻辑
    target: creep => {
        const target = Game.getObjectById(CONFIG.STORAGE);
        if (target) {
            var result = creep.transfer(target, RESOURCE_ENERGY)
            if (result == ERR_NOT_IN_RANGE) {
                creep.guiDebug("🔼");
                creep.moveTo(target);
            }else if(result == OK){
                creep.room.memory.OuterRoomEnergy == null ? creep.room.memory.OuterRoomEnergy = 300 : creep.room.memory.OuterRoomEnergy += 300;
            }
        } 
    },
    // 状态切换条件，稍后会给出具体实现
    switch: creep => creep.updateState()
})