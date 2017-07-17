## Closures

> 'lexical scoping'

* functions are executed using the `variable scope` that was in effect when they were `'defined'` and NOT the variable scope that is in effect when they are `'invoked'`.
* such `combination of function object and scope` (set of variable bindings in which it was defined), is knows as `'closure'`.

> _scope: The current context of execution._

* In 'lexical scoping', the `scope of a variable` is defined by its `location` within the source code (it is apparent lexically) and `nested functions` have access to variables declared in their `outer scope`.
* the fundamental rule among the 'lexical rules for nested functions' is that, JS functions are executed using the `'scope chain'` that was in effect when it was defined.

> _closures `capture the local variables` of a single function invocation and can use those variables as private state._

* Closures are `functions` that refer to independent (free) variables.
* the function defined in the closure `'remembers' the environment` in which it was created.
* note that according to `'memory management'` issues, we need to `clear the memory` after each time we invoke the closure function.
* because every time we call it, the value of the arguments `reserve in memory` and in the next invocation, the new value for arguments adds to the previous memory.
* to overcome to this issue we assign the `invocation expression` to 'null'.

```js
var fn = doSomething("Hello closure");
fn = null;
```

Example1:

```js
function init() {
    var name = "Mozilla";         // name is a local variable created by init
    function displayName() {      // displayName() is the inner function, a closure
        console.log(name);        // use variable declared in the parent function
    }
    displayName();
}

init(); // Mozilla
```

> _remember that a closure is a `special kind of object` that combines two things: a function, and the environment in which that function was created._

* the environment consists of any `local variables` that were `in-scope` at the time that the closure was created.
* in the example below, `myFunc` has become a closure.
* myFunc is a closure that incorporates both the displayName function and the "Mozilla" string (the local scope variable) that existed when the closure was created.
* Once makeFunc( ) has finished executing, it is reasonable to expect that the name variable will no longer be accessible. BUT it's NOT!
* in the example below, the displayName( ) inner function is returned from the outer function `before being executed`.

```js
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc(); // Mozilla
```

* in the example below, 'makeAdder' is a 'function factory' —> it creates functions which can add a specific value to their argument.
* 'add5' and 'add10' are both closures.
* actually we create closures (like add5 and add10) in order to `access the variable (private state) outside the inner function` (closure function).
* note that the `nested function has no name`!

```js
function makeAdder(x) {
    return function(y) {        // the closure function
        return x + y;
    };
}

// the closures
var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));           // 7
console.log(add10(23));         // 33

// equal to:
console.log(makeAdder(5)(2));   // 7
console.log(makeAdder(10)(23)); // 33
```

> _note that it's possible for two or more nested functions to be defined within the same outer function, and share the same private variable._

* in the example below, note that count and reset `share state` (both methods share access to the private variable n).
* each invocation of the counter( ) `creates a 'new scope chain' and a 'new private variable'`.

```js
function counter(){
    var n = 0;
    return {
        count : function() {return n++},
        reset : function() {n = 0;}
    };
}

// creating tow counters (they count independently)
var counterA = counter();
var counterB = counter();

console.log(counterA.count());     // 0
console.log(counterA.count());     // 1
console.log(counterA.count());     // 2
console.log(counterA.count());     // 3

console.log(counterB.count());     // 0
console.log(counterB.count());     // 1
console.log(counterB.count());     // 2

console.log(counterA.count());     // 4
console.log(counterA.count());     // 5

counterA.reset();

console.log(counterA.count());     // 0
console.log(counterA.count());     // 1

console.log(counterB.count());     // 3 (the counterB wa not reset, so it continues counting!)
console.log(counterB.count());     // 4
```

* in previous example count and reset share the same private variable,
* but in some cases, it's possible that closures inadvertently share access to variable that they (closures) should not share!

creating multiple closures using loop:
* DO NOT try to move the loop within the function that defines the closure!

```js
// this function returns a function that always return v
function constant(v){return function(){return v;} }

// create an array of constant functions
var funcs = [];
for (var i=0; i<10; i++){ funcs[i] = constant(i)}

// the function at array element 5 returns the value 5
console.log(funcs[5]()); // 5
```

* this code creates 10 closures and stores them in an array which all closures are defined within the same invocation of the function
* so they share the access to the variable i --> all functions in the returned array of functions return teh same value
* return an array of functions that return 0-9

```js
function constFuncs(){
    var funcs = [];
    for (var i=0;i<10;i++){
        funcs[i] = function(){return i;};
    }
    return funcs;
}

var funcs = constFuncs();
console.log(funcs[5]()); // 10
```

> _Every function has a 'this' value and `a closure cannot access the 'this' value` of its outer function unless the outer function has saved that value into a variable. (remember that it's convention to use 'self' keyword for such storage)._

> _it's important that the 'scope chain' associated with a closure is `'live'` and nested functions `do NOT make private copies of the scope` (or do NOT make static snapshots of the variable bindings)._

> _the `arguments binding` also are similar to 'this' value, so nested functions cannot access to the outer function's arguments array unless the outer function has saved that array into a variable but in `different name`._

```js
var outerArguments = arguments;
```

> bind( ) method of a function object:

* the primary purpose of bind( ) is to bind a function to an object.
* the arguments that we pass to the new function are `passed to the original function`.

```js
// this function needs to be bound
function fn(y) { return this.x + y};

// this is an object that we will bind to.
var obj = { x : 1};

// binding fn function to obj object
var bindResult = fn.bind(obj);

// calling 'bindResult(x)' invokes obj.fn(x)
console.log(bindResult(2));        // 3 (1+2)
console.log(typeof bindResult);    // function
```

* revised version of the above example by returning a function that invokes fnNew as a method of objNew, and passing all its arguments.

```js
function bindFn(fnNew, objNew){

    // use the bind method, if there is one!
    if (fnNew.bind) return fnNew.bind(objNew);

    // otherwise, bind it like this...
    else return function(){

        // apply fnNew function to objNew
        return fnNew.apply(objNew, arguments);
    }
}
```