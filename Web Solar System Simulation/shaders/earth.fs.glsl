//Michael Huziy
precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1; 

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;


void main(void) {
    vec3 nLightPosition = normalize(uLightPosition - vWorldPosition);
    vec3 nWorldNormal = normalize(vWorldNormal);

    vec3 materialColor = vec3(1.0, 1.0, 1.0); 
    vec3 lightColorDiffuse = vec3(0.8, 0.8, 0.8); 
    vec3 colorDiffuse = materialColor * lightColorDiffuse * max(dot(nWorldNormal, nLightPosition), 0.0);

    vec3 eyeDirection = normalize(uCameraPosition - vWorldPosition);
    vec3 distance = dot(nLightPosition, nWorldNormal) * nWorldNormal;
    vec3 moveTo =  2.0 * (distance - nLightPosition);
    vec3 reflectionOfLight = nLightPosition + moveTo;

    float specPower = 64.0;
    float specTerm = max(dot(reflectionOfLight, eyeDirection), 0.0);
    float phongSpecular = pow(specTerm, specPower);

   
     if (dot(nWorldNormal, nLightPosition) > 0.0){
        vec2 uv = vec2(vTexcoords.x, vTexcoords.y);
        vec4 textureColor = texture2D(uTexture0, uv);
        materialColor = vec3(textureColor.x, textureColor.y, textureColor.z);
     }
     else{
        vec2 uv = vec2(vTexcoords.x, vTexcoords.y);
        vec4 textureColor = texture2D(uTexture1, uv);
        materialColor = vec3(textureColor.x, textureColor.y, textureColor.z);
     }
 
   

    vec3 lightColorSpec = vec3(0.5, 0.5, 0.5);  

    vec3 albedo = texture2D(uTexture0, vTexcoords).rgb;
    vec3 ambient = albedo * 0.9;
    vec3 diffuseColor = materialColor * lightColorDiffuse * max(dot(nWorldNormal, nLightPosition), 0.0);
    vec3 diffuseColorNight = materialColor * lightColorDiffuse;
    vec3 specularColor = materialColor * lightColorSpec * phongSpecular; 

    float distanceToLight = length(uLightPosition - vWorldPosition);
    float distanceToLightSqr = distanceToLight * distanceToLight;

   float linearFalloff = 0.00001;
    float quadraticFallof = 0.00005;
    float attenuation = 1.0 / (1.0 + linearFalloff * distanceToLight + quadraticFallof * distanceToLightSqr);

    vec3 finalColor = diffuseColor* attenuation;
     if (dot(nWorldNormal, nLightPosition) < 0.0){
        gl_FragColor = vec4(diffuseColorNight*0.5,1.0);
     }
     else{
        gl_FragColor = vec4(finalColor, 1.0);
     }
    
}
