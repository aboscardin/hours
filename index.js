var express = require('express')
var app = express()

const userData = [
  { user: 1, from: "01/01/2017", to: "12/06/2017", hours: [0,4,4,8,8,4,0]},
  { user: 1, from: "12/07/2017", to: "12/31/2017", hours: [0,3,4,8,8,4,0]},
  { user: 1, from: "01/01/2018", to: null, hours: [0,8,8,8,8,0,0]},

  { user: 2, from: "02/01/2017", to: "02/28/2017", hours: [0,4,4,8,8,4,0]},
  { user: 2, from: "03/01/2017", to: null, hours: [0,8,8,8,8,0,0]},
  { user: 2, from: "03/16/2018", to: "06/16/2018", hours: [0,8,8,8,8,0,0]}
]

app.get('/', function (req, res) {


  find_available_work_hours(1,"12/06/2017","12/09/2017");
  find_available_work_hours(1,"03/06/2017","03/31/2017");


  res.send('no err');

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


const find_available_work_hours = function(userId, from, to) {
  let fromDate = new Date(from);
  let toDate = new Date(to);

  console.log(fromDate);

  console.log(userData);

  const standardHours = [0, 8, 8, 8, 8, 8, 0];

  //Return any overrides that overlap with our query
  const userOverrides = getOverrides(userId, from, to);

  console.log(userOverrides);
  //let currentDate = fromDate;

  const results = [];

  // get overrides for user

  while (fromDate < toDate) {
    var nextDate = fromDate.setDate(fromDate.getDate() + 1);
    const dayIndex = fromDate.getDay();

    const entry = {};

    let overrideHours = userOverrides.filter((or) => { return (fromDate >= new Date(or.from)) && (fromDate <= new Date(or.to))});

    let hoursReference = null;

    if (overrideHours.length > 0) {
      hoursReference = overrideHours.pop().hours;
    } else {
      hoursReference = standardHours;
    }

    console.log(overrideHours[0]);
    entry.date = fromDate.toLocaleDateString();
    entry.hours = hoursReference[dayIndex];

    fromDate = new Date(nextDate);

    results.push(entry);
  }

  // if overrides in range use these totals
  console.log(results);

  //return array of obj {date, total hours}
  return results;
}

/* Stub for overrides query */

const getOverrides = function(id, from, to) {
  const overrides = userData.filter((entry) => { return entry.user === id && (from <= new Date(entry.to)) && (to >= new Date(entry.from)) });

  //holidays

  return overrides;
}
