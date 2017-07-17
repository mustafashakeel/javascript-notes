
* in this example, all these 3 steps (of defining a class in js) are implemented as a simple function to define a class.
* constructors --> initialization
* methods --> instance methods
* statics --> class properties


```js
function defineClass(constructor, methods, statics) {

    if (methods){ // copy methods to the prototype

      for (var m in methods){
          constructor.prototype[m] = methods[m];
      }
    }
    if (statics){  // copy static properties to the constructor

      for (var s in statics){
          constructor[s] = statics[s];
      }
    }
    return constructor;
}
```
