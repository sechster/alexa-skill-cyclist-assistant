// builder pattern - concrete builder
module.exports = function springClothingExpertModule(conditions) {

    function adviseHeadGear() {
        return "cycling cap";
    }

    function adviseSmogMask() {
        if (conditions.isSmoggy()) {
            return "smog mask";
        }

        return "";
    }

    function adviseShirt(){
        if (conditions.getAverageTemperature() < 17) {
            return "long sleeve shirt";
        }

        return "short sleeve shirt";
    }

    function adviseGloves() {
        return "short gloves";
    }

    function advisePants() {
        return "short pants";
    }

    function adviseSocks(){
        return "regular socks";
    }

    function adviseShoes() {
        return "low shoes";
    }

    function adviseArmWarmers() {
        if (conditions.getAverageTemperature() >= 17 && conditions.getMinimumTemperature() < 17) {
            return "take arm warmers";
        }

        return "";
    }

    function adviseLegWarmers() {
        if (conditions.getMinimumTemperature() < 10) {
            return "take leg warmers";
        }

        return "";
    }

    function adviseRainJacket() {
        if (conditions.itMightRain()) {
            return "take rain jacket";
        }

        return "";
    }

    function adviseGlasses(){

        if (conditions.isDark()) {
            return "transparent glasses";
        }

        if (conditions.isCloudy()) {
            return "sunglasses level two";
        } 

        return "sunglasses level three";
    }

    let publicApi = {
        adviseHeadGear: adviseHeadGear,
        adviseSmogMask: adviseSmogMask,
        adviseShirt: adviseShirt,
        adviseGloves: adviseGloves,
        advisePants: advisePants,
        adviseSocks: adviseSocks,
        adviseShoes: adviseShoes,
        adviseArmWarmers: adviseArmWarmers,
        adviseLegWarmers: adviseLegWarmers,
        adviseRainJacket: adviseRainJacket,
        adviseGlasses: adviseGlasses
    } 

    return publicApi;
}