const logger = require('utils.log').getLogger("Creep_TemplateGenerate");
const SYS_CONFIG = require('config.system.setting');
/**
 * Creep创建模板生成类
 * 用法：
 *     引入
 *        const creepTemplate = require('manager.creep.template').genTemplate(roomName);
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
        //在config文件中限制了全局最高能量消耗值（较config中传入的值优先级更低）
        template.energyRemain = Game.rooms[roomName].energyAvailable <= SYS_CONFIG.MAX_CREEP_ENERGY_CONSUM ? Game.rooms[roomName].energyAvailable : SYS_CONFIG.MAX_CREEP_ENERGY_CONSUM;
        return template;
    }

    getSelfAdaptionTemplate(config) {
        if (config && config.energyMax) {
            this.energyRemain = config.energyMax;
        }else if(!config){
            const config = ({roadFlag: false})
        }
        while (this.energyRemain > 0) {
            if (this.break) {
                break;
            }
            if (this.movePoints >= 1) {
                //已有的WORK部件数
                let workParts = this.templateResult.filter(part => part === WORK);
                //已有的CARRY部件数
                let carryParts = this.templateResult.filter(part => part === CARRY);
                if (workParts.length > carryParts.length) {
                    this._addCarryPart(config.roadFlag);
                } else {
                    this._addWorkPart(config.roadFlag);
                }
            } else {
                this._addMovePart();
            }
        }
        return this.templateResult;
    }

    getTemplateByConfig(config) {
        if (config.genMode === "Auto") {
            return this.getSelfAdaptionTemplate(config);
        }
        for (let i = 0; i < config.partsSet.length; i++) {
            for (let j = 0; j < config.partsSet[i][1]; j++) {
                this.templateResult.push(config.partsSet[i][0]);
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