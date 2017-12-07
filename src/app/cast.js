import castManager from './receiverManager'
import CastPlayer from './player'
import * as logger from 'loglevel'
import UIManager from './uiManager'
import Timer from './idleTimer'

import '../styles/player.css'

var mediaManager = null;
var castPlayer = new CastPlayer();

logger.setLevel(process.env.LOG_LEVEL);
UIManager.setStatusCast(UIManager.status.LOADING);

mediaManager = new cast.receiver.MediaManager(castPlayer);
mediaManager.origOnLoad = mediaManager.onLoad;
mediaManager.onLoad = function(e) {
    logger.info("MediaManager:onLoad", e);
    castPlayer.setAsset(e.data.media.customData);
    mediaManager.origOnLoad(e);
}

mediaManager.origPause = mediaManager.onPause;
mediaManager.onPause = function(e) {
    logger.info("MediaManager:onPause", e);
    Timer.setIdle(Timer.TIMEOUT.PAUSED);
    mediaManager.origPause(e);
}

mediaManager.origPlay = mediaManager.onPlay;
mediaManager.onPlay = function(e) {
    logger.info("MediaManager:onPlay", e);
    Timer.setIdle();
    mediaManager.origPlay(e);
}


castManager.start();