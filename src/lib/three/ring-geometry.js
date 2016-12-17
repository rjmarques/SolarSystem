const THREE = require('three');

THREE.RingGeometry = function ( innerRadius, outerRadius ) {

  THREE.Geometry.call( this );

  this.type = 'RingGeometry';

  this.parameters = {
    innerRadius: innerRadius,
    outerRadius: outerRadius
  };

  innerRadius = innerRadius || 0;
  outerRadius = outerRadius || 50;
  
  var toRad = Math.PI / 180.0;	
  var increment = 10; // distance between each pair of vertices in degrees
	
  for (var degree = 0; degree < 360; degree+=increment) {
	var vertex = degree*toRad;
	
	this.vertices.push( new THREE.Vector3( innerRadius * Math.cos(vertex), innerRadius * Math.sin(vertex), 0) );
	this.vertices.push( new THREE.Vector3( outerRadius * Math.cos(vertex), outerRadius * Math.sin(vertex), 0) );	
  }
  
  // uvs for the ring texture
  var uva = new THREE.Vector2(0,0);
  var uvb = new THREE.Vector2(1,0);
  var uvc = new THREE.Vector2(0,1);
  var uvd = new THREE.Vector2(1,1);
  for (var vertexNum = 0; vertexNum < this.vertices.length; vertexNum += 2) {
	  var a = vertexNum;
	  var b = vertexNum + 1;
	  var c = (vertexNum + 2) % this.vertices.length;
	  var d = (vertexNum + 3) % this.vertices.length;
	  
	  this.faces.push( new THREE.Face3(a, b, c) );
	  this.faces.push( new THREE.Face3(b, c, d) );
	  
	  this.faceVertexUvs[ 0 ].push( [ uva.clone(), uvb.clone(), uvc.clone() ] );
	  this.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc.clone(), uvd.clone() ] );
  }

  this.computeFaceNormals();

};

THREE.RingGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry;