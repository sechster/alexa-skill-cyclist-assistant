// builder pattern - concrete builder
module.exports = function winterClothingExpertModule(conditions) {

    function adviseHeadGear() {
        if (conditions.getMinimumTemperature() <= 0)
        {
            return "take balaclava";
        }
    }

    function adviseSmogMask() {
        if (conditions.isSmoggy()) {
            return "smog mask";
        }

        return "";
    }

    function adviseShirt(){
        return "long sleeve shirt";
    }

    function adviseJacket(){
        return "cycling jacket";
    }

    function adviseGloves() {
        return "autumn gloves";
    }

    function advisePants() {
        return "long pants";
    }

    function adviseSocks(){
        return "regular socks";
    }

    function adviseShoes() {
        if (conditions.isWet()) {
            return "high shoes";
        }

        return "MTB shoes";
    }

    function adviseOvershoes() {
        if (conditions.isWet() || conditions.getMinimumTemperature() < 4) {
            return "overshoes";
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
        adviseJacket: adviseJacket,
        adviseGloves: adviseGloves,
        advisePants: advisePants,
        adviseSocks: adviseSocks,
        adviseShoes: adviseShoes,
        adviseOverShoes: adviseOverShoes,
        adviseArmWarmers: adviseArmWarmers,
        adviseRainJacket: adviseRainJacket,
        adviseGlasses: adviseGlasses
    } 

    return publicApi;
}