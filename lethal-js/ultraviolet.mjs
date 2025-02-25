export async function initUV() {
    await import('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet/dist/uv.bundle.js');
    // UV Config
    await import('./uv.config.js');

    const stockSW = "./lethal-js/ultraworker.js";
    const swAllowedHostnames = ["localhost", "127.0.0.1"];
    if (!navigator.serviceWorker) {
        if (
            location.protocol !== "https:" &&
            !swAllowedHostnames.includes(location.hostname)
        )
            throw new Error("Service workers cannot be registered without https.");

        throw new Error("Your browser doesn't support service workers.");
    }

    await navigator.serviceWorker.register(stockSW);
    console.log('lethal.js: Service Worker registered');
}

export async function encodeUV(input) {
    return __uv$config.prefix + __uv$config.encodeUrl(input);
}