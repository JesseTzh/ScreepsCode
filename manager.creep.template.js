const logger = require('utils.log').getLogger("manager.creep.template");
const SYS_CONFIG = require('config.system.setting');
/**
 * Creep创建模板生成类
 * 用法：
 *     引入
 *        const creepTemplate = require('manager.creep.template').genTemplate(roomName);
 *     参数
 *        roadFlag: 是否按照已铺好Road的情况生成Creep
 *        MAX_CREEP_ENERGY_CONSUM: 制造Creep最高能量消耗值
 *     使用默认模板(WORK与CARRY等量生成)
 *        creepTemplate.getDefaultTemplate();
 *     Mover模板(只有CARRY与MOVE部件)
 *        creepTemplate.getMoverTemplate();
 *     Worker模板 2 Carry + 10 Work,避免采集溢出
 *        creepTemplate.getWorkerTemplate();
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
        template._addMovePart();
        return template;
    }

    getDefaultTemplate(roadFlag) {
        while (this.energyRemain > 0) {
            if (this.break) {
                break;
            }
            if (this.movePoints >= 1) {
                //已有的WORK部件数
                var workParts = this.templateResult.filter(part => part == WORK);
                //已有的CARRY部件数
                var carryParts = this.templateResult.filter(part => part == CARRY);
                if (workParts.length > carryParts.length) {
                    this._addCarryPart(roadFlag);
                } else {
                    this._addWorkPart(roadFlag);
                }
            } else {
                this._addMovePart();
            }
        }
        return this.templateResult;
    }

    getOuterWorkTemplate(roadFlag) {
        this._addCarryPart(roadFlag);
        this._addCarryPart(roadFlag);
        this._addWorkPart(roadFlag);
        return this.templateResult;
    }

    getOrderTemplate(roadFlag) {
        this._addClaimPart(roadFlag);
        this._addClaimPart(roadFlag);
        this._addMovePart();
        this._addMovePart();
        return this.templateResult;
    }

    getWorkerTemplate(roadFlag) {
        this._addCarryPart(roadFlag);
        this._addCarryPart(roadFlag);
        while (this.energyRemain > 0) {
            logger.debug("Now energy remain:" + this.energyRemain);
            if (this.break || this.templateResult.filter(part => part == WORK).length == 10) {
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

    getUpgraderTemplate(roadFlag) {
        this.energyRemain = 2000;
        this._addCarryPart(roadFlag);
        this._addCarryPart(roadFlag);
        while (this.energyRemain > 0) {
            logger.debug("Now energy remain:" + this.energyRemain);
            if (this.break || this.templateResult.filter(part => part == WORK).length == 15) {
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
        this.energyRemain = 1000;
        while (this.energyRemain > 0) {
            logger.debug("Now energy remain:" + this.energyRemain);
            if (this.break || this.templateResult.filter(part => part == CARRY) == 10) {
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
        if (this.energyRemain >= BODYPART_COST.work) {
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

    _addClaimPart(roadFlag) {
        if (this.energyRemain >= BODYPART_COST.claim) {
            logger.debug("Add a Claim part");
            this.templateResult.push(CLAIM);
            this.energyRemain -= BODYPART_COST.claim;
            if (roadFlag) {
                this.movePoints -= 1;
            } else {
                this.movePoints -= 2;
            }
        } else {
            this.break = true;
        }
    }
}

module.exports = Template;