const Alexa = require('alexa-sdk');

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

        let self = this;

        attireAdvisor.getAdvice(this.event.request.intent.slots.distance.value)
            .then(function(advice) { 
                self.response.speak(`You should wear: ${advice}`);
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
