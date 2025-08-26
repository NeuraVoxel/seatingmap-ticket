importScripts('pako_deflate.min.js');

onmessage = function(e) {
    postMessage(pako.deflate(e.data));
};