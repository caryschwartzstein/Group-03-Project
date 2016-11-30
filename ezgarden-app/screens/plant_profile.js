import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as notifications from 'notifications';

let WARNING_TIME = 1000 * 60 * 60 * 6;

let blueButtonSkin = new Skin({ fill: '#6CA3C1' }); 
let whiteSkin = new Skin({ fill: 'white' });
let buttonSkin = new Skin ({fill: 'white', borders: {left: 1, right: 1, top: 1, bottom: 1}, stroke: "black"});
export let headerLineSkin = new Skin({ fill: '#66cc66' });
let backBarSkin = new Skin({ fill: '#C4C4C4' });
let frontBarSkin = new Skin({ fill: '#56CCF2' });

let blackText = new Style({ font: "18px arial", color: "black" });
export let titleText = new Style({ font: "bold 30px ribeye marrow", color: "black" });
let greenText = new Style({ font: "bold 24px segoe script", color: '#66cc66', horizontal: "left" });
let smallBlackText = new Style({ font: "14px arial", color: "black", horizontal: "left" });

var BlueButton = Container.template($ => ({
  exclusiveTouch: true, active: true, right: 10, height: 20, width: 100, skin: blueButtonSkin,
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: $.string, top: 0, bottom: 0, left: 0, right: 0, style: blackText
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
    	$.callFunc();
    }
  })
}));

export var AmountBar = Container.template($ => ({
	width: 180, height: 10, left: 0,
	contents: [
	    new Container({ name: "backBar", top: 0, bottom: 0, left: 0, right: 0, skin: backBarSkin }),
	    new Container({ name: "frontBar", top: 0, bottom: 0, left: 0, width: 110, skin: frontBarSkin }),
	]
}));

var PlantInformation = Column.template($ => ({
	top: -30, left: 10, right: 0, height: 160, skin: whiteSkin, active: true,
    contents: [
        new Column({ top: 0, left: 0, right: 0,
        	contents: [
                new Label({ left: 0, right: 0, top: 0, style: greenText,
	            	string: "Plant Information"}),
	            new Label({ left: 0, right: 0, top: 5, style: smallBlackText, 
	            	string: "Watered " + plant.getWateredTimeStr() + " ago" }),
	            new Label({ left: 0, right: 0, top: 5, style: smallBlackText, 
	            	string: "Watered " + plant.getPlantedTimeStr() + " ago" }),
	        ]
        }),
        new Container({ left: 0, right: 0, top: 10,
        	contents: [new AmountBar({}), new BlueButton({ 
        		string: "water",
        		callFunc: function() {
        			if (plant == null) {
        				return;
        			}
        			
        			plant.water();
        			screenUtils.showPopup(new notifications.WateredPopup({ plant: plant, closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
        new Container({ left: 0, right: 0, top: 10,
        	contents: [new AmountBar({}), new BlueButton({ 
        		string: "nutrition",
        		callFunc: function() {
        			//screenUtils.showPopup(new notifications.WateredPopup({ closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
        new Container({ left: 0, right: 0, top: 10,
        	contents: [new AmountBar({}),new BlueButton({ 
        		string: "sunlight",
        		callFunc: function() {
        			//screenUtils.showPopup(new notifications.WateredPopup({ closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
    ]
}));

var CareTips = Column.template($ => ({
	top: 0, bottom: 0, left: 10, right: 0, height: 100, skin: whiteSkin, active: true,
    contents: [
        new Column({ top: 0, left: 0, right: 0,
        	contents: [
                new Label({ left: 0, right: 0, top: 0, style: greenText,
	            	string: "Care Tips"}),
	            new Label({ left: 0, right: 0, top: 5, style: smallBlackText, 
	            	string: "Plant indoors"}),
	            new Label({ left: 0, right: 0, top: 5, style: smallBlackText, 
	            	string: "Trim plant after it flowers"}),
	        ]
        }),
        new Label({ style: greenText, left: 0, right: 0, top: 10, 
        	string: "More Info" }),
    ]
}));

export var ImgButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, left: 3, right: 3, width: 30, height: 30,
    behavior: Behavior({
        onTouchEnded: function(content){
        	$.callFunc();
        },
    }),
   contents: [ new Picture({ height: 30, url: $.url  }) ]
}));

var PlantProfileScreen = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
       new Line({ left: 10, right: 10, top: 0, height: 50,
         contents:[
            new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
            new Label({ width: 200, left: 0, right: 0, top: 0, bottom: 0, style: titleText, string: plant.plantType.name }),
         ]
      }),
      new Line({ left: 20, right: 20, top: 0, height: 2, skin: headerLineSkin }),
      new Line({ name: 'middle', height: 170, top: 0,
          contents: [
            new Picture({ top: 10, height: 100, width: 100, url: assets.images.rosemaryPot, active: true,
            	behavior: Behavior({
                    onTouchEnded: function(content, id, x, y, ticks) {
                    	screenUtils.showPlantLive();
                    }
                  })
            }),
          ]
      }),
      new PlantInformation(),
      new CareTips(),
    ]
}));

var screen = null;
export var plant = null;
export function getScreen() {
	if (screen) {
		return screen;
	} else if (plant == null) {
		return null;
	}
	screen = new PlantProfileScreen();
	return screen;
}

export function refresh() {
	screen = new PlantProfileScreen(); 
}