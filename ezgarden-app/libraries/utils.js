import { 
	FieldScrollerBehavior,
	FieldLabelBehavior
} from 'field';
import { SystemKeyboard } from 'keyboard';

let fieldStyle = new Style({color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: 'gray', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});

let nameInputSkin = new Skin({fill: "white", borders: {left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray'});
let whiteSkin = new Skin({fill: "white"});
let fieldLabelSkin = new Skin({ fill: ['#black', '#red', '#C0C0C0', '#acd473'] });

export var FieldTemplate = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0,
	active: true,
	visible: false,
	contents: [
			new Container({
			name: "holder",
		    width: 250, height: 36, skin: nameInputSkin, contents: [
		        Scroller($, {
		        	name: "scroller",
		            left: 4, right: 4, top: 2, bottom: 2, active: true, 
		            Behavior: FieldScrollerBehavior, clip: true, 
		            contents: [
		                Label($, {
		                	name: "label",
		                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
		                    style: fieldStyle, anchor: 'NAME',
		                    editable: true,
		                    Behavior: class extends FieldLabelBehavior {
		                        onEdited(label) {
		                            let data = this.data;
		                            data.name = label.string;
		                            label.container.hint.visible = (data.name.length == 0);
		                        }
		                    },
		                }),
		                Label($, {
		                    left: 0, right: 0, top: 0, bottom: 0, style: fieldHintStyle,
		                    string: "Enter amount", name: "hint"
		                }),
		            ]
		        })
		    ]
		})
	]
}));