import * as assets from "../assets";

import { 
    RadioGroup, 
    RadioGroupBehavior,
    Button,
    ButtonBehavior 
} from 'libraries/buttons';

export var picture = new Picture({ left: 0, url: assets.images.cactus })
export var screen = new Column({ left: 0, top: 0, right: 0, bottom: 0,
	skin: assets.sampleSkin,
	contents: []
});

export var mainContainer = new Column ({
	top: 0, height: 480, left: 0, width: 320,
	contents: [
	]
})

export var plantButton = Container.template (lst => ({
	top: 25, bottom: 25, left: 55, width: 70, active: true, skin: assets.greenSkin, 
	contents : [
		new Label ({top: 10, bottom: 10, left: 0, right: 0, string: "Plant", style: assets.whiteText})
	],
	Behavior: class extends ButtonBehavior {
        onTap(button){
            trace("Button was tapped.\n");
            application.remove(mainContainer);
            congratScreen.add(new Label({top: 25, height: 25, right: 0, left: 0, string: lst[0], style: assets.blackText}));
            congratScreen.add(new Picture({top: 15, height: 250, width: 150, url: lst[1]}));
            congratScreen.add(new Label({top: 15, height: 25, right: 0, left: 0, string: "Congratulations!", style: assets.greenText}));
            congratScreen.add(new Text({top: 15, height: 25, right: 0, left: 0, string: "You just planted a " + lst[0] + " seed\n\n Be sure to follow its feed and profile", style: assets.blackText3}));

            application.add(congratScreen)
        }
    }
}))

export var choosePlant = Line.template(lst => ({
	top: 5, height: 80, width: 320, skin: assets.whiteSkin, active: true,
	contents: [
		new Picture({width: 60, left: 10, height: 60, url: "../images/" + lst[1]}),
		new Label({width: 100, left: 10, height: 25, string: lst[0], style: assets.blackText3}),
	]
}))

export var congratScreen = new Column ({
	top: 0, height: 480, left: 0, width: 320, skin: assets.whiteSkin,
	contents: [
	]
})

export var plant1 = new choosePlant(["strawberry", "strawberry.png"])
plant1.add(new plantButton(["Strawberry", "../images/strawPot.jpg"]));
export var plant2 = new choosePlant(["rosemary", "basil.png"])
plant2.add(new plantButton(["Rosemary", "../images/rosemaryPot.jpg"]));
export var plant3 = new choosePlant(["dandelion", "dandelion.png"])
plant3.add(new plantButton(["Dandelion", "../images/dandyPot.jpg"]));
export var plant4 = new choosePlant(["sunflower", "sunflower.png"])
plant4.add(new plantButton(["Sunflower", "../images/sunPot.jpg"]));
export var plant5 = new choosePlant(["rose", "flower.png"])
plant5.add(new plantButton(["Rose", "../images/rosePot.jpg"]));


mainContainer.add(plant1)
mainContainer.add(plant2)
mainContainer.add(plant3)
mainContainer.add(plant4)
mainContainer.add(plant5)


