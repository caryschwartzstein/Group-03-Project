import * as screenUtils from 'screen_utils';
import * as actionLog from "screens/action_log"
import * as home from "screens/home";
import * as notifications from "screens/notifications";
import * as plantCamera from "screens/plant_camera";
import * as plantProfile from "screens/plant_profile";
import * as plantSeed from "screens/plant_seed";
import * as plants from 'plants';

screenUtils.showHome();

for (var i = 0; i < plants.gardens.length; i++) {
	home.createGarden(plants.gardens[i], "Garden " + (i + 1));
}
