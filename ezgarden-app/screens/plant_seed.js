import { RadioGroup,  RadioGroupBehavior, Button, ButtonBehavior } from 'libraries/buttons';
import { VerticalScroller, VerticalScrollbar, TopScrollerShadow,  BottomScrollerShadow } from 'libraries/scroller';
import * as assets from "../assets";
import * as screenUtils from '../screen_utils';
import * as plants from '../plants';
import * as home from 'home';

export var whiteBorderSkin = new Skin({ fill: "white", stroke: "#66cc66", borders: { left: 0, top: 0, right: 0, bottom: 1 }});

export var congratsScreen = null;

export var PlantSeedScreen = Container.template ($ => ({
	top: 0, height: 480, left: 0, width: 320, skin: assets.whiteSkin,
	contents: [
   		VerticalScroller($, {
            name: "scroller", active: true, top: 50, bottom: 0,
            contents: [
                $.contentToScrollVertically,
                VerticalScrollbar(),
                TopScrollerShadow(), 
                BottomScrollerShadow(),
            ]                     
        }),
		new assets.Header({
			string: "Plant Seed",
			leftElement: new assets.ImgButton({ url: assets.images.back2, callFunc: screenUtils.showHome }),
		}),
	]
}));

export var PlantButton = Container.template ($ => ({
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
    			string: "Plant Seed",
    			leftElement: new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
    		}));
            congratsScreen.add(new Label({top: 5, height: 35, right: 0, left: 0, string: $.plantType.name, style: assets.blackText}));
            congratsScreen.add(new Picture({top: 5, height: 250, width: 150, url: $.potImage}));
            congratsScreen.add(new Label({top: 5, height: 25, right: 0, left: 0, string: "Congratulations!", style: assets.greenText}));
            congratsScreen.add(new Text({top: 5, height: 25, right: 0, left: 0, string: "You just planted a " + $.plantType.name + " seed\n\n Be sure to follow its feed and profile", style: assets.blackText3}));

            screenUtils.showCongrats();
            
            var newPlant = new plants.Plant($.plantType);
            garden.plants.push(newPlant);
            home.refresh();
        }
    }
}))

export var ChoosePlant = Line.template($ => ({
	bottom: 1, height: 80, width: 320, skin: whiteBorderSkin, active: true,
	contents: [
		new Picture({width: 60, left: 10, height: 60, url: $.plantType.image}),
		new Label({width: 100, left: 10, height: 25, string: $.plantType.name, style: assets.blackText3}),
	]
}));

var screen = null;
export var garden = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	
	var holder = new Column({ name: "holder", left: 0, right: 0, top: 0, });
	for (var i = 0; i < plants.plantTypes.length; i++) {
		var plantType = plants.plantTypes[i];
		var choosePlant = new ChoosePlant({ plantType: plantType });
		choosePlant.add(new PlantButton({ plantType: plantType, potImage: assets.images.rosemaryPot }));
		holder.add(choosePlant);
	}
	screen = new PlantSeedScreen({ contentToScrollVertically: holder });
	return screen;
}
