import * as assets from "../assets";

export var picture = new Picture({ left: 0, url: assets.images.cactus })
export var screen = new Column({ left: 0, top: 0, right: 0, bottom: 0,
	skin: assets.sampleSkin,
	contents: []
});

import {
	Button,
	ButtonBehavior
} from 'buttons';

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


var StringTemplate = Text.template($ => ({
	left: 10, right: 10, top: 10, bottom: 0,
	style: $.style,
	string: $.string
}));


let backButton = Container.template($ =>({
  exclusiveTouch: true, active: true, left: 10, bottom: 0, top: 0, right: 0,
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: "Back", style: buttonStyle
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
      application.remove(currentScreen);
      currentScreen = new PlantProfileScreen;
      application.add(currentScreen);
    }
  })
}));

let waterButton = Container.template($ =>({
  exclusiveTouch: true, active: true, left: 0, bottom: 0, top: 0, right: 0,
  contents:[
    Label($, {
      hidden: false, skin: $.skin, string: "water", height: 30, width: 100, style: blackText2
    })
  ],
  behavior: Behavior({
    onTouchEnded(container, id, x, y, ticks) {
    }
  })
}));

let blueButton = Container.template($ =>({
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

var LiveScreen = Column.template($ => ({
  top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
      new Line({ 
          name: 'liveHeader',
          height: 60,
          contents: [
             new backButton({skin: buttonSkin}),
             new Label({ style: new Style({font: 'bold 25px', color: 'black'}), 
               left: 30, height: 50, string: "Rosemary #1 Live"})
      ] }),
      new Line({ 
         left: 20, right: 20, top: 10, height: 2, skin: new Skin({ fill: '#66cc66' }) 
      }),
      new Picture({ left: 0, top: 10, bottom: 0, right: 0, url: "assets/rosemary.jpg" })  
    ]
}));


var PlantProfileScreen = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, 
    skin: whiteSkin,
    contents: [
       new Line({ 
         left: 0, right: 0, top: 10, bottom: 0, height: 10,
         contents:[
            new Content({ left: 20, right: 10, top: 0, bottom: 0, 
                          skin: new Skin({ fill: 'black' }) }),
            new Label({ width: 130, left: 0, right: 0, top: 0, bottom: 0, style: titleText, string: "Rosemary #1"}),
            new Content({ left: 10, right: 20, top: 0, bottom: 0, 
                          skin: new Skin({ fill: 'red' }) }),
         ]
      }),
      new Line({ 
         left: 20, right: 20, top: 10, height: 2, skin: new Skin({ fill: '#66cc66' }) 
      }),
      new Line({ 
          name: 'middle',
          height: 170, top: 10,
          contents: [
            new Picture({height: 150, width: 100, url: "assets/rosemary.png"}),
            new Picture({top: 130, height: 40, width: 40, url: "assets/mag_glass.png", active: true, 
              behavior: Behavior({
                onTouchEnded: function(content, id, x, y, ticks) {
                  //application.remove(currentScreen);
                  //currentScreen = new LiveScreen;
                  //application.add(currentScreen);
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
                new waterButton({skin: blueButtonSkin}),
                new blueButton({skin: blueButtonSkin, string: "sunlight" }),
                new blueButton({skin: blueButtonSkin, string: "nutrients"})
              ]
            })
          ]
      }),
      new PlantInformation()
    ]
}));

export var currentScreen = new PlantProfileScreen();