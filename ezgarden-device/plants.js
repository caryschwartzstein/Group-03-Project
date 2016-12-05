import * as assets from "assets";

export var plantTypes = [];
export var plantTypesMap = {};
export var plantsMap = {};
export var gardens = [];
export var gardensMap = {};

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
	this.wateringTime = (wateringTime * 60 * 60 * 1000);
	this.isIndoor = false;
	this.shouldTrim = false;
	this.tips = [];
}

export function Plant(plantType) {
	this.id = generateUUID();
	this.plantType = plantType;
	// Just an example starting time
	this.wateredTime = new Date().getTime() - Math.random() * (4 * 60 * 60 * 1000);
	this.plantedTime = new Date().getTime() - Math.random() * (100 * 60 * 60 * 1000);
	this.waterLevels = 1;
	this.nutrientLevels = 1;
	this.sunlightLevels = 1;
	plantsMap[this.id] = this;
}

export function Garden(plants) {
	if (!plants) {
		plants = [];
	}
	this.id = generateUUID();
	this.plants = plants;
	gardensMap[this.id] = this;
}

/*
 * A serialized plant that was communicated between the device and app
 * becomes broken and cannot utilize its functions. This method creates
 * a cloned plant to mimic the broken plant.
 */
export function clonePlant(plant) {
	var clonedPlant = new Plant(plantTypesMap[plant.plantType.name]);
	clonedPlant.id = plant.id;
	trace("Cloned wateredTime: " + plant.wateredTime + " " + typeof(plant.wateredTime) + "\n");
	clonedPlant.wateredTime = plant.wateredTime;
	clonedPlant.plantedTime = plant.plantedTime;
	clonedPlant.waterLevels = plant.waterLevels;
	clonedPlant.nutrientLevels = plant.nutrientLevels;
	clonedPlant.sunlightLevels = plant.sunlightLevels;
	plantsMap[clonedPlant.id] = clonedPlant;
	return clonedPlant;
}

Plant.prototype.water = function() {
	this.wateredTime = new Date();
	this.waterLevels = 1;
}

Plant.prototype.nutrients = function() {
	this.nutrientLevels = 1;
}

Plant.prototype.light = function() {
	this.sunlightLevels = 1;
}

Plant.prototype.getWateringTimeStr = function(factor) {
	if (factor == null) {
		factor = this.waterLevels;
	}
	return formatTimeStr(this.plantType.wateringTime * factor);
}

Plant.prototype.getWateredTimeStr = function() {
	return formatTimeStr(new Date().getTime() - this.wateredTime);
}

Plant.prototype.getPlantedTimeStr = function() {
	return formatTimeStr(new Date().getTime() - this.plantedTime);
}

Plant.prototype.getWateringTimeStrShort = function(factor) {
	let wateringTime = this.getWateringTimeStr();
	let spaceIndex = wateringTime.indexOf(" ");
	let wateringTimeShort = wateringTime.substr(0, spaceIndex) + wateringTime[spaceIndex + 1];
	return wateringTimeShort;
}

function formatTimeStr(time) {
	let str = "";
	let num = 0;
	if (time < (60 * 1000)) {
		str = "second";
		num = parseInt(time / 1000);
	} else if (time < (60 * 60 * 1000)) {
		str = "minute";
		num = parseInt(time / (60 * 1000));
	} else if (time < (24 * 60 * 60 * 1000)) {
		str = "hour";
		num = parseInt(time / (60 * 60 * 1000));
	} else if (time < (7 * 24 * 60 * 60 * 1000)) {
		str = "day";
		num = parseInt(time / (24 * 60 * 60 * 1000));
	} else if (time < (12 * 7 * 24 * 60 * 60 * 1000)) {
		str = "week";
		num = parseInt(time / (7 * 24 * 60 * 60 * 1000));
	} else{
		str = "month";
		num = parseInt(time / (12 * 7 * 24 * 60 * 60 * 1000));
	}
	if (!num) {
		num = 0;
	}
	if (num != 1) {
		str += "s";
	}
	return num + " " + str;
}

function generateUUID() {
	/* Found at: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript */ 
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}

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

for (let i = 0; i < plantTypes.length; i++) {
	plantTypesMap[plantTypes[i].name] = plantTypes[i];
}

//gardens.push(new Garden([new Plant(rosemary)]));
gardens.push(new Garden([new Plant(strawberry), new Plant(rosemary), new Plant(strawberry)]));
//gardens.push(new Garden());