module.exports = function glovesAdvisorModule() {
    const winterGlovesThreshold = 5;
    const autumnGlovesThreshold = 10;

    function advise(conditions) {
        let advice = new Array();
        let minimumTemperature = conditions.getMinimumTemperature();

        if (minimumTemperature < winterGlovesThreshold) {
            advice.push("wear winter gloves");
        }
        else if (minimumTemperature < autumnGlovesThreshold) {
            advice.push("wear autumn gloves");
        }
        else {
            advice.push("wear short gloves");
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
        winterGlovesThreshold: winterGlovesThreshold,
        autumnGlovesThreshold: autumnGlovesThreshold,
    } 

    return publicApi;
}