import castManager from './receiverManager'
import * as logger from 'loglevel'
import UIManager from './uiManager'
import skin from './skin'

const CASTNAMESPACE = 'urn:x-cast:ooyala';
const PLAYERNAMESPACE = 'chromecast';
const LOG_PREFIX = 'Player:';

class CastPlayer {
    constructor() {
        this.OOPlayer = null;
        this.elementId = null;
        this.endedCallback = null;
        this.errorCallback = null;
        this.loadCallback = null;
        this.idleTimerId = null;
        this.skinInstance = null;
        this.ec = null;
        this.mb = null;
        this.setMessageBus();
        this.state = cast.receiver.media.PlayerState.IDLE;
        this.playhead = {};
        this.params = {
            onCreate : this.onCreateHandlers.bind(this),
            autoplay: true,
            skin : {
                inline: skin
            }
        }
    }

    setAsset(data) {
        logger.debug(LOG_PREFIX, "New asset params:", data);
        this.ec = data.ec || null;
        if (typeof data.params === 'string'){
            logger.warn(LOG_PREFIX, "Params are not a proper JSON object:", data.params);
            try {
                // TODO: Once PBA fixes the issue with params as strings, please change this line to JSON.parse method
                data.params = eval( "(" + data.params + ")");
            } catch (e) {
                logger.error(LOG_PREFIX, "Cannot parse params:", e);
            }
        }
        this.params = Object.assign({}, this.params, data.params);
        logger.info(LOG_PREFIX, "Asset params:", this.params);
    }

    setMessageBus(){
        this.mb = castManager.getCastMessageBus(CASTNAMESPACE, cast.receiver.CastMessageBus.MessageType.JSON);
        this.mb.onMessage = this.getMessageHandler.bind(this);
    }

    getMessageHandler(e) {
        logger.info(LOG_PREFIX,"MessageBus Action:", e.data.action);
        switch (e.data.action) {
            case "setCCLanguage":
                this.setClosedCaptions(e.data.data);
                break;
            case "getstatus":
                var status = {
                    state: this.OOPlayer.getState(),
                    playhead: this.playhead,
                    embed: this.OOPlayer.getEmbedCode()
                }
                logger.info(LOG_PREFIX,'MessageBus status:', status);
                this.mb.send(e.senderId, status);
                break;
            case "error":
                logger.error(LOG_PREFIX,"MessageBus Sender Error:", e.data.message);
                break;
        }
    }

    // Load receiver the following params: contentId, autoplay, opt_time, opt_tracksInfo, opt_onlyLoadTracks
    // but they are not used with player v4
    load() {
        UIManager.hideSplashScreen();
        if (!this.OOPlayer) {
            this.OOPlayer = OO.Player.create('player', this.ec, this.params);
        } else {
            if (this.OOPlayer.getEmbedCode() === this.ec) {
                this.OOPlayer.mb.publish(OO.EVENTS.REPLAY);
            } else {
                this.OOPlayer.setEmbedCode(this.ec, this.params);
            }
        }        
    }

    editTracksInfo() {
        // This method was not implemented since this behaviour is not supported at this moment
    }

    getCurrentTimeSec() {
        return (this.OOPlayer) ? this.OOPlayer.getPlayheadTime() : null;
    }

    getDurationSec() {
        return (this.OOPlayer) ? this.OOPlayer.getDuration() : null;
    }

    setClosedCaptions(lang) {
        if (lang === '' || !lang) {
            lang = 'none';
        }
        logger.info(LOG_PREFIX, "Closed captions new value:", lang);
        this.OOPlayer.setClosedCaptionsLanguage(lang);
    }

    getState() {
        if (this.OOPlayer) {
            switch (this.OOPlayer.getState()) {
                case OO.STATE.LOADING:
                case OO.STATE.BUFFERING:
                    this.state = cast.receiver.media.PlayerState.BUFFERING;
                    break;
                case OO.STATE.PLAYING:
                    this.state = cast.receiver.media.PlayerState.PLAYING;
                    break;
                case OO.STATE.PAUSED:
                    this.state = cast.receiver.media.PlayerState.PAUSED;
                    break;
                case OO.STATE.READY:
                    this.state = cast.receiver.media.PlayerState.IDLE;
                break;
            }
        }
        logger.info(LOG_PREFIX,"State:", this.state);
        return this.state;
    }

    play() {
        this.OOPlayer.play();
    }

    pause() {
        this.OOPlayer.pause();
    }

    reset() {
        // this method was not implemented since it is not needed, but it's required by
        // cast player interface
    }

    seek(time) {
        this.OOPlayer.seek(time);
    }

    setVolume(volume) {
        this.OOPlayer.setVolume(volume.level);
    }

    getVolume() {
        var volume = new cast.receiver.media.Volume();
        volume.level = this.OOPlayer.getVolume();
        volume.muted = false;
        logger.info(LOG_PREFIX,'Volume:', volume);
        return volume;
    }

    registerEndedCallback(endedCallback) {
        this.endedCallback = endedCallback;
    }

    registerErrorCallback(errorCallback) {
        this.errorCallback = errorCallback;
    }

    registerLoadCallback(loadCallback) {
       this.loadCallback = loadCallback;
    }   

    unregisterEndedCallback() {
        this.endedCallback = null;
    }

    unregisterErrorCallback() {
        this.errorCallback = null;
    }
    
    unregisterLoadCallback() {
        this.loadCallback = null;
    }

    onCreateHandlers (player) {  
        player.mb.subscribe(OO.EVENTS.PLAYBACK_READY, PLAYERNAMESPACE, this.onPlaybackReady.bind(this));
        player.mb.subscribe(OO.EVENTS.PLAYING, PLAYERNAMESPACE, this.notifySenders.bind(this));
        player.mb.subscribe(OO.EVENTS.PLAYHEAD_TIME_CHANGED, PLAYERNAMESPACE, this.onPlayheadChanged.bind(this));
        player.mb.subscribe(OO.EVENTS.PLAYED, PLAYERNAMESPACE, this.onPlayed.bind(this));
        player.mb.subscribe(OO.EVENTS.SEEK, PLAYERNAMESPACE, this.notifySenders.bind(this));
        player.mb.subscribe(OO.EVENTS.SEEKED, PLAYERNAMESPACE, this.onSeeked.bind(this));
        player.mb.subscribe(OO.EVENTS.PAUSED, PLAYERNAMESPACE, this.notifySenders.bind(this));
        player.mb.subscribe(OO.EVENTS.ERROR, PLAYERNAMESPACE, this.onError.bind(this));
        player.mb.subscribe(OO.EVENTS.API_ERROR, PLAYERNAMESPACE, this.onApiError.bind(this));
    }

    notifySenders() {
        let message = Object.assign({}, arguments);
        this.mb.broadcast(message);
    }

    onSeeked(event, time) {
        // if the player is in PAUSE state then try to update the scrubber bar to the
        // actual time
        var skin = this.OOPlayer.modules.find((m) => {return m.name == "Html5Skin";});
        try {
            if (skin){
                skin.instance.updateSeekingPlayhead(time);
            }
        } catch (e) {
            logger.warn(LOG_PREFIX, "Skin instance error:", e);
        }
        this.notifySenders.apply(this, arguments);
    }

    onPlaybackReady() {
        if (this.loadCallback !== null){
            this.loadCallback();
        }
    }

    onPlayheadChanged() {
        this.playhead = arguments;
        this.notifySenders.apply(this, arguments);
    }

    onPlayed() {
        UIManager.setStatusCast(UIManager.status.READY);
        UIManager.showSplashScreen();
        if (this.endedCallback !== null) {
            this.endedCallback();
        }
        this.notifySenders.apply(this, arguments);       
    }

    onError(e, error) {
        if (this.errorCallback !== null) {
            this.errorCallback();
        }
        logger.error(LOG_PREFIX, 'Error:', error);
    }

    onApiError (e, code, message, url) {
        if (this.errorCallback !== null) {
            this.errorCallback();
        }
        logger.error(LOG_PREFIX, 'API Error:', code, message, url);
    }

};


export default CastPlayer;