var scramjet;
export async function initSJ() {
    scramjet = new ScramjetController({
        files: {
            wasm: "/scram/scramjet.wasm.wasm",
            worker: "/scram/scramjet.worker.js",
            client: "/scram/scramjet.client.js",
            shared: "/scram/scramjet.shared.js",
            sync: "/scram/scramjet.sync.js",
        }
    });
    scramjet.init("./lethal-js/scramworker.js");

    const stockSW = "./lethal-js/scramworker.js";
    const swAllowedHostnames = ["localhost", "127.0.0.1"];
    async function registerSW() {
        if (!navigator.serviceWorker) {
            if (
                location.protocol !== "https:" &&
                !swAllowedHostnames.includes(location.hostname)
            )
                throw new Error("Service workers cannot be registered without https.");

            throw new Error("Your browser doesn't support service workers.");
        }

        await navigator.serviceWorker.register(stockSW);
    }
    await registerSW(); // Register the service worker
    console.log('lethal.js: Service Worker registered');
}

export async function encodeSJ(input) {
    return await scramjet.encodeUrl(input);
}