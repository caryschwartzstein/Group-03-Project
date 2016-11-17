import { Button, ButtonBehavior } from '../libraries/buttons';
import * as assets from '../assets';
import * as screenUtils from '../screen_utils';
import * as home from 'home';

let whiteSkin = new Skin({ fill: 'white' });
let popupSkin = new Skin({ fill: "white", stroke: "#757575", borders: { left: 1, top: 1, right: 1, bottom: 1 }});

let blackText = new Style({ font: "18px arial", color: "black" });
let grayText = new Style({ font: "18px arial", color: "#757575" });
let whiteText = new Style({ font: "22px arial", color: "white" });
let greenPopupText = new Style({ font: "18px arial", color: "#6FCF97" });

var currentNotification;

// TEMPLATES
var StringTemplate = Text.template($ => ({
    left: 3, right: 3, top: 3, bottom: 0,
    style: $.style,
    string: $.string
}));

// When popups appear, their container.active variable must be set to true
export var WaterButton = Button.template($ => ({
    top: 10, left: 0, height: 40, width: 40, right: 20,
    contents: [
        new Label({ style: whiteText, string: "Water" }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button) {
        	screenUtils.showPopup(new WateredPopup({ 
        		closeFunc: function() {
        			currentNotification.visible = false;
        			currentNotification.container.remove(currentNotification);
        			screenUtils.closePopups()
        		}
        	}));
        }
    }
}));

export var PopupButton = Button.template($ => ({
	left: $.left, right: $.right, height: 30, width: $.width, bottom: 3,
    contents: [
        new Label({ style: greenPopupText, string: $.string }),
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
     new Column({
         left: 0, right: 0, top: 0, height: 140,
         contents: [
             new StringTemplate({ string: 'Congratulations!', style: greenPopupText}),
             new StringTemplate({ string: 'You just watered your plant. You will need to water it again in 8 hours.', style: grayText }),
             new PopupButton({ width: 50, string: "Close", callFunc: $.closeFunc })
         ]
     })
    ]
}));

var NotWateredPopup = Container.template($ => ({
    left: 20, right: 20, top: 40, bottom: 60, skin: whiteSkin,
    active: true,
    contents: [
     new Column({
         left: 0, right: 0, top: 0, bottom: 70,
         contents: [
             new StringTemplate({ string: 'Whoops!', style: greenPopupText}),
             new StringTemplate({ string: 'Are you sure you want to water your plant? It needs to be watered in 3 hours.', style: blackText }),
         ]
     }),
     new WaterButton()
    ]
}));

var Notification = Container.template($ => ({
  name: 'notification',
  left: 0, right: 0, top: 20, height: 60,
  skin: whiteSkin,
  contents: [
    new Line({
        top: 0, left: -10, bottom: 0, right: 0,
        contents: [
            new Picture({
                top: 0, left: 0,  right: 0, bottom: 0,
                height: 30,
                url: assets.images.rosemaryPot
            }),
            new WaterButton(),
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
	currentNotification = new Notification();
	screen.column.add(currentNotification);
	return screen;
}
