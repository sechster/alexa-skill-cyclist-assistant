// builder pattern - concrete builder
module.exports = function summerAttireBuilderModule(conditions) {

    function adviseHeadGear() {
        if (conditions.isCloudy() == false) {
            return "cycling cap";
        }

        return "";
    }

    function adviseSmogMask() {
        if (conditions.isSmoggy()) {
            return "smog mask";
        }

        return "";
    }

    function adviseShirt(){
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
        if (conditions.getMinimumTemperature() < 17) {
            return "take arm warmers";
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
        adviseRainJacket: adviseRainJacket,
        adviseGlasses: adviseGlasses
    } 

    return publicApi;
}