import { Button, ButtonBehavior } from "libraries/buttons";

export var images = {};

// Load all of the images from the images directory
var imagesPath = mergeURI(application.url, "images/");
var info, iterator = new Files.Iterator(imagesPath);
while (info = iterator.getNext()) {
	let fullPath = imagesPath + info.path;
    if (Files.fileType == info.type) {
    	let imageName = info.path.substr(0, info.path.lastIndexOf('.'));
    	images[imageName] = fullPath;
    }
}

// Skins
export var sampleSkin = new Skin({ fill: "#FF6868", stroke: "#000000",
	borders: { left: 0, top: 0, right: 0, bottom: 1 }});
export var whiteSkin = new Skin ({fill: 'white'});
export var blueSkin = new Skin ({fill: '#3498db'});
export var greenSkin = new Skin ({fill: '#66cc66'});
export var topSkin = new Skin({ fill: '#6FCF97' })

// Styles
export var sampleStyle = new Style({ font: "bold 18px Arial", color: "black", horizontal: "left" });

//Texts
export var greenText = new Style({ font: "20px", color: "#66cc66" });
export var blackText3 = new Style({ font: "bold 18px arial", color: "black" });
export var blackText = new Style({ font: "bold 32px segoe script", color: "black" });
export var whiteText = new Style( { font: "20px", color: "white"});
export var titleText = new Style({ font: "28px segoe script", color: "white" });

// Templates
export var NavButton = Container.template($ => ({
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
            //content.skin = this.upSkin;
            //currentScreen = new $.nextScreen;
            //application.remove(application.first);
            //application.add($.nextScreenFunc());
        	$.nextScreenFunc();
        },
    }),
   contents: [
        Label($, { top: 0, bottom: 0, left: 0, right: 0,
            style: whiteText,
            string: $.string
        })
   ]
}));

export var Header = Container.template($ => ({
	name: 'header',
	left: 0, right: 0, top: 0, height: 50,
	skin: topSkin,
	contents: [
	    new Line({ top: 0, left: 10, bottom: 0, right: 0,
	        contents: [
	            $.leftElement,
	            new Label({ top: 0, left: 0, bottom: 0, right: 0, style: titleText, string: $.string }),
	            $.rightElement
	        ]
	    }),
	  ]
}));

export var ImgButton = Container.template($ => ({
    active: true, top: 0, bottom: 0, width: 30,
    behavior: Behavior({
        onTouchEnded: function(content){
        	$.nextScreenFunc();
        },
    }),
   contents: [ new Picture({ top: 10,  height: 30, url: $.url  }) ]
}));

