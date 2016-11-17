import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as notifications from 'notifications';
import * as plantSeed from 'plant_seed';

// STYLES
let whiteSkin = new Skin({ fill: 'white' });

let grayText = new Style({ font: "18px arial", color: "#757575" });
let redText = new Style({ font: "bold 24px arial", color: "red" });

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
