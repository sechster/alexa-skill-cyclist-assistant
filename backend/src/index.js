const Alexa = require('alexa-sdk');
const moment = require('moment');

const APP_ID = 'amzn1.ask.skill.374de5df-752c-47d0-877d-8e3c9ba04790';

const HELP_MESSAGE = 'Just say: Alexa, ask the quartermaster to tell me what to wear for a 70 kilometer ride.';
const STOP_MESSAGE = 'Ok.';

exports.handler = function(event, context, callback) {
    console.log("Cycling assistant: executing.");
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        console.log("Cycling assistant: LaunchRequest.");
        this.emit('WhatToWearIntent');
    },
    'Unhandled': function() {
        console.log("Cycling assistant: Unhandled.");
        this.response.speak("I do not know what you are saying double o seven");
        this.emit(':ask', 'There was an error. Check the logs.');
    },
    'WhatToWearIntent': function () {
        console.log("Cycling assistant: WhatToWearIntent.");
        if (!isSlotValid(this.event.request, "distance")) {
            delegateSlotCollection(this.event, this.emit);
        } else {

            const cyclingCompanion = require("./cyclingCompanion");
            const duration = require('./duration');
        
            let self = this;

            cyclingCompanion.getHints(this.event.request.intent.slots.distance.value)
                .then(function(result) { 
        
                  if (result.itMightSnow)
                  {
                    self.response.speak(`It might snow, you should stay home!`);
                    self.emit(':responseReady');
                  }
        
                  let durationText = duration.getText(result.rideTime.startTime, result.rideTime.endTime);
                  let attireAdvice = result.attireSet.map(value => "<p>" + value + ", </p>").join("<break time=\"700ms\"/>");
                    
                  self.response.speak(`<speak>Your ride will take about ${durationText}. You should wear: ${attireAdvice} Keep safe!</speak>`);
                  self.emit(':responseReady');
                });
        }
    },
    'AMAZON.HelpIntent': function () {
        console.log("Cycling assistant: HelpIntent.");
        this.response.speak(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        console.log("Cycling assistant: CancelIntent.");
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log("Cycling assistant: StopIntent.");
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

function delegateSlotCollection(event, emit){
    if (event.request.dialogState === "STARTED") {
        var updatedIntent = event.request.intent;
        emit(":delegate", updatedIntent);
    } else if (event.request.dialogState !== "COMPLETED") {
        emit(":delegate");
    }
}

function isSlotValid(request, slotName){
    return (
        request.intent 
            && request.intent.slots 
            && request.intent.slots[slotName] 
            && request.intent.slots[slotName].value);
}