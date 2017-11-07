import * as logger from 'loglevel'
import UIManager from './uiManager'

const LOG_PREFIX = 'ReceiverManager:';

var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

castReceiverManager.onSenderConnected = onSenderConnected;
castReceiverManager.onSenderDisconnected = onSenderDisconnected;
castReceiverManager.onReady = onReady;

function onReady() {
    UIManager.setStatusCast(UIManager.status.READY);
}

function onSenderConnected(e) {
    var senders = castReceiverManager.getSenders();
    logger.info(LOG_PREFIX,"Connected Senders:", senders);
}

function onSenderDisconnected(e) {
    var senders = castReceiverManager.getSenders();
    logger.log(LOG_PREFIX,"Sender disconnected:", e);
    if (senders.length === 0 && e.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        castReceiverManager.stop();
    }
}

export default castReceiverManager;


