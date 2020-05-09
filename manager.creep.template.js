const logger = require('utils.log').getLogger("manager.creep.template");
const SYS_CONFIG = require('config.system.setting');
/**
 * Creep创建模板生成类
 * 用法：
 *     引入
 *        const creepTemplate = require('manager.creep.template').genTemplate(roomName);
 *     使用默认模板
 *        creepTemplate.getDefaultTemplate()
 */
class Template {
    constructor() {
        this.energyRemain = 0;
        this.templateResult = new Array();
        //疲劳值
        this.movePoints = 0;
        this.break = false;
    }

    static genTemplate(roomName) {
        let template = new Template();
        //在config文件中限制了最高能量消耗值
        template.energyRemain = Game.rooms[roomName].energyAvailable <= SYS_CONFIG.MAX_CREEP_ENERGY_CONSUM ? Game.rooms[roomName].energyAvailable : SYS_CONFIG.MAX_CREEP_ENERGY_CONSUM;
        template._addMovePart;
        return template;
    }

    getDefaultTemplate(roadFlag) {
        while (this.energyRemain > 0) {
            logger.debug("Now energy remain:" + this.energyRemain);
            if (this.break) {
                break;
            }
            if (this.movePoints >= 1) {
                this._addWorkPart(roadFlag);
            } else {
                this._addMovePart();
            }
        }
        return this.templateResult;
    }

    getMoverTemplate(roadFlag) {
        while (this.energyRemain > 0) {
            logger.debug("Now energy remain:" + this.energyRemain);
            if (this.break) {
                break;
            }
            if (this.movePoints >= 1) {
                this._addCarryPart(roadFlag);
            } else {
                this._addMovePart();
            }
        }
        return this.templateResult;
    }

    _addWorkPart(roadFlag) {
        //已有的WORK部件数
        var workParts = this.templateResult.filter(part => part == WORK);
        //已有的CARRY部件数
        var carryParts = this.templateResult.filter(part => part == CARRY);
        if (workParts.length > carryParts.length) {
            this._addCarryPart(roadFlag);
        } else if (this.energyRemain >= BODYPART_COST.work) {
            logger.debug("Add a Work part");
            this.templateResult.push(WORK);
            this.energyRemain -= BODYPART_COST.work;
            if (roadFlag) {
                this.movePoints -= 1;
            } else {
                this.movePoints -= 2;
            }
        } else if (this.energyRemain < BODYPART_COST.work) {
            this.break = true;
        }
    }

    _addCarryPart(roadFlag) {
        if (this.energyRemain >= BODYPART_COST.carry) {
            logger.debug("Add a Carry part");
            this.templateResult.push(CARRY);
            this.energyRemain -= BODYPART_COST.carry;
            if (roadFlag) {
                this.movePoints -= 1;
            } else {
                this.movePoints -= 2;
            }
        } else {
            this.break = true;
        }
    }

    _addMovePart() {
        if (this.energyRemain >= BODYPART_COST.move) {
            logger.debug("Add a Move part");
            this.templateResult.push(MOVE);
            this.energyRemain -= BODYPART_COST.move;
            this.movePoints += 2;
        } else {
            this.break = true;
        }
    }
}

module.exports = Template;