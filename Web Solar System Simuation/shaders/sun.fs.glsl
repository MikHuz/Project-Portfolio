//Michael Huziy
precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;


void main(void) {
   vec3 emissiveColor =  texture2D(uTexture, vTexcoords).rgb;
gl_FragColor = vec4(emissiveColor, 1.0);
}
