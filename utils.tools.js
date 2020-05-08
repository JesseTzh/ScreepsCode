const logger = require('utils.log').getLogger("util.tool");

function llll(e){
    if(e == null){
        console.log("Test Function");
    }else{
        console.log(e);
    }
}

function debugRoomBlockBegin(roomName){
    logger.debug("---------------------------- Room "+ roomName + "----------------------------");
}

function debugRoomBlockEnd(){
    logger.debug("------------------------------------------------------------------");
}

module.exports = {
    llll:llll,
    debugRoomBlockBegin:debugRoomBlockBegin,
    debugRoomBlockEnd:debugRoomBlockEnd
};