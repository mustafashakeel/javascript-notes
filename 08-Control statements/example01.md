```js
function printArray(a){
    var len = a.length, i = 0;
    if (len == 0){
        console.log('Empty Array');
    }else{
        do{
            console.log(a[i]);
        }while( ++i < len)
    }
}

var myArray = [1,2,3];
printArray(myArray);
```

