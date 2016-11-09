 import {
    Button,
    ButtonBehavior
} from 'buttons';

// STYLES
let graySkin = new Skin({ fill: '#C4C4C4' });       // Gray notification from Figma
let whiteSkin = new Skin({ fill: 'white' });
let appSkin = new Skin({ fill: '#F2F2F2' });        // Gray background color from Figma
let topSkin = new Skin({ fill: '#6FCF97' });        // Green header color from Figma
// let popupSkin = new Skin({ fill: "#ff5656", borders: {left: 1, right: 1, top: 1, bottom: 1}, stroke: "#ff5656")};
let greenText = new Style({ font: "bold 28px segoe script", color: '#66cc66' });
let blackText = new Style({ font: "bold 32px segoe script", color: "black" });
let blackText2 = new Style({ font: "16px arial", color: "black" });
let blackText3 = new Style({ font: "18px arial", color: "black" });
let grayText = new Style({ font: "18px arial", color: "#757575" });
let redText = new Style({ font: "bold 24px arial", color: "red" });
let whiteText = new Style({ font: "22px arial", color: "white" });
let titleText = new Style({ font: "28px segoe script", color: "white" });

// IMAGES
let sunflower = new Picture({
    top: 0, left: 0, right: 0,
    width: 50,
    url: "assets/sunflower.png"
});

let rosemary = new Picture({
    top: 0, left: 0, right: 0,
    height: 50,
    url: "assets/rosemary.png"
});

let strawberry = new Picture({
    top: 0, left: 0, right: 0,
    width: 50,
    url: "assets/strawberryw.png"
});

// TEMPLATES
var StringTemplate = Text.template($ => ({
    left: 10, right: 10, top: 10, bottom: 0,
    style: $.style,
    string: $.string
}));

// When popups appear, their container.active variable must be set to true
let waterButton = Button.template($ => ({
    top: 10, left: 0, height: 40, width: 40, right: 20,
    contents: [
        new Label({
            // skin: topSkin,
            // top: 10, left: 0, height: 40, width: 40, right: 20,
            style: whiteText,
            string: "water"
        }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
         //if (wateredPopup.active) {
            application.add(wateredPopup);
         //}
         //if (notWateredPopup.active) { application.remove(notWateredPopup) }
         //wateredPopup.active = false;
         //notWateredPopup.active = false;
     }
    }
}));

let wateredPopup = new Container({
    left: 40, right: 40,
    /*skin = new Skin({
                fill: "#ff5656", // red
                borders: {left: 1, right: 1, top: 1, bottom: 1},
                stroke: "#ff5656"
    }), */
    contents: [
     new Column({
         left: 0, right: 0, top: 0, height: 60,
         contents: [
             new StringTemplate({ string: 'Congratulations!', style: grayText}),
             new StringTemplate({ string: 'You just watered your plant. You will need to water it again in 8 hours.', style: grayText }),
         ]
     }),
    ]
});

let notWateredPopup = new Container({
    left: 20, right: 20, top: 40, bottom: 60, skin: whiteSkin,
    active: true,
    contents: [
     new Column({
         left: 0, right: 0, top: 0, bottom: 70,
         contents: [
             new StringTemplate({ string: 'Whoops!', style: greenText}),
             new StringTemplate({ string: 'Are you sure you want to water your plant? It needs to be watered in 3 hours.', style: blackText3 }),
         ]
     }),
     new waterButton()
    ]
});

var notificationHeader = Container.template($ => ({
  name: 'header',
  left: 0, right: 0, top: 0, height: 50,
  skin: topSkin,
  contents: [
    new Line({
        top: 0, left: 10, bottom: 0, right: 0,
        contents: [
            new ImgButton({
                url: "assets/home.png",
                nextScreen: HomeScreen
            }),
            new Label({ top: 0, left: 0, bottom: 0, right: 0, style: titleText, string: "Notifications" }),
            new NavButton({ style: redText, string: "1", nextScreen: NotificationScreen }),
        ]
    }),
  ]
}));

let notification = Container.template($ => ({
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
                url: "assets/sunflower.png"
            }),
            new waterButton(),
            /* new Label({
                skin: topSkin,
                top: 10, left: 0, height: 40, width: 40, right: 20,
                style: grayText,
                string: "water"
            }), */
        ]
    }),
  ]
}));

var NavButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, width: 30,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                fill: "#ff5656", // red
                borders: {left: 1, right: 1, top: 1, bottom: 1},
                stroke: "#ff5656"
            });
            this.downSkin = new Skin({
                fill: "#ff5656",
                borders: {left: 1, right: 1, top: 1, bottom: 1},
                stroke: "#ff5656"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application
        },
    }),
   contents: [
        Label($, { top: 0, bottom: 0, left: 0, right: 0,
            style: whiteText,
            string: $.string})
   ]
}));

var ImgButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, width: 30,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                //fill: "transparent",
                // borders: {left: 1, right: 1, top: 1, bottom: 1},
                // stroke: "white"
            });
            this.downSkin = new Skin({
                //fill: "transparent",
                // borders: {left: 1, right: 1, top: 1, bottom: 1},
                // stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application
        },
    }),
   contents: [
        new Picture({
            top: 10,
            height: 30,
            url: $.url })
   ]
}));

var plantButton = Container.template($ => ({
    active: true, top: 10, left: 0, right: 0,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                fill: "transparent",
                // borders: {left: 1, right: 1, top: 1, bottom: 1},
                // stroke: "white"
            });
            this.downSkin = new Skin({
                fill: "transparent",
                // borders: {left: 1, right: 1, top: 1, bottom: 1},
                // stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application
        },
    }),
   contents: [
        new Picture({
            top: $.top, left: $.left, height: $.height,
            url: $.url })
   ]
}));


export var NotificationScreen = Column.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new notificationHeader(),
        new Column({
            top: 0, left: 0, bottom: 0, right: 0,
            contents: [
                new notification(),
                // new notification()
            ]
        }),
    ]
}));
