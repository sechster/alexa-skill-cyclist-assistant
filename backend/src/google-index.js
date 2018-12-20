const {dialogflow} = require('actions-on-google');
const moment = require('moment');


const app = dialogflow();


app.intent('actions.intent.MAIN', (conv) => {
    console.log("Cycling assistant: actions.intent.MAIN.");
  });

  
app.intent('raw.input', (conv, input) => {
    console.log("Cycling assistant: raw.input.");
  });


app.intent('What to wear', (conv, params) => {
    console.log("Cycling assistant: WhatToWearIntent.");

    const attireAdvisor = require("./attireAdvisor");
    const rideTimeService = require("./services/rideTimeService");
    const duration = require('./duration');

    let rideTime = rideTimeService.getRideTimeData(moment().toDate(), params.distance.amount);
    let durationText = duration.getText(rideTime.startTime, rideTime.endTime);

    return attireAdvisor.getAttireSet(rideTime)
        .then(function(attireSet) { 
            let advice = attireSet.map(value => "<p>" + value + "</p>").join("<break time=\"1000ms\"/>");
            conv.close(`<speak>Your ride will take about ${durationText}. You should wear: ${advice} Keep safe!</speak>`);
        });
  });



  app.fallback((conv) => {
    console.log("Cycling assistant: fallback.");
    conv.ask(`I couldn't understand. Can you say that again?`);
  });



  exports.fulfillment = app;