## Numbers

* In JavaScript, all numbers are implemented in double-precision 64-bit binary format IEEE 754 `between -(2^53 -1) and (2^53 -1)`.
* There is no specific type for integers (`no distinction between integer and floating` point values in js).


#### Decimal Numbers:

* Floating and integer

```js
var myDigit1 = 1.435;    // float
var myDigit2 = 14327997; // integer
```
* Representing numbers using Exponential notation

```js
var myDigit1 = 1.723E4;   // 1.723 x 10^4 = 17230
var myDigit2 = 13.723E-3; // 13.723 x 10^-3 = 0.013723
```

#### Binary Numbers:

* Binary number syntax uses a leading zero followed by a letter "B" `(0b or 0B)`.

```js
var myBinary = 0b010010100011; // 1187
```

#### Octal Numbers:

* if the next digit after the leading 0 is `smaller than 8`, the number gets parsed as an octal number
* `Strict mode` in ECMAScript 5 forbids octal syntax.
* In `ECMAScript 6` Octal number is supported with by prefixing a number with `0o`.

```js
var myOctal1 = 0891; // 891 (pasred as decimal)
var myOctal2 = 0763; // 499 (pasred as octal)
var myOctal3 = 0o10; // octal number in ES6
```

#### Hexadecimal Numbers:

* Hexadecimal number syntax uses a leading zero followed by a letter "X" `(0x or 0X)` followed by `digit (0-9) and letter (A-F)`
* It describes a base-16 number system.
* It's also a `convenient way to express binary numbers` in modern computers in which a byte is almost always defined as containing eight binary digits.

```js
var myHex1 = 0xff;  // 255
var myHex2 = 0x101; // 257
```

---

### Number object:

* The Number JavaScript object is a wrapper object allowing you to `work with numerical values`. A Number object is created using the `Number() constructor`.

#### properties:

```js
console.log(Number.MAX_VALUE);         // largest possible number in JS  [The largest positive representable number]
console.log(Number.MIN_VALUE);         // smallest possible number in JS
console.log(Number.MAX_SAFE_INTEGER);  // Maximum safe integer in JS     [The maximum safe integer in JavaScript (2^53 - 1)]
console.log(Number.MIN_SAFE_INTEGER);  // Minimum safe integer in JS
console.log(Number.NEGATIVE_INFINITY); // returned on overflow.
console.log(Number.POSITIVE_INFINITY); // returned on overflow.
console.log(Number.NaN);               // NaN (represents a 'not-a-number' value)
```
#### methods:

> parseFloat( );

* Parses a string argument and `returns a floating` point number.
* parseFloat( ); is equal to `Number.parseFloat();` - object name can be omitted.
* note that `NaN values` are generated when arithmetic operations result in `undefined or unrepresentable values`.

```js
var numberFloat1 = parseFloat('314e-2');      // 3.14
var numberFloat2 = parseFloat('3.14more non-digit characters'); // 3.14
var numberFloat3 = parseFloat('Abc123');      // NaN
var numberFloat4 = parseFloat('123Abc');      // 123
var numberFloat5 = parseFloat('');            // NaN
var numberFloat6 = parseFloat('0xff');        // 0 (Not the same result if we use parseInt())
```
> parseInt( );

* Parses a string argument and returns an integer of the specified radix or base. radix is represented by an integer between 2 and 36 `default is 10`.
* It's better to always `specify radix to eliminate reader confusion` and to guarantee predictable behavior.

```js
var numberInt0 = parseInt('143  ');          // 143
var numberInt1 = parseInt('143  023');       // 143
var numberInt2 = parseInt("12C3A");          // 12
var numberInt3 = parseInt("13.24");          // 13
var numberInt4 = parseInt("450", 10);        // 450 (Deafult radix is 10)
var numberInt5 = parseInt("450", 16);        // 1104
var numberInt6 = parseInt("0X101");          // 257 (0X101 = 257 IN HEXADECIMAL)
var numberInt7 = parseInt("0B010010100011"); // 0
var numberInt8 = parseInt("B0B01001010001"); // NaN
var numberInt9 = parseInt('');               // NaN
var numberInt10 = parseInt('0xff');          // 255
```

> isFinite( );

* Determines whether the passed value `is a finite number`.
* Note that `isFinite('0') = true` (js global function) BUT `Number.isFinite('0') = false`.

```js
console.log(Number.isFinite(1032));   // true
console.log(Number.isFinite(1032));   // true
console.log(Number.isFinite(2e64));   // true

console.log(Number.isFinite("1032")); // false
console.log(isFinite("1032"));        // true
```

> isNaN( );

* Determines whether the passed `value is NaN`.
* Number.isNaN( ) is `more robust` version of the original global isNan( );

```js
console.log(Number.isNaN(1032));      // false
console.log(Number.isNaN("1032"));    // false (note that, first "1032" converts to 1032 number)
console.log(Number.isNaN("abc"));     // false
console.log(Number.isNaN(null));      // false
console.log(Number.isNaN(true));      // false

console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN(undefined)); // false
console.log(isNaN(NaN));              // true
console.log(isNaN(undefined));        // true
```

> isInteger( );

* Determines whether the passed `value is an integer`.

```js
console.log(Number.isInteger(123));     // true
console.log(Number.isInteger('123'));   // false
console.log(Number.isInteger(123.42));  // false
```

#### prototype methods:

> toPrecision( );

* `Returns a string` representing the Number object `to the specified precision`.
* Note that we do `NOT` have Number.toPrecision( );
* The specified number of precision `includes the floating point`.

```js
var num = 5.764352;

console.log(num.toPrecision( ));  // 5.764352
console.log(num.toPrecision(1));  // 6 (rounds to nearest integer)
console.log(num.toPrecision(4));  // 5.764 (including the floating point: .764 = 4 precision)
console.log(num.toPrecision(9));  // 5.76435200
```
 > toFixed( );

 * `Returns a string` representing the number in `fixed-point` notation
 * Formats a number with `n number of digits` after the decimal point (n between 0 and 20).

```js
var num = 5.764352;

console.log(num.toFixed( ));      // 6  (e.g: if num = 5.231, the result is 5)
console.log(num.toFixed(1));      // 5.8
console.log(num.toFixed(4));      // 5.7644
console.log(num.toFixed(9));      // 5.764352000
```

> toExponential( );

* `Returns a string` representing the number in exponential notation
* `Convert` number to exponential notation (n between 0 and 20).

```js
var num = 53192376;

console.log(num.toExponential( )); // 5.3192376e+7 = 53192376e0
console.log(num.toExponential(2)); // 5.32e+7

// n=2 (from index 0 which is 5 to index 2 which is 1 ==> 532, + 00000) --> 531(92376)
// 5.32e+7 : 5.32 * 10000000 = 53200000
```

---

##### other examples:

```js
console.log(Number(undefined)); // NaN
console.log(Number(null));      // 0
console.log(Number(123));       // 123
console.log(Number('Abc'));     // NaN
````

## Math object

> Math.PI

```js
console.log(Math.PI);                // 3.141592653589793
```

> Math.abs( );

* absolute number

```js
console.log(Math.abs(-123));         // 123
```

> Math.sqrt( );

* square root

```js
console.log(Math.sqrt(9));           // 3
console.log(Math.sqrt(0));           // 0
console.log(Math.sqrt(1));           // 1
```

> Math.round( );

* rounds to `nearest integer`.

```js
console.log(Math.round(5.327));      // 5
console.log(Math.round(5.627));      // 6
console.log(Math.round(-3.92));      // -4
console.log(Math.round(-3.22));      // -3
```

> Math.ceil( );

* `rounds up` to an integer.
* in negative case, round to integer towards zero (from minus to 0, get close to zero!).

```js
console.log(Math.ceil(5.327));       // 6
console.log(Math.ceil(-3.92));       // -3
console.log(Math.ceil(-3.22));       // -3

console.log(Math.ceil(-0.9));        // -0 (????? result is not zero 0, it's -0)
console.log(typeof Math.ceil(-0.9)); //number
```

> Math.floor( );

* `rounds down` to an integer.
* in negative case, rounds to integer away from zero (`opposite of ceil method`).

```js
console.log(Math.floor(5.327));      // 5
console.log(Math.floor(5.627));      // 5
console.log(Math.floor(0.67));       // 0
console.log(Math.floor(-3.92));      // -4
console.log(Math.floor(-3.22));      // -4
console.log(Math.floor(-0.9));       // -1
console.log(Math.floor(-0.1));       // -1


console.log(0.1 < 0.9);              // true
console.log(-0.1 < -0.9);            // false
```

> Math.pow( );

```js
console.log(Math.pow(2,3));          // 8 (2x2x2)
```

> Math.min( ); and Math.max( );

```js
console.log(Math.min(52,13,20));     // 13
console.log(Math.max(52,13,20));     // 52
```

> Math.random( );

* returns a floating-point (random number) `in the range [0, 1]` including 0 (inclusive) and not including 1 (exclusive)
* 0 <= x < 1

```js
console.log(Math.random());          // returns x (upto 17 digits after decimal point)
```

> Other methods:

```js
// sin(), cos(), tan() : Standard trigonometric functions (argument in radians)
console.log(Math.sin(90));          // 0.8939966636005579,
```

---
> _in this tutorial, some notes and definitions are adopted from [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)._
