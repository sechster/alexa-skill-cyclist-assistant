module.exports = function torsoAdvisorModule() {
    const cyclingJacketThreshold = 5;
    const thinJacketThreshold = 10;
    const rainJacketThreshold = 15;
    const longSleeveThreshold = 15;

    function advise(conditions) {
        let advice = new Array();
        let minTemperature = conditions.getMinimumTemperature();
        let currentTemperature = conditions.getCurrentTemperature();
        let maxTemperature = conditions.getMaximumTemperature();
        let itMightRain = conditions.itMightRain();
        let itWillGetColder = currentTemperature > minTemperature

        if (itMightRain) {
            if (minTemperature < rainJacketThreshold) {
                advice.push("take rain jacket");
            }
        }

        if (minTemperature < thinJacketThreshold) {
            if (itWillGetColder) {
                advice.push("take thin jacket");
            } else {
                advice.push("wear thin jacket");
            }
        }  

        if (maxTemperature < longSleeveThreshold) {
            advice.push("wear long sleeve shirt");
            if (minTemperature < cyclingJacketThreshold) {
                advice.push("wear cycling jacket");
            } 
        } else {
            advice.push("wear short sleeve shirt");
            if (minTemperature < longSleeveThreshold) {
                if (itWillGetColder) {
                    advice.push("take arm warmers");
                } else {
                    advice.push("wear arm warmers");
                }
            }
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
        cyclingJacketThreshold: cyclingJacketThreshold,
        thinJacketThreshold: thinJacketThreshold,
        longSleeveThreshold: longSleeveThreshold,
        rainJacketThreshold: rainJacketThreshold,
    } 

    return publicApi;
}