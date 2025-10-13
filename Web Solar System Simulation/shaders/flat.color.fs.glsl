//Michael Huziy
precision mediump float;

uniform vec4 uColor;
uniform vec3 uLightPosition;
uniform sampler2D uTexture;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec2 vTexcoords;

void main(void) {
    vec3 nLightPosition = normalize(uLightPosition - vWorldPosition);
    vec3 nWorldNormal = normalize(vWorldNormal);
    float angle = dot(nWorldNormal, nLightPosition);
    vec2 uv = vec2(vTexcoords.x, vTexcoords.y);
    vec4 textureColor = texture2D(uTexture, uv);

    vec3 materialColor = vec3(textureColor.x, textureColor.y, textureColor.z);

    vec3 lightColorDiffuse = vec3(0.8, 0.8, 0.8); 
    vec3 colorDiffuse = materialColor * lightColorDiffuse * max(dot(nWorldNormal, nLightPosition), 0.0);
    vec3 diffuseColor = materialColor * lightColorDiffuse * max(dot(nWorldNormal, nLightPosition), 0.0);

    if (angle < 0.0) {
        gl_FragColor = vec4(textureColor.rgb*0.1, 0.1);
    } else {
        gl_FragColor = vec4(textureColor.rgb, 0.1);
    }
}

