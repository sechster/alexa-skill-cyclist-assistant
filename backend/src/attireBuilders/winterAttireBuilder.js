// builder pattern - concrete builder
module.exports = function winterAttireBuilderModule(conditions) {

    function adviseHeadGear() {
        return "balaclava";
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
        return "winter gloves";
    }

    function advisePants() {
        return "long pants";
    }

    function adviseSocks(){
        return "warm socks";
    }

    function adviseShoes() {
        return "high shoes";
    }

    function adviseOvershoes() {
        return "overshoes";
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