import { RadioGroup,  RadioGroupBehavior, Button, ButtonBehavior } from 'libraries/buttons';
import * as assets from "../assets";
import * as screenUtils from '../screen_utils';
import * as home from 'home';

export var PlantSeedScreen = Column.template ($ => ({
	top: 0, height: 480, left: 0, width: 320,
	contents: [
		new assets.Header({
			string: "Plant Seed",
			leftElement: new assets.ImgButton({ url: assets.images.back2, callFunc: screenUtils.showHome }),
		})
	]
}));

export var congratsScreen = null;

export var PlantButton = Container.template (lst => ({
	top: 25, bottom: 25, left: 55, width: 70, active: true, skin: assets.greenSkin, 
	contents: [
		new Label ({top: 0, bottom: 0, left: 0, right: 0, string: "Plant", style: assets.whiteText})
	],
	Behavior: class extends ButtonBehavior {
        onTap(button) {
        	congratsScreen = new Column ({
        		top: 0, height: 480, left: 0, width: 320, skin: assets.whiteSkin,
        	});
            congratsScreen.add(new assets.Header({
    			string: "",
    			leftElement: new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
    		}));
            congratsScreen.add(new Label({top: 5, height: 35, right: 0, left: 0, string: lst[0], style: assets.blackText}));
            congratsScreen.add(new Picture({top: 5, height: 250, width: 150, url: lst[1]}));
            congratsScreen.add(new Label({top: 5, height: 25, right: 0, left: 0, string: "Congratulations!", style: assets.greenText}));
            congratsScreen.add(new Text({top: 5, height: 25, right: 0, left: 0, string: "You just planted a " + lst[0] + " seed\n\n Be sure to follow its feed and profile", style: assets.blackText3}));

            screenUtils.showCongrats();
        }
    }
}))

export var ChoosePlant = Line.template(lst => ({
	bottom: 1, height: 80, width: 320, skin: assets.whiteSkin, active: true,
	contents: [
		new Picture({width: 60, left: 10, height: 60, url: lst[1]}),
		new Label({width: 100, left: 10, height: 25, string: lst[0], style: assets.blackText3}),
	]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new PlantSeedScreen();
	var plant1 = new ChoosePlant(["strawberry", assets.images.strawberry]);
	plant1.add(new PlantButton(["Strawberry", assets.images.strawPot]));
	var plant2 = new ChoosePlant(["rosemary", assets.images.basil]);
	plant2.add(new PlantButton(["Rosemary", assets.images.rosemaryPot]));
	var plant3 = new ChoosePlant(["dandelion", assets.images.dandelion]);
	plant3.add(new PlantButton(["Dandelion", assets.images.dandyPot]));
	var plant4 = new ChoosePlant(["sunflower", assets.images.sunflower]);
	plant4.add(new PlantButton(["Sunflower", assets.images.sunPot]));
	var plant5 = new ChoosePlant(["rose", assets.images.flower]);
	plant5.add(new PlantButton(["Rose", assets.images.rosePot]));

	screen.add(plant1)
	screen.add(plant2)
	screen.add(plant3)
	screen.add(plant4)
	screen.add(plant5)
	return screen;
}


