import castManager from './receiverManager'
import CastPlayer from './player'
import * as logger from 'loglevel'
import UIManager from './uiManager'

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

castManager.start();