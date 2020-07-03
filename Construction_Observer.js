const logger = require('utils.log').getLogger("Observer");

function observerWork(obTargetRoomName, observerId) {
    const observer = Game.getObjectById(observerId);
    if(observer){
        const result = observer.observeRoom(obTargetRoomName);
        if(result != OK){
            logger.error("房间["+ obTargetRoomName + "]侦测出错，请检查！");
        }
    }else{
        logger.error("["+ observerId + "]出错，请检查！");
    }
}

module.exports = {
    observerWork: observerWork
};