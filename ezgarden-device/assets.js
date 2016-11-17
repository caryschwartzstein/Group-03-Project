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
export var topSkin = new Skin({ fill: '#6FCF97' })

//Texts
export var titleText = new Style({ font: "28px segoe script", color: "white" });

export var Header = Container.template($ => ({
	name: 'header',
	left: 0, right: 0, top: 0, height: 30,
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
        	$.callFunc();
        },
    }),
   contents: [ new Picture({ left: 0, right: 0, top: 1, height: 30, url: $.url  }) ]
}));

