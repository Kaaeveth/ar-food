/*
    Hochschule Harz
    Fachbereich Automatisierung und Informatik

    Autor: Dominik Strutz
    Client-Logik für die AR-Code erkennung / Modell-Darstellung

    Wichtig: Damit der Qr-Code erkannt wird, muss er sehr nah vor der Kamera sein.

    Firefox erkennt noch keine QR-Codes (captureStream noch mit moz Präfix):
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/captureStream
*/

console.log('AR-Food v1.0');

//QR-Code scanner
import QrScanner from '/static/qr-scanner.min.js';
QrScanner.WORKER_PATH = '/static/qr-scanner-worker.min.js';

var entity = document.getElementById('entity');
var assets = document.getElementById('assets');
var popup = document.getElementById('popup');


//Marker-Found/Lost events müssen während des Ladens der Seite registriert werden
AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        marker.addEventListener('markerFound', function() {
            var markerId = marker.id;
            console.log('markerFound:', markerId);          
            
        });

        marker.addEventListener('markerLost', function() {
            var markerId = marker.id;
            console.log('markerLost:', markerId);
        });
    }
});

//Canvas für den QR-Code scanner
function drawCanvas(img) {
    //const canvas = document.getElementById('can');
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
    return canvas;
}

//Scannt nach QR-Code
function scanQR(){
    var track = document.getElementById('arjs-video').captureStream().getVideoTracks()[0];
    new ImageCapture(track).grabFrame().then(result => {

        QrScanner.scanImage(drawCanvas(result))
        .then(qrResult => {
            console.log('QR-Code found:', qrResult);
            loadModel(qrResult);
        })
        .catch(err => {/* console.warn(err) */});
    })
    .catch(err => console.error(err));
}

//lädt Modelldaten vom Server oder vom DOM
function loadModel(qrcode){
    var url = new URL(qrcode);
    var model = url.searchParams.get('m');

    if(model !== undefined){

        //Dies zu pruefen ist in dem Fall redundant, da A-Frame bereits geladene Dateien nicht nochmal fetched.
        //Der Vollständigkeitshalber wird es allerdings trotzdem gemacht.
        var domModel = document.getElementById(model);
        if(domModel){
            console.log('Model in dom', domModel.id);

            setModel(domModel);
        }
        else {
            
            var newAsset = document.createElement('a-asset-item');

            //Neues Model vom Server laden
            fetch('/static/models/'+model+'.json').then(res => {
                res.json().then(json => {
                    console.log('Received modeldata', json);

                    newAsset.id = model;
                    newAsset.setAttribute('src', json.model);
                    newAsset.setAttribute('data-scale', json.scale);
                    newAsset.setAttribute('data-position', json.position);
                    newAsset.setAttribute('data-rotation', json.rotation);

                    assets.appendChild(newAsset);
                    setModel(newAsset);
                })
                .catch(err => console.error('json error', err));
            })
            .catch(err => {
                console.warn('Error receiving modeldata', err);
                notifyPopup('Error receiving modeldata');
            });
        }
    }
}

//Aktualisiert das projizierte Model
function setModel(asset){
    var modelPath = asset.getAttribute('src');
    var rotObj = AFRAME.utils.coordinates.parse(asset.getAttribute('data-rotation'));

    entity.setAttribute('gltf-model', modelPath);
    entity.setAttribute('scale', asset.getAttribute('data-scale'));
    entity.setAttribute('position', asset.getAttribute('data-position'));
    entity.object3D.rotation.set(THREE.Math.degToRad(rotObj.x), THREE.Math.degToRad(rotObj.y), THREE.Math.degToRad(rotObj.z));
    entity.flushToDOM();

    notifyPopup('Model wird geladen');
}

function notifyPopup(msg){
    popup.innerHTML = msg;
    popup.style.display = 'block';

    setTimeout(() => popup.style.display = 'none', 2000);
}

window.addEventListener('load', () => {

    var model = document.getElementsByTagName('a-asset-item')[0];
    var modelSrc = model.getAttribute('src');
    var ruler = document.getElementById('ruler');

    document.getElementById('rulerCheck').addEventListener('change', function() {
        ruler.setAttribute('visible', this.checked);
    });

    if(modelSrc == '' || !modelSrc){
        document.getElementById('placeholder').setAttribute('value', 'Kein Model');
        console.warn('no model');
    }

    model.addEventListener('timeout', () => {
        console.warn('assets timeout');
        alert('assets timeout');
    });

    //Kontinuierliches scannen von QR-Codes 
    setInterval(() => {
        if(!document.hidden)
            scanQR();
    }, 2000);

});

window.addEventListener('camera-init', (data) => {
    console.log('camera-init', data);
});

window.addEventListener('camera-error', data => {
    console.error('camera-error', data);
});
