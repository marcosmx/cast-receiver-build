const skin = {
    startScreen: {
        showPlayButton: true,
        showTitle: true,
        showDescription: true
    },
    pauseScreen: {
        showPauseIcon: true,
        showTitle: true,
        showDescription: true
    },
    endScreen: {
        screenToShowOnEnd: "default",
        showReplayButton: false,
        showTitle: true,
        showDescription: true
    },
    buttons : {
        desktopContent : [
            {"name":"playPause", "location":"controlBar", "whenDoesNotFit":"keep", "minWidth":45 },
            {"name":"live", "location":"controlBar", "whenDoesNotFit":"keep", "minWidth":45},
            {"name":"timeDuration", "location":"controlBar", "whenDoesNotFit":"drop", "minWidth":145 }
        ]
    }
};

export default skin;