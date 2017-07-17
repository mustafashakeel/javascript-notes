```js
var date = new Date();
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var yy = date.getFullYear();
var mm = date.getMonth();
var dd = date.getDate();
var weekDay = date.getDay();

var toDay = weekDays[weekDay] + ' ' + dd + '.' + months[mm] + '.' + yy;

console.log('Today is: ' + toDay);    // TODAY is: Monday 21.December.2015
```