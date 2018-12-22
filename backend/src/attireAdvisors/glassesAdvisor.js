module.exports = function glassesAdvisorModule() {

    function advise(conditions) {
        if (conditions.getMinimumTemperature() <= 2) {
            return "goggles";
        }

        if (conditions.isDark()) {
            return "transparent glasses";
        }

        if (conditions.isCloudy()) {
            return "sunglasses level two";
        } 

        return "sunglasses level three";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}