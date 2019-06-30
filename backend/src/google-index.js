const {dialogflow} = require('actions-on-google');
const config = require('config');

const app = dialogflow();



app.intent('What to wear', (conv, params) => {
    console.log("Cycling companion: WhatToWearIntent.");

    const cyclingCompanion = require("./cyclingCompanion");
    const duration = require('./duration');

    let location = {
      latitude: config.get("location.latitude"),
      longitude: config.get("location.longitude")
    };

    return cyclingCompanion.getHints(params.distance.amount, location)
        .then(function(result) { 

          if (result.itMightSnow)
          {
            conv.close("It might snow, you should stay home!");
          }

          let durationText = duration.getText(result.rideTime.startTime, result.rideTime.endTime);
          let attireAdvice = result.attireSet.map(value => "<p>" + value + ", </p>").join("<break time=\"700ms\"/>");
            
          conv.close(`<speak>Your ride will take about ${durationText}. You should: ${attireAdvice} Keep safe!</speak>`);
        });
  });

  exports.fulfillment = app;