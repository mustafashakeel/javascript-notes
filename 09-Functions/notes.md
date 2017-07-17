## Functions

* functions are `values` in JS. the 'typeof' operator returns the string 'function' when applied to a function.
* BUT functions are really a special kind of JS object -> since functions are objects so they can `have properties and methods`.
* in JS, functions are object -> so it's possible to set properties on them or even invoke methods on them.
* there is even a `functions constructor` to create new function object.
* functions like other objects have a `'prototype property'` that refers to an object known as `'prototype object'`.
* every function has different prototype object
* also note that the functions that are used as a 'constructor', the newly created object `inherits properties from the prototype` object.

> _just to remind that everything in an object is `property` (with key/name and value), but if the value of a property is a function, then that property is `considered as method` of that function._

* Function instances inherit methods and properties from `Function.prototype`.

> _note that function invocation (calling a function) provides values or 'arguments' for function's 'parameters'._

* function uses its arguments to `calculate` a value or expression to `return`.
* `'this' keyword` --> each invocation has invocation context that is the value of 'this'.
* if a function is assigned to the property of an object, it's known as 'method' of that object.

> _when a function is invoked `on or through an object`, that object is invocation context `'this'` value of the function._

> functions can be nested within another functions --> they have access to any variables that are in 'scope' where they are defined.

* it means that JS `functions are 'closures'`.

```js
// function definition 'expression'
var functionName = function (x){
    return x+1;
};

// function declaration 'statement'
function functionName (x){
    return x+1;
}
```

Examples:

```js
// example1
function addStatement(x,y){
    return x+y;
}
console.log(addStatement(2,3));

// example2
var addExpression = function(x,y){
    return x+y;
};
console.log(addExpression(2,3));
```

* note that function declaration statements are 'hoisted' to the top of the enclosing script (or enclosing function).

> _if a function expression includes a name, the local scope for that function will include a binding of that name to the function object. function name becomes a local variable within a function._

* note that we cann't refer to a function defined as an expression `until it's assigned to a variable`!
* so functions defined with expressions can not be invoked before they are defined (no hoisting!).

Another difference between functions defined with expression or statement is that:

* function declaration with `statements` can appear in global code or within other functions (JS allows such functions as top-level statement).
* BUT not inside a loop, try/catch, conditionals.
* function declaration with `expression` can appear `anywhere in the code`.

> _function is not executed when defined._

* there are 4 ways in JS to invoke a function:

1. as `functions` (function invocation),
2. as `methods` (method invocation),
3. as `constructors` (constructor invocation),
4. and `indirect call` using apply() and call()

#### 1. function invocation

* the return value of the function becomes the `value of the invocation expression`.
* note that in strict mode, the context invocation `(this) is undefined` in such regular function invocations.

#### 2. method invocation

* method invocation is just calling a function which is a value of a property name in an object.
* invocation using 'dot' notation --> 'property access'
* also note that the object becomes the invocation context ('this' keyword).

```js
var calculate = {
    val1 : 10,
    val2 : 32,
    add : function(){
        return this.val1 + this.val2;
    },
    minus : function(a,b){
        return a-b;
    }

};

// invocation using property access
console.log(calculate.add());         // 42

// invocation using []
console.log(calculate["minus"](5,2)); // 3
```

> More about 'this' keyword:

* 'this' is just a keyword `not a variable or property name`! (JS does not allow us to assign a value to 'this').
* (unlike variables) 'this' doesn't have scope and also the `nested functions do not inherited the 'this'` value of the containing function.
* if a nested function is invoked as a `method` --> its 'this' value is the 'object' it was invoked on.
* if a nested function is invoked as a `function` --> its 'this' value will be either the 'global object' in non-strict mode and 'undefined' in `strict mode`.

> _it is very important to note that a nested function can NOT use 'this' value to obtain the invocation context of the outer function._

* so to access the 'this' value of the outer function --> we need to store that value into a variable that is in scope for the inner function (it's common to use 'self' variable name for such storing).

```js
var o = {

  myMethod : function () {
      var self = this;
      console.log(this === o);       // true
      nestedFunction();              // invoked as a function

      function nestedFunction(){
          console.log(this === o);   // false
          console.log(self === o);   // true
      }
  }

};

o.myMethod(); // invoking myMethod on the object o (invoked as a method)
```

#### 3. constructor invocation

* if a function or method invocation is preceded by `'new' keyword`, then it is a constructor function (as an initializer).
* remember that in JS we have 4 `built-in constructors` which serve to initialize a newly created object (Object,Array,Date,RegExp).
* it's common to `define our own constructor functions` to initialize the newly created object.
* when the function has argument(s) then such argument expressions are evaluated and passed to the function (same way as function and method invocations).
* note that if the constructor function has `no argument`, then the () can be `omitted`.

```js
// same expressions
var obj1 = new Object();
var obj2 = new Object;
```

* a constructor invocation `creates a new (and empty) object` that 'inherits' from the `'prototype' property` of the constructor.
* it means that the 'prototype property' of the constructor function is used as a prototype of the newly created object.
* note that all objects `inherit a constructor property` from their prototype.

```js
var a = [];
console.log(a.constructor === Array);  // true

var n = new Number(3);
console.log(n.constructor === Number); // true
```

> _The newly created object is used as the 'invocation context'._

* so a constructor function can refer to that context using 'this'.
* note that the new object is used as the invocation context, even if it looks like a method invocation.
* for example in `'new o.myMethod( )'`, o is not used as the invocation context.

> _The new object is the value of the constructor invocation expression._

* constructor functions `do not use 'return'`, they typically `'initialize'` the new object and return implicitly when they reach the end of their body.
* if constructor use return to return an object --> then that object becomes the `value of the invocation expression`.

> _The constructor initializes the object and can provide access to its private information._

* a constructor in JavaScript is usually declared at the `instance of a class`.

#### 4. indirect invocation

* JS functions are objects so like all other JS objects, they have methods. (such as apply() and call()).
* `call() and apply()` both used to invoke the function `indirectly`.
* the `first argument` for both call and apply is the `object` on which the function is to be invoked (and becomes the value of 'this').
* the difference is that in `apply( )` we passing arguments are in `array format`.
* apply( ) works with array-like objects as well as true arrays.

```js
// finding the largest number in an array on numbers
var biggest = Math.max.apply(Math,[23,55,27,275]);
console.log(biggest); // 275
```

* note that except the first argument in call or apply, `the rest arguments` are the values that are passed to the function.
* if we want to use a method of an object for another object, then we can indirectly invoke the method through the original object.

```js
var bar = {
    name : 'First Object',
    doSomething : function(x,y){
        return this.name + ': ' + x + ',' + y;

    }
};

var foo = {
    name : 'Second Object'
};


console.log(bar.doSomething(1,2));             // First Object: 1,2
console.log(bar.doSomething.call(foo,1,2));    // Second Object: 1,2
console.log(bar.doSomething.apply(foo,[1,2])); // Second Object: 1,2
```

> _note that JS function invocation do NOT even check the number of arguments being passed._

* if the number of parameters in which the invocation is being passed is `fewer than the declared parameters` --> the additional parameters are set to 'undefined'.
* note that it's important to specify the 'reasonable default value' for `omitted parameters` in the declaration process.
* also note that when a function is invoked with more arguments values than there are parameter names --> there is no way to 'directly' refer to unnamed values. --> using 'argument' identifier

* in this example if 'arr' argument is omitted, then the function create and return a new array
* also, the names function now can be invoked with and without arr parameter

```js
function names(obj,arr){
    if (arr === undefined) arr = [];
    for (var prop in obj) arr.push(prop);
    return arr;
}

var myObject = {
    name : 'John',
    last : 'ZB',
    fullName : function(){
        return this.name + this.last;
    }
};

var result = names(myObject);
console.log(result);          // ["name", "last", "fullName"]
```

#### Argument object:

* is an array-like object which allows the argument values (passed to the function) to `be retrieved by number` (rather than by name!).
* argument[0] refers to the first arguments, so on ...

> the important use of the Argument object is to write a function that operates on `'any number of arguments'`.

* note that the argument object has length property which shows the number of elements it contains.
* functions that accept any number of arguments are also called as: 'variable functions' or 'variable arity function' or 'varargs functions'.
* it's also common to use such functions when function expects a fixed number of arguments followed by an arbitrary number of unnamed 'optional' arguments.

> arguments.length --> number of arguments that were passed to the function

* it's a read-only property which `returns the 'arity' of the function` --> the number of parameters that it declares in its parameters list.

```js
function doSomething(){
    console.log('You have passed ' + arguments.length + ' arguments to this function');
    for (var i=0;i<arguments.length;i++){
        console.log('arg ' + i + ': ' + arguments[i]);
    }
}

doSomething("Hello",25, {x:70},"John");
// You have passed 4 arguments to this function
// arg 0: Hello
// arg 1: 25
// arg 2: [object Object]
// arg 3: John
```

#### Recursion:

* is a programming concept (`calling a function on itself`). It is not unique to JavaScript, but is used in all languages.
* is a `technique` for iterating over an operation by having `a function call itself repeatedly until it arrives at a result`.
* best applied when you need to `call the same function repeatedly with different parameters` from within a loop.
* it allows for the construction of code that doesn’t require setting and maintaining state with local variables.
* `'recursive functions'`: The classic example of a function where recursion can be applied is the `factorial`. 6! = 6x5x4x3x2x1 = 720

```js
function factorial(n){
    if (n <= 1) return 1;
    return n * factorial(n-1);
}

console.log(factorial(6)); // 720
```

> arguments.callee( )

* callee is a property of the arguments object.
* It can be used to refer to the currently executing function inside the function body of that function.
* It is useful when the `name of the function is unknown`, such as within a function expression with no name (also called "anonymous functions").
* note that the 5th edition of ECMAScript (ES5) forbids use of arguments.callee() in strict mode.

```js
function factorialUpdated(n){
    if (n <= 1) return 1;
    return n * arguments.callee(n-1);
}

console.log(factorialUpdated(6)); // 720
```

* the shorter version:

```js
function factorialShorted(n){
  return (n<=1) ? 1 : n * arguments.callee(n-1);
}
```


> Function.prototype.toString()

* The toString() method returns a string representing the `source code of the function`.
* The Function object overrides the toString method inherited from Object; it `does not inherit Object.prototype.toString`.
* it returns a `string representation of the object` in the form of a function declaration.

#### Function constructor:

* functions also can be created by Function constructor.
* function constructor `accepts any number of string` as its arguments, but note that the `last argument is the function body`.
* the body can contain arbitrary js statements (separated from each other by semicolons (:)
* it's important that the function that is created by Function() constructor, `does not use lexical scoping`, instead they are always compiled as if they were top-level functions.
* they can also `access global variables`, but Not any local variables.


```js
// f1 and f2 are equal
var f1 = new Function("x","y","return x+y;");
var f2 = function(x,y){ return x+y;};


// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function('a', 'b', 'return a + b');
console.log(adder(2, 6)); // 8
````

> 'lexical scope' (also called 'static Scope')

* Every `inner level` can access its `outer levels`.
* Lexical Scoping defines how variable names are resolved in nested functions.
* `inner functions contain the scope of parent functions` even if the parent function has returned.