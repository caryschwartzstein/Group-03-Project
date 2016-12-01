import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as plants from '../plants';
import * as notifications from 'notifications';
import * as plantSeed from 'plant_seed';
import * as plantProfile from 'plant_profile';

let whiteSkin = new Skin({ fill: 'white' });

let grayText = new Style({ font: "18px arial", color: "#757575" });
let redText = new Style({ font: "bold 24px arial", color: "red" });

// TEMPLATES
var StringTemplate = Text.template($ => ({
    left: 10, right: 10, top: 10, bottom: 0,
    style: $.style,
    string: $.string
}));

export var NotificationsButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, width: 30,
    behavior: Behavior({
        onTouchEnded: function(content) {
        	$.callFunc();
        },
    }),
   contents: [
        new Picture({ top: 0, bottom: 0, left: 0, right: 0, url: assets.images.circle,
        	behavior: Behavior({
        		onCreate: function(content) {
        			content.effect = new Effect();
        			content.effect.colorize("#DC3E3E");
        		}
        	})
        }),
        Label($, { top: 0, bottom: 0, left: 0, right: 0,
            style: $.style,
            string: $.string
        })
   ]
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
        	$.callFunc(content);
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
			rightElement: new NotificationsButton({ style: assets.titleText, string: "1", callFunc: screenUtils.showNotifications })
		}),
        new Column({ name: "column", top: 0, left: 0, bottom: 0, right: 0 }),
    ]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	refresh();
	return screen;
}

export function refresh() {
	screen = new HomeScreen();
	for (var i = 0; i < plants.gardens.length; i++) {
		var garden = plants.gardens[i];
		var gardenContainer = new Garden({ string: "Garden " + (i + 1) });
		getScreen().column.add(gardenContainer);
		
		for (var j = 0; j < garden.plants.length; j++) {
			let plant = garden.plants[j];
			let plantButton = new PlantButton({
				top: 5, height: 50, width: 50,
				url: plant.plantType.image,
		        callFunc: function() {
		        	plantProfile.plant = plant;
		        	plantProfile.refresh();
		        	screenUtils.showPlantProfile();
		        },
		    });
			gardenContainer.line.add(plantButton);
		}
		
		for (var j = garden.plants.length; j < 3; j++) {
			let localGarden = garden;
			let plantButton = new PlantButton({
				top: 5, height: 50, width: 50,
		        url: assets.images.add,
		        callFunc: function(content) {
		        	plantSeed.garden = localGarden;
		        	screenUtils.showPlantSeed();
		        }
		    });
			gardenContainer.line.add(plantButton);
		}
	}
}
