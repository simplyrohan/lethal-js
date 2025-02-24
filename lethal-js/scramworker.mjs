import * as BareMux from 'https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux/dist/index.mjs';

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		worker: "/scram/scramjet.worker.js",
		client: "/scram/scramjet.client.js",
		shared: "/scram/scramjet.shared.js",
		sync: "/scram/scramjet.sync.js",
	}
});

scramjet.init();
navigator.serviceWorker.register("/lethal-js/worker.js");

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport/dist/index.mjs", [{ wisp: "wss://anura.pro/wisp" }]);


alert(scramjet.encodeUrl("https://google.com"));

document.querySelector("#frame").src = scramjet.encodeUrl("https://google.com");