## Statements

> Statements are JS sentences or commands and terminated with semicolons (;)

* Note that 'expressions' are evaluated to 'produce a value', but 'statements' are executed to 'make something happen' as listed below.

1. To `evaluate` an expression that has side-effect (such as assignments, function invocations and delete).
   * e.g: 1) greeting = "hello" + name;  2) window.close( ); (the side-effect is affecting the web browser).
   * such expression can be stand-alone as 'statement' and when used like this, they are known as `'expression statement'`.

2. To `declare` an expression that has side-effect (declare new variables and define new functions)
   * such expressions called as `'declaration statement'`.
   * the `'var' and 'function'` are declaration statements.
   * used to define identifiers (variable or function names).
   * in such statements, if a 'var' statement appears `within the body of a function`, it defines `'local variables'` (scoped to that function)
   * and when used in the 'top-level code', it defines `'global variable'`.
   * if no initializer is specified, then the initial value for the variable is `'undefined'`.

3. To `alter the default` order of execution (by using 'control structures' statements).

> Control structure:

* JS interpreter executes the statements one after another `in the order they are written`.
* using control structure's statements we can `alter` such default order.

1. `conditionals` : if/switch,... (make interpreter to execute or skip the statements depending on the value of the expression)
2. `loops` : for/while,... (executing the statements repetitively)
3. `jumps` : break/return/throw,... (jump to another part of the program)

> Statement block:

* it's a `sequence of statements` enclosed within curly braces.
* combines multiple statements into a single 'compound statement.
* e.g: the while loop syntax includes a single statement that serves as a body of the loop. using statement block, we can place any number of statements within this single allowed sub-statement.
* `compound statements` allow us to use multiple statements where JS expects a single statement.

> Empty statement:

* is opposite of the compound statements.
* it allows us to `include no statement` while JS expects one statement (applying ;).
* one of the useful usage of empty statements is when we want to create a loop that has an empty body.

```js
// initializing the elements of 'elm' to zero (note that this statement has no {})
for (var i=0;i<elm.length;elm[i++]=0)    /* empty */;
```

> Defining a function using `'function expression'` --> is a `function literal`.

```js
var square = function(x){return x * x;}; // assigning the function to a variable.
```

> defining a function using `'function statement'` --> function `declaration` statement.

* the statements inside the body of the function are not executed when the function is defined.
* the statements inside the curly braces are `associated with the new function object` for execution when the function is invoked.
* function statement may appear in `top-level code` or may be `nested` within other functions.
* if nested then only appears `locally`, in top-level of the function that is nested within.

```js
function square(x){return x * x};      // the statement includes the variable name (as an identifier).
```

> _Difference between the functions that are created by statement and expression?_

* note that both forms create a new function object.
* in function statement, the function name is included, but in expression declaration, function name appears as a variable and the function object has been assigned to it.
* the functions that are defined by `function declaration are implicitly 'hoisted' to the top` of the containing script or function.
* so that all functions in a script or all nested functions in a function are declared before any other code run.
* so we can `invoke (call) a function before you declare it`.

> Hoisting:

* hoist means to pull up something
* Because variable declarations (and declarations in general) `are processed before any code is executed`, declaring a variable anywhere in the code is `equivalent to declaring it at the top`.
* Hoisting is JavaScript's `default behavior` of moving all declarations to the top of the `current scope` (to the top of the current script or the current function).
* variable `declaration is moved to the top` of the function or global code.
* in JS a variable can be declared 'after' it has been used.
* it means that, a `variable can be used 'before' it has been declared`.

```js
num = 5;
console.log(num);
var num;
```

* note that `JavaScript only hoists declarations`, not initializations.
* to avoid bugs, always declare all variables at the beginning of every scope.

```js
// example#1
var x = 5;
var y = 7;
console.log( x + " , " + y); // 5 , 7
```

```js
// example#2
var x = 5;
console.log( x + " , " + y); // 5 , undefined
var y = 7;
```

> 'declared' vs 'undeclared' variables:

* it is recommended to always declare variables, regardless of whether they are in a function or global scope.
* Assigning a value to an 'undeclared' variable `implicitly creates it as a 'global variable'` (without using 'var' --> we have undeclared variable).
* it becomes a property of the global object, when the assignment is executed. `Undeclared variables are always global`.
* Declared variables are constrained in the `execution context` in which they are declared.

```js
function myFunction(){
    y = 1;      // Throws a ReferenceError in 'strict mode'
    var z = 2;  // declared variable (within this scope only)
}

myfunction();
console.log(y); // 1 (although y is defined in the myFunction scope but because it defined as 'undeclared' variable so it is considered as global variable so we can access it from outside of the function
console.log(z); // ReferenceError: z is not defined
```
* Undeclared variables do not exist until the code assigning to them is executed.

```js
console.log(a);                // Throws a ReferenceError.
console.log('still going...'); // Never executes.
```

```js
var a;
console.log(a);                // logs "undefined" or "" depending on browser.
console.log('still going...'); // logs "still going...".
```
* Undeclared variables are `configurable` (e.g. can be deleted). but declared variables are a `non-configurable` property of their execution context (function or global).

```js
var a = 1;
b = 2;

// delete this.a;  // Throws a TypeError in strict mode. Fails silently otherwise.
delete this.b;
console.log(a, b); // Throws a ReferenceError. The 'b' property was deleted and no longer exists.
```

> Assigning two variables with single string value:

```js
var str1 = 'A';
var str2 = str1;

console.log(str1 + " , " + str2); // A , A
// it's equivalent to: var str1 = str2 = 'A'
```
> Beware of the `order` of the declaration!

```js
var str3 = str4,
    str4 = 'A';

console.log(str3 + " , " + str4); // undefined , A
```

* Other miscellaneous statements: with,debugger,'use strict'

> with (object/expression) statement:

* The following `with statement` specifies that the Math object is the default object without specifying an object.
* JavaScript `assumes the Math object` for these references.
* Use of the 'with' statement is `not recommended`, as it may be the source of confusing bugs and compatibility issues.
* The with statement 'extends the scope chain' for a statement.
* it's `forbidden in 'strict mode'`.
* when JS looks up for the value of a variable, it first looks are the variable defined within the current scope, the 'with' `temporarily alters` the way variables are looked up.

```js
var a, x, y;
var r = 10;

with (Math) {
    a = PI * r * r;
    x = r * cos(PI);
    y = r * sin(PI / 2);
}
```

> 'use strict' mode:

* It is `not a statement`, but a 'literal expression'.
* Defines that JavaScript code should be executed in "strict mode". (the code should be executed in "strict mode").
* The `"use strict" directive` is new in JavaScript 1.8.5 (ECMAScript version 5).
* Strict mode makes it easier to write `"secure"` JavaScript.

_In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will `throw an error`._

* The things which are not allowed in 'strict mode':

1. Using a variable or object, `without` declaring
2. `Deleting` a variable, function, parameters
3. `Octal` numeric literals are not allowed
4. `Escape` characters are not allowed
5. Writing to a `read-only property` is not allowed

```js
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;         // throws an error!
```

6. Writing to a `get-only property` is not allowed.

```js
var obj = {get x() {return 0} };
obj.x = 3.14;         // throws an error!
```

7. The string `"arguments"` cannot be used as a variable.
```js
"use strict";
var arguments = 3.14; // throws an error!
```

8. The `with statement` is not allowed.
9. `eval() is not allowed` to create variables in the scope from which it was called.

```js
"use strict";
eval ("var x = 2");
console.log(x);      // throws an error!
```




