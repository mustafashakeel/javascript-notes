## Date and Time

* `Date objects` are based on a time value that is the number of milliseconds since 1 January, 1970 UTC.
* Date objects can only be `instantiated` by calling JavaScript Date as a `constructor`.
* Date objects have `no literal syntax`.

> _If no arguments are provided, the constructor creates a JavaScript Date object for the `current date and time` according to system settings._

* if more than one argument, the specified arguments represent `local time`.
* months are `zero-based`.
* `UTC` (Universal Time), also known as Greenwich Mean Time (GMT), refers to the time as set by the World Time Standard


#### Date constructors:

1. new Date( );
2. new Date(value);
3. new Date(dateString);
4. new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

* `dateString`: String value representing a date. It should be in a format recognized by the Date.parse( ) method.

```js

var date1 = new Date();
var holiday = new Date('December 25, 2015');
var date2 = new Date(1997,0,1); // January, 1 1997

```


#### Date methods:

> Date.now( );

* returns the number of milliseconds elapsed since 1 January, 1970 00:00:00 UTC.

> Date.parse( );

* Parses a string representation of a date and returns the number of milliseconds since 1 January, 1970 00:00:00 UTC.

> UTC:

1. Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
2. Date.UTC( );

* returns the number of milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.

```js
console.log(Date.now());                   // e.g: 1462315841357
console.log(Date.parse("26/august/1981")); // e.g: 367657200000
console.log(Date.UTC(1981,0));             // e.g: 347155200000
```

#### Date property:

> Date.length;

* The value of Date.length is always 7. This is the number of arguments handled by the constructor.

```js
console.log(Date.length); // 7
```

#### Date.prototype GETTER Methods:

> getDate( );

* Returns the `'day of the month'` (1-31) for the specified date according to local time.

> getDay( );

* Returns the `'day of the week'` (0-6) for the specified date according to local time.
* 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on ...

```js
var holiday = new Date('December 25, 2015');
console.log(holiday.getDay());   // 5 --> Friday
```

> getFullYear( );

* Returns the year (4 digits for 4-digit years) of the specified date according to local time.

> getMonth( );

* Returns the month (0-11) in the specified date according to local time.
* 0 corresponds to January, 1 to February, and so on ...

> getTime( );

* Returns the numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC (negative for prior times).

> getTimezoneOffset( );

* Represents the difference in minutes, between UTC and local time.
* Use (getTimezoneOffset() / 60) to `represent in hour`.

> getHours( );

* Returns the hour `(0-23)` in the specified date according to local time.

> getMinutes( );

* Returns the minutes `(0-59)` in the specified date according to local time.

> getSeconds( );

* Returns the seconds `(0-59)` in the specified date according to local time.

> getMilliseconds( );

* Returns the milliseconds `(0-999)` in the specified date according to local time.

```js
var date = new Date();

var H = date.getHours();
var M = date.getMinutes();
var S = date.getSeconds();
var MS = date.getMilliseconds();

console.log('TIME: ' + H + ':' + M + ':' + S + ':' + MS);   // e.g: TIME: 17:33:54:640
```

#### Date.prototype SETTER Methods:

> setDate( );

* Sets the day of the month for a specified date according to local time.

> setFullYear( );

* Sets the full year (e.g. 4 digits for 4-digit years) for a specified date according to local time.

> setMonth( );

* Sets the month for a specified date according to local time.

> setHours( ), .setMilliseconds( ), .setMinutes( ), .setSeconds( ), .setTime( ), ...

```js
var date = new Date(1997,0,1);     // January, 1 1997
console.log(date);                 // Wed Jan 01 1997 00:00:00 GMT-0800 (PST)
date.setDate(date.getDate() - 1);  // Tue Dec 31 1996 00:00:00 GMT-0800 (PST)
console.log(date);
```

#### Date conversion GETTER:

> toDateString( );

* Returns the "date" portion of the Date as a human-readable string.

> toString( );

* Converts a Date object to a string.
* Always returns a string representation of the date in American English.

> toUTCString( );

* Converts a date to a string using the UTC timezone.
* converts your local time to GMT greenwich time.
* Note that for example now is Mon Dec 21 but in London (greenwich) is Tue, 22 Dec!

```js
var date = new Date();

console.log(date);                  // e.g: Mon Dec 21 2015 17:33:54 GMT-0800 (PST)
console.log(date.toDateString());   // e.g: Mon Dec 21 2015
console.log(date.toString());       // e.g: Mon Dec 21 2015 17:33:54 GMT-0800 (PST)
console.log(date.toUTCString());    // e.g: Tue, 22 Dec 2015 03:31:39 GMT
```


