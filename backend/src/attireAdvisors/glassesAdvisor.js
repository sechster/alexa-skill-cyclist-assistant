module.exports = function glassesAdvisorModule() {
    const gogglesThreshold = 3;

    function advise(conditions) {
        let advice = new Array();
        if (conditions.getMinimumTemperature() < gogglesThreshold) {
            advice.push("wear goggles");
        } else {
            if (conditions.isDark()) {
                advice.push("wear transparent glasses");
            } else {
                if (conditions.isCloudy()) {
                    advice.push("wear sunglasses level two");
                } else {
                    advice.push("wear sunglasses level three");
                }
            }
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
        gogglesThreshold: gogglesThreshold
    } 

    return publicApi;
}