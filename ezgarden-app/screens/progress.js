import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as home from 'home';

let whiteSkin = new Skin({ fill: 'white' });
export let titleText = new Style({ font: "bold 30px ribeye marrow", color: "black" });
let blackText = new Style({ font: "18px arial", color: "black" });

export function ProgressState(number, image, message, unlocked) {
    this.number = number;
    this.image = image;
    this.message = message;
    if (number == 0) {
      this.unlocked = "";
    } else {
      this.unlocked = "You have unlocked the " + unlocked + " seed.";
    }
}
let state0 = new ProgressState(0, assets.images.PlantPot0, "By successfully taking care of your plants - you can unlock new seeds to plant!", "");
let state1 = new ProgressState(1, assets.images.PlantPot1, "You have planted your first plant! Go you!", "sunflower");
let state2 = new ProgressState(2, assets.images.PlantPot2, "Congratulations! You have successfully watered your new plants for a week!", "tulip");
let state3 = new ProgressState(3, assets.images.PlantPot3, "Congrats - your garden is full!", "mint");
let state4 = new ProgressState(4, assets.images.PlantPot4, "You have successfully grown your garden for one month!", "daffodil");
let state5 = new ProgressState(5, assets.images.PlantPot5, "Your plants are looking great! You have been taking care of them without notifications.", "tomato");
let state6 = new ProgressState(6, assets.images.PlantPot6, "Wow you have multiple gardens growing healthily - you are on your way to becoming a successful gardener!", "chrysanthemum");

export var state = state0;

var ProgressScreen = Column.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
        new assets.Header({
			string: "Progress",
			leftElement: new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
		}),
	    new Picture({ left: 0, right: 0, top: 50, bottom: 30, url: state.image }),
	    new Line({ left: 10, right: 10, top: 0, height: 70,
         contents:[
            new Text({ width: 200, left: 20, right: 20, top: 0, bottom: 50, 
              style: blackText, string: state.message + " " + state.unlocked }),
         ]
      }) 
    ]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new ProgressScreen();
	return screen;
}