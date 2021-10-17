navigator.mediaDevices.getUserMedia({ video: true }).catch((_) => {
    alert('An error has occurred: The camera could not be initialized... Please check your browser\'s permissions.');
});

const codeReader = new ZXing.BrowserQRCodeReader();
codeReader.decodeFromVideoDevice(null, 'video', (result, _) => {
    if (result) {
        if (result.text.substring(0, 5) === 'shc:/') {
            var shc = result.text.substring(5);
            window.location.href = '/card?shc=' + shc;
        }
    }
});