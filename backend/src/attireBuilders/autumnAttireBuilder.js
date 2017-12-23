// builder pattern - concrete builder
module.exports = function autumnAttireBuilderModule(conditions) {

    function adviseHeadGear() {
        if (conditions.getMinimumTemperature() <= 0)
        {
            return "take balaclava";
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
        if (conditions.getMinimumTemperature() < 10) {
            return "high shoes";
        }

        return "MTB shoes";
    }

    function adviseOvershoes() {
        if (conditions.itMightRain() || conditions.getMinimumTemperature() < 4) {
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
        adviseOvershoes: adviseOvershoes,
        adviseGlasses: adviseGlasses
    } 

    return publicApi;
}