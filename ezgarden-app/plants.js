import * as assets from "assets";

function tipNeedsMoreWater() {
	return "Needs more water than most plants";
}

function tipNeedsLessWater() {
	return "Needs less water than most plants";
}

function tipNeedsSun(low, high) {
	return "Needs " + low + " - " + high + " hours of sunlight per day";
}

function tipLowSun(amount) {
	return "Can survive " + amount + " days with minimal sunlight";
}

export function PlantType(name, image, wateringTime) {
	this.name = name;
	this.image = image;
	this.wateringTime = wateringTime;
	this.isIndoor = false;
	this.shouldTrim = false;
	this.tips = [];
}

export function Plant(plantType) {
	this.plantType = plantType;
}

export function Garden(plants) {
	if (!plants) {
		plants = [];
	}
	this.plants = plants
}

export var plantTypes = [];
let rosemary = new PlantType("Rosemary", assets.images.rosemaryPot, 24);
rosemary.tips.push(tipNeedsMoreWater());
rosemary.tips.push(tipNeedsSun(6, 10));
plantTypes.push(rosemary);

let basil = new PlantType("Basil", assets.images.basil, 22);
basil.tips.push(tipNeedsSun(7, 8));
plantTypes.push(basil);

let cactus = new PlantType("Cactus", assets.images.cactus, 60);
plantTypes.push(cactus);

let dandelion = new PlantType("Dandelion", assets.images.dandelion, 60);
plantTypes.push(dandelion);

let rose = new PlantType("Rose", assets.images.rose, 24);
plantTypes.push(rose);

let strawberry = new PlantType("Strawberry", assets.images.strawberry, 14);
plantTypes.push(strawberry);

let watermelon = new PlantType("Watermelon", assets.images.watermelon, 10);
plantTypes.push(watermelon);

export var plantTypesMap = {}
for (let i = 0; i < plantTypes.length; i++) {
	plantTypesMap[plantTypes[i].name] = plantTypes[i];
}

export var gardens = [];
gardens.push(new Garden([new Plant(rosemary)]));
gardens.push(new Garden([new Plant(strawberry), new Plant(strawberry)]));
gardens.push(new Garden());