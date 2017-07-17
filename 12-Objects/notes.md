## Objects

> Object-oriented programming (OOP) is a programming paradigm that `uses abstraction to create models` based on the real world.

* JavaScript is a `prototype-based language` and contains no class statement, such as is found in C++ or Java.
* Instead, JavaScript uses functions as `constructors` for classes.

#### Object

* it `aggregates multiple values` (primitive values or other objects) and allow us to store and retrieve those values `by name`.
* it's unordered collection of properties, each of which has a `'name'` and `'value'`. (property names are string)
* `Property` values can be values of any type, including other objects (an expression that may include primitive or other types)
* Properties are identified using `'key values'`. A key value is either a `String` or a `Symbol` value.
* There are two types of object properties which have certain attributes: The 'data property' and the 'accessor property'.
* `data property` : Associates a key with a value
* `accessor property` : Associates a key with one or two accessor functions (get and set) to `retrieve` or `store` a value.
* in addition to maintaining its own set of properties, object also `inherits from another object known as 'prototype'`.
* the methods of an object typically inherit from prototype (such methods are actually inherited `properties` of prototype object)
* In JavaScript there are `6 primitive types`:
    - undefined
    - null
    - boolean
    - string
    - number
    - symbol
* Everything else is an object!

```js
typeof Boolean(true); // "boolean"
typeof new Boolean(true); // "object"
```

> A primitive (primitive `value`, `primitive data type`) is data that `is not an object` and `has no methods`. All primitives are `immutable` (cannot be changed). (note that `objects are mutable`)

#### Creating an empty object

```js
// way#1 : using object literal
var obj1 = {}; // an empty object

// way#2 : using 'new' keyword and make an class instance (new object) using constructor invocation
var obj2 = new Object(); // creates a new object with the specified prototype object and properties.

// way#3
var obj3 = Object.create(Object.prototype); // syntax:  Object.create(proto[, propertiesObject])


// note that Object.create() is a static function and it is not a method invoked on individual objects
// also note that instead of 'Object.prototype' that make an empty object, we can specify our own prototype
var obj = Object.create({x:1,y:4}); // in this case, obj inherits x and y properties (obj.x = 1)
```

> note that the 'property name' is an `'identifier'` in objects. for 'non-identifier' names, it's recommended to use double quotation.

```js
var point = {
    x : 302.3,
    y : 13.22
};

var book = {
    "title" : "Javascript fundamental",
    "for" : "all audiences"
};
```


* when creating objects with 'new', the 'new' operator creates and initialize a new object.
* the new keyword should be followed by '`function invocation'`. such functions is called as `'constructor'` functions and serves to initialize a newly created object
* JS has built-in-constructors (new Object(), new Array(), new Date()).

#### prototype

* every javascript object has a `second javascript object` associated with it call as `'prototype'`.
* an object `inherits its properties` from the prototype.
* the object created by 'new Object()' and object created by object literal {}, both `inherit form 'Object.prototype'`
* note that the objects `created by constructor invocation`, us the 'value' of the prototype property (of the constructor function) as their prototype.
* for example, var dateObj = new Date(); --> the dateObj object actually uses 'Date.prototype' as its prototype (inherits from Date.prototype)
* besides, the 'Date.prototype' also inherits properties from 'Object.prototype' --> so the 'dateObj' inherits form both Object and Date prototypes.
* such linked series of prototype objects is known as `'prototype chain'`.

> in javascript the only object that `has no prototype` and does not inherit any properties is: 'Object.prototype'. all of the javascript `built-in constructors` inherit properties form Object.prototype.

#### properties in objects

* generally speaking, javascript objects have a set of `'own properties'` and also inherit a set of properties from their `'prototype'`.

### query and setting of object properties

* prototype allows us to `add property and method` to our object.
* objectName.prototype.newPropertyName = anyValue;
* objectName.prototype.newMethodName = function(){...};

```js
var book = {
    "title" : "Javascript fundamental",
    "for" : "all audiences"
};

// get
console.log(book.title); // Javascript fundamental
console.log(book["title"]); // Javascript fundamental

// set
book.title = "JS fundamental 2nd edition";
console.log(book.title); // JS fundamental 2nd edition

book["title"] = "JS 3rd edition";
console.log(book.title); // JS 3rd edition

console.log(book); // Object {title: "JS 3rd edition", for: "all audiences"}

book.totalSales = 12000; // add totalSales property to the object and assign the value to it.
console.log(book.totalSales); // 12000
```

#### property inheritance

* suppose we query the property 'x' in the object 'o'.
* if 'o' does not have an `own property` with that name 'x', then the `'prototype object'` of 'o' is now looking (query) for the property 'x'.
* if the property object also does not have an own property name with that name ('x'), then query its 'prototype' --> query on `'prototype of prototype'`.
* the process continues until the property 'x' found, otherwise, an object with `null property will be returned`.
* to delete a property we user `delete` keyword. note that delete operator `only deletes 'own properties'` and not inherited ones. to delete the inherited ones we need to delete them from the prototype object in which it is defined.

```js
delete book.for;
console.log(book); // Object {title: "JS 3rd edition", totalSales: 12000}
```

#### testing properties

* while objects can be thought of as `'sets of properties'`, so it would be useful if we `test for 'membership'` in the set.
* it refers to the fact that the object whether `has a property with a given name` in the test.
* to do such testing we can use: '`in'`,`'hasOwnProperty()'`,`'propertyIsEnumerable()'`

> Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain.

* enumerable properties are those properties whose internal [[Enumerable]] flag is set to true.
* enumerable properties show up in `for...in loops` unless the property's name is a `Symbol`.
* note that `'in'` can `distinguish between properties` that `do not exist` and properties that exist but have set to `undefined`. so in general, using 'in' is recommended upon using `!==`

> all `built-in methods` that objects `inherit` are not enumerable and they are non-enumerable.

* the properties that our code adds to the objects are enumerable, unless we make them non-enumerable (using some sort of functions)
* in fact in ECMAScript 5, there is `no way` to make such adds to non-enumerable

> `method is property of an object` which the value expression is a function.

```js
var o = { x : 1, y : undefined };

console.log("x" in o); // true
console.log("y" in o); // true
console.log(o.x !== undefined); // true
console.log(o.y !== undefined); // false

console.log("z" in o); // false (z does not exist)
console.log("toString" in o); // true ('toString' method is inherited from prototype and it's not the 'own property'.


console.log(o.hasOwnProperty("x")); // true
console.log(o.hasOwnProperty("z")); // false
console.log(o.hasOwnProperty("toString")); // false (it's inherited not owned)

console.log(o.propertyIsEnumerable("x")); // true
console.log(o.propertyIsEnumerable("y")); // true

o.title = "new edition";

console.log(o.propertyIsEnumerable("title")); // true
console.log(o.propertyIsEnumerable("toString")); // false (toString is not a enumerable method)



// using for-in to iterate through every property of an object
for (p in o){
    console.log(p); // x,y,title
}


// find methods in an object:  
for (p in o){
  if (typeof o[p] === 'function'){
      // ...
  }
}
```

#### enumerate property names:

> Object.keys()

* returns `only enumerable properties` of an object.
* `returns an 'array'` of a given object's own enumerable properties, in the same order as that provided by a `for...in` loop.
* for-in loop enumerates properties in the prototype chain as well.

> Object.getOwnPropertyNames()

* returns `all properties` including non-enumerable properties
* returns an array of all properties (enumerable or not) `found directly upon a given object`.

```js
var arr = ['a', 'b', 'c'];

console.log(Object.keys(arr)); // ['0', '1', '2'] --> the key for each value (as index)

// array like object
var myObj = { 0: 'a', 1: 'b', 2: 'c' };

console.log(Object.keys(myObj)); // ['0', '1', '2'] --> property name (key) of each property (do not confuse with the previous example which was index)

var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(an_obj)); // ['2', '7', '100']

var myObj1 = { 0: 'a', 1: 'b', 2: 'c', "name": "John" };
console.log(Object.getOwnPropertyNames(myObj1).sort()); // ["0", "1", "2", "name"]

// Logging property names and values using Array.forEach
// elm -> property names
Object.getOwnPropertyNames(myObj1).forEach(function(elm, index) {
    console.log(elm + ' (index: ' + index + ')' + ' --> ' + myObj1[elm]);
});
```

> JSON Object

* `JSON` (JavaScript Object Notation) is a lightweight `data-interchange format`.
* It is easy for humans to read and write. It is easy for machines to `parse and generate`.
* The `JSON object` contains methods for parsing JSON and converting values to JSON
* JSON is a `syntax for serializing objects`, arrays, numbers, strings, booleans, and null.
* in addition, JSON syntax is '`subset`' of JS syntax and it cannot represent all JS values. only objects, arrays, string, finite numbers, true, false and null are supported and can be serialized and restored.

> `'Object Serialization'` is the process of converting an object's state to a string from which it can later be restored.

* `JSON.parse()` : Parse a string as JSON, optionally transform the produced value and its properties, and return the value.
* `JSON.stringify()` : Return a JSON string corresponding to the specified value.

```js
JSON.stringify([1, 'false', false]); // '[1,"false",false]'
JSON.stringify({ x: 5 });            // '{"x":5}'
JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)); // '"2006-01-02T15:04:05.000Z"'
```

> JSON.stringify(value[, replacer[, space]])

* in stringify method, `Boolean`, `Number`, and `String` objects are converted to the corresponding primitive values during stringification.
* `replacer` --> A function that alters the behavior of the stringification process.
* If this value is null or not provided, all properties of the object are included in the resulting JSON string.
* also note that we `cannot` use the replacer function `to remove values` from an array
* space --> used to insert `white space` into the output JSON string for readability purposes
* `functions are not a valid JSON` data type so they will not work. However, they can be displayed if first converted to a string.

```js
// replacer is a function
function replacer(key, value) {
       if (typeof value === "string") {
           return undefined;
       }
       return value;
   }

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);

console.log(jsonString); // {"week":45,"month":7}

// replacer is an array
var newJsonString = JSON.stringify(foo, ['week', 'month']);
console.log(newJsonString); // {"week":45,"month":7}


// note that if an object being stringified has a property named toJSON,
// then  instead of the object being serialized, the value returned by the toJSON() method when called will be serialized

var obj = {
   foo: 'foo',
   toJSON: function() {
       return 'bar';
   }
};
console.log(JSON.stringify(obj)); // '"bar"'
console.log(JSON.stringify({ x: obj })); // '{"x":"bar"}'
```

> JSON.parse(text[, reviver])

* `returns the Object` corresponding to the given JSON text.
* If a reviver is specified, the value computed by parsing is `transformed before being returned`.
* If the reviver function returns undefined (or returns no value, e.g. if execution falls off the end of the function), the `property is deleted from the object`. Otherwise the property is redefined to be the return value.

```js
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
```
* JSON.parse() does not allow `trailing commas`.

```js
// both will throw a SyntaxError
JSON.parse('[1, 2, 3, 4, ]'); // error
JSON.parse('{"foo" : 1, }'); //  error
```

####  property getter/setter

* property has `name(key) and value`, the value can be replaced by one or two methods knows as `'getter'` and `'setter'`.
* properties defined by getter and setter also knows as `'accessor properties'` in order to distinguish them from 'data properties'.
* getter has not argument (no passing argument)
* setter method passing the value and set to this new value (setting the property value)

```js
var person = {
    firstName: 'Jimmy',
    lastName: 'Smith',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName (name) {
        var words = name.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
};

// note that we should not specify () after fullName because it's not a function or nested method of an object
console.log(person.fullName); // Jimmy Smith
console.log(person.firstName); // Jimmy

// set a new fullName
person.fullName = 'John ZB';
console.log(person.fullName); // John ZB
console.log(person.firstName); // John
```

#### property attributes

* in a object, in addition to name and value, properties have attributes that specify whether they can be written, enumerated and configured.
* note that in ECMAScript3, there is no way to change and by default programs are `writable`, `enumerable` and `configurable`, but in ECMAScript5, we have such setting property attributes.
* 4 `attributes of data properties` :
    - value,
    - writable,
    - enumerable,
    - configurable  

* the enumerable property attribute defines whether the property shows up in a `for...in loop` and Object.keys() or not.

> value: the value `associated with the property`. it can be any valid JavaScript value (number, object, function, etc).

> writable: true if and only if the `value` associated with the property may be changed with an assignment operator.

> enumerable: true if and only if this property shows up `during enumeration` of the properties on the corresponding object.

> configurable: true if and only if the `type` of this property descriptor may be changed and if the property may be deleted from the corresponding object.  

* accessor properties `don't have value attribute`, so there is no value and writable attribute for such properties.
* in accessor properties, the `writable attribute` is determined by the `presence` or `absence` of 'setter' (with setter means writable).
* hence, accessor properties have '`get`' and '`set`' attributes instead of value and writable.

#### property descriptor

* an object nested inside the object in order to specify the attribute properties (its property names are same as the attribute name like writable, enumerable,..)
* we can apply the property descriptor `when we are creating properties` using `Object.defineProperty()`
* By default, values added using Object.defineProperty() are `'immutable'`. (unless using attribute descriptor to change them).
* by default, attribute properties are `false` or `undefined`.

#### data descriptor

* is a property that `has a value`, which may or may not be writable.

#### accessor descriptor

* is a property `described by a getter-setter` pair of functions.

> Object.defineProperty(obj, prop, descriptor)

* this method allows precise `addition` to or `modification` of a property on an object.
* obj -> The object on which to define the property.
* prop -> The `name of the property` to be defined or modified.
* descriptor -> The descriptor for the property being defined or modified.
* 'descriptor' object `accepts only 'data property descriptor'` --> value/writable or 'accessor property descriptor' --> `get/set`. it can not have both `data` and `accessor` descriptors.


```js
var newObj = {}; // Creates a new object

// Example of an object property added with defineProperty with a 'data property descriptor'
Object.defineProperty(newObj, 'a', {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
}); // 'a' property exists in the newObj object and its value is 37

console.log(newObj.a); // 37


// Example of an object property added with defineProperty with an 'accessor property descriptor'
var bValue = 38;
Object.defineProperty(newObj, 'b', {
    get : function() { return bValue; },    // note that here in this syntax, 'get' and 'set' have semicolon (:)
    set : function(newValue) { bValue = newValue; },
    enumerable: true,
    configurable: true
});

console.log(newObj.b); // 38
```

> When the property already exists, Object.defineProperty() `attempts to modify the property` according to the `values in the descriptor` and the object's current `configuration`. If a property is non-configurable, its writable attribute can only be changed to `false`.

* When the writable property attribute is `set to false`, the property is said to be “non-writable”. It `cannot be reassigned`.

```js
var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
    value: 37,
    writable: false
});

console.log(o.a); // logs 37
o.a = 25; // No error thrown (it would throw in 'strict mode', even if the value had been the same)
console.log(o.a); // logs 37. The assignment didn't work.
```

* another example for `enumerable`:

```js
var o = {};
Object.defineProperty(o, 'a', { value: 1, enumerable: true });
Object.defineProperty(o, 'b', { value: 2, enumerable: false });
Object.defineProperty(o, 'c', { value: 3 }); // enumerable 'defaults to false'
o.d = 4; // it's important to note that enumerable 'defaults to true' when creating a property by setting it

for (var i in o){
    console.log(i); // a,d
}

console.log(Object.keys(o)); // ['a', 'd']
console.log(o.propertyIsEnumerable('a')); // true
console.log(o.propertyIsEnumerable('b')); // false
```

* The configurable attribute `controls at the same time` whether the property can be deleted from the object, and whether its attributes (other than writable) can be changed.

```js
var o = {};

Object.defineProperty(o, 'a', {
    get: function() { return 1; },
    configurable: false
});

console.log(o.a); // 1
delete o.a; // Nothing happens
console.log(o.a); // 1
```

* when configurable is 'false' --> the property can not be configured:

```js
Object.defineProperty(o, 'a', { configurable: true }); // throws a TypeError

Object.defineProperty(o, 'a', { enumerable: true }); // throws a TypeError

Object.defineProperty(o, 'a', { set: function() {} }); // throws a TypeError (set was undefined previously)

Object.defineProperty(o, 'a', { get: function() { return 1; } }); // throws a TypeError (even though the new get does exactly the same thing)

Object.defineProperty(o, 'a', { value: 12 }); // throws a TypeError
```

> Object.defineProperties(obj, props)

* this method `defines` new or `modifies` existing properties `directly on an object`, returning the object.
* obj --> the object that is to be modified.
* props --> is an `object that maps the names of the properties` to be created or modified to the property descriptors for those properties


```js
// defines all properties corresponding to the enumerable own properties of props on the object 'obj' object.

var obj = {};

Object.defineProperties(obj, {
  "property1": {
      value: true,
      writable: true
  },
  "property2": {
      value: "Hello",
      writable: false
  }
  // etc...
});
```

> Object.getOwnPropertyDescriptor(obj, prop)

* this method `returns a property descriptor` for an own property, that is, `one directly present on an object`.
* it permits `examination` of the precise description of a property.
* obj --> the object in which to look for the property.
* prop --> the name of the property whose description is to be retrieved.

```js
var o ={
    firstName : 'John',
    lastName : 'ZB',
    code : 57,
    get fullName(){
        return 'userCode: ' + this.code + '\n' + this.firstName + ', ' + this.lastName;
    }
};

console.log(o.fullName);

console.log(Object.getOwnPropertyDescriptor(o,'lastName')); // Object {value: "ZB", writable: true, enumerable: true, configurable: true

console.log(Object.getOwnPropertyDescriptor(o,'fullName')); // Object {set: undefined, enumerable: true, configurable: true}
```

#### object attributes (prototype, class, extensible)

```js
//this method returns the prototype: the value of the internal ([Prototype]] property) of the specified object.

console.log(Object.getPrototypeOf(o));
```

> Object.prototype.isPrototypeOf(obj)

* The isPrototypeOf() method `tests` for an object `in another object's prototype chain`.
* to determine whether one object is the prototype (or `is part of` the prototype chain) of another object.
* performs a function similar to the `'instanceOf'` operator.

```js
var p = {x:1}; // define prototype object
var o = Object.create(p); // inherit from that prototype

console.log(p.isPrototypeOf(o)); // true (o inherits form p)
console.log(o.isPrototypeOf(p)); // false

console.log(Object.prototype.isPrototypeOf(p)); // true (true for any object)
console.log(Object.prototype.isPrototypeOf(o)); // true
```

#### class attribute

* is a `'string'` that provides information about the `type of the object`. (no way to set this attribute)
* extensible attribute (Objects are extensible by default.)
* it specifies whether new properties `can be added to the object or not`.

> to making an object `non-extensible` (new property can not be added to the object) --> `Object.preventExtentions(obj)`.

> use `Object.isExtensible(obj)` to determine an object is extensible or not.

>  to making an object non-extensible and making all of the own properties to non-configurable -- > `Object.seal(obj)`.

* the existing properties can not be deleted or configured.
* use Object.isSeal(obj) to determine an object is sealed or not.

> to making an object `non-extensible`, `non-configurabl`e and making all of the object's own data properties to `'read-only'` --> `Object.freeze(obj)`

* use `Object.isFrozen(obj)` to determine an object is frozen or not.
