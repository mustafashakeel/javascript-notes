## Operators

* Operators are used for the tasks below in JS:

1. `Arithmetic` expression +,-,*,....
2. `Comparison` expression >,>=,in,instanceof,...
3. `Logical`    expression &&,||
4. `Assignment` expression =
5. `Relational` expression ==,===,!=,!==
6. `Evaluation` expression eval("2+3") --> 5

> Operators with `higher precedence` are performed before those with lower precedence. For example * has higher precedence than + so: var num = 2+3*5 = 17  (3x5=15 then 2+15)

* Operator precedence `can be overridden` by using ( ): var num = (2+5)*5 = 50

> `unary` operators: have only 1 operand

* (e.g: ++,+,-,!,type of,~,....)  (+/- are also located in binary operators)

> `binary` operators : have 2 operands

* (e.g: <, >=,in,==,===,&,&&,....) (== loose equality, === strict equality)

> `ternary` operators : have 3 operators

* (e.g: '?:') x > 0 ? x : -x (conditional operator)

```js
console.log(5+2);           // 7
console.log(5+2+"John");   // 7John
console.log(5+(2+"John")); // 52John
console.log("5"+"2");       // 52 (typeOf is string, not number)
console.log(5*2);           // 10
console.log(5/2);           // 2.5

// '%' called as 'Modulo'
console.log(5%2);           // 1 (reminder of 5/2, using whole-number in division process!) --> 2x2=4, 5-4=1

// finding even numbers (0,2,4,6,8,10)
for ( var i=0; i<=10; i++ ){
    if ( i%2 == 0 ){
        console.log(i);
    }
}
```

> Increment (++): increments (adds one to) its operand and returns a value. There are 2 types of increment:

1. `postfix` (post-increment) a++  (it returns the value `'before'` incrementing)
2. `prefix`  (pre-increment) ++a   (it returns the value `'after'` incrementing)

```js
var a = 3;
post = a++;        // 3

console.log(a);    // 4
console.log(post); // 3


var b = 3;
pre = ++b;        // 4

console.log(b);   // 4
console.log(pre); // 4
```

#### Property existence:

example:

```js
var p = {x:1, y:1};
console.log("x" in p);        // true
//console.log(x in p);        // ERROR! (x in not defined)
console.log("toString" in p); // true (p inherits toString)

var a = [7,8,9];
console.log("0" in a);    // true (a has an element "0") index 0
console.log("1" in a);    // true (a has an element "1") index 1
console.log("2" in a);    // true (a has an element "2") index 2
console.log("3" in a);    // fasle

console.log(0 in a);      // true (a has an element "0") index 0   // numbers are converted
console.log(1 in a);      // true (a has an element "1") index 1
console.log(2 in a);      // true (a has an element "2") index 2
console.log(3 in a);      // false

console.log(7 in a);      // false
console.log("7" in a);    // false
```

#### Object type (instanceof):

example:

```js
var date = new Date();
console.log(date instanceof Date);   // true
console.log(date instanceof Object); // true
console.log(date instanceof Number); // false

var num = 57;
console.log(num instanceof Object);  // false
console.log(num instanceof Number);  // false

var num = Number(57);
console.log(num instanceof Object);  // false
console.log(num instanceof Number);  // false

var num = new Number(57);
console.log(num instanceof Object);  // true
console.log(num instanceof Number);  // true
```

> Logical operators: && (and), || (or), ! (not)

* Perform boolean algebra and are often used in conjunction with the relational operators (to combine `two relational expressions`).
* Remember that `null,undefined,0,"",NaN` are 'falsy' values and all other values including objects and arrays are 'truthy' values.
* `Relational expressions` always return (evaluate to) true or false.
* Relational expression have `higher precedence` than logical expressions.
* In `logical expressions`, for example && does not require that its operands be boolean values (unlike relational).
* The operator returns "a truthy value" or " a falsy value", but `does not specify` what that value is.

##### && (Boolean AND operation):

* If the value of the 'left side' of the operation is 'falsy', then the value of entire expression must also be false, (returns only the left side and does not evaluate the right side, only when left is false).
* If the value of the 'left side' of the operation is 'truthy', then the value of entire expression will depend on the right side.

> 1. true && true = true
> 2. true  && false = false
> 3. false && true = false
> 4. false && false = false

##### || (Boolean OR operation):

* if the value of the 'left side' of the operation is 'falsy', then the value of entire expression will depend on the right side.
* if the value of the 'left side' of the operation is 'truthy', then the value of entire expression evaluate as true.

> 1. true || true = true
> 2. true || false = true
> 3. false || true = true
> 4. false || false = false

* An idiomatic usage of || is to select the first truthy value in a set of alternatives.

In this example, if max_width is defined, then use that, otherwise look for a value in the object, if that is not also defined, then use constant hard coded value:

```js
var max = max_width || myObject.max_width || 500;
```

> Evaluation expression:

```js
console.log(eval("2+3"));    // 5

eval("var myNum = 100");
console.log(myNum);          // 100
```

> Comma operator (,):

* It is binary operator whose operands may be of any type. it evaluates its left operand, then evaluates its right operand and then returns the value of the 'right' operand and the left-hand expression is always evaluated but its value is dismissed.
* So it only makes sense to use the comma operator when the `left-hand expression has side-effect`.

> expression ? true : false

```js
 // var user = {name : ""};
 var user = {name : "John"};
 var greeting = "hello " + (user.name ? user.name : "there");

 console.log(greeting);
```

> Delete operator

* It is a `unary` operator that attempts to `delete the object property or array element`.

```js
var p = {x:1, y:1};
console.log('y' in p);   // true

delete p.y;
console.log('y' in p);   // false
```

> What is SIDE-EFFECT?

* Evaluating simple expressions like 2*3 never affect the state of our program and any future computations that our program performs will be `unaffected` by that evaluation, but some expression, however, have 'side-effects', so their `evaluation may affect result of future evaluations`.
* `Assignment operators` are the most obvious example,increments ++, decrements --, delete.
* In programming we need to `minimize or prevent side-effects`: for example using Array.prototype.forEach( ) instead of for(var x = ...)

```js
var myArray = [1, 2, 3];

// "x" and "length" are side effects
for(var x=0, length = myArray.length; x < length; x++) {
    // ...
}

// Array prototype methods like map, forEach, and every allow the developer to avoid these side effects
[1, 2, 3].forEach(function(item, index, array) {
    // No side effects! :)
});
```
