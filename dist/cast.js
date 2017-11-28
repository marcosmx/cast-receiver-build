!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){var r,a;!function(o,i){"use strict";void 0!==(a="function"==typeof(r=i)?r.call(t,n,t,e):r)&&(e.exports=a)}(0,function(){"use strict";function e(e,t){var n=e[t];if("function"==typeof n.bind)return n.bind(e);try{return Function.prototype.bind.call(n,e)}catch(t){return function(){return Function.prototype.apply.apply(n,[e,arguments])}}}function t(e,t){for(var n=0;n<i.length;n++){var r=i[n];this[r]=n<e?a:this.methodFactory(r,e,t)}this.log=this.debug}function n(n,r,i){return function(t){return"debug"===t&&(t="log"),typeof console!==o&&(void 0!==console[t]?e(console,t):void 0!==console.log?e(console,"log"):a)}(n)||function(e,n,r){return function(){typeof console!==o&&(t.call(this,n,r),this[e].apply(this,arguments))}}.apply(this,arguments)}function r(e,r,a){function s(){var e;if(typeof window!==o){try{e=window.localStorage[u]}catch(e){}if(typeof e===o)try{var t=window.document.cookie,n=t.indexOf(encodeURIComponent(u)+"=");-1!==n&&(e=/^([^;]+)/.exec(t.slice(n))[1])}catch(e){}return void 0===c.levels[e]&&(e=void 0),e}}var l,c=this,u="loglevel";e&&(u+=":"+e),c.name=e,c.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},c.methodFactory=a||n,c.getLevel=function(){return l},c.setLevel=function(n,r){if("string"==typeof n&&void 0!==c.levels[n.toUpperCase()]&&(n=c.levels[n.toUpperCase()]),!("number"==typeof n&&n>=0&&n<=c.levels.SILENT))throw"log.setLevel() called with invalid level: "+n;if(l=n,!1!==r&&function(e){var t=(i[e]||"silent").toUpperCase();if(typeof window!==o){try{return void(window.localStorage[u]=t)}catch(e){}try{window.document.cookie=encodeURIComponent(u)+"="+t+";"}catch(e){}}}(n),t.call(c,n,e),typeof console===o&&n<c.levels.SILENT)return"No console available for logging"},c.setDefaultLevel=function(e){s()||c.setLevel(e,!1)},c.enableAll=function(e){c.setLevel(c.levels.TRACE,e)},c.disableAll=function(e){c.setLevel(c.levels.SILENT,e)};var f=s();null==f&&(f=null==r?"WARN":r),c.setLevel(f,!1)}var a=function(){},o="undefined",i=["trace","debug","info","warn","error"],s=new r,l={};s.getLogger=function(e){if("string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=l[e];return t||(t=l[e]=new r(e,s.getLevel(),s.methodFactory)),t};var c=typeof window!==o?window.log:void 0;return s.noConflict=function(){return typeof window!==o&&window.log===s&&(window.log=c),s},s.getLoggers=function(){return l},s})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=document.querySelector("#splash-screen"),a=document.querySelector("#status-cast");t.default={showSplashScreen:function(){r.classList.remove("hidden")},hideSplashScreen:function(){r.classList.add("hidden")},setStatusCast:function(e){a.textContent=e},status:{LOADING:"Loading environment",READY:"Ready to cast"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),a=function(e){return e&&e.__esModule?e:{default:e}}(n(1)),o="ReceiverManager:",i=cast.receiver.CastReceiverManager.getInstance();i.onSenderConnected=function(e){var t=i.getSenders();r.info(o,"Connected Senders:",t)},i.onSenderDisconnected=function(e){var t=i.getSenders();r.log(o,"Sender disconnected:",e),0===t.length&&e.reason===cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER&&i.stop()},i.onReady=function(){a.default.setStatusCast(a.default.status.READY)},t.default=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=r(n(2)),o=r(n(4)),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),s=r(n(1));n(6);var l=null,c=new o.default;i.setLevel("WARN"),s.default.setStatusCast(s.default.status.LOADING),(l=new cast.receiver.MediaManager(c)).origOnLoad=l.onLoad,l.onLoad=function(e){i.info("MediaManager:onLoad",e),c.setAsset(e.data.media.customData),l.origOnLoad(e)},a.default.start()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=r(n(2)),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),s=r(n(1)),l=r(n(5)),c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.OOPlayer=null,this.elementId=null,this.endedCallback=null,this.errorCallback=null,this.loadCallback=null,this.ec=null,this.params={onCreate:this.onCreateHandlers.bind(this),autoplay:!0,skin:{inline:l.default}},this.mb=null,this.setMessageBus(),this.state=cast.receiver.media.PlayerState.IDLE,this.playhead={}}return a(e,[{key:"setAsset",value:function(e){if(i.debug("Player:","New asset params:",e),this.ec=e.ec||null,"string"==typeof e.params){i.warn("Player:","Params are not JSON object:",e.params);try{e.params=JSON.parse(e.params)}catch(e){i.error("Player:","Cannot parse params:",e)}}this.params=Object.assign({},this.params,e.params),i.info("Player:","Asset params:",this.params)}},{key:"setMessageBus",value:function(){this.mb=o.default.getCastMessageBus("urn:x-cast:ooyala",cast.receiver.CastMessageBus.MessageType.JSON),this.mb.onMessage=this.getMessageHandler.bind(this)}},{key:"getMessageHandler",value:function(e){switch(i.info("Player:","MessageBus Action:",e.data.action),e.data.action){case"setCCLanguage":this.setClosedCaptions(e.data.data);break;case"getstatus":var t={state:this.OOPlayer.getState(),playhead:this.playhead,embed:this.OOPlayer.getEmbedCode()};i.info("Player:","MessageBus status:",t),this.mb.send(e.senderId,t);break;case"error":i.error("Player:","MessageBus Sender Error:",e.data.message)}}},{key:"load",value:function(){s.default.hideSplashScreen(),this.OOPlayer?this.OOPlayer.getEmbedCode()===this.ec?this.OOPlayer.mb.publish(OO.EVENTS.REPLAY):this.OOPlayer.setEmbedCode(this.ec,this.params):this.OOPlayer=OO.Player.create("player",this.ec,this.params)}},{key:"editTracksInfo",value:function(){}},{key:"getCurrentTimeSec",value:function(){return this.OOPlayer?this.OOPlayer.getPlayheadTime():null}},{key:"getDurationSec",value:function(){return this.OOPlayer?this.OOPlayer.getDuration():null}},{key:"setClosedCaptions",value:function(e){""!==e&&e||(e="none"),i.info("Player:","Closed captions new value:",e),this.OOPlayer.setClosedCaptionsLanguage(e)}},{key:"getState",value:function(){if(this.OOPlayer)switch(this.OOPlayer.getState()){case OO.STATE.LOADING:case OO.STATE.BUFFERING:this.state=cast.receiver.media.PlayerState.BUFFERING;break;case OO.STATE.PLAYING:this.state=cast.receiver.media.PlayerState.PLAYING;break;case OO.STATE.PAUSED:this.state=cast.receiver.media.PlayerState.PAUSED;break;case OO.STATE.READY:this.state=cast.receiver.media.PlayerState.IDLE}return i.info("Player:","State:",this.state),this.state}},{key:"play",value:function(){this.OOPlayer.play()}},{key:"pause",value:function(){this.OOPlayer.pause()}},{key:"reset",value:function(){}},{key:"seek",value:function(e){this.OOPlayer.seek(e)}},{key:"setVolume",value:function(e){this.OOPlayer.setVolume(e.level)}},{key:"getVolume",value:function(){var e=new cast.receiver.media.Volume;return e.level=this.OOPlayer.getVolume(),e.muted=!1,i.info("Player:","Volume:",e),e}},{key:"registerEndedCallback",value:function(e){this.endedCallback=e}},{key:"registerErrorCallback",value:function(e){this.errorCallback=e}},{key:"registerLoadCallback",value:function(e){this.loadCallback=e}},{key:"unregisterEndedCallback",value:function(){this.endedCallback=null}},{key:"unregisterErrorCallback",value:function(){this.errorCallback=null}},{key:"unregisterLoadCallback",value:function(){this.loadCallback=null}},{key:"onCreateHandlers",value:function(e){e.mb.subscribe(OO.EVENTS.PLAYBACK_READY,"chromecast",this.onPlaybackReady.bind(this)),e.mb.subscribe(OO.EVENTS.PLAYING,"chromecast",this.notifySenders.bind(this)),e.mb.subscribe(OO.EVENTS.PLAYHEAD_TIME_CHANGED,"chromecast",this.onPlayheadChanged.bind(this)),e.mb.subscribe(OO.EVENTS.PLAYED,"chromecast",this.onPlayed.bind(this)),e.mb.subscribe(OO.EVENTS.SEEK,"chromecast",this.notifySenders.bind(this)),e.mb.subscribe(OO.EVENTS.SEEKED,"chromecast",this.notifySenders.bind(this)),e.mb.subscribe(OO.EVENTS.PAUSED,"chromecast",this.notifySenders.bind(this)),e.mb.subscribe(OO.EVENTS.ERROR,"chromecast",this.onError.bind(this)),e.mb.subscribe(OO.EVENTS.API_ERROR,"chromecast",this.onApiError.bind(this))}},{key:"notifySenders",value:function(){var e=Object.assign({},arguments);this.mb.broadcast(e)}},{key:"onPlaybackReady",value:function(){null!==this.loadCallback&&this.loadCallback()}},{key:"onPlayheadChanged",value:function(){this.playhead=arguments,this.notifySenders.apply(this,arguments)}},{key:"onPlayed",value:function(){s.default.setStatusCast(s.default.status.READY),s.default.showSplashScreen(),null!==this.endedCallback&&this.endedCallback(),this.notifySenders.apply(this,arguments)}},{key:"onError",value:function(e,t){null!==this.errorCallback&&this.errorCallback(),i.error("Player:","Error:",t)}},{key:"onApiError",value:function(e,t,n,r){null!==this.errorCallback&&this.errorCallback(),i.error("Player:","API Error:",t,n,r)}}]),e}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={startScreen:{showPlayButton:!0,showTitle:!0,showDescription:!0},pauseScreen:{showPauseIcon:!0,showTitle:!0,showDescription:!0},endScreen:{screenToShowOnEnd:"default",showReplayButton:!1,showTitle:!0,showDescription:!0},buttons:{desktopContent:[{name:"playPause",location:"controlBar",whenDoesNotFit:"keep",minWidth:45},{name:"live",location:"controlBar",whenDoesNotFit:"keep",minWidth:45},{name:"timeDuration",location:"controlBar",whenDoesNotFit:"drop",minWidth:145}]}}},function(e,t,n){var r=n(7);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0};a.transform=void 0,n(9)(r,a),r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(8)(void 0)).push([e.i,"body{background-color:#000}#splash-screen img{width:50%}.fbox-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.fs{width:100%;height:100vh}#status-cast{color:#999;margin-top:20px;font-size:20px}.hidden{display:none}.oo-blur{-webkit-filter:none!important;-moz-filter:none!important;filter:none!important}",""])},function(e,t){function n(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r);return[n].concat(r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"})).concat([a]).join("\n")}return[n].join("\n")}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];"number"==typeof o&&(r[o]=!0)}for(a=0;a<e.length;a++){var i=e[a];"number"==typeof i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],a=f[r.id];if(a){for(a.refs++,i=0;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(c(r.parts[i],t))}else{for(var o=[],i=0;i<r.parts.length;i++)o.push(c(r.parts[i],t));f[r.id]={id:r.id,refs:1,parts:o}}}}function a(e,t){for(var n=[],r={},a=0;a<e.length;a++){var o=e[a],i=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function o(e,t){var n=h(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=v[v.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),v.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var a=h(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,a)}}function i(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function s(e){var t=document.createElement("style");return e.attrs.type="text/css",l(t,e.attrs),o(e,t),t}function l(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function c(e,t){var n,r,a,c;if(t.transform&&e.css){if(!(c=t.transform(e.css)))return function(){};e.css=c}if(t.singleton){var f=y++;n=p||(p=s(t)),r=u.bind(null,n,f,!1),a=u.bind(null,n,f,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(t,e.attrs),o(e,t),t}(t),r=function(e,t,n){var r=n.css,a=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&a;(t.convertToAbsoluteUrls||o)&&(r=b(r)),a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var i=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,t),a=function(){i(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=function(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),a=function(){i(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}function u(e,t,n,r){var a=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,a);else{var o=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}var f={},d=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),h=function(e){var t={};return function(e){if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),p=null,y=0,v=[],b=n(10);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=d()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=a(e,t);return r(n,t),function(e){for(var o=[],i=0;i<n.length;i++){var s=n[i];(l=f[s.id]).refs--,o.push(l)}for(e&&r(a(e,t),t),i=0;i<o.length;i++){var l=o[i];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete f[l.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(a))return e;var o;return o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}}]);
//# sourceMappingURL=cast.js.map