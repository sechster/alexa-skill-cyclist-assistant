const Alexa = require('alexa-sdk');
const moment = require('moment');

const APP_ID = 'amzn1.ask.skill.374de5df-752c-47d0-877d-8e3c9ba04790';

const HELP_MESSAGE = 'Just say: Alexa, ask the quartermaster to tell me what to wear for a 70 kilometer ride.';
const STOP_MESSAGE = 'Bye!';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('WhatToWearIntent');
    },
    'Unhandled': function() {
        console.log("Cycling assistant - Unhandled");
        this.response.speak("I do not know what you are saying double o seven");
        this.emit(':ask', 'There was an error. Check the logs.');
    },
    'WhatToWearIntent': function () {
        if (!isSlotValid(this.event.request, "distance")) {
            delegateSlotCollection(this.event, this.emit);
        } else {
            const attireAdvisor = require("./attireAdvisor");
            const rideTimeService = require("./services/rideTimeService");
            const duration = require('./duration');

            let self = this;

            let rideTime = rideTimeService.getRideTimeData(moment().toDate(), this.event.request.intent.slots.distance.value);
            let durationText = duration.getText(rideTime.startTime, rideTime.endTime);

            attireAdvisor.getAdvice(rideTime)
                .then(function(advice) { 
                    self.response.speak(`Ride will take: ${durationText}. ${advice}`);
                    self.emit(':responseReady');
                });
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
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