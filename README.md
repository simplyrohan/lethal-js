# lethal-js
A clean framework for creating web-proxies with just 4 lines of code

# Usage
```js
import { setTransport, setWisp, makeURL, getProxied } from '/lethal-js/lethal.mjs'

const frame = document.getElementById('frame');

setTransport('epoxy');
setWisp('wss://wisp.mercurywork.shop/wisp/');

frame.src = await getProxied(makeURL('Hello World!'));
```

See `example.html` for more.