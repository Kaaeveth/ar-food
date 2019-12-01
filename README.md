# AR-Food
Demoanwendung für die Seminararbeit "Einsatzmöglichkeiten von Augmented Reality in der Gastronomie"

Eine Live Version ist [hier](https://bofloos.de/ar-food/about) zu finden.

# Installation

[Node.js](https://nodejs.org/en/download/) wird benötigt!

1. Mit git klonen oder einfach als Zip herunterladen

`git clone https://github.com/Kaaeveth/ar-food.git`

2. In das Verzeichnis wechseln, eine Konsole (cmd) öffnen und folgendes eingeben:

`npm install`

3. Zum starten dann folgendes eingeben

`npm start`

Ein paar Hiro Marker sind im `static` Ordner mit enthalten

# Eigene Modelle hinzufügen

Zu jedem Modell gehört eine JSON-Datei, welche in den `models` Ordner muss.

Momentan werden nur Modelle im gltf-Format unterstützt.

Andere Formate müssen dahingegend konvertiert werden. Auch gltf-Modelle, welche nicht eingebettet sind.

[Blender](https://www.blender.org) bietet dafür Konvertierungsmöglichkeiten.

Das Modell wird über diese Datei aufgerufen.

Der Aufbau ist wiefolgt:

```json
{
    "model": "pfad/zu/model.gltf",
    "position": "0 0 0",
    "scale": "0 0 0",
    "rotation": "0 0 0"
}
```

[![Bless](https://cdn.rawgit.com/LunaGao/BlessYourCodeTag/master/tags/alpaca.svg)](http://lunagao.github.io/BlessYourCodeTag/)
