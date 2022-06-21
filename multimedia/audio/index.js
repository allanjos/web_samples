let recordButton = null;
let stopButton = null;
let audioPlayer = null;
let playButton = null;
let chunks = [];

async function init() {
    console.log('init()');

    // Initialize UI controls

    recordButton = document.getElementById('recordButton');
    stopButton = document.getElementById('stopButton');
    audioPlayer = document.getElementById('player');
    playButton = document.getElementById('playerButton')

    playButton.disabled = true;

    playButton.onclick = function () {
        playStart();
    }

    // Audio player setup

    audioPlayer.onloadstart = function () {
        console.log('audioPlayer.onloadstart()');
    }

    audioPlayer.loadedmetadata = function () {
        console.log('audioPlayer.loadedmetadata()');
    }

    audioPlayer.oncanplay = function (event)  {
        console.log('audioPlayer.oncanplay()');
    };

    audioPlayer.onreadystatechange = function () {
        console.log('audioPlayer.onreadystatechange()');
    };

    audioPlayer.ondurationchange = function () {
        console.log('audioPlayer.ondurationchange()');
    };

    audioPlayer.onplay = function () {
        console.log('audioPlayer.onplay()');
    };

    audioPlayer.onprogress = function () {
        console.log('audioPlayer.onprogress()');
    };

    audioPlayer.onended = function () {
        console.log('audioPlayer.onended()');
    };

    audioPlayer.controls = true;

    // Execution flow //

    // Enumerate devices

    enumerateDevices();

    // Get user media (audio only)

    getMedia({ audio: true });
}

/**
 * Enumerate devices.
 */
async function enumerateDevices() {
    console.log('enumerateDevices()');

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
    }

    // List cameras and microphones.

    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device) {
                console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            });
        })
        .catch(function(err) {
            console.log(err.name + ": " + err.message);
        });
}

/**
 * Get user media.
 */
async function getMedia(constraints) {
    console.log(`getMedia(${constraints})`);

    let stream = null;

    try {
        //stream = await navigator.mediaDevices.getUserMedia(constraints);

        stream = await navigator.mediaDevices.getUserMedia(constraints).then(onMediaSuccess, onMediaError);

        console.log('getUserMedia() Ok');
    } catch (err) {
        console.error('getUserMedia error');

        console.error('getUserMedia() error: ', err);
    }
}

const playStart = () => {
    console.log('playStart()');

    stopButton.disabled = false;

    audioPlayer.play();
};

/**
 * On success callback.
 */
const onMediaSuccess = function(stream) {
    console.log('onMediaSuccess()');

    const mediaRecorder = new MediaRecorder(stream);

    recordButton.onclick = function () {
        recordStart();
    }

    stopButton.onclick = function () {
        recordStop();
    }

    const recordStart = () => {
        console.log("recordStart()");

        audioPlayer.pause();

        mediaRecorder.start();

        console.log(mediaRecorder.state);

        stopButton.disabled = false;
        recordButton.disabled = true;
        playButton.disabled = true;
    }

    const recordStop = () => {
        console.log('recordStop()');

        mediaRecorder.stop();
        audioPlayer.pause();

        console.log(mediaRecorder.state);
        console.log("recorder stopped");

        // mediaRecorder.requestData();

        stopButton.disabled = true;
        recordButton.disabled = false;
    };

    mediaRecorder.onstop = function (e) {
        console.log('mediaRecorder.onstop');

        // Create a blob with audio chunks

        const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });

        chunks = [];

        // Feed audio player

        const audioURL = window.URL.createObjectURL(blob);

        audioPlayer.src = audioURL;

        playButton.disabled = false;
    }

    mediaRecorder.ondataavailable = function (e) {
        console.log('mediaRecorder.ondataavailable()');

        chunks.push(e.data);
    }
};

/**
 * On error callback.
 */
let onMediaError = function(err) {
    console.log('onMediaError() The following error occured:', err);
};

init();