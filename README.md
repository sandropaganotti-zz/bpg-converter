## This library enable BPG support in the browser, it is based on ServiceWorker and it fallbacks nicely on unsupported browsers.
BPG Converter installs a ServiceWorker that enables the browser to transparently convert [BPG images](http://bellard.org/bpg/) 
to PNG. Images encoded with BPG are super small while extremely detailed - [visual comparison](http://webencoder.libbpg.org/).

## Demo
Launch the __[demo of BPG-Converter](https://sandropaganotti.github.io/bpg-converter/app/index.html)__ and check 
the DevTools, this is more or less what you'll see on the first access, when the ServiceWorker is still being activated:

![First Load](http://i.imgur.com/TRGzZkOl.png)

Now reload the page, now the ServiceWorker is active and you'll see something like this

![with ServiceWorker](http://i.imgur.com/qSq8bAIl.png)

The same image in BPG is just 15Kb, compared to 1Mb of the PNG counterpart!

## Installing
* Download the package using `npm install bpg-converter --save`
* Create a `worker.js` file in the root of your project containing:
```
importScripts('node_modules/bpg-converter/app/dist/bpg-converter.js');
```
* Register the Service Worker from your app using the following code:
```
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {scope: '/'});
}
```
* Done! Have a look at the next session to learn how to properly setup the images.

## How it works
Every time a request is issued for an image with extension `.bpg.png` the ServiceWorker intercepts the request and
looks for the same image without the `.png` extension - so if the request is for `someimage.bpg.png` the server will 
receive an HTTP GET for `someimage.bpg`. 
It is important to have both the `.bpg.png` and the `.bpg` version on the server in order to be able to deal with browsers 
that does not support ServiceWorker or to serve images on first access, when the ServiceWorker is still not active.

## Kudos
* Fabrice Bellard - BPG - [http://bellard.org/bpg/](http://bellard.org/bpg/)
* todataurl-png-js - [https://code.google.com/p/todataurl-png-js/](https://code.google.com/p/todataurl-png-js/)