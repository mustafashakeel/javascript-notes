## Window Objetct


* Window object is a `global object` with properties and methods for `client-side JS programming`.
* The window object represents a window `containing a DOM document`.
* Window object like other object `has properties` (prop/methods), such as:

    - window (points to the window object itself),
    - document (which refers to Document Object),
    - history (refer to History object), Navigator object,...

> so for example we can say that Document object (refers to DOM) is also a `property of the Window object`.

* the window object is `not shared between tabs` in the same window.
* each tab is an `'independent browsing context'` and each has its own Window object and are `isolated` form all the others.
* `windows`, `tabs` and `iframes` all are browsing contexts and to JS they are all `Window objects`.
* if the document contains nested documents (using <iframe> elements) --> then the nested browsing contexts `are not isolated` from one another.
* note that Window object represents a `top-level window or tab`. its parent simply refers to window itself.

```js
console.log(window.parent === window.window); // true
console.log(window.window === self); // true

// note that for simplicity the 'window' word can be omitted (e.g: window.document = document)
console.log(parent === self); // true

// each variable that we define (globally) is nothing more than a property of the Window object (as a global object).
var myVal = 10;
console.log(window.myVal); // 10
```

#### Window Timers

> `setTimeOut()` and `setInterval()` --> allow us to register a function to be invoked once or repeatedly after a specified amount of time has elapsed.

* they are defined as methods of Window object so these methods are global functions of client-side JS.
* `'setInterval()'` -> calls a function (or evaluate an expression) at `specific intervals` in milliseconds (using `clearInterval()` to stop calling - cancel invocations)
* Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call. Returns an `intervalID`. intervalID is a unique interval ID you can `pass to clearInterval()`.


##### var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
##### var intervalID = window.setInterval(code, delay);

* `'setTimeOut()'` -> calls a function after a specific number of milliseconds as delay (using `clearTimeOut()` to stop calling)

> remember that Document object is a part of the Window object.

```html
<input type="text" id="clock">
<button onclick="stopIntv();">STOP INTERVAL</button>
<br>

<p>click to cancel timer before it executes</p>
<button onclick="stopTimer();">STOP TIMEOUT</button>
<br>

<button onclick="confirmBtn();">CONFIRM?</button>
<br>

<input type="button" id="btnShow" value="SHOW POSITION"/><br/>
<label id="lblLocation" for=""></label><br/>
<i id="loading" class="fa fa-circle-o-notch fa-2x"></i>
<br>

<input type="button" id="btnMap" value="SHOW MAP IMAGE"/><br/>
<div id="mapLoader"></div>
```

```js
var myIntervalID = window.setInterval(myCallback, 1000);

function myCallback() {
    var date = new Date();
    var elm = document.getElementById("clock");
    return elm.value = date.toLocaleTimeString();
}

function stopIntv(){
    clearInterval(myIntervalID);
}

// showing alert box after 3 seconds
timeoutID = window.setTimeout(slowAlert, 3000);

function slowAlert() {
 alert("That was really slow!");
}

function stopTimer(){
 clearTimeout(timeoutID);
}

// dialogBoxes (alert,confirm,prompt)
function confirmBtn(){
    var txt;
    var result = confirm("CLOSE THIS WINDOW (tab)?");
    if (result == true){
        txt = "You've pressed OK button";
        alert(txt);
        window.close();
    }else{
        txt = "You Cancel me!";
        alert(txt);
    }
}


// window.open
myWindow = window.open("","","width=200, height=200");
myWindow.focus();
//var myWindow = window.open("","_blank");
//var myWindow = window.open("","_self");


// WINDOE SIZES
// browser 'viewport' excluding toolbars and scrollbars - only content area
console.log(window.innerWidth); //  (NOT including toolbars/scrollbars):
console.log(window.innerHeight); //


// WINDOW NAVIGATOR
console.log(window.navigator.userAgent);
console.log(window.navigator.appCodeName);
console.log(window.navigator.appName);
console.log(window.navigator.appVersion);
console.log(window.navigator.platform);

// WINDOW GEOLOCATION

document.getElementById('btnShow').onclick = showLocation;
document.getElementById('btnMap').onclick = showOnMap;

$('#loading').hide();

function showLocation(){
    if (window.navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        $('#loading').show();
    }else{
        document.getElementById('lblLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    $('#loading').hide();
    document.getElementById('lblLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br/>" + "Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('lblLocation').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('lblLocation').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('lblLocation').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('lblLocation').innerHTML = "An unknown error occurred.";
            break;
    }
}

function showOnMap(){
    if (window.navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocationMap);
    }else{
        document.getElementById('lblLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showLocationMap(position){
    var latlng = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlng+"&zoom=14&size=400x300&sensor=false";

    document.getElementById("mapLoader").innerHTML = "<img src='"+img_url+"'>";

    console.log("Speed: " + position.coords.speed);
    console.log("Accuracy: " + position.coords.accuracy);
    console.log("Heading: " + position.coords.heading);
    console.log("Date/Time: " + position.timestamp);
}
```

#### same-origin policy

* is a `sweeping security restriction` on what web content JS code can interact with.
* it typically comes into play `when a web page includes <iframe> elements`. --> in this case, same-origin policy governs the interactions of JS code in one window or frame `with content of other windows and frames`.
* the 'origin' of the document is defined as the `protocol`, `host` and `port` of the url from which the documents was loaded.

> note that documents loaded from different web servers have different origins and documents loaded through different ports of the same host, have different origins.

* the same-origin policy does `NOT` actually apply on all properties of all objects in a window `from a different origin`, but, it does apply to many of them (applies to practically all the properties of the `'Document objects'`).

> it's also recommended to use jQuery for DOM manipulations, but BTW, here are some fundamental of JS DOM methods and properties:

* when a HTML document is loaded into a web browser it becomes a 'Document object' --> this object is `'root node'` of all HTML document and it's owner of all nodes.

```js
// returns the number of anchors <a> in the document
// note that the <a> element must have a 'name attribute' otherwise will not be counted in this length property

console.log(window.document.anchors.length); // 1
console.log(document.baseURI); // http://localhost:63342/JavaScript/18-Document%20Object%20Model/index.html

console.log(document.doctype.name); // html
console.log(document.doctype); // <!DOCTYPE html>

console.log(document.documentElement.nodeName);
console.log(document.documentElement);
console.log(document.title);
console.log(document.URL);
console.log(document.readyState);
console.log(document.inputEncoding);
//
```
