import Pins from "pins";
import * as comm from "libraries/communication";
import * as screenUtils from 'screen_utils';
import * as plants from "plants";
import * as home from "screens/home";
import * as plantProfile from "screens/plant_profile";

var resultWaterButton;
var waterButtonReadTime = new Date();
var waterLevels = 1;
var nutrientLevels = 1;
var sunlightLevels = 1;
var gardensUpdated = false;

class ApplicationBehavior extends Behavior {
    onDisplayed(application) {
    	comm.discoverDevice("ezgarden.app");
    }
    onQuit(application) {
    	comm.forgetDevice("ezgarden.app");
    }
}
application.behavior = new ApplicationBehavior();

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
	},
    SunlightLevels: {
        require: "Analog",
        pins: { analog: { pin: 63 }}
	}
	},
	function(success) {
		if (!success) {
			trace("Failed to configure\n");
			return;
		}
		Pins.share("ws", {zeroconf: true, name: "pins-share"});
		
		Pins.repeat("/WaterButton/read", 25, function(result) {
			if (result != null && resultWaterButton != result) {
				resultWaterButton = result;
				if (result > 0) {
					waterButtonReadTime = new Date();
					comm.sendMessage("WaterPlant");
					comm.sendRemoteMessage("WaterPlant");
				}
			}
		});
		
		Pins.repeat("/WaterLevels/read", 25, function(result) {
			if (result != null && waterLevels != result) {
				waterLevels = result;
				comm.sendMessage("WaterLevelsChanged", waterLevels);
				comm.sendRemoteMessage("WaterLevelsChanged", waterLevels);
			}
		});
		
		Pins.repeat("/NutrientLevels/read", 25, function(result) {
			if (result != null && nutrientLevels != result) {
				nutrientLevels = result;
				comm.sendMessage("NutrientLevelsChanged", nutrientLevels);
				comm.sendRemoteMessage("NutrientLevelsChanged", nutrientLevels);
			}
		});
		
		Pins.repeat("/SunlightLevels/read", 25, function(result) {
			if (result != null && sunlightLevels != result) {
				sunlightLevels = result;
				comm.sendMessage("SunlightLevelsChanged", sunlightLevels);
				comm.sendRemoteMessage("SunlightLevelsChanged", sunlightLevels);
			}
		});
	}
);

comm.onInvoke("WaterPlant", function(handler, args) {
	plantProfile.waterPlant();
	//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
});

comm.onInvoke("WaterLevelsChanged", function(handler, args) {
	if (plantProfile.plant != null) {
		plantProfile.plant.waterLevels = args;
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
	refreshAll();
});

comm.onInvoke("NutrientLevelsChanged", function(handler, args) {
	if (plantProfile.plant != null) {
		plantProfile.plant.nutrientLevels = args;
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
	refreshAll();
});

comm.onInvoke("SunlightLevelsChanged", function(handler, args) {
	if (plantProfile.plant != null) {
		plantProfile.plant.sunlightLevels = args;
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
	refreshAll();
});

comm.onInvoke("UpdatePlant", function(handler, args) {
	trace("Update Plant: " + args + "\n");
	let plant = plants.clonePlant(args);
	for (var i = 0; i < plants.gardens.length; i++) {
		for (var j = 0; j < plants.gardens[i].plants.length; j++) {
			if (plants.gardens[i].plants[j].id == plant.id) {
				plants.gardens[i].plants[j] = plant;
				refreshAll();
				break;
			}
		}
	}
});

comm.onInvoke("PutGardens", function(handler, args) {
	gardensUpdated = true;
	plants.gardens = args;
	
	// Repairs the plants after they were serialized
	for (var i = 0; i < plants.gardens.length; i++) {
		for (var j = 0; j < plants.gardens[i].plants.length; j++) {
			plants.gardens[i].plants[j] = plants.clonePlant(plants.gardens[i].plants[j]);
		}
	}
	refreshAll();
});

function updateGardens() {
	if (gardensUpdated == true) {
		return;
	}
	comm.sendRemoteMessage("GetGardens");
}

export function updatePlant(plant) {
	comm.sendRemoteMessage("UpdatePlant", plant);
}

function refreshAll() {
	plantProfile.refresh();
	home.refresh();
}

comm.repeatingThread(100, refreshAll);
comm.repeatingThread(100, updateGardens);
screenUtils.showHome();