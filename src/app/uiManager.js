var splashScreen = document.querySelector('#splash-screen');
var statusElement = document.querySelector('#status-cast');
const status = {
    LOADING: "Loading environment",
    READY: "Ready to cast"
}

function showSplashScreen() {
    splashScreen.classList.remove('hidden');
}

function hideSplashScreen() { 
    splashScreen.classList.add('hidden');
}

function setStatusCast(message) {
    statusElement.textContent = message;
}

export default {
    showSplashScreen : showSplashScreen,
    hideSplashScreen: hideSplashScreen,
    setStatusCast: setStatusCast,
    status: status
}


