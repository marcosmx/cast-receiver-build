import * as logger from 'loglevel'
import castManager from './receiverManager'

const timeout = {
    PAUSED: 1000 * 60 * 2, // 5 minutes
    IDLE: 1000 * 60 * 10 // 5 minutes
};

var idleTimerId = null;

function setIdle (time) {
    logger.info(LOG_PREFIX, 'Idle timeout:', time);
    clearTimeout(idleTimerId);
    if (time) {
        idleTimerId = setTimeout(()=>{
            castManager.stop();
        }, time)
    }
};

export default {
    setIdle : setIdle,
    TIMEOUT : timeout
}