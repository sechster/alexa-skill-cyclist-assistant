module.exports = function feetAdvisorModule() {
    const highShoesThreshold = 5;
    const warmSocksThreshold = 0;
    const overshoesThreshold = -5;

    function advise(conditions) {
        let advice = new Array();
        let minTemperature = conditions.getMinimumTemperature();
        let maxTemperature = conditions.getMaximumTemperature();
        let itMightRain = conditions.itMightRain();

        if (maxTemperature < highShoesThreshold) {
            advice.push("wear high shoes");
        } else {
            advice.push("wear regular shoes");
        }

        if (minTemperature < warmSocksThreshold) {
            advice.push("wear warm socks");
        } else {
            advice.push("wear regular socks");
        }

        if (itMightRain) {
            advice.push("take overshoes");
        }

        if (minTemperature < overshoesThreshold) {
            advice.push("wear overshoes");
        } 

        return advice;
    }

    let publicApi = {
        advise: advise,
        highShoesThreshold: highShoesThreshold,
        warmSocksThreshold: warmSocksThreshold,
        overshoesThreshold: overshoesThreshold,
    } 

    return publicApi;
}