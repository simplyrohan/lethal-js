// Ultraviolet
import { encodeUV, initUV } from './ultraviolet.mjs';
// Scramjet
import { encodeSJ, initSJ } from './scramjet.mjs';

// BareMux
import * as BareMux from 'https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux/dist/index.mjs';

const connection = new BareMux.BareMuxConnection("/lethal-js/bareworker.js");

let proxy = null;
let wispURL = null; // Not exported because it needs to be set through `setWisp`
let transportURL = null; // Not exported because it needs to be set through `setTransport`

/**
 * Convert and any search/url bar input into a formatted URL ready for use
 * @param {string} input - The inputed search terms, URl, or query
 * @param {string} template - The search engine prefix
 * @returns {string} - The proccessed output URL 
 */
export function makeURL(input, template = 'https://www.google.com/search?q=%s') {
    try {
        return new URL(input).toString();
    } catch (err) { }

    try {
        const url = new URL(`http://${input}`);
        if (url.hostname.includes(".")) return url.toString();
    } catch (err) { }

    return template.replace("%s", encodeURIComponent(input));
}

/**
 * Set the proxy method for the connection (`uv` for Ultraviolet, `sj` for Scramjet)
 * @param {string} method - The proxy method to use (`'uv'` or `'sj'`)
*/
export async function setProxy(method) {
    proxy = method;

    if (method == 'uv') {
        await initUV();
    }
    else if (method == 'sj') {
        await initSJ();
    }
    else {
        console.error('lethal.js: Invalid proxy method ' + method);
    }
}
await setProxy('uv'); // Default to Ultraviolet

async function updateBareMux() {
    if (transportURL != null && wispURL != null) {
        console.log(`lethal.js: Setting BareMux to ${transportURL} and Wisp to ${wispURL}`);
        await connection.setTransport(transportURL, [{ wisp: wispURL }]);
    }
}

// Transport options
const transportOptions = {
    "epoxy": "https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport/dist/index.mjs",
    "libcurl": "https://cdn.jsdelivr.net/npm/@mercuryworkshop/libcurl-transport/dist/index.mjs"
}
/**
 * Select the transport method for the connection
 * @param {string} transport - The transport method to use (`'epoxy'`, `'libcurl'`, path to MJS or URL)
*/
export async function setTransport(transport) {
    console.log(`lethal.js: Setting transport to ${transport}`);
    // Epoxy or libcurl options
    transportURL = transportOptions[transport];
    if (!transportURL) {
        transportURL = transport;
    }

    await updateBareMux();
}
export function getTransport() {
    return transportURL;
}

// Wisp options
/**
 * 
 * @param {string} wisp - The WebSocket URL for the Wisp (eg. `'wss://your.wisp.server/wisp/'`)
 */
export async function setWisp(wisp) {
    console.log(`lethal.js: Setting Wisp to ${wisp}`);
    wispURL = wisp;

    await updateBareMux();
}
export function getWisp() {
    return wispURL;
}

// Main Ultraviolet function
/**
 * Get the Proxied URL for a given input
 * @param {string} input - The inputed search terms, URl, or query
 * @returns {string} - The proxied URL (viewable in an iframe)
 */
export async function getProxied(input) {
    let url = makeURL(input, 'https://www.google.com/search?q=%s');

    if (proxy == 'uv') {
        return await encodeUV(url);
    }
    if (proxy == 'sj') {
        return await encodeSJ(url);
    }

    return viewUrl;
}