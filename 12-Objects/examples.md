* here is an utility function use to copy the properties of one object to another
* note that if both objects share a same name of a property, then it will be overwritten

#### Example#1

> copy properties of obj2 --> obj1

```js
function extension(obj1,obj2){
    for (prop in obj2){
        obj1[prop] = obj2[prop];
    }
    return obj1;
}

var o1 = {x:1,y:2};
var o2 = {x:3,z:5};

console.log(extension(o1,o2)); // Object {x: 3, y: 2, z: 5}

console.log(Object.keys(o1)); // ["x", "y", "z"]
console.log(Object.getOwnPropertyNames(o1)); // ["x", "y", "z"]
```

#### Example#2

> creating a "heir" of any object (create new object with an arbitrary prototype)

* in another word, creating a new object that inherited from a given prototype (p)

```js
function inherit(p){
    if (p == null){
        throw TypeError(); // p must be a non-null
    }
    if (Object.create){
        return Object.create(p); // use object.create if it is defined
    }
    // make sure that p is an object
    if (typeof p !== 'object' && typeof p !== 'function'){
        throw TypeError();
    }
    // define a dummy constructor
    function f(){}
    f.prototype = p; // set its prototype property
    return new f();

}

var myObject = {};
myObject.x = 21;
var myNewObject = inherit(myObject);
console.log(myNewObject); // object {}  --> at this stage, myNewObject inherits the properties from myObject
console.log(myNewObject.x); // 21
```
