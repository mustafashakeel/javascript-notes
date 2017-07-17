```js
var obj = {
    x : 1,
    y : {z:3}
};

var ary = [
    obj,
    4,
    [5,6]
];


console.log(obj.x);         // 1    (property x of expression 'obj')
console.log(obj.y);         // Object {z: 3}
console.log(obj.y.z);       // 3    (property z of expression 'obj.y')

console.log(ary[0]);        // Object {x: 1, y: Object}
console.log(ary[0].x);      // 1
console.log(ary[0].y.z);    // 3

console.log(ary[1]);        // 4    (element of index 1 of expression 'ary')
console.log(ary["1"]);      // 4

console.log(ary[2]);        // [5,6]
console.log(ary[2][0]);     // 5
console.log(ary[2][1]);     // 6
console.log(ary["2"]["1"]); // 6
```