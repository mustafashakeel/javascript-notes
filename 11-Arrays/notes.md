## Arrays

> 'Some Definitions'

#### Arrays are ...
* `untyped`: an array element may be of any type and different elements of the same array may be of different types.
* `zero-based`: and and use 32-bit indexes, so maximum number of elements of an array would be (2^32 - 2)
* `dynamic`: they grow and shrink as needed
* Arrays are special form of javascript object (note that access to numerically indexed array elements is `faster` than access to regular object properties)

* Array.isArray() : returns true if an object is an array, false if it is not.

```js

console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

```

> 'creating arrays using array literal [element1, element2, element3, ...]'

```js
var myArray1 = []; // an empty array
var myArray2 = [1,2,"3",{x:4,y:5},[6,7],9,10]; // elements can be any type
// values in array literal do not need to be constant!
var base = 1024;
var myArray3 = [1,base,base+4,-base,"23"];
```
* Arrays ca be `sparse`: when an array literal contains 2 commas (,,) in a row, it means that an element is missing.
* missing elements are 'undefined'.

```js
console.log(cnt.length); // 3 (the element is missing but its considered in length
console.log(cnt[0]); // 1
console.log(cnt[1]); // undefined
console.log(cnt[2]); // 3

// note that in JS the tailing commas in arrays is allowed
var cnt1 = [1,2,];
console.log(cnt1.length); // 2

var cnt2 = [1,2,,]; // creating sparse area at the end of the array
console.log(cnt2.length); // 3
```

* Here is another way of array literal to assign the elements to the array:

```js
var myList = [];
myList[0] = 1;
myList[1] = "2";
myList[2] = {x:2,y:3};
console.log(myList.length); // 3
```

> 'creating arrays using 'Array Constructor'  by invoking the constructor Array();'

```js
// way#1
var myArray4  = new Array(); // this is same as array literal of []

// way#2
var myArray5 = new Array(3); // 'pre-allocate' elements for this array (note that such elements and their respective indexes are not even defined!)

// way#3
var myArray6 = new Array(1,2,"3"); // in this way the constructor arguments become the elements of the array
```

* note that the 'length' property which is the number of elements of an array is 'writable' : is `setter` and `getter`

```js
var testArray = ['A','B','C','D','E'];
console.log(testArray.length); // 5 elements

console.log(testArray[2]); // C
console.log(testArray[3]); // D

testArray.length = 3;

// here at this point the length is set to 2 elements only so the rest elements (which are located at greater index number) are deleted
console.log(testArray.length); // 3
console.log(testArray[2]); // C
console.log(testArray[3]); // undefined
```

> 'iterating' arrays

* remember that the `Object.keys(obj)` method returns an array of a given object's own enumerable properties.
* note that NONE of these methods modify the original array (does not mutate the original array)
* we can modify the array inside the function we pass to the array method, but the method itself does not modify the original

```js
var arr = ['A',2,'John',34];
var keys = Object.keys(arr);

console.log(keys); // ["0", "1", "2", "3"]
console.log(keys.length); // 4
```

```js
// way#1
for (var i = 0; i < keys.length; i++){
   var key = keys[i];
   console.log(arr[key]);
}

// way#2
for (var item in arr){
   console.log('Index: ' + item + ' -> ' + 'Value: ' + arr[item]);
}
```

#### Array.prototype.forEach(callback[, thisArg])

* Function to execute for each element, taking three arguments: currentValue,index,array
* this function is not invoked for index properties that have been deleted or are uninitialized (i.e. on sparse arrays).
* The range of elements processed by forEach() is set before the first invocation of callback.
* Elements that are appended to the array after the call to forEach() begins will not be visited by callback.
* example#1: note that the function arguments can be any name (look at the example#2 in which the 'value' is equivalent to 'element' in this example.

```js

// example#1
arr.forEach(function (element,index,array) {
  console.log('Index: ' + index + ' -> ' + 'Value: ' + element);
  // or
  console.log('Index: ' + index + ' -> ' + 'Value: ' + array[index]);
});

// example#2
var a = [1,2,3];
var sum = 0;
a.forEach(function addNumber(value){
  sum += value;
});
console.log(sum); // 6 (1+2+3)

```

* `thisArg` is an object to which the `this` keyword can refer in the `callback` function
* If a `thisArg` parameter is provided to forEach(), it will be passed to callback when invoked, for use as its this value.
*  Otherwise, the value undefined will be passed for use as its this value.

```js
var myObject = {
    resultLabel : 'The result is: ',
    showResult : function(elm,index){
        console.log( this.resultLabel + 'Index: ' + index + ' -> ' + 'Value: ' + elm);
    }
};

// way#1
a.forEach(myObject.showResult,myObject);

// way#2 (same result as way#1)
a.forEach(function(elm,index){
    this.showResult(elm,index);
},myObject);
```


#### Array.prototype.map(callback[, thisArg])

* `callback` function once for each element in an array, in order, and constructs a new array from the results.
* map `creates a new array` with the results of calling a provided function on every element in this array.
* the callback `is not called` for missing elements of the array (that is, indexes that have never been set, which have been deleted or which have never been assigned a value)
* callback function produces `an element` of the new Array.

```js
var numbers = [1,4,9,16];
var roots = numbers.map(Math.sqrt);

console.log(roots); // [1,2,3,4]    (note that the numbers is still [1,4,6,16] and was not modified

console.log(numbers.map(function(value,index,array){
    return v+1; // [2, 5, 10, 17]
}));
```
> 'Other methods:'

#### Array.prototype.filter(callback[, thisArg])

* creates a new array with all elements that pass the test implemented by the provided function.
* returns a true value or a value that coerces to true (all `truthy` values except `falsy` values). callback is invoked only for indexes of the array which have assigned values;
* it is not invoked for indexes which have been deleted or which have never been assigned values.
* one of the practical usage of this method is: `Filtering invalid entries from JSON`

```js

var myArray = [12, 5, 8, 130, 44];
function myFilter(value){
    return value >= 10;
}
console.log(myArray.filter(myFilter)); // [12, 130, 44]

var a = [1,2,3,4,5,6,7,8,9,10];

// odd numbers
console.log(a.filter(function(elm,index,arr){  // (optional args)
    return elm%2 != 0;
})); // [1, 3, 5, 7, 9]

// even numbers
console.log(a.filter(function(elm){
    return elm%2 == 0;
})); // [2, 4, 6, 8, 10]

```

#### Array.prototype.every(callback[, thisArg])

* tests whether `all elements` in the array `pass the test` implemented by the provided function.
* executes the provided callback function `once for each element` present in the array until it finds one where callback returns a `falsy` value (a value that becomes false when converted to a Boolean).
* If such an `element is found`, the `every method immediately returns false`. Otherwise, if callback returned a `true value for all elements`, every will `return true`.
* it returns true if and only if the predicate function returns true for `all elements`.
* the callback function in both `every` and `some` methods, is also known as `predicate function`.

> 'note that every() returns 'true' on 'empty array' (but some() returns false'

```js
console.log([].every(function(elm){
  return elm*1000; // here can returns any expression!
  // it doesn't matter, the answer is true (because the array is empty so there is no element at this moment)
})); // true

// Are all values less than and equal to 10?
console.log(a.every(function(element,index,array){
  return element <= 10;
})); // true

// note that the callback function can be declared outside the method and just call the function name
function hasLimit(element,index,array){
  return element <= 10;
}
console.log(a.every(hasLimit)); // true

var b = [4,5,12];
console.log(b.every(hasLimit)); // false
```

#### Array.prototype.some(callback[, thisArg])

* tests whether `some` element in the array passes the test implemented by the provided function.
* executes the callback function `once for each element` present in the array until it finds one where callback `returns a true value`.
* If such an element is `found`, `some() immediately returns true`. Otherwise, some() returns false

```js
// Does the array have any even number?
function hasEven(elm){
    return elm%2 === 0;
}
console.log(a.some(hasEven)); // true
console.log([].some(hasEven)); // false
console.log([].every(hasEven)); // true
```

#### Array.prototype.reduce(callback[, initialValue])

* applies a function `against an accumulator` and `each value` of the array (from left-to-right) to reduce it to a single value. `(one time for each element` in the array)
* executes the callback function once for each element present in the array, `excluding holes in the array`, receiving four arguments: `previousValue`, `currentValue`, `currentIndex`, `array`
* the task of the callback function is a reduction operation (`combine two values into a single value`)
* If the array is `empty` and no initialValue was provided, `TypeError` would be thrown.
* If the array has only one element (regardless of position) and no initialValue was provided, `solo value` would be returned `without calling callback`.
* If `initialValue` is provided but the array is empty, solo value would be returned `without calling callback`.
* note that if the `initial value is not specified`, in the first call, the `previous value` has been assigned as the `initial` value


```js
var a = [0,1,2,3];
// var a = [2,4,6,8];

var result = a.reduce(function(previousValue, currentValue, currentIndex){

    console.log('INDEX: ' + currentIndex + ', ' + 'PREVIOUS: ' + previousValue +  ', ' + 'VALUE: ' + currentValue  +
            ', ' + 'PRE+CURR: ' + (previousValue + currentValue)
    ); //  (the index 0 is omitted!) calls begin from index = 1

    // indexes: 1,2,3

    return previousValue + currentValue;
});

console.log(result); // 6  --> (0+1)=1,(1+2)=3,(3+3)=6
// console.log(result); // 20  --> (2+4)=6,(6+6)=12,(12+8)=20
```

#### Array.prototype.reduceRight(callback[, initialValue])

* it's same as reduce except it begin from right to left (from end of the array).
* it processes the array from the highest index to the lowest.


```js
console.log(a.reduceRight(function(previousValue, currentValue, currentIndex){

    console.log('INDEX: ' + currentIndex + ', ' + 'PREVIOUS: ' + previousValue +  ', ' + 'VALUE: ' + currentValue  +
           ', ' + 'PRE+CURR: ' + (previousValue + currentValue)
    );

    // note that the last index of the array (the highest) is omitted! (remember that in reduce() the first index was omitted)

    // indexes: 2,1,0

    return previousValue + currentValue;
})); // 6
```

#### Array.prototype.indexOf(searchElement[, fromIndex = 0])

* returns the first index at which a given element can be found in the array, or `-1 if it is not present`.  (`indexof(item,start)`)
* it searches the array for the element and return its index position when found
* start parameter is optional (if negative: `counting from the end`)

```js
var names = ['John','Amir','Massih','Ali','Amir'];

console.log(names.indexOf('Amir')); // 1 (starts from beginning of the array, when found return the position and stop iteration and do not go till the end of the array)

console.log(names.indexOf('Amir',2)); // 4 (starts form the index of 2 (Massih) onward!)
```


#### Array.prototype.lastIndexOf(searchElement[, fromIndex = arr.length - 1])

* returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
* `lastIndexOf(item,start)`

```js
console.log(names.lastIndexOf('Amir')); // 4
console.log(names.lastIndexOf('Amir',2)); // 1
```

#### Array.prototype.join()

* converts all the elements of an array to string and concatenate them.
* it's inverse of the method string.split()

```js
var a = [1,2,3];

console.log(a1.join()); // "1,2,3"
console.log(a1.join(' ')); // "1 2 3"
console.log(a1.join('-')); // "1-2-3"
console.log(a1.join('')); // "123"


// a tip example!
var b = new Array(4);
b.join('-');

// ----> how many dashes - should be placed in the returned array? (note that the 'b' has 4 pre-allocated elements in the memory)
console.log(b.join('-')); // --- (number of dashes is n-1)   <-- new Array(n)
```

####  Array.prototype.reverse()

* reverse the order of the elements

```js
var a = [1,2,3];
console.log(a.reverse()); // [3, 2, 1]
```

#### Array.prototype.sort(compareFunction);

* compareFunction is Optional. Specifies a function that defines the sort order.
* If not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order. (e.g: "Cherry" comes before "banana")
* If omitted (alphabetic sort), the array is sorted according to `each character's Unicode code` point value, according to the string conversion of each element.
* If compareFunction is supplied, the array elements are sorted according to the return value of the compare function.

```js
// the logic!
function compare(a, b) {
   if (a<b) { // a is less than b by some ordering criterion
       return -1;
   }

   if (a>b) { // a is greater than b by the ordering criterion       
       return 1;
   }

   // (a=b) a must be equal to b
    return 0;
}

var array1 = [33,4,1111,222];

console.log(array1.sort()); // [1111, 222, 33, 4]

// numerical sort
console.log(array1.sort(function(a,b){
  return a-b;
})); // [4, 33, 222, 1111]

// reverse numerical sort
console.log(array1.sort(function(a,b){
  return b-a;
}));

// example#1:
var numbers = [4, 2, 5, 1, 3];
console.log(numbers.sort()); // [1,2,3,4,5]

var alphas = ['cherry','apple','benana'];
console.log(alphas.sort()); // ["apple", "benana", "cherry"]

var alphas2 = ['cherry','apple', 'Cherry', 'benana'];
console.log(alphas2.sort()); // ["Cherry", "apple", "benana", "cherry"]


// example#2
// case-sensetive alphabetic sort
 console.log(alphas2.sort(function(s,t){
     var a = s.toLowerCase();
     var b = t.toLowerCase();
     if (a > b) return 1;
     if (a < b) return -1;
     return 0;
 })); // ["apple", "benana", "Cherry", "cherry"]
 ```

#### Array.prototype.concat();

* creates and returns a new array that contains the elements of the original array on which concat() was invoked (`does not modify the original`).

```js
var a = [1,2,3];
console.log(a.concat(4,5,6)); // [1, 2, 3, 4, 5, 6]
console.log(a); // [1, 2, 3]   (does not modify the original)
console.log(a.concat([4,5,6])); // [1, 2, 3, 4, 5, 6]
console.log(a.concat(4,[5,6])); // [1, 2, 3, 4, 5, 6]
console.log(a.concat(4,5,[6])); // [1, 2, 3, 4, 5, 6]

var b = [4,5];
console.log(a.concat(b)); // [1, 2, 3, 4, 5]
```

#### Array.prototype.slice(start,end)

* slice selects a part of an array and returns a new array.
* end index is optional and is not included.
* slice `does not modify` the original array.
* if the end parameter does not specify it means that start from the specified index and continue to the and of the array.
* if either `argument is negative`, it specifies an array element relative to the '`last`' element in the array

```js
var a = [0,1,2,3,4,5];
console.log(a.slice(3)); // [3, 4, 5]   ---> note that the indexes are zero-based so slice(3) means that the 3rd element (but in index of 2 (3-1))

console.log(a.slice(2,5)); // [2, 3, 4]   ---> start index is 2 and end index is 4 but it's not included so the slice returns the sliced element up to that index

console.log(a.slice(2)); // [2, 3, 4, 5]

console.log(a.slice(-2)); // [4,5]  ---> 2 elements from the end of the array should take out

console.log(a.slice(-1)); // [5]

console.log(a.slice(1,-3)); // [1,2]    --> the end index is -3 : from the end of the array, 3 elements should take out.
```

####  Array.prototype.splice(index,howmany,item1,item2,...)

* adds/removes elements from an array (IMPORTANT: splice '`modify`' the original array)
* `index` --> position to start add/remove
* `howmany` --> number of items to be removed (including the item specified (including the start index)) if howmay=0 then nothing will remove (it is howmany not confuse with end index!)
* `item1,item2,....` --> optional (new items to be added to array) --> used in insertion at the specific index (howmany=0)

```js
// note that in these examples we need to uncomments one by one because the splice method is actually affect the original array.

// example #1
var a = [0,1,2,3,4,5];

// #1
console.log(a.splice(3)); // [3, 4, 5]   (same result as slice(3))
console.log(a);

// #2
// console.log(a.splice(2,5)); // [2, 3, 4, 5] --> start index 2, how many elements to remove: 5 (but because the specified number is greater than the maximum index number so nothing happen just from start of the array to the specified start index, are removed)
// console.log(a);

// #3
// console.log(a.splice(1,3)); // [1,2,3]
// console.log(a);

console.log('ORIGINAL ARRAY: ' + a);
console.log('SPLICE ARRAY (elements that should be removed: ' + a.splice(0,4)); // [0,1,2,3] --> start index = 0, and including the start index, 4 elements should be removed
console.log('ORIGINAL ARRAY AFTER SPLICE: ' + a);


// example#2
var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

// removes 0 elements from index 2, and inserts 'drum'
var removed = myFish.splice(2, 0, 'drum');
console.log(myFish);
```

#### Array.prototype.push(element1, ..., elementN)

* `ADDs` one or more elements to the `END of an array`.
* it returns the '`NEW length`' of the array.


#### Array.prototype.pop()

* `REMOVES the LAST element` from an array and returns that element.

```js
var a = [1,2,3];
console.log(a.push(4,5)); // 5 (returns number of elements of the modified array) equal to a.length
console.log(a.length); // 5

console.log(a); // [1, 2, 3, 4, 5]

// a.pop(); // remove the last element from the end of the array
console.log(a.pop()); // 5 (returns the removed element)
console.log(a); // [1, 2, 3, 4]
```

#### Array.prototype.unshift([element1[, ...[, elementN]]])

* `ADDs` one or more elements to the `BEGINNING` of an array and returns the '`NEW length`' of the array.

#### Array.prototype.shift()

* `REMOVES the FIRST element` from an array and returns that element.

```js
var b= [1,2,3];
console.log(b.unshift(-2,-1,0)); // 6 (length of the modified array) --> [-2,-1,0,1,2,3]

b.shift(); // removes the first element from the beginning of the array
console.log(b); // [-1, 0, 1, 2, 3]
```

#### Array.prototype.toString()

* Arrays like all js objects have toString() method which this method `converts each of its elements to a string`.  * output is comma-separated list of strings.

```js
console.log([1,2,3].toString()); "1,2,3"
console.log([1,"2","three",4,[5,6],[7],8,{x:2}].toString()); // "1,2,three,4,5,6,7,8,[object Object]"
```
