const Alexa = require('alexa-sdk');
const moment = require('moment');

const APP_ID = '';

const HELP_MESSAGE = 'Just ask: Alexa, ask cycling assistant to tell me what to wear for a 70 kilometer ride';
const HELP_REPROMPT = 'ok';
const STOP_MESSAGE = 'Goodbye!';

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
    'WhatToWearIntent': function () {
        const attireAdvisor = require("./attireAdvisor");
        const rideTimeService = require("./services/rideTimeService");

        let self = this;

        let rideTime = rideTimeService.getRideTimeData(moment().toDate(), this.event.request.intent.slots.distance.value);
        let duration = Math.round(rideTime.calculateDuration() * 100) / 100

        attireAdvisor.getAdvice(rideTime)
            .then(function(advice) { 
                self.response.speak(`Ride will take: ${duration} hours. You should wear: ${advice}`);
                self.emit(':responseReady');
            });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
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
