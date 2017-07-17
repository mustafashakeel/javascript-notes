## Networking

#### `'Ajax transport'` Ajax-style networking

* four techniques for client-side JS networking:

    - XMLHttpRequest -> using XMLHttpRequest (XHR) API
    - JSON/JSONP -> using 'script' tag
    - 'server push' -> also known as 'Comet' -> using EventSource API
    - 'socket-style' networking (using WebSockets)

> XHR is not a 'protocol-level HTTP' API -> it is a `'browser-level' API`. it means that the browser takes care of cookies, redirects, caching, proxies,.. and our code should `worry only about 'requests' and 'responses'`.

#### HTTP `'request'`

* consists of 4 parts:

    - 'request method' (also called as 'verb') -> GET/POST/...
    - 'URL' being posted (Uniform Resource Locator)
    - 'request headers'
    - 'request body'

#### HTTP `'response'`

* sent by the server and consists of 3 parts:

    - 'status code'
    - 'response headers'
    - 'response body'

> when use 'GET' request method:

    - the URL completely specifies the requested resource
    - the request `has no side-effect` on the server (for example no DB update,...)
    - server's response is 'cachable'

* 'GET' requests never have a body -> so we need to pass a null `send(null)`;

> when use 'POST' request method:

    - can send a large amount of data (has `no size limitation`)
    - more secure than GET (`data is not included in the URL`)
    - when the request `has side-effect` on the server

* when using 'POST' request, we need to add `'HTTP header'` that specifies the data that we want to send in the send() method
* `setRequestHeader(header,value)` -> header : header name ('content-type'), value : MIME type
* we need to specify MIME type of the 'request body' -> text/json/xml
* the string text that we post to a server might be a JS object encoded with `JSON.stringify()`.

> use JSON.parse() to parse the 'response body' sent from a server

```js
// 'readyState' -> 0,1 (connection stablished) ,2,3,4 (response is ready)
// 'status' -> 200-299 (OK) , 404 (page not found)

var r = new XMLHttpRequest();

// this function call automatically each time the readystate property changes
r.onreadystatechange = function(){
    if (r.readyState === 4 && r.status === 200){
        r.setRequestHeader("Content-Type","application/json");
    }
};
```

#### 'Cross-Origin' HTTP request

* as a part of the 'same-origin' policy, the `XHM object` can normally `issue HTTP request` only to the server from which the document (that uses it) was downloaded.
* this restriction `closes security holes` (no cross-origin request) --> to overcome we can use frame or iframe to display the result of cross-origin.
* in XHR, same-origin policy `cannot allow XHR to make cross-origin request` --> so we can use `'script' element`, which is not subject to the same-origin policy (download and execute any script regardless of origin).

> Cross-Origin Resource Sharing (CORS) -> if 1. browser supports CORS for XHR and 2. the site we are trying to make a cross-origin request to has decided to allow.

* cross-origin request with CORS, --> then our cross-origin request will work!

> script elements are useful Ajax transporter because they are NOT subject to the same-origin policy.

* so we can use them to request data from servers other than our own. --> this technique is known as `JSONP` (it works when the 'response body' is `JSON-encoded`)
* 'P' in JSONP indicates 'padding' --> padded-JSON

> JSON 'response body' is a valid JS code, and the browser will execute it when it arrives. executing JSON-encoded data decodes it but the result is still just data.

* now here is where the 'P' sort of JSONP comes in! -> when invoking `through a script element`,
* our service must `'pad'` its response by surrounding it with `()` and prefixing it with the name of the JS function.

```js
// plain JSON
[1,2,{"name":"John"}]

// JSONP (functionName is handleResponse)
handleResponse(
    [1,2,{"name":"John"}]
);
```

* we need to `tell the service` that it's being `invoked from script` and also tell to send a JSONP response instead of plain JSON response. this can be done by `adding the query parameter`: (`&json` or `?json`) to the query string.

```js
// making a JSONP request with script element
function getJSONP(url,callback){

    var cbnum = "cb" + getJSONP.counter++;
    var cbname = "getJSOP." + cbnum;

    if (url.indexOf("?") === -1){
        url += "?jsonp=" + cbname;
    }else{
        url += "&jsonp=" + cbname;
    }

    var script = document.createElement("script");

    // define callback function
    getJSONP[cbnum] = function (response) {
        try{
            callback(response);
        }finally {
            delete getJSONP[cbnum];
            script.parentNode.removeChild(script);
        }
    };

    // trigger the HHTP request
    script.src = url;
    document.body.appendChild(script);

}
getJSONP.counter = 0;
```

#### 'server push' or 'comet'

* in XHR and script, the client `request (pulls) data from the server` when it needs it.
* there is another style of HTTP-based networking (called as `server push`) that the client and server establish an HHTP connection and `leave it open` infinitely.
* it allows server to `push data to the client` through that open connection.
* using `Serve-Sent events in html5` defines a simple `EventSource(url)` API to receive and respond to messages pushed by the server.

#### WebSockets

* which is `not HTTP-based networking` (in which such networkings are all constrained by the fundamental nature of the HTTP) -> a protocol that consists of `client request` and `server response`.
* note that HTTP is specialized `network protocol`.
* in some network protocols often involve longer-lived connections and 'bidirectional' `message exchange` over 'TCP' sockets.
* WebSocket API defines a `secure alternative` to give untrusted client-side JS code access to low-level `TCP sockets`.
* websocket allows client-side to `create bidirectional socket-type connection` to servers that support the websocket protocol, using `WebSocket() constructor`.

```js
var s = new WebSocket("ws://ws.example.com/resource");
s.onopen = function(e){}; // the socket is open
s.onclose = function(e){};
s.onerror = function(e){};
s.onmessage = function(e){ // server sent the message
   var m = e.data;
};

s.close(); // closing the websocket
```
