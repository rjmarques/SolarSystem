/** Holds the base definition of a natural satellite **/

var AstroObj = require('./astronomicalobject');

function Satellite(planet, orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius) {
	AstroObj.call(this, orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius);
	this.planet = planet;
}

Satellite.prototype = Object.create(AstroObj.prototype); 

Satellite.prototype.update = function(elapsedTime){
	AstroObj.prototype.update.call(this, elapsedTime, this.planet.object.position.clone());
};

module.exports = Satellite;