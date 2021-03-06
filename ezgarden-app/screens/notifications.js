import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as plants from 'plants';
import * as home from 'home';

let whiteSkin = new Skin({ fill: 'white' });
let graySkin = new Skin({ fill: '#b7b7b7' });
let popupSkin = new Skin({ fill: "white", stroke: "#b7b7b7", borders: { left: 1, top: 1, right: 1, bottom: 1 }});
let popupButtonSkin = new Skin({ fill: '#66cc66' });

let blackText = new Style({ font: "18px arial", color: "black" });
let grayText = new Style({ font: "18px arial", color: "#757575" });
let whiteText = new Style({ font: "18px futura", color: "white" });
let greenPopupText = new Style({ font: "20px arial", color: "#66cc66" });
let popupButtonText = new Style({ font: "17px arial", color: "#4F4F4F" });

// TEMPLATES
var StringTemplate = Text.template($ => ({
    left: 3, right: 3, top: 3, bottom: 0,
    style: $.style,
    string: $.string
}));

// When popups appear, their container.active variable must be set to true
export var WaterButton = Button.template($ => ({
	top: 10, left: 0, height: 40, right: 20,
	skin: graySkin, 
    contents: [
        new Label({ style: whiteText, string: "Water Garden 1" }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button) {
        	let plant = plants.gardens[0].plants[0];
        	if (plant !== null) {
	        	screenUtils.showPopup(new WateredPopup({
	        		plant: plant,
	        		closeFunc: function() {
	        			let notification = button.container.container;
	        			notification.visible = false;
	        			notification.container.remove(notification);
	        			screenUtils.closePopups();
	        		}
	        	}));
        	}
        }
    }
}));

export var NutrientButton = Button.template($ => ({
	top: 10, left: 0, height: 40, right: 20,
	skin: graySkin,
    contents: [
        new Label({ style: whiteText, string: "Feed Garden 1" }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button) {
        	let plant = plants.gardens[0].plants[0];
        	if (plant !== null) {
	        	screenUtils.showPopup(new FedPopup({
	        		plant: plant,
	        		closeFunc: function() {
	        			let notification = button.container.container;
	        			notification.visible = false;
	        			notification.container.remove(notification);
	        			screenUtils.closePopups();
	        		}
	        	}));
        	}
        }
    }
}));

export var PopupButton = Button.template($ => ({
	left: $.left, right: $.right, height: 30, width: $.width, bottom: 3, skin: popupButtonSkin,
    contents: [
        new Label({ style: popupButtonText, string: $.string }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button) {
        	$.callFunc();
        }
    }
}));

export var WateredPopup = Container.template($ => ({
    left: 40, right: 40, skin: popupSkin,
    contents: [
     new Column({ left: 2, right: 2, top: 0, height: 140,
         contents: [
             new StringTemplate({ string: 'CONGRATULATIONS!', style: greenPopupText}),
             new StringTemplate({ string: 'You just watered your ' + $.plant.plantType.name.toLowerCase()
            	 + '. You will need to water it again in '
            	 + $.plant.getWateringTimeStr() + '.', style: popupButtonText }),
             new PopupButton({ width: 50, string: "OK", callFunc: $.closeFunc })
         ]
     })
    ]
}));

export var FedPopup = Container.template($ => ({
    left: 40, right: 40, skin: popupSkin,
    contents: [
     new Column({ left: 0, right: 0, top: 0, height: 140,
         contents: [
             new StringTemplate({ string: 'Congratulations!', style: greenPopupText}),
             new StringTemplate({ string: 'You just provided nutrients to your ' + $.plant.plantType.name.toLowerCase()}),
             new PopupButton({ width: 50, string: "OK", callFunc: $.closeFunc })
         ]
     })
    ]
}));

export var WarningWateredPopup = Container.template($ => ({
    left: 20, right: 20, top: 40, bottom: 60, skin: whiteSkin,
    active: true,
    contents: [
	    new Column({ left: 0, right: 0, top: 0, bottom: 70,
	         contents: [
	             new StringTemplate({ string: 'Whoops!', style: greenPopupText}),
	             new StringTemplate({ string: 'Are you sure you want to water your '
	            	 + $.plant.plantType.name.toLowerCase() + ' this soon? It needs to be watered in ' 
	            	 + $.plant.getWateringTimeStr() + '.', style: blackText }),
	         ]
	     }),
	     new WaterButton()
    ]
}));

export var NutritionPopup = Container.template($ => ({
    left: 40, right: 40, skin: popupSkin,
    contents: [
     new Column({ left: 0, right: 0, top: 0, height: 140,
         contents: [
             new StringTemplate({ string: 'Congratulations!', style: greenPopupText}),
             new StringTemplate({ string: 'Fertilizer has been added to your ' + $.plant.plantType.name.toLowerCase() + '.',
            	 style: grayText }),
             new PopupButton({ width: 50, string: "OK", callFunc: $.closeFunc })
         ]
     })
    ]
}));

export var WarningNutritionPopup = Container.template($ => ({
    left: 20, right: 20, top: 40, bottom: 60, skin: whiteSkin,
    active: true,
    contents: [
	    new Column({ left: 0, right: 0, top: 0, bottom: 70,
	         contents: [
	             new StringTemplate({ string: 'Whoops!', style: greenPopupText}),
	             new StringTemplate({ string: 'Your ' + $.plant.plantType.name.toLowerCase() 
	            	 + ' seems to have plenty of nutrients, are you sure you want to add more? ',
	            	 style: blackText }),
	         ]
	     }),
	     new PopupButton({ width: 50, string: "Cancel", callFunc: $.closeFunc }),
	     new PopupButton({ width: 50, string: "Proceed", callFunc: $.closeFunc })
    ]
}));

var WaterNotification = Container.template($ => ({
  name: 'notification',
  left: 0, right: 0, top: 20, height: 60,
  skin: whiteSkin,
  contents: [
    new Line({ top: 0, left: 0, bottom: 0, right: 0,
        contents: [
            new Picture({ left: 0, height: 60, width: 30, right: 0,
                url: assets.images.rosemaryPot
            }),
            new WaterButton(),
        ]
    }),
  ]
}));

var NutrientNotification = Container.template($ => ({
  name: 'nutrient notification',
  left: 0, right: 0, top: 20, height: 60,
  skin: whiteSkin,
  contents: [
    new Line({ top: 0, left: 0, bottom: 0, right: 0,
        contents: [
            new Picture({ left: 0, height: 60, width: 30, right: 0,
                url: assets.images.strawberry
            }),
            new NutrientButton(),
        ]
    }),
  ]
}));

export var NotificationScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new assets.Header({
			string: "Notifications",
			leftElement: new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
		}),
        new Column({name: "column", top: 0, left: 0, bottom: 0, right: 0,
            contents: []
        }),
    ]
}));

var screen;
var notification;

export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new NotificationScreen();
	screen.column.add(new WaterNotification());
	screen.column.add(new NutrientNotification());
	return screen;
}
