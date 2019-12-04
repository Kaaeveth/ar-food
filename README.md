# AR-Food
Demoanwendung für die Seminararbeit "Einsatzmöglichkeiten von Augmented Reality in der Gastronomie"

Eine Live Version ist [hier](https://bofloos.de/ar-food/about) zu finden.

<img src="https://bofloos.de/static/img/demo_beispiel.png" width="200" height="400" />

Funktioniert noch nicht zu 100% mit Firefox

### Verwendete Bibliotheken

1. [AR.js](https://github.com/jeromeetienne/AR.js)
2. [nimiq QR-Code scanner](https://github.com/nimiq/qr-scanner)

# Installation

[Node.js](https://nodejs.org/en/download/) wird benötigt!

1. Mit git klonen oder einfach als Zip herunterladen

```
git clone https://github.com/Kaaeveth/ar-food.git
```

2. In das Verzeichnis wechseln, eine Konsole (cmd) öffnen und folgendes eingeben:

```
npm install
```

3. Zum Starten dann folgendes eingeben

```
npm start
```

Ein paar Hiro Marker sind im `static` Ordner mit enthalten

# Eigene Modelle hinzufügen

Zu jedem Modell gehört eine JSON-Datei, welche in den `models` Ordner muss.

Momentan werden nur Modelle im gltf-Format unterstützt.

Andere Formate müssen dahingehend konvertiert werden. Auch gltf-Modelle, welche nicht eingebettet sind.

Die Modelle können auch mit Draco komprimiert sein.

[gltf-pipeline](https://github.com/AnalyticalGraphicsInc/gltf-pipeline) aber auch [Blender](https://www.blender.org) bieten dafür Konvertierungsmöglichkeiten.

Ein Modell wird über ihre JSON-Datei aufgerufen.

Der Aufbau ist wiefolgt:

```json
{
    "model": "pfad/zu/model.gltf",
    "position": "",
    "scale": "",
    "rotation": ""
}
```

[![Bless](https://cdn.rawgit.com/LunaGao/BlessYourCodeTag/master/tags/alpaca.svg)](http://lunagao.github.io/BlessYourCodeTag/)
