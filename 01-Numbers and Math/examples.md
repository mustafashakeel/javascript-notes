## Examples

##### Random number between 1 to 100:

* 100 is `not included`

```js
var rnd = Math.random();
var rndNumber = Math.floor((rnd * 100) + 1);

console.log(rndNumber);
```

##### Random number between 1 to n:

* n is `included`

```js
var n = 5;
var rnd = Math.random();
var rndNumber = Math.floor((rnd * n) + 1);

console.log(rndNumber);       // 1,2,3,4 or 5
```

##### Random number between min to max:

* min included, max `included`

```js
var min = 5;
var max = 8;
var rnd = Math.random();
var rndNumber = Math.floor(rnd * (max - min + 1)) + min;

console.log(rndNumber);      // 5,6,7 or 8
```

##### Random number between min to max:

* min included, max `excluded`

```js
var min = 5;
var max = 8;
var rnd = Math.random();
var rndNumber = Math.floor(rnd * (max - min)) + min;

console.log(rndNumber);      // 5,6 or 7
```
