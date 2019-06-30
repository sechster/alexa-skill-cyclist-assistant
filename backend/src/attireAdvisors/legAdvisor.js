module.exports = function legAdvisorModule() {
    const longPantsThreshold = 10;

    function advise(conditions) {
        let advice = new Array();
        let minTemperature = conditions.getMinimumTemperature();
        let currentTemperature = conditions.getCurrentTemperature();
        let maxTemperature = conditions.getMaximumTemperature();
        let itWillGetColder = currentTemperature > minTemperature

        if (maxTemperature < longPantsThreshold) {
            advice.push('wear long pants');
        } else {
            advice.push('wear short pants');
            if (minTemperature < longPantsThreshold) { 
                if (itWillGetColder) {
                    advice.push('take leg warmers');
                } else {
                    advice.push('wear leg warmers');
                }
            }
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
        longPantsThreshold: longPantsThreshold,
    } 

    return publicApi;
}