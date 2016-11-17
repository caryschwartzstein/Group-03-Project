export var remoteUrl = null;
var handlerMap = {};
var threadCount = 1;

export function discoverDevice(deviceId) {
	application.shared = true;
	application.discover(deviceId);
	Handler.bind("/discover", Behavior({
	    onInvoke: function(handler, message){
	    	trace("Discovered: " + deviceId + "\n");
	    	remoteUrl = JSON.parse(message.requestText).url;
	    }
	}));
}

export function sendMessage(id, args) {
	sendMessageHelper("/" + id, args);
}

export function sendRemoteMessage(id, args) {
	sendMessageHelper(remoteUrl + id, args);
}

function sendMessageHelper(id, args) {
	if (!args) {
		args = {};
	}
	new Message(id + "?" + serializeQuery(args)).invoke();
}

export function onInvoke(id, func) {
	id = "/" + id;
	let behavior = null;
	if (!handlerMap[id]) {
		behavior = Behavior();
		handlerMap[id] = behavior
		Handler.bind(id, behavior);
	}
	behavior = handlerMap[id];
	behavior.onInvoke = function(handler, message) {
		var args = parseQuery(message.query);
    	func(handler, args);
	}
}

export function onComplete(id, func) {
	id = "/" + id;
	let behavior = null;
	if (!handlerMap[id]) {
		behavior = Behavior();
		handlerMap[id] = behavior
		Handler.bind(id, behavior);
	}
	behavior = handlerMap[id];
	behavior.onComplete = function(handler, message) {
		// TODO: can onComplete ever pass args?
		//var args = parseQuery(message.query);
		var args = {};
    	func(handler, args);
	}
}

export function repeatingThread(repeatDelay, func) {
	let tid = "thread" + threadCount;
	threadCount++;
	onInvoke(tid, function(handler, args) {
		func();
	    handler.wait(2000);
	});
	onComplete(tid, function(handler, args) {
		sendMessage(tid);
	});
	sendMessage(tid);
}
