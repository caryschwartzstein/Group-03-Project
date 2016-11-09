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

export var plantTypes = [];
let plant = new PlantType("Sunflower", assets.images.sunflower, 24);
plant.tips.push(tipNeedsMoreWater());
plant.tips.push(tipNeedsSun(6, 10));
plantTypes.push(plant);

plant = new PlantType("Basil", assets.images.basil, 22);
plant.tips.push(tipNeedsSun(7, 8));
plantTypes.push(plant);

plant = new PlantType("Cactus", assets.images.cactus, 60);
plantTypes.push(plant);

plant = new PlantType("Rose", assets.images.rose, 24);
plantTypes.push(plant);

plant = new PlantType("Strawberry", assets.images.strawberry, 14);
plantTypes.push(plant);

plant = new PlantType("Watermelon", assets.images.watermelon, 10);
plantTypes.push(plant);

export var plantTypesMap = {}
for (let i = 0; i < plantTypes.length; i++) {
	plantTypesMap[plantTypes[i].name] = plantTypes[i];
}