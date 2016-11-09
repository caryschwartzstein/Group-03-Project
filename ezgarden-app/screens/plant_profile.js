import { Button, ButtonBehavior } from '../libraries/buttons';
import * as screenUtils from '../screen_utils';
import * as assets from "../assets";
import * as notifications from 'notifications';

let blueButtonSkin = new Skin({ fill: '#56CCF2' }); 
let graySkin = new Skin({ fill: '#C4C4C4' });		// Gray notification from Figma
let whiteSkin = new Skin({ fill: 'white' });
let appSkin = new Skin({ fill: '#F2F2F2' });		// Gray background color from Figma
let topSkin = new Skin({ fill: '#6FCF97' });		// Green header color from Figma
let greenText = new Style({ font: "20px segoe script", color: '#66cc66' });
let blackText = new Style({ font: "bold 32px segoe script", color: "black" });
let blackText2 = new Style({ font: "20px arial", color: "black" });
let blackText3 = new Style({ font: "bold 18px arial", color: "black" });
let titleText = new Style({ font: "30px ribeye marrow", color: "black" });

let smallBlackText = new Style({ font: "14px arial", color: "black" });
let buttonStyle = new Style({font: '20px', color: 'black', left: 4, right: 4, top: 4, bottom: 4});
let buttonSkin = new Skin ({fill: 'white', borders: {left: 1, right: 1, top: 1, bottom: 1}, 
    stroke: "black"});


let WaterButton = Container.template($ =>({
  exclusiveTouch: true, active: true, left: 0, bottom: 0, top: 0, right: 0,
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: "water", height: 30, width: 100, style: blackText2
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
    	screenUtils.showPopup(new notifications.WateredPopup({ closeFunc: screenUtils.closePopups }));
    }
  })
}));

let BlueButton = Container.template($ =>({
  exclusiveTouch: true, active: true, left: 0, bottom: 0, top: 0, right: 0,
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: $.string, height: 30, style: blackText2, width: 100,
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
    }
  })
}));

let PlantInformation = Column.template($ => ({
    top: 20, bottom: 0, left: 0, right: 0, height: 200, skin: whiteSkin, active: true,
    contents: [
      new Line({ 
         left: 0, right: 0, top: 10,
         contents:[
           new Column({ top: 0, bottom: 0, left: 0, right: 0, 
             contents: [
               new Label({ style: greenText, left: 10, right: 0,
                 top: 10, string: "Plant Information"}),
               new Label({  
                 left: 0, right: 0, bottom: 5, style: smallBlackText, 
                 string: "Last watered: 6 hours ago"}),
               new Label({  
                 left: 0, right: 0, bottom: 10, style: smallBlackText, 
                 string: "Planted: 2 weeks ago"}),
             ]
           }),
           new Label({ style: new Style({ font: "18px segoe script", color: '#66cc66' }), left: 0, right: 0,
              top: 10, string: "More Info"}),
         ]
      }),
      new Line({ 
         left: 0, right: 0, bottom: 20, top: 0,
         contents:[
           new Column({ top: 0, bottom: 0, left: 0, right: 0, 
             contents: [
               new Label({ style: greenText, left: 10, right: 0,
                 top: 10, string: "Care Tips"}),
               new Label({  
                 left: 0, right: 0, bottom: 5, style: smallBlackText, 
                 string: "Plant indoors"}),
               new Label({  
                 left: 0, right: 0, bottom: 10, style: smallBlackText, 
                 string: "Trim plant"}),
             ]
           }),
           new Label({ style: new Style({ font: "18px segoe script", color: '#66cc66' }), left: 0, right: 0,
              top: 10, string: ""}),
         ]
      })
    ]
}));

export var ImgButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, left: 3, right: 3, width: 30,
    behavior: Behavior({
        onTouchEnded: function(content){
        	$.nextScreenFunc();
        },
    }),
   contents: [ new Picture({ height: 30, url: $.url  }) ]
}));

var PlantProfileScreen = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
       new Line({ 
         left: 0, right: 0, top: 10, bottom: 0, height: 30, 
         contents:[
            new ImgButton({ url: assets.images.home2, nextScreenFunc: screenUtils.showHome }),
            new Label({ width: 200, left: 0, right: 0, top: 0, bottom: 0, style: titleText, string: "Rosemary #1" }),
         ]
      }),
      new Line({ 
         left: 20, right: 20, top: 10, height: 2, skin: new Skin({ fill: '#66cc66' }) 
      }),
      new Line({ 
          name: 'middle',
          height: 170, top: 10,
          contents: [
            new Picture({height: 150, width: 100, url: assets.images.rosemaryPot}),
            new Picture({top: 130, height: 40, width: 40, url: assets.images.magGlass, active: true, 
              behavior: Behavior({
                onTouchEnded: function(content, id, x, y, ticks) {
                	screenUtils.showPlantLive();
                }
              })
            }),
            new Column({
              name: "buttons",
              left: 30,
              right: 0,
              bottom: 10,
              top: 30,
              contents: [
                new WaterButton({skin: blueButtonSkin}),
                new BlueButton({skin: blueButtonSkin, string: "sunlight" }),
                new BlueButton({skin: blueButtonSkin, string: "nutrients"})
              ]
            })
          ]
      }),
      new PlantInformation()
    ]
}));

var screen = null;
export function getScreen() {
	if (screen) {
		return screen;
	}
	screen = new PlantProfileScreen();
	return screen;
}