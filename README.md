# lethal-js
A clean framework for creating web-proxies with just 4 lines of code

# Usage
```js
const frame = document.getElementById('frame');
        
setTransport('epoxy'); // You can also use 'libcurl' or supply your own path/url
setWisp('wss://your.wisp.server/wisp/');

frame.src = await getProxied('https://www.google.com')
```

See `example.html` for more.