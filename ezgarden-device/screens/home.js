import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as plantProfile from 'plant_profile';

let whiteSkin = new Skin({ fill: 'white' });

let blackText = new Style({ font: "18px segoe script", color: "black" });

var gardenContainer;
var screen;
var plantButtons = [];

export var PlantButton = Column.template($ => ({
    active: true, left: 0, right: 0, height: 100, width: 100,
    behavior: Behavior({
    	onCreate: function(content) {
    		this.plant = $.plant;
    	},
        onTouchEnded: function(content) {
        	$.callFunc();
        },
    }),
   contents: [
        new Picture({ name: "plantPicture", height: $.height, width: $.width }),
        new Label({ name: "plantLabel", top: 5, width: 100, height: 20, style: blackText, string: "" }),
        new Label({ name: "wateringLabel", width: 100, height: 20, style: blackText, string: "" }),
   ]
}));

var Garden = Line.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, skin: whiteSkin
}));

var HomeScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new assets.Header({
			string: "My Garden",
		}),
        new Column({ name: "column", top: 0, left: 0, bottom: 0, right: 0 }),
    ]
}));

export function getScreen() {
	if (screen) {
		refreshScreen();
		return screen;
	}
	screen = new HomeScreen();
	refreshScreen();
	return screen;
}

export function refreshScreen() {
	if (!screen) {
		return;
	} 
	
	for (var i = 0; i < plantButtons.length; i++) {
		let plantButton = plantButtons[i];
		let plant = plantButton.behavior.plant;
		
		if (plantButton.plantPicture.url != plant.plantType.image) {
			plantButton.plantPicture.url = plant.plantType.image;
		}
		if (plantButton.plantLabel.string != plant.plantType.name) {
			plantButton.plantLabel.string = plant.plantType.name;
		}
		
		let wateringTime = plant.getWateringTimeStr();
		plantButton.wateringLabel.string = "Water in " + (wateringTime[0]) + wateringTime[1].charAt(0);
	}
}

export function createGarden(garden) {
	gardenContainer = new Garden({});
	getScreen().column.add(gardenContainer);
	
	for (var i = 0; i < garden.plants.length; i++) {
		let plant = garden.plants[i];
		let plantButton = new PlantButton({
			plant: plant,
	        url: plant.plantType.image,
	        callFunc: function() {
	        	plantProfile.plant = plant;
	        	plantProfile.screen = null;
	        	screenUtils.showPlantProfile();
	        },
	        height: 50,
	        width: 50,
	        string: plant.plantType.name,
	        string2: "Water in 5m"
	    });
		plantButtons.push(plantButton);
		gardenContainer.add(plantButton);
	}
	
	refreshScreen();
}
