import Pins from "pins";
import * as comm from "libraries/communication";
import * as screenUtils from 'screen_utils';
import * as plants from "plants";
import * as home from "screens/home";
import * as plantProfile from "screens/plant_profile";

var PIN_READ_SPAM_DELAY = 1000 * 3;
var waterButtonReadTime = new Date();
var waterLevels = 1;
var nutrientLevels = 1;

Pins.configure({
	WaterButton: { require: "Digital",
	  pins: {
	     digital: {pin: 54, direction: "input"},
	  }
	},
    WaterLevels: {
        require: "Analog",
        pins: { analog: { pin: 55 }}
	},
    NutrientLevels: {
        require: "Analog",
        pins: { analog: { pin: 62 }}
	}
	},
	function(success) {
		if (!success) {
			trace("Failed to configure\n");
			return;
		}
		Pins.share("ws", {zeroconf: true, name: "pins-share"});
		
		Pins.repeat("/WaterButton/read", 200, function(result) {
			if (result) {
				if (new Date().getTime() - waterButtonReadTime.getTime() < PIN_READ_SPAM_DELAY) {
					return;
				}
				waterButtonReadTime = new Date();
				comm.sendMessage("WaterPlant");
			}
		});
		
		Pins.repeat("/WaterLevels/read", 200, function(result) {
			if (result && waterLevels != result) {
				waterLevels = result
				comm.sendMessage("WaterLevelsChanged");
			}
		});
	}
);

comm.onInvoke("WaterPlant", function(handler, args) {
	trace("Watering Plant\n");
	plantProfile.waterPlant();
});

comm.onInvoke("WaterLevelsChanged", function(handler, args) {
	if (plants.gardens.length == 0) {
		return;
	}
	let garden = plants.gardens[0];
	for (let i = 0; i < garden.plants.length; i++) {
		garden.plants[i].waterLevels = waterLevels;
	}
	refreshAll();
});

function refreshAll() {
	plantProfile.refreshScreen();
	home.refreshScreen();
}

comm.repeatingThread(100, refreshAll);

screenUtils.showHome();

for (var i = 0; i < plants.gardens.length; i++) {
	home.createGarden(plants.gardens[i], "Garden " + (i + 1));
}


