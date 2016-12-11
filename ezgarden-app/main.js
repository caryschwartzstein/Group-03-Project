import Pins from "pins";
import * as comm from "libraries/communication";
import * as screenUtils from 'screen_utils';
import * as actionLog from "screens/action_log"
import * as home from "screens/home";
import * as notifications from "screens/notifications";
import * as plantCamera from "screens/plant_camera";
import * as plantProfile from "screens/plant_profile";
import * as plantSeed from "screens/plant_seed";
import * as plants from 'plants';

screenUtils.showHome();

class ApplicationBehavior extends Behavior {
    onDisplayed(application) {
    	comm.discoverDevice("ezgarden.device");
    }
    onQuit(application) {
    	comm.forgetDevice("ezgarden.device");
    }
}
application.behavior = new ApplicationBehavior();

comm.onInvoke("GetGardens", function(handler, args) {
	comm.sendRemoteMessage("PutGardens", plants.gardens);
});

comm.onInvoke("UpdatePlant", function(handler, args) {
	let plant = plants.clonePlant(args);
	for (var i = 0; i < plants.gardens.length; i++) {
		for (var j = 0; j < plants.gardens[i].plants.length; j++) {
			if (plants.gardens[i].plants[j].id == plant.id) {
				plants.gardens[i].plants[j] = plant;
				plantProfile.refresh();
				break;
			}
		}
	}
});

comm.onInvoke("WaterLevelsChanged", function(handler, args) {
	var levels = args;
	if (plantProfile.plant != null) {
		plantProfile.plant.waterLevels = levels;
		plantProfile.refresh();
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
});

comm.onInvoke("NutrientLevelsChanged", function(handler, args) {
	var levels = args;
	if (plantProfile.plant != null) {
		plantProfile.plant.nutrientLevels = levels;
		plantProfile.refresh();
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
});

comm.onInvoke("SunlightLevelsChanged", function(handler, args) {
	var levels = args;
	if (plantProfile.plant != null) {
		plantProfile.plant.sunlightLevels = levels;
		plantProfile.refresh();
		//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
	}
});

comm.onInvoke("WaterPlant", function(handler, args) {
	plantProfile.waterPlant();
	//comm.sendRemoteMessage("UpdatePlant", plantProfile.plant);
});

function refreshAll() {
	home.refresh();
	plantProfile.refresh();
}
