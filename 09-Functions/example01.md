Finding the largest number within the passed arguments:

```js
function max(){

    var initMax = Number.NEGATIVE_INFINITY;

    // 'look' for the largest number and 'remember' it.
    for (var i = 0; i < arguments.length; i++){
        if (arguments[i] > initMax) initMax = arguments[i];
    }

    return initMax;
}

console.log(max(10,100,2,4,1000,6,-123)); // 1000
```