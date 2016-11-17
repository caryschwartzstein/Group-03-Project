import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as plantProfile from 'plant_profile';

let whiteSkin = new Skin({ fill: 'white' });

var LiveScreen = Column.template($ => ({
  top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
      new Line({ 
          name: 'liveHeader',
          height: 60,
          contents: [
             new plantProfile.ImgButton({ url: assets.images.back2, 
            	 nextScreenFunc: function() { screenUtils.showPlantProfile("right"); },
             }),
             new Label({ style: new Style({font: 'bold 25px', color: 'black'}), 
               left: 30, height: 50, string: "Rosemary #1 Live"})
      ] }),
      new Line({ 
         left: 20, right: 20, top: 10, height: 2, skin: new Skin({ fill: '#66cc66' }) 
      }),
      new Picture({ left: 0, top: 10, bottom: 8, right: 0, url: assets.images.rosemary })  
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