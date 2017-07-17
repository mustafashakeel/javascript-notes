## Storage

> web applications can use browser APIs to store data locally on the user's computer (give the web browser a memory!)

* client-side storage is `segregated by origin` (pages from one site can not read the data stored by pages from another site).
* Storage object is a `persistent associative array` that maps string keys to string values.

#### localStorage and sessionStorage

* difference between `localStorage` and `sessionStorage` has to do with `'life-time'` and `'scope'` --> `'how long'` data is saved and for `'who'` the data is accessible to.
* note that `browsers only allows to store strings` (if we want to store any other type we need to encode and decode by ourself programmatically).
* data stored through localStorage is `permanent` (it does not expire and remains stored on the user's computer), until web app delete it or manually delete by the user.

> localStorage is scoped to the `document origin`.

* remember that in same-origin policy document is defined by its `protocol`, `hostname` and `port`.
* all documents with the same origin `share the same localStorage data` (regardless of the script that actually access localStorage).
* documents with different origins can `never` read or write or overwrite each other's data.

> localStorage is also scoped by `browser vendor`.

* for example we visit a site with Firefox and then visit again using Chrome. so the data stored in the visit with Firefox will not be accessible during the second visit by Chrome.

```js
// localStroage syntax:
myStorage = localStorage;

// sessionStorage syntax:
// Save data to sessionStorage
window.sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
var data = sessionStorage.getItem('key');
```

> both local and session storages are scoped to the document origin so that documents with different origins will never share storage.

* in addition of this matter, sessionStorage also is scoped on a per-window basis
* it means that if a user has 2 browser tabs displaying documents from same origins -> those 2 tabs have `separate sessionStorage` data.

> data stored in `localStorage has no expiration set`, data stored in `sessionStorage gets cleared` when the page `session ends`.

* A page session lasts for as long as the browser is open and survives over page reloads and restores.
* Opening a page in a new tab or window will cause a new session to be initiated.

> storage API -> `setItem()`, `getItem()`, `removeItem()`, `clear()`,` length`,` key()`

* note that if a browser has 2 tabs open to pages with same origin (and one of those pages stores a value in localStorage, the other tab will receive a storage event. --> such storage events are `only triggered` when storage actually changes.

> sessionStorage is scoped to `top-level window`, so storage events are only triggered for sessionStorage changes when there are '`frames' involved`.

* the event object associated with storage event has 5 properties:

    - key,
    - newValue,
    - oldValue,
    - storageArea(local/session),
    - url

* localStorage and storage event can `serve as a broadcast mechanism` by which a browser send a message to `all windows` that are currently visiting the same website.

```js

var person = {

    firstName : "John",
    lastName : "ZB",
    age : 34

};


function sendJSON(){
    localStorage.personData = JSON.stringify(person);
    localStorage.setItem("nickName","Esi");
}
```

#### Cookies

* is a small amount of named data `stored by the web browser`. it's associated with a particular web page or website.
* cookies were originally designed for server-side programming. they are `implemented at the lowest-level` as an extension to the HTTP protocol.

> server-side scripts can read/write cookie values.

* cookie data is automatically `transmitted between the web browser and the web server`
* note that the `lifetime` and `scope` of each cookie can be individually specified with cookie attributes.
* the values that cookies stored, store `last for the duration of the web browser session` (but `lost` when user `exits the browser`).

> cookies `are not scoped to a single window` (default lifetime is the same as the entire browser process and `not the lifetime of any one window`).

* we need to tell the browser how long (in `seconds`) we would like `retain the cookie` (by specifying 'max-age' attribute, so once we specify the lifetime, the browser `store cookies in a file` and delete them only once they expire.

> cookies are also scoped to document origin (same as local and session storages) and also scoped to document path.

* (this scope (`document path`) is configurable by 'path' and 'domain' attributes)
* a cookie is `accessible to the web page that created it` and any other web pages in the same directory or any subdirectories of that directory.
* 'www.example.com/catalog/index.html' creates a cookie -> that cookie is also available to /catalog/about.html, /catalog/featured/index.html,...
* but `NOT accessible` to www.example.com/index.html, because the `path is different`.

##### setting cookies

> name=value;path=path;max-age=second; ...

* cookies `can not include` semicolon, commas, whitespace --> so we need to `encode` the value `before` storing in the cookie.

##### reading cookies

* string list of name=value pairs separated from each other by `;`

> in order to make use of the `document.cookie` property, we must typically call the `split()` method to break it into individual name-value pairs. then we need to pass the cookie value to `decode` it and then use JSON.parse().

```html
<button onclick="sendJSON();">SAVE DATA</button>
<button onclick="localStorage.clear();">CLEAR STORAGE</button>
<button onclick="localStorage.removeItem('age');">REMOVE ITEM FROM STORAGE</button>
<button onclick="setCookie('myName','John',1)">SET A COOKIE FOR ONE DAY</button>
```

```js
function setCookie(name,value,daystoLive){

    var  cookie = name + "=" + encodeURIComponent(value);

    if (typeof daystoLive === "number"){
        cookie += "; max-age=" + (daystoLive*60*60*24);
    }

    document.cookie = cookie;
}


function getCookies(){

    var cookies = {};
    var all = document.cookie;

    if (all === ""){
        return cookies;
    }

    var list = all.split("; ");

    // loop through name=value pairs
    for (var i = 0; i < list.length; i++){

        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0,p);
        var value = cookie.substring(p+1);

        // store the name and decoded value
        cookies[name] = decodeURIComponent(value);

    }

    return cookies;
}

console.log(getCookies()); // Object -> {myName:"John",.........}
```
