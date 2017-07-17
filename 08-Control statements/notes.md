## Control Statements

> Conditionals: __if/switch__

* conditionals also called as 'branches'.
* imagine the js interpreter `when reach to the conditional statement`, here is the place where the code branches into 2 or more paths and the interpreter must choose which path to follow (using 'else if' to perform a `multiple branches`.

> Loops: __for/while/do__

> Jumps: __break/return/throw/continue__

```js
if (expression1) {
    // executed if expression1 is true
}else if (expression2) {
    // executed if expression2 is true
}else if (expression3) {
    // executed if expression3 is true
}else{
    // executed if no expression is true
}
```

```js
switch (expression){
    case condition1:
        // statements
        break;
    case condition2:
        // statements
        break;
    default:
        // statements
}
```

```js
// 'throw' // to create custom error (also we can use Error class)

try{
    // statements
}catch (error){
    // this block of code executes if and only if the try block throws an exception!
    console.log(error);
}finally {
    // this block always is executed (regardless of what happens in try or catch blocks)
}
```


```js
for (initialization; test condition; iteration statement){
    // executed if test condition is true
}
```

```js
// variable used to name a variable or be a 'var' statement to declare a single variable.
for (variable in object){
    // statements
}
```

* note that for/in statement does not actually `enumerate` all properties of the object.
* only the 'enumerable' properties (for example, every object has toString() method. but for/in does not enumerate this property).
* also note that all properties and methods defined by our code are 'enumerable' (but we can make them non-enumerable using some techniques!)

```js
var a = [12,3,56];
for (var p in a){
    console.log(a[p]);      // 12,3,56
}



for (var i=0;i<3;i++){      // 0,1,2 (3 times iteration over j
    for (var j=1;j<5;j++){  // 1,2,3,4
        console.log(j);     // 3 times logging j --> 1,2,3,4,1,2,3,4,1,2,3,4
    }
}


var count = 0;
while (count <= 10){
    console.log(count);
    count++;
}


var cnt = 0;
do{
    console.log(cnt);       // 0,1,2,3,4,5,6,7,8,9,10
    cnt++;
}while(cnt <= 10);
```

* `'break'` cause a loop to `switch to exit` (jump to end of the enclosing statement or terminate it).
* `'continue'` unlike break, restarts the loop at the `next iteration`.
* the continue statement in both labeled and unlabeled forms, can be used o`nly within the body of a loop`
* 'labeled statements' --> identifier : statement

```js
mainloop: for( var i=0; i<10; i++ ){
    console.log(i);
    continue mainloop;

    // jump to the top of the code and run again the for.
    // it never reach to the next line (comment 'continue' line if you want the next line be executed!)
    if (i==5) break mainloop;
}
```

> `'return' statement` can be used without an expression (return expression;), to make the function return 'undefined' `before it reaches the end of its body`.

```js
function display_object(obj){
    if (!obj) return; // returns immediately if the obj is null or undefined

    // the rest of the function goes here...
}
```

