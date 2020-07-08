// 引入 creep 配置项
const logger = require('utils.log').getLogger("Room_Extension");

//自定义的 Room 的拓展
const roomExtension = {
    getSourceList() {
        return global.roomData.get(this.name).sourceList;
    },
    getSourceLinkList() {
        return global.roomData.get(this.name).sourceLinkList;
    },
    getTowerList() {
        return global.roomData.get(this.name).towerList;
    },
    getControllerLink() {
        return global.roomData.get(this.name).controllerLink;
    },
    getSpawnList() {
        return global.roomData.get(this.name).spawnList;
    },
    getExtensionList() {
        return global.roomData.get(this.name).extensionList;
    }
}

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Room.prototype, roomExtension)
}