/** Holds the base definition of a planet **/

var AstroObj = require('./astronomicalobject');

function Planet(orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius) {	
	// all planets orbit around the sun
	this.orbitCentre = new THREE.Vector3();
	AstroObj.call(this, orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius);
}

Planet.prototype = Object.create(AstroObj.prototype); 

Planet.prototype.update = function(elapsedTime){
	AstroObj.prototype.update.call(this, elapsedTime, this.orbitCentre);
};

module.exports = Planet;