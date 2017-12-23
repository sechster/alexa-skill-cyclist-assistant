module.exports = function attireBuilderFactoryModule() {

    let experts = { 
        summer: require("./attireBuilders/summerAttireBuilder"),
        spring: require("./attireBuilders/springAttireBuilder"),
        autumn: require("./attireBuilders/autumnAttireBuilder"),
        winter: require("./attireBuilders/winterAttireBuilder"),
    } ;

    function create(conditions) {
        return experts[conditions.getCurrentSeason()](conditions);
    }

    return {
        create: create
    };
}