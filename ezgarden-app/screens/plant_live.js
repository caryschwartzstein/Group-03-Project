import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as plantProfile from 'plant_profile';

let whiteSkin = new Skin({ fill: 'white' });

var LiveScreen = Column.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
	    new Line({ left: 10, right: 10, top: 0, height: 50,
	    	contents: [
	    	    new assets.ImgButton({ url: assets.images.back2, callFunc: function() {
	    	    	screenUtils.showPlantProfile("right");
	    	    }}),
	            new Label({ width: 200, left: 0, right: 0, top: 0, bottom: 0, style: plantProfile.titleText, string: "Rosemary Live" }),
	        ]
	    }),
	    new Line({ left: 20, right: 20, top: 0, height: 2, skin: plantProfile.headerLineSkin }),
	    new Picture({ left: 0, right: 0, top: 0, bottom: 0, aspect: "fill", url: assets.images.rosemaryLive })  
    ]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new LiveScreen();
	return screen;
}