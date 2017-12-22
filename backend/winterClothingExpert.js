module.exports = function winterClothingExpertModule(conditions) {

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
        return "winter shoes";
    }

    function adviseOvershoes() {
        return "winter shoes";
    }

    function adviseGlasses(){
        // if there is sun - dark glasses
        // if there is no sun - moderate glasses
        // if it is dark - transparent glasses

        if (conditions.isSunny()) {
            return "sunglasses level three";
        } else if (conditions.isCloudy()) {
            return "sunglasses level two";
        } else if (conditions.isDark()) {
            return "transparent glasses";
        }

        return "";
    }

    let attire = {
        headGear: adviseHeadGear(),
        smogMask: adviseSmogMask(),
        shirt: adviseShirt(),
        jacket: adviseJacket(),
        gloves: adviseGloves(),
        pants: advisePants(),
        socks: adviseSocks(),
        shoes: adviseShoes(),
        overshoes: adviseOvershoes(),
        glasses: adviseGlasses()
    }

    function getAdvice() {
        return Object.values(attire).join(", ");
    }    

    return {
        getAdvice: getAdvice
    }
}