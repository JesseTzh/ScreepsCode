/**
 * 房间数据
 * 用法：
 *     const roomData = new RoomData().initData(claimRoomName);
 *
 */
const logger = require('utils.log').getLogger("RoomData");

class RoomData {
    constructor() {
        //房间名称
        this.name = "";
        //Source列表
        this.sourceList = new Array();
        //Source附近的Link列表
        this.sourceLinkList = new Array();
        //房间内Tower列表
        this.towerList = new Array();
        //升级Controller所用Link
        this.controllerLink = "";
        //房间内Spawn列表
        this.spawnList = new Array();
        //房间内Extenstion列表
        this.extensionList = new Array();
        //房间内的Mineral
        this.mineral = "";
        //房间内的Factory
        this.factory = "";
    }

    initData(roomName) {
        this.name = roomName;
        const claimRoom = Game.rooms[this.name];
        if (!claimRoom) {
            logger.error("无法获取房间[" + roomName + "]对应信息!");
        }
        this.sourceList = this._getSourceList(claimRoom);
        this.sourceLinkList = this._getSourceLinkList();
        if (this.sourceList.length != this.sourceLinkList.length) {
            logger.warn("房间[" + roomName + "]中的Source与Link无法一一对应!");
            return null;
        }
        this.towerList = this._getTowerList(claimRoom);
        this.controllerLink = this._getControllerLink(claimRoom);
        this.spawnList = this._getSpawnList(claimRoom);
        this.extensionList = this._getExtensionList(claimRoom);
        this.mineral = this._getMineral(claimRoom);
        this.factory = this._getFactory(claimRoom);
        return this;
    }

    _getSourceList(claimRoom) {
        const sourceObjArr = claimRoom.find(FIND_SOURCES);
        let sourceIdArr = new Array();
        for (let sourceObj of sourceObjArr) {
            sourceIdArr.push(sourceObj.id);
        }
        return sourceIdArr;
    }

    _getSourceLinkList() {
        let sourceLinkIdArr = new Array();
        for (let sourceId of this.sourceList) {
            let source = Game.getObjectById(sourceId);
            let sourceLink = source.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_LINK;
                }
            });
            if (sourceLink.id) {
                sourceLinkIdArr.push(sourceLink.id);
            } else {
                logger.error("没有找到[" + sourceId + "]对应的Link!");
            }
        }
        return sourceLinkIdArr;
    }

    _getTowerList(claimRoom) {
        const towerObjArr = claimRoom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_TOWER;
            }
        });
        if (!towerObjArr.length) {
            logger.warn("房间[" + claimRoom.name + "]未找到Tower!");
        }
        let towerIdArr = new Array();
        for (let towerObj of towerObjArr) {
            towerIdArr.push(towerObj.id);
        }
        return towerIdArr;
    }

    _getControllerLink(claimRoom) {
        const controllerLink = claimRoom.controller.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_LINK;
            }
        });
        return controllerLink.id;
    }

    _getSpawnList(claimRoom) {
        const spawnObjArr = claimRoom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_SPAWN;
            }
        });
        let spawnIdArr = new Array();
        for (let spawnObj of spawnObjArr) {
            spawnIdArr.push(spawnObj.id);
        }
        return spawnIdArr;
    }

    _getExtensionList(claimRoom) {
        const extensionObjArr = claimRoom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION;
            }
        });
        let extensionIdArr = new Array();
        for (let extensionObj of extensionObjArr) {
            extensionIdArr.push(extensionObj.id);
        }
        return extensionIdArr;
    }

    _getMineral(claimRoom) {
        const mineralObj = claimRoom.find(FIND_MINERALS)
        return mineralObj[0].id;
    }

    _getFactory(claimRoom) {
        const factoryObj = claimRoom.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_FACTORY;
            }
        });
        if (factoryObj.length) {
            return factoryObj[0].id;
        } else {
            return null;
        }
    }

}

module.exports = RoomData;