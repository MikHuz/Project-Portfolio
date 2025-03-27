/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself. 
 */

var Vector3 = function(x, y, z) {
  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the 'new' operator");
  }

  if (typeof x == 'undefined'){ this.x = 0}
  if (typeof y == 'undefined'){ this.y = 0}
  if (typeof z == 'undefined'){ this.z = 0}

}

Vector3.prototype = {

  //----------------------------------------------------------------------------- 
  set: function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  clone: function() {
    return new Vector3(this.x, this.y, this.z);
  },

  //----------------------------------------------------------------------------- 
  copy: function(other) {
    this.x = other.x; this.y = other.y; this.z = other.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  negate: function() {
    this.x *= -1; this.y *= -1; this.z *= -1;

    return this;
  },

  //----------------------------------------------------------------------------- 
  add: function(v) {
    this.x += v.x; this.y += v.y; this.z += v.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  subtract: function(v) {
    this.x -= v.x; this.y -= v.y; this.z -= v.z;

    return this;
  },

  //----------------------------------------------------------------------------- 
  multiplyScalar: function(scalar) {
    this.x *= scalar; this.y *= scalar; this.z *= scalar;

    return this;
  },

  //----------------------------------------------------------------------------- 
  length: function() {
    let x = this.x ** 2;
    let y = this.y ** 2;
    let z = this.z ** 2;
    
    let magnitude = Math.sqrt(x + y + z);
    

    return magnitude;
  },

  //----------------------------------------------------------------------------- 
  lengthSqr: function() {
    let x = this.x ** 2;
    let y = this.y ** 2;
    let z = this.z ** 2;

    return (x+ y+ z)
  },

  //----------------------------------------------------------------------------- 
  normalize: function() {
    let mag = this.length()
    this.x /= mag
    this.y /= mag
    this.z /= mag

    return this;
  },

  //----------------------------------------------------------------------------- 
  dot: function(other) {
    let dotX = this.x * other.x
    let dotY = this.y * other.y
    let dotZ = this.z * other.z

    return (dotX + dotY + dotZ);
  },



  //----------------------------------------------------------------------------- 
  fromTo: function(fromPoint, toPoint) {
    if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
      console.error("fromTo requires to vectors: 'from' and 'to'");
    }

    let x = toPoint.x - fromPoint.x
    let y= toPoint.y - fromPoint.y
    let z = toPoint.z - fromPoint.z
    
    let vector = new Vector3(x,y,z)
    return vector 

  },

  //----------------------------------------------------------------------------- 
  rescale: function(newScale) {
  let currentMagnitude = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  let scalingFactor = newScale / currentMagnitude;
  this.x *= scalingFactor;
  this.y *= scalingFactor;
  this.z *= scalingFactor;
  return this;
  },

  //----------------------------------------------------------------------------- 
  angle: function(v1, v2) {
    let dotProduct = v1.dot(v2)
    let magV1 = v1.length()
    let magV2 = v2.length()
    let angleRadians = Math.acos(dotProduct / (magV1 * magV2));
    let angleDegrees = angleRadians * (180/Math.PI)

    return angleDegrees;
  },

  //----------------------------------------------------------------------------- 
  project: function(vectorToProject, otherVector) {
    let top = vectorToProject.dot(otherVector)
    let bottom = otherVector.lengthSqr()
    let scalar = top/bottom
    let projection = otherVector.clone()
    projection.normalize();
    projection.multiplyScalar(scalar);
    return projection

  }
};

 
