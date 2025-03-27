/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */

var Sphere = function(center, radius, color) {
  
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }
  this.center = center;
  this.radius = radius;
	if (color == undefined){
		this.color = new Vector3(1.0,1.0,1.0);
	  }
	else{
		this.color = color
	}
  
  if (!(this.center instanceof Vector3)) {
    this.center = new Vector3(0,0,0);
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    this.radius = 1;
    console.error("The radius must be a Number");
  }


};

Sphere.prototype = {
  
  //----------------------------------------------------------------------------- 
  raycast: function(r1) {
    var result = {
      hit: null,      // should be of type Boolean
      point: null,    // should be of type Vector3
      normal: null,   // should be of type Vector3
      distance: null, // should be of type Number (scalar)
    };

    /*|| aD + (o-C)||^2 - r^2 = 0 Intersection function
   a = alpha (scalar value, need to find with qudratic formula)
   D = Ray direction, r1.direction
   o = ray origin, r1.origin
   C = sphere center, this.center
   r = radius, this.radius*/
    
    let direction = r1.direction.clone();
    let origin = r1.origin.clone();

    let originMCenter=origin.subtract(this.center);
    let coefficientA = direction.dot(direction);
    let coefficientB = direction.multiplyScalar(2).dot(originMCenter);
    let coefficientC = (originMCenter.dot(originMCenter) - this.radius**2);
    let discriminant = coefficientB**2 - 4*(coefficientA*coefficientC);
    if (discriminant < 0){
      result.hit = false;
      return result;
    }
    else{
      discriminant = Math.sqrt(discriminant);
      let value1 = ((-coefficientB + discriminant) / (2*coefficientA))
      let value2= ((-coefficientB - discriminant) / (2*coefficientA))
      let alpha = (value1 > value2 ? value2 : value1);
      if (alpha < 0 ){
        //negative intersection
        result.hit = false;
        return result;
      }
      result.hit = Boolean(true);
      Offset = r1.clone().direction.multiplyScalar(alpha);
      result.point = r1.origin.clone().add(Offset);
      let point = result.point.clone();
      let PMinusC = point.subtract(this.center)
      result.normal = PMinusC.normalize();
      result.distance = alpha;

       /* result.point = r1.origin.add(r1.direction.multiplyScalar(alpha));
        let point = result.point.clone()
        let PMinusC = point.subtract(this.center)
        result.normal = PMinusC.normalize();
        result.distance = alpha*/
    
    
    }
  
    return result;
  }
}

