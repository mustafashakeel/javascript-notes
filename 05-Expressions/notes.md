## Expressions

* An expression is a phrase of JS that JS interpreter can evaluate to produce (return) a value.
* Simplest expression known as `'primary expressions'` that are stand-alone expressions are 'constant' or 'literal' values.

    1. `'literals'` are constant values that are embedded directly in our program. eng: 1.23, "Hello", /regExPattern/ , ....
    2. some `js reserved words` also considered as literals: true/false/null/this
    3. bare variable reference. e.g: i, sum, ...

> Note that when any identifier appears by itself (e.g: var i;) JS assumes it is a variable and looks up for its value. If not find, then expression `returns 'undefined'`.

* Object and Array 'initializers' are expressions whose value is a newly created object or array.

> _`'Object literals' and 'Array literals'` are NOT primary expressions because they have sub-expressions._

* `'Object literals'` e.g: var myObj = {x:1,y:2} or {"x":1,"y":2}, {} <-- empty object      (the expressions inside the curly braces are called as object initializer)
* `'Array literals'`  [],[1,2,3],[1+2,3+4,"hello",3],...
* Object and Array literals `can be nested`, it means that the initializer itself can be array or object initializer (object inside a object or array inside an array!):
* e.g:  var matrix = [[1,2],[3,4],[5,6]], var obj = {left : {x:2,y:2}, right : {x:4,y:4}}

> Function literals:

* Define function using __function expression__:
```js
var square = function(x) {return x * x};
```

* Define function using __function statement__:
```js
function square(x) {return x * x};
```

> Invocation expression: is JS syntax for calling (executing) a function or method.

* includes a pair of parentheses ( ) and an 'expression' before the open parentheses. e.g:  square(10);
* if before expression is a `property access expression` then the invocation is known as `'method invocation'`.
* in such method invocations, the object/array (that is the subject of the 'property access expression' becomes the value of the `'this' parameter` while the body of the function is being executed.

> Object creation expression: creates new object and invokes the constructor function to `initialize the properties` of that object.

* it is same as invocation expression, except that they are prefixed with the `keyword 'new'` : new Object( ), new Date( ),...
* note that if no arguments are passed so the `( ) can be omitted`: new Object;

> Property access expression:

* `expression` represents 'object/array name' and `identifier` represents 'property name/index':
1. expression.identifier    // Object
2. expression[identifier]   // Array

