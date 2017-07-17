## Type Conversion

* `Truthy values` convert to true and `Falsy values` convert to false.
> Falsy values:

  1. undefined
  2. null
  3. "" (empty string)
  4. 0
  5. -0
  6. NaN (Not a Number)

```js
var type1 = 10 + "myString";
console.log(type1);          // 10myString
console.log(typeof type1);   // string

var type2 = "3 + 5";
console.log(type2);          // 3 + 5
console.log(typeof type2);   // string

var type3 = "3" + "5";       // concatenation
console.log(type3);          // 35
console.log(typeof type3);   // string

var type4 = "3" * "5";
console.log(type4);          // 15
console.log(typeof type4);   // number

var type5 = "3" - "5";
console.log(type5);          // -2
console.log(typeof type5);   // number

var type6 = 1 - "x";
console.log(type6);          // NaN
console.log(typeof type6);   // number
```

> == (equality)

* Checks for equality in `value` only.

> === (strict equality)

* Checks for both `type` and `value` equalities.

```js
var str = "57";

console.log(str == 57);    // true
console.log(str === 57);   // false
console.log(str === "57"); // true
```
* note that generally `0 is falsy` and is equal to false and `1 is equal to true`.

```js
console.log(0 == false);         // true
console.log(1 == true);          // true

console.log("0" == false);       // true
console.log("1" == false);       // fasle   (non-zero number, finite)
console.log("123" == false);     // fasle   (non-zero number, finite)

console.log("number" == false);  // false   'string' converts to boolean: true

console.log([] == 0);            // true
console.log({} == 0);            // false
```

> The value `null is a literal` (not a property of the global object).
> `'undefined'` is a property of the `global object`, i.e. it is a variable in global scope.
> The initial value of undefined is the `primitive value` 'undefined'.


*  A `primitive` (primitive value, primitive data type) is data that is `not an object` and has `no methods`.
*  In JavaScript there are `6 primitive types`:

    1. undefined
    2. null
    3. boolean
    4. string
    5. number
    6. symbol (new in ES6)

* equality comparison with NaN `always evaluates to false`.
* null is only `comparable to undefined`.
* null is neither equal to boolean true nor equal to boolean false because `it's value is undefined`.


```js
console.log(typeof null);        // object (should it be null !?)
console.log(typeof undefined);   // undefined

console.log(null == undefined);  // true
console.log(null === undefined); // fasle

console.log(undefined == false); // fasle
console.log(NaN == false);       // fasle
console.log(null == false);      // fasle
```

> Explicit conversion using only Number( ), Boolean( ), String( ), Object( )

```js
console.log(Number("123"));          // 123
console.log(typeof Number("123"));   // number

console.log(Number("abc"));          // NaN
console.log(typeof Number("abc"));   // number

console.log(String(123));            // 123
console.log(typeof String(123));     // string

console.log(String(false));          // fasle
console.log(typeof String(false));   // string

console.log(String(null));           // null
console.log(typeof String(null));    // string

// explicitly converting an array to boolean type
console.log(Boolean([]));            // true
console.log(typeof Boolean([]));     // boolean

console.log(Object(3));              // Number {[[PrimitiveValue]]: 3}  -->  new Number(3)
console.log(Object('abc'));          // String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}   --> new String('abc')

console.log(typeof Object(3));       // object
console.log(typeof Object('abc'));   // object
```






