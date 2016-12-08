import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as plants from '../plants';
import * as plantProfile from 'plant_profile';

let whiteSkin = new Skin({ fill: 'white' });

let blackText = new Style({ font: "16px segoe script", color: "black" });
let greenText = new Style({ font: "bold 16px segoe script", color: "#6FCF97" });

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
        	$.callFunc(content);
        },
    }),
   contents: [
        new Picture({ name: "plantPicture", height: $.height, width: $.width }),
        new Label({ name: "plantLabel", top: 5, width: 100, height: 20, style: greenText, string: "" }),
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
		return screen;
	}
	
	screen = new HomeScreen();
	gardenContainer = new Garden({});
	screen.column.add(gardenContainer);
	refresh();
	return screen;
}

export function refresh() {
	if (!screen) {
		return;
	}
	
	var garden = plants.gardens[0];
	for (var i = plantButtons.length; i < garden.plants.length; i++) {
		let plant = garden.plants[i];
		let plantButton = new PlantButton({ 
			height: 50, width: 50,
			plant: plant,
			string: plant.plantType.name,
	        string2: "Water in 5m",
	        url: plant.plantType.image,
	        callFunc: function(container) {
	        	plantProfile.plant = container.behavior.plant;
	        	plantProfile.screen = null;
	        	screenUtils.showPlantProfile();
	        }
	    });
		plantButtons.push(plantButton);
		gardenContainer.add(plantButton);
	}
	
	for (var i = plantButtons.length - 1; i > garden.plants.length - 1; i--) {
		gardenContainer.remove(plantButtons[i]);
		plantButtons.splice(i, 1);
	}

	for (var i = 0; i < plantButtons.length; i++) {
		let plantButton = plantButtons[i];
		plantButton.behavior.plant = garden.plants[i];
		let plant = plantButton.behavior.plant;
		
		if (plantButton.plantPicture.url != plant.plantType.image) {
			plantButton.plantPicture.url = plant.plantType.image;
		}
		if (plantButton.plantLabel.string != plant.plantType.name) {
			plantButton.plantLabel.string = plant.plantType.name;
		}

		plantButton.wateringLabel.string = "Water in " + plant.getWateringTimeStrShort();
	}
}
