import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as notifications from 'notifications';
import * as plantLive from 'plant_live';

let WARNING_TIME = 1000 * 60 * 60 * 6;

let blueButtonSkin = new Skin({ fill: '#56CCF2' }); 
let whiteSkin = new Skin({ fill: 'white' });
let buttonSkin = new Skin ({fill: 'white', borders: {left: 1, right: 1, top: 1, bottom: 1}, stroke: "black"});
export let headerLineSkin = new Skin({ fill: '#66cc66' });
let backBarSkin = new Skin({ fill: '#C4C4C4' });
let frontBarSkin = new Skin({ fill: '#56CCF2' });

let blackText = new Style({ font: "16px arial", color: "black" });
export let titleText = new Style({ font: "bold 30px ribeye marrow", color: "black" });
let greenText = new Style({ font: "bold 24px segoe script", color: '#66cc66', horizontal: "left" });
let smallBlackText = new Style({ font: "14px arial", color: "black", horizontal: "left" });
let grayText = new Style({ font: "16px arial", color: "#333333", horizontal: "left" });
let centerGrayText = new Style({ font: "16px arial", color: "#555555" });

var BlueButton = Container.template($ => ({
  exclusiveTouch: true, active: true, right: 20, height: 26, width: 80, skin: blueButtonSkin, name: "blueButton",
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: $.string, top: 0, bottom: 0, left: 0, right: 0, style: centerGrayText
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
    	$.callFunc();
    }
  })
}));

export var FrontBar = Container.template($ => ({
	name: "frontBar", top: 0, bottom: 0, left: 0, width: $.width, skin: frontBarSkin
}));

export var AmountBar = Container.template($ => ({
	width: 180, height: 16, left: 0,
	name: "amountBar",
	contents: [
	    new Container({ name: "backBar", top: 0, bottom: 0, left: 0, right: 0, skin: backBarSkin }),
	    new FrontBar({}),
	],
}));

var PlantInformation = Column.template($ => ({
	top: 20, left: 20, right: 0, height: 160, skin: whiteSkin, active: true, name: "plantInfo",
    contents: [
        new Column({ name: "column", top: 0, left: 0, right: 0,
        	contents: [
                new Label({ name: "label1", left: 0, right: 0, top: 0, style: greenText,
	            	string: "Plant Information"}),
	            new Label({ name: "label2", left: 4, right: 0, top: 5, style: grayText, 
	            	string: "Watered " + plant.getWateredTimeStr() + " ago" }),
	            new Label({ name: "label3", left: 4, right: 0, top: 5, style: grayText, 
	            	string: "Planted " + plant.getPlantedTimeStr() + " ago" }),
	        ]
        }),
        new Container({ name: "waterContainer", left: 0, right: 0, top: 10,
        	contents: [
        	    new AmountBar({}), 
        	    new BlueButton({
        		string: "water",
        		callFunc: function() {
        			if (!plant) {
        				return;
        			}
        			waterPlant();
        			screenUtils.showPopup(new notifications.WateredPopup({ plant: plant, closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
        new Container({ name: "nutritionContainer", left: 0, right: 0, top: 10,
        	contents: [
        	    new AmountBar({}), 
        	    new BlueButton({ 
        		string: "nutrition",
        		callFunc: function() {
        			if (!plant) {
        				return;
        			}
        			feedPlant();
        			screenUtils.showPopup(new notifications.NutritionPopup({ plant: plant, closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
        new Container({ name: "sunlightContainer", left: 0, right: 0, top: 10,
        	contents: [
        	    new AmountBar({}),
        	    new BlueButton({ 
        		string: "sunlight",
        		callFunc: function() {
        			//screenUtils.showPopup(new notifications.WateredPopup({ closeFunc: screenUtils.closePopups }));
        		}})
        	]
        }),
    ]
}));

var CareTips = Column.template($ => ({
	top: 20, bottom: 0, left: 20, right: 0, height: 100, skin: whiteSkin, active: true,
    contents: [
        new Column({ top: 0, left: 0, right: 0,
        	contents: [
                new Label({ left: 0, right: 0, top: 0, style: greenText,
	            	string: "Care Tips"}),
	            new Label({ left: 4, right: 0, top: 5, style: grayText, 
	            	string: "Plant indoors"}),
	            new Label({ left: 4, right: 0, top: 5, style: grayText, 
	            	string: "Trim plant after it flowers"}),
	        ]
        })
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
       new Line({ name: "header", left: 10, right: 10, top: 0, height: 50,
         contents:[
            new assets.ImgButton({ url: assets.images.home2, callFunc: screenUtils.showHome }),
            new Label({ name: "label", width: 200, left: 0, right: 0, top: 0, bottom: 0, style: titleText, string: plant.plantType.name }),
         ]
      }),
      new Line({ left: 20, right: 20, top: 0, height: 2, skin: headerLineSkin }),
      new Container({ name: 'middle', height: 120, top: 0, active: true,
          contents: [
            new Picture({ name: "picture", top: 10, height: 100, url: plant.plantType.image}),
            new Picture({ bottom: 0, left: 50, right: 0, height: 20, width: 20, url: assets.images.picture }),
          ],
          behavior: Behavior({
        	  onTouchEnded: function(content, id, x, y, ticks) {
        		  plantLive.plant = plant;
        		  plantLive.refresh();
        		  screenUtils.showPlantLive();
        	  }
          })
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
	refresh();
	return screen;
}

export function refresh() {
	if (!screen || !plant) {
		return;
	}
	
	if (screen.middle.picture.url != plant.plantType.image) {
		screen.middle.picture.url = plant.plantType.image;
	}
	screen.header.label.string = plant.plantType.name;
	screen.plantInfo.column.label2.string = "Watered " + plant.getWateredTimeStr() + " ago";
	screen.plantInfo.column.label3.string = "Planted " + plant.getPlantedTimeStr() + " ago";
	
	var waterAmountBar = screen.plantInfo.waterContainer.amountBar;
	var waterFrontBar = waterAmountBar.frontBar;
	waterAmountBar.remove(waterFrontBar);
	waterAmountBar.add(new FrontBar({ width: waterAmountBar.width * plant.waterLevels }));
	
	var nutritionAmountBar = screen.plantInfo.nutritionContainer.amountBar;
	var nutritionFrontBar = nutritionAmountBar.frontBar;
	nutritionAmountBar.remove(nutritionFrontBar);
	nutritionAmountBar.add(new FrontBar({ width: nutritionAmountBar.width * plant.nutrientLevels }));
	
	var sunlightAmountBar = screen.plantInfo.sunlightContainer.amountBar;
	var sunlightFrontBar = sunlightAmountBar.frontBar;
	sunlightAmountBar.remove(sunlightFrontBar);
	sunlightAmountBar.add(new FrontBar({ width: sunlightAmountBar.width * plant.sunlightLevels }));
}

export function waterPlant() {
	if (!plant) {
		return;
	}
	plant.water();
	refresh();
}

export function feedPlant() {
	if (!plant) {
		return;
	}
	plant.nutrients();
	refresh();
}

export function lightPlant() {
	if (!plant) {
		return;
	}
	plant.light();
	refresh();
}