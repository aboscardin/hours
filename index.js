const express = require('express');
const app = express();

const userData = [
  { user: 1, from: "01/01/2017", to: "12/06/2017", hours: [0,4,4,8,8,4,0]},
  { user: 1, from: "12/07/2017", to: "12/31/2017", hours: [0,3,4,8,8,4,0]},
  { user: 1, from: "01/01/2018", to: null, hours: [0,8,8,8,8,0,0]},

  { user: 2, from: "02/01/2017", to: "02/28/2017", hours: [0,4,4,8,8,4,0]},
  { user: 2, from: "03/01/2017", to: null, hours: [0,8,8,8,8,0,0]},
  { user: 2, from: "03/16/2018", to: "06/16/2018", hours: [0,8,8,8,8,0,0]}
]

const checkAvailability = require('./lib/availability.js');

const availability = new checkAvailability(userData);

const prompt = require('prompt');
const promptOptions = [{
  name: 'userId',
  type: 'integer',
  required: true
  }, 'from', 'to'];

prompt.start();

app.listen(3000, function () {
  prompt.get(promptOptions, testCallback);

});

const testCallback = function(err, res) {
    console.log('checking availability for ');
    console.log('  user: ' + res.userId);
    console.log('  from: ' + res.from);
    console.log('  to: ' + res.to);

    const testResults = availability.findAvailableWorkHours(res.userId, res.from, res.to);

    testResults.forEach((result) => {
      console.log(result);
    });

   prompt.get(promptOptions, testCallback);
}
