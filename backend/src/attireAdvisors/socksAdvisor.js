module.exports = function socksAdvisorModule() {

    function advise(conditions) {
        if (conditions.getMinimumTemperature() < 5) {
            return "warm socks";
        }

        return "regular socks";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}