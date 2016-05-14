/** Holds the base definition of a natural satellite **/

function Satellite() {
	// TODO AstroObj.call(this, orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius);
}

Satellite.prototype = Object.create(AstroObj.prototype); 

Satellite.prototype.update = function(elapsedTime, orbitCentre){
	// TODO AstroObj.prototype.update.call(this, elapsedTime, orbitCentre);
};

module.exports = Satellite;