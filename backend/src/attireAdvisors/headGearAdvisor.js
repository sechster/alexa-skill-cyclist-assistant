module.exports = function headGearAdvisorModule() {
    const balaclavaThreshold = 0;
    const winterCapThreshold = 10;

    function advise(conditions) {
        let advice = new Array();
        let minTemperature = conditions.getMinimumTemperature();

        if (minTemperature <= balaclavaThreshold) {
            advice.push("wear balaclava");
        }
        else if (minTemperature <= winterCapThreshold) {
            advice.push("wear winter cap");
        }
        else {
            if (conditions.isCloudy() == false) {
                advice.push("wear cycling cap");
            }
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
        balaclavaThreshold: balaclavaThreshold,
        winterCapThreshold: winterCapThreshold,
    } 

    return publicApi;
}