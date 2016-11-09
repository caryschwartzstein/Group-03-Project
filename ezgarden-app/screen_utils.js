import { CrossFade, Push, Flip, TimeTravel } from 'libraries/transition';
import * as assets from 'assets';
import * as home from '/screens/home';
import * as plantSeed from '/screens/plant_seed';
import * as notifications from '/screens/notifications';
import * as plantProfile from '/screens/plant_profile';
import * as plantLive from '/screens/plant_live';

var popups = [];
var currentScreen = null;

export function showScreen(screen, direction) {
	if (!direction) {
		direction = "left";
	}
	if (currentScreen == null) {
		currentScreen = screen;
		application.add(screen);
	} else {
		closePopups();
		application.run( new Push(), application.last, screen,
				{ duration: 200, direction: direction } );
	}
}

export function closePopups() {
	for (var i = 0; i < popups.length; i++) {
		application.remove(popups[i]);
		popups = [];
	}
}

export function showPopup(popup) {
	popups.push(popup);
	application.add(popup);
}

export function showHome() {
	showScreen(home.getScreen(), "right");
}

export function showPlantSeed() {
	showScreen(plantSeed.getScreen(), "left");
}

export function showCongrats() {
	showScreen(plantSeed.congratsScreen, "left");
}

export function showNotifications() {
	showScreen(notifications.getScreen(), "left");
}

export function showPlantProfile(direction) {
	if (!direction) {
		direction = "left";
	}
	showScreen(plantProfile.getScreen(), direction);
}

export function showPlantLive() {
	showScreen(plantLive.getScreen(), "left");
}
