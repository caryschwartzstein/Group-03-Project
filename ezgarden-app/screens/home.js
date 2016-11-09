import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as notifications from 'notifications';
import * as plantSeed from 'plant_seed';

// STYLES
let graySkin = new Skin({ fill: '#C4C4C4' });       // Gray notification from Figma
let whiteSkin = new Skin({ fill: 'white' });
let appSkin = new Skin({ fill: '#F2F2F2' });        // Gray background color from Figma
let topSkin = new Skin({ fill: '#6FCF97' });        // Green header color from Figma
// let popupSkin = new Skin({ fill: "#ff5656", borders: {left: 1, right: 1, top: 1, bottom: 1}, stroke: "#ff5656")};
let greenText = new Style({ font: "bold 28px segoe script", color: '#66cc66' });
let blackText = new Style({ font: "bold 32px segoe script", color: "black" });
let blackText2 = new Style({ font: "16px arial", color: "black" });
let blackText3 = new Style({ font: "18px arial", color: "black" });
let grayText = new Style({ font: "18px arial", color: "#757575" });
let redText = new Style({ font: "bold 24px arial", color: "red" });
let whiteText = new Style({ font: "22px arial", color: "white" });
let titleText = new Style({ font: "28px segoe script", color: "white" });

// TEMPLATES
var StringTemplate = Text.template($ => ({
    left: 10, right: 10, top: 10, bottom: 0,
    style: $.style,
    string: $.string
}));

export var Garden = Column.template($ => ({
	name: 'garden',
	left: 0, right: 0, top: 0, height: 150,
	skin: whiteSkin,
	contents: [
		new Label({ name: "label", top: 0, left: 20, height: 30, style: grayText, string: $.string }),
		new Line({
			name: "line", left: 0, right: 0, height: 50,
		}),
	]
}));

export var PlantButton = Container.template($ => ({
    active: true, top: 10, left: 0, right: 0, height: $.height, width: $.width,
    behavior: Behavior({
        onTouchEnded: function(content) {
        	$.nextScreenFunc();
        },
    }),
   contents: [
        new Picture({
            top: $.top, left: $.left, height: $.height,
            url: $.url
        })
   ]
}));

/* SCREENS */
var HomeScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new assets.Header({
			string: "My Garden",
			rightElement: new assets.NavButton({ style: redText, string: "1", nextScreenFunc: screenUtils.showNotifications })
		}),
        new Column({ name: "column", top: 0, left: 0, bottom: 0, right: 0 }),
    ]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new HomeScreen();
	return screen;
}

export function createGarden(garden, gardenTitle) {
	var gardenContainer = new Garden({ string: gardenTitle });
	getScreen().column.add(gardenContainer);
	for (var i = 0; i < garden.plants.length; i++) {
		let plantButton = new PlantButton({
	        url: garden.plants[i].plantType.image,
	        nextScreenFunc: screenUtils.showPlantProfile,
	        top: 5,
	        height: 50,
	        width: 50,
	    });
		gardenContainer.line.add(plantButton);
	}
	for (var i = garden.plants.length; i < 3; i++) {
		let plantButton = new PlantButton({
	        url: assets.images.add,
	        nextScreenFunc: screenUtils.showPlantSeed,
	        top: 5,
	        height: 50,
	        width: 50,
	    });
		gardenContainer.line.add(plantButton);
	}
}
