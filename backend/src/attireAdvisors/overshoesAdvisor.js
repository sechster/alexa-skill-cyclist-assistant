module.exports = function overshoesAdvisorModule() {

    function advise(conditions) {
        if (conditions.itMightRain() || conditions.getMinimumTemperature() < 5) {
            return "overshoes";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}