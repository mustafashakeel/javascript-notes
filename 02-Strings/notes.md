## Strings

* Strings are `immutable` in JS.
* Strings can be treated like read-only arrays.
* so we can `access` individual characters (16-bit) from a string `using [ ]`. It's a better way instead of using charAt( );
* The `String global object` is a constructor for strings, or a sequence of characters.

#### properties:

> length( );

* String length property is zero-based.

```js
var str = 'Hello, my name is John.';

console.log(str.length);         // 24
console.log(str[0]);             // H
console.log(str[str.length-2]);  // n
```

#### methods:

> toUpperCase( ); / toLowerCase( );

```js
console.log(str.toUpperCase()); // HELLO, MY NAME IS John.
console.log(str.toLowerCase()); // hello, my name is John.
```

> charAt(index);

* Returns the character of the specified position.

```js
console.log(str.charAt(0));            // H
console.log(str.charAt(str.length-2)); // n
```

> indexOf(string,start);

* Returns the `position` of the `first found occurrence` of a specified valued.
* It's `case-sensitive`.
* start index is optional (default = 0), returns -1 if no index found.

```js
console.log(str.indexOf("m"));       // 7  (m in my)
console.log(str.indexOf("m",8));     // 12 (m in name)
console.log(str.indexOf("e"));       // 1  (e in Hello)
console.log(str.indexOf("E",8));     // 18 (E in John)
```

> lastIndexOf(value,start);

* Returns the `position` of the `last occurrence` of the specified value.
* It's `case-sensitive`.
* start index is optional (default = 0), returns -1 if no index found.

```js
console.log(str.lastIndexOf("a"));   // 21 (a in John)
```

> charCodeAt(index);

* Returns the `unicode` of the character.
* Returns NaN if not index found.

```js
console.log(str.charCodeAt(18));    // 69  (the unicode of E)
console.log(str.charCodeAt(200));   // NaN (index is out of rang)
```

> fromCharCode(unicode);

* Get character from its unicode.

```js
console.log(String.fromCharCode(69));              // E
console.log(String.fromCharCode(72,69,76,76,79));  // HELLO
```

> valueOf( );

* Returns the `primitive value` of a string.

```js
console.log(str.valueOf());   // Hello, my name is John.
```

> substr(start,length);

* Returns (extracts) `part of a string` (returns the specified number of characters).
* length is optional (number of characters to extract).
* length number index is excluded.

```js
console.log(str.substr(7));         // my name is John.
console.log(str.substr(15));        // is John.

// from index 15 which is 'i' to index (15+(length-1)) = 20 which is 's'
console.log(str.substr(15,6));      // is Ehs
```

> substring(start,end);

* `Extract` the characters from a string `between two specific indices`.
* end index is optional and it is not included.
* If 'end' is not provided -> same result as substr( );

```js
console.log(str.substring(15));     // is John.
console.log(str.substring(15,21));  // is Ehs   (index of the charchter 's' is 20)
```

> slice(start,end);

* It's `same` as substring( ); but slice returns the result as a `new string`;
* If we specify the `negative index` for 'end', it indicates an offset from the end of the string.

```js
console.log(str.slice(15,21));     // is Ehs
console.log(str.slice(3,-4));      // lo, my name is Eh   (-4: 4 characters subtract from the end of the string)
```

> split(separator,limit);

* Splits the string `into an array` (does not change the original string).
* separator: character or regEx.
* limit: integer (number of split, not included in the array)

```js
console.log(str.split(" "));       // ["Hello,", "my", "name", "is", "John."]
console.log(str.split("m"));       // ["Hello, ", "y na", "e is John."]
console.log(str.split("m",2));     // ["Hello, ", "y na"]
```

```js
var mystring = 'Foo-Bar-John-Jane';
console.log(mystring.split('-'));  // ["Foo", "Bar", "John", "Jane"]
````

> trim( );

* `Removes whitespaces` from both sides the string.

```js
var str2 = "   Hello, my name is John.   ";
console.log(str2.trim());  // Hello, my name is John.
```

> replace(value,newValue);

* Returns a new string with replaced value.
* value: string or regEx

```js
console.log(str.replace("my","MY"));  // Hello, MY name is John.
```

> search(string or regEx);

* Returns the `position` of the match (returns -1 if not found).
* it's case-sensitive.

```js
console.log(str.search("e"));  // 1
console.log(str.search("E"));  // 18

var re = /Ehs/gi;
console.log(str.search(re));   // 18
```

> match(regEx);

* Searches a string for a match against a regular expression.
* Returns the matches as an `array` object.

```js
console.log(str.match(/my/g));  // ["my"]
```



