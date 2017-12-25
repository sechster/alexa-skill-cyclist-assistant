const experts = { 
    summer: require("./attireBuilders/summerAttireBuilder"),
    spring: require("./attireBuilders/springAttireBuilder"),
    autumn: require("./attireBuilders/autumnAttireBuilder"),
    winter: require("./attireBuilders/winterAttireBuilder"),
} ;

module.exports.create = function createModule(conditions) {
        return new experts[conditions.getCurrentSeason()](conditions);
}