/** Holds the base definition of a generic astronomical object **/

function AstroObj(orbitTimeByEarthDays, rotationTimeByEarthDays, orbitRadius) {
	this.revolutionTime = 2000; // time is takes for a full earth day, in miliseconds
	
	this.rotationTimeByEarthDays = rotationTimeByEarthDays; // how many earth days it takes for a full rotation
	this.orbitTimeByEarthDays = orbitTimeByEarthDays; // how many earth days it takes for a full orbit
	this.orbitRadius = orbitRadius;
	this.object = null; // object representation
}

AstroObj.prototype.update = function(elapsedTime, orbitCentre){
	// orbit update
	var orbitTime = this.revolutionTime*this.orbitTimeByEarthDays;
	var orbitDegPerSec = (360/orbitTime)*1000;
	var orbitAngle = (orbitDegPerSec * elapsedTime) % 360;		
	this.object.position.x = Math.sin(orbitAngle * Math.PI / 180) * this.orbitRadius;
	this.object.position.z = Math.cos(orbitAngle * Math.PI / 180) * this.orbitRadius;
	this.object.position.add(orbitCentre);

	// rotation update
	var rotationTime = this.revolutionTime*this.rotationTimeByEarthDays;
	var degPerSec = (360/rotationTime)*1000;
	var rotationAngle = (degPerSec * elapsedTime) % 360;
	this.object.rotation.y = rotationAngle * Math.PI / 180;
};

module.exports = AstroObj;