import { CrossFade, Push, Flip, TimeTravel } from 'libraries/transition';
import * as assets from 'assets';
import * as home from '/screens/home';
import * as plantProfile from '/screens/plant_profile';

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

export function showPlantProfile() {
	showScreen(plantProfile.getScreen(), "left");
}
