import { Button, ButtonBehavior } from "libraries/buttons";
import { FieldTemplate } from "libraries/utils";
import { SystemKeyboard } from "libraries/keyboard";

export var images = {};

// Load all of the images from the images directory
var imagesPath = mergeURI(application.url, "images/");
var info, iterator = new Files.Iterator(imagesPath);
while (info = iterator.getNext()) {
	let fullPath = imagesPath + info.path;
    if (Files.fileType == info.type) {
    	let imageName = info.path.substr(0, info.path.lastIndexOf('.'));
    	images[imageName] = fullPath;
    }
}

// Skins
export var sampleSkin = new Skin({ fill: "#FF6868", stroke: "#000000",
	borders: { left: 0, top: 0, right: 0, bottom: 1 }});
export let whiteSkin = new Skin ({fill: 'white'});
export let blueSkin = new Skin ({fill: '#3498db'});
export let greenSkin = new Skin ({fill: '#66cc66'});

// Styles
export var sampleStyle = new Style({ font: "bold 18px Arial", color: "black", horizontal: "left" });

//Texts
export var greenText = new Style({ font: "20px", color: "#66cc66" });
export var blackText3 = new Style({ font: "bold 18px arial", color: "black" });
export var blackText = new Style({ font: "bold 32px segoe script", color: "black" });
export var whiteText = new Style( { font: "20px", color: "white"});