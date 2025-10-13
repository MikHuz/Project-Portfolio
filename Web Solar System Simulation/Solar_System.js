//Michael Huziy
'use strict'

var gl;

var appInput = new Input();
var time = new Time();
var camera = new OrbitCamera(appInput);

var sunGeometry = null; // this will be created after loading from a file
var pointLightGeometry = null;
var groundGeometry = null;
var groundGeometry2 = null;
var groundGeometry3 = null;
var groundGeometry4 = null;
var groundGeometry5 = null;
var groundGeometry6 = null;

var mercuryGeometry = null;
var venusGeometry = null;
var earthGeometry = null;
var hazeGeometry = null;
var marsGeometry = null;
var moonGeometry = null;
var jupiterGeometry = null;
var saturnGeometry = null;
var uranusGeometry = null;
var neptuneGeometry = null;

var geometries = [
    mercuryGeometry,
    venusGeometry,
    earthGeometry,
    marsGeometry,
    jupiterGeometry,
    saturnGeometry,
    uranusGeometry,
    neptuneGeometry,
    hazeGeometry
];

var projectionMatrix = new Matrix4();
var lightPosition = new Vector3();

// the shader that will be used by each piece of geometry (they could each use their own shader but in this case it will be the same)
var phongShaderProgram;
var basicColorProgram;
var sunShaderProgram;
var earthShaderProgram;

// auto start the app when the html page is ready
window.onload = window['initializeAndStartRendering'];

// we need to asynchronously fetch files from the "server" (your local hard drive)
var loadedAssets = {
    phongTextVS: null, 
    phongTextFS: null,
    vertexColorVS: null, 
    vertexColorFS: null,
    sphereJSON: null,
    marbleImage: null,
    crackedMudImage: null,
    sunImage:null,
    venusImage :null,
    mercuryImage:null,
    earthImage :null,
    moonImage :null,
    marsImage :null,
    jupiterImage:null,
    saturnImage:null,
    uranusImage:null,
    neptuneImage:null,
    galaxyNegY:null,
    galaxyPosY:null,
    galaxyNegX:null,
    galaxyPosX:null,
    galaxyNegZ:null,
    galaxyPosZ:null,
    sunVS:null,
    sunFS:null,
    earthVS:null,
    earthFS:null,
    earthNight:null,
    earthClouds:null,
};

// -------------------------------------------------------------------------
function initializeAndStartRendering() {
    initGL();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.depthMask(false);
    gl.enable(gl.DEPTH_TEST)
    loadAssets(function() {
        createShaders(loadedAssets);
        createScene();

        updateAndRender();
    });
}

// -------------------------------------------------------------------------
function initGL(canvas) {
    var canvas = document.getElementById("webgl-canvas");

    try {
        gl = canvas.getContext("webgl");
        gl.canvasWidth = canvas.width;
        gl.canvasHeight = canvas.height;

        gl.enable(gl.DEPTH_TEST);
    } catch (e) {}

    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

// -------------------------------------------------------------------------
function loadAssets(onLoadedCB) {
    var filePromises = [
        fetch('./shaders/phong.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/phong.pointlit.fs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/flat.color.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/flat.color.fs.glsl').then((response) => { return response.text(); }),
        fetch('./data/sphere.json').then((response) => { return response.json(); }),
        loadImage('./data/marble.jpg'),
        loadImage('./data/crackedMud.png'),
        loadImage('./data/sun.jpg'),
        loadImage('./data/mercury.jpg'),
        loadImage('./data/2k_earth_daymap.jpg'),
        loadImage('./data/moon.Png'),
        loadImage('./data/mars.jpg'),
        loadImage('./data/venusAt.jpg'),
        loadImage('./data/jupiter.jpg'),
        loadImage('./data/saturn.jpg'),
        loadImage('./data/uranus.jpg'),
        loadImage('./data/neptune.jpg'),
        loadImage('./data/GalaxyTex_NegativeY.png'),
        loadImage('./data/GalaxyTex_PositiveY.png'),
        loadImage('./data/GalaxyTex_NegativeX.png'),
        loadImage('./data/GalaxyTex_PositiveX.png'),
        loadImage('./data/GalaxyTex_NegativeZ.png'),
        loadImage('./data/GalaxyTex_PositiveZ.png'),
        fetch('./shaders/sun.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/sun.fs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/earth.vs.glsl').then((response) => { return response.text(); }),
        fetch('./shaders/earth.fs.glsl').then((response) => { return response.text(); }),
        loadImage('./data/2k_earth_nightmap.jpg'),
        loadImage('./data/2k_earth_clouds.jpg'),
    ];

    Promise.all(filePromises).then(function(values) {
        // Assign loaded data to our named variables
        loadedAssets.phongTextVS = values[0];
        loadedAssets.phongTextFS = values[1];
        loadedAssets.vertexColorVS = values[2];
        loadedAssets.vertexColorFS = values[3];
        loadedAssets.sphereJSON = values[4];
        loadedAssets.marbleImage = values[5];
        loadedAssets.crackedMudImage = values[6];
        loadedAssets.sunImage = values[7];
        loadedAssets.mercuryImage= values[8];
        loadedAssets.earthImage = values[9];
        loadedAssets.moonImage = values[10];
        loadedAssets.marsImage = values[11];
        loadedAssets.venusImage = values[12];
        loadedAssets.jupiterImage = values[13];
        loadedAssets.saturnImage = values[14];
        loadedAssets.uranusImage = values[15];
        loadedAssets.neptuneImage= values[16];
        loadedAssets.galaxyNegY= values[17];
        loadedAssets.galaxyPosY= values[18];
        loadedAssets.galaxyNegX= values[19];
        loadedAssets.galaxyPosX= values[20];
        loadedAssets.galaxyNegZ= values[21];
        loadedAssets.galaxyPosZ= values[22];
        loadedAssets.sunVS= values[23];
        loadedAssets.sunFS= values[24];
        loadedAssets.earthVS= values[25];
        loadedAssets.earthFS= values[26];
        loadedAssets.earthNight= values[27];
        loadedAssets.earthClouds= values[28];
    

    }).catch(function(error) {
        console.error(error.message);
    }).finally(function() {
        onLoadedCB();
    });
}

// -------------------------------------------------------------------------
function createShaders(loadedAssets) {
    phongShaderProgram = createCompiledAndLinkedShaderProgram(loadedAssets.phongTextVS, loadedAssets.phongTextFS);

    phongShaderProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(phongShaderProgram, "aVertexPosition"),
        vertexNormalsAttribute: gl.getAttribLocation(phongShaderProgram, "aNormal"),
        vertexTexcoordsAttribute: gl.getAttribLocation(phongShaderProgram, "aTexcoords")
    };

    phongShaderProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(phongShaderProgram, "uProjectionMatrix"),
        lightPositionUniform: gl.getUniformLocation(phongShaderProgram, "uLightPosition"),
        cameraPositionUniform: gl.getUniformLocation(phongShaderProgram, "uCameraPosition"),
        textureUniform: gl.getUniformLocation(phongShaderProgram, "uTexture"),
    };

    earthShaderProgram = createCompiledAndLinkedShaderProgram(loadedAssets.earthVS, loadedAssets.earthFS);
    earthShaderProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(earthShaderProgram, "aVertexPosition"),
        vertexNormalsAttribute: gl.getAttribLocation(earthShaderProgram, "aNormal"),
        vertexTexcoordsAttribute: gl.getAttribLocation(earthShaderProgram, "aTexcoords")
    };
    
    earthShaderProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(earthShaderProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(earthShaderProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(earthShaderProgram, "uProjectionMatrix"),
        lightPositionUniform: gl.getUniformLocation(earthShaderProgram, "uLightPosition"),
        cameraPositionUniform: gl.getUniformLocation(earthShaderProgram, "uCameraPosition"),
        textureUniform: gl.getUniformLocation(earthShaderProgram, "uTexture"),
    };

    sunShaderProgram = createCompiledAndLinkedShaderProgram(loadedAssets.sunVS, loadedAssets.sunFS);

    sunShaderProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(sunShaderProgram, "aVertexPosition"),
        vertexNormalsAttribute: gl.getAttribLocation(sunShaderProgram, "aNormal"),
        vertexTexcoordsAttribute: gl.getAttribLocation(sunShaderProgram, "aTexcoords")
    };
    
    sunShaderProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(sunShaderProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(sunShaderProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(sunShaderProgram, "uProjectionMatrix"),
        lightPositionUniform: gl.getUniformLocation(sunShaderProgram, "uLightPosition"),
        cameraPositionUniform: gl.getUniformLocation(sunShaderProgram, "uCameraPosition"),
        textureUniform: gl.getUniformLocation(sunShaderProgram, "uTexture"),
    };

    basicColorProgram = createCompiledAndLinkedShaderProgram(loadedAssets.vertexColorVS, loadedAssets.vertexColorFS);
    gl.useProgram(basicColorProgram);

    basicColorProgram.attributes = {
        vertexPositionAttribute: gl.getAttribLocation(basicColorProgram, "aVertexPosition"),
        vertexColorsAttribute: gl.getAttribLocation(basicColorProgram, "aVertexColor"),
        vertexTexcoordsAttribute: gl.getAttribLocation(basicColorProgram, "aTexcoords")
    };

    basicColorProgram.uniforms = {
        worldMatrixUniform: gl.getUniformLocation(basicColorProgram, "uWorldMatrix"),
        viewMatrixUniform: gl.getUniformLocation(basicColorProgram, "uViewMatrix"),
        projectionMatrixUniform: gl.getUniformLocation(basicColorProgram, "uProjectionMatrix"),
        colorUniform: gl.getUniformLocation(basicColorProgram, "uColor"),
        textureUniform: gl.getUniformLocation(basicColorProgram, "uTexture"),
    };
}

// -------------------------------------------------------------------------
function createScene() {
    groundGeometry = new WebGLGeometryQuad(gl,sunShaderProgram);
    groundGeometry.create(loadedAssets.galaxyNegY);
    var scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    var rotation = new Matrix4().makeRotationX(-90);
    var translation = new Matrix4().makeTranslation(0,-400,0);
    groundGeometry.worldMatrix.makeIdentity();
    groundGeometry.worldMatrix.multiply(translation).multiply(scale).multiply(rotation);

    groundGeometry2 = new WebGLGeometryQuad(gl, sunShaderProgram);
    groundGeometry2.create(loadedAssets.galaxyNegX);
    scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    rotation = new Matrix4().makeRotationX(90);
    translation = new Matrix4().makeTranslation(0,400,0);
    groundGeometry2.worldMatrix.makeIdentity();
    groundGeometry2.worldMatrix.multiply(translation).multiply(scale).multiply(rotation);

    groundGeometry3= new WebGLGeometryQuad(gl, sunShaderProgram);
    groundGeometry3.create(loadedAssets.galaxyNegX);
    scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    rotation = new Matrix4().makeRotationY(90);
    translation = new Matrix4().makeTranslation(-400,0,0);
    groundGeometry3.worldMatrix.makeIdentity();
    groundGeometry3.worldMatrix.multiply(translation).multiply(scale).multiply(rotation);

    groundGeometry4= new WebGLGeometryQuad(gl,sunShaderProgram);
    groundGeometry4.create(loadedAssets.galaxyPosX);
    scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    rotation = new Matrix4().makeRotationY(-90);
    translation = new Matrix4().makeTranslation(400,0,0);
    groundGeometry4.worldMatrix.makeIdentity();
    groundGeometry4.worldMatrix.multiply(translation).multiply(scale).multiply(rotation);

    groundGeometry5= new WebGLGeometryQuad(gl, sunShaderProgram);
    groundGeometry5.create(loadedAssets.galaxyNegZ);
    translation = new Matrix4().makeTranslation(0, 0, -400); 
    var rotationX = new Matrix4().makeRotationX(0); 
    var rotationY = new Matrix4().makeRotationY(0); 
    var rotationZ = new Matrix4().makeRotationZ(90); 
    scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    var localTransformations = new Matrix4().multiply(rotationX).multiply(rotationY).multiply(rotationZ);
    groundGeometry5.worldMatrix.makeIdentity();
    groundGeometry5.worldMatrix.multiply(translation).multiply(localTransformations).multiply(scale);
    //groundGeometry5.setTextureCoordinates(rotatedTextureCoordinates);
     
    groundGeometry6= new WebGLGeometryQuad(gl, sunShaderProgram);
    groundGeometry6.create(loadedAssets.galaxyPosZ);
    scale = new Matrix4().makeScale(500.0, 500.0, 500.0);
    rotation = new Matrix4().makeRotationZ(-90);
    translation = new Matrix4().makeTranslation(0,0,400);
    groundGeometry6.worldMatrix.makeIdentity();
    groundGeometry6.worldMatrix.multiply(translation).multiply(scale).multiply(rotation);

    var sunScale = new Matrix4().makeScale(0.40, 0.40, 0.40);
    var sunTranslation = new Matrix4().makeTranslation(0, 0, 0);
    sunGeometry = new WebGLGeometryJSON(gl,sunShaderProgram);
    sunGeometry.create(loadedAssets.sphereJSON, loadedAssets.sunImage);
    sunGeometry.worldMatrix.makeIdentity();
    sunGeometry.worldMatrix.multiply(sunTranslation).multiply(sunScale);

    var earthScale = new Matrix4().makeScale(0.045, 0.045, 0.045);
    var earthTranslation = new Matrix4().makeTranslation(20, 0, 20);
    earthGeometry = new WebGLGeometryJSON(gl, earthShaderProgram);
    earthGeometry.createMultiple(loadedAssets.sphereJSON, [loadedAssets.earthImage, loadedAssets.earthNight]);
    earthGeometry.worldMatrix.makeIdentity();
    earthGeometry.worldMatrix.multiply(earthTranslation).multiply(earthScale);
  
    hazeGeometry = new WebGLGeometryJSON(gl, basicColorProgram);
    hazeGeometry.create(loadedAssets.sphereJSON,loadedAssets.earthClouds);
    var hazeScale = new Matrix4().makeScale(0.0452, 0.0452, 0.0452);
    var hazeTranslation = new Matrix4().makeTranslation(20, 0, 20);
    hazeGeometry.worldMatrix.makeIdentity();
    hazeGeometry.worldMatrix.multiply(hazeTranslation).multiply(hazeScale);


    var mercScale = new Matrix4().makeScale(0.019, 0.019, 0.019);
    var mercTranslation = new Matrix4().makeTranslation(0, 0.2, 0);
    mercuryGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    mercuryGeometry .create(loadedAssets.sphereJSON, loadedAssets.mercuryImage);
    mercuryGeometry .worldMatrix.makeIdentity();
    mercuryGeometry .worldMatrix.multiply(mercTranslation).multiply(mercScale);

    var venScale = new Matrix4().makeScale(0.043, 0.043, 0.043);
    var venTranslation = new Matrix4().makeTranslation(0, 0.2, 0);
    venusGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    venusGeometry .create(loadedAssets.sphereJSON, loadedAssets.venusImage);
    venusGeometry .worldMatrix.makeIdentity();
    venusGeometry .worldMatrix.multiply(venTranslation).multiply(venScale);

    var moonScale = new Matrix4().makeScale(0.016, 0.016, 0.016);
    var moonTranslation = new Matrix4().makeTranslation(26, 0, 26);
    moonGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    moonGeometry .create(loadedAssets.sphereJSON, loadedAssets.moonImage);
    moonGeometry .worldMatrix.makeIdentity();
    moonGeometry .worldMatrix.multiply(moonTranslation).multiply(moonScale);

    var marsScale = new Matrix4().makeScale(0.03, 0.03, 0.03);
    var marsTranslation = new Matrix4().makeTranslation(0, 0.15, 0);
    marsGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    marsGeometry.create(loadedAssets.sphereJSON, loadedAssets.marsImage);
    marsGeometry.worldMatrix.makeIdentity();
    marsGeometry.worldMatrix.multiply(marsTranslation).multiply(marsScale);

    var saturnScale = new Matrix4().makeScale(0.095, 0.095, 0.095);
    var saturnTranslation = new Matrix4().makeTranslation(0,0,0);
    saturnGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    saturnGeometry.create(loadedAssets.sphereJSON, loadedAssets.saturnImage);
    saturnGeometry.worldMatrix.makeIdentity();
    saturnGeometry.worldMatrix.multiply(saturnTranslation).multiply(saturnScale);

    var jScale = new Matrix4().makeScale(0.1, 0.1, 0.1);
    var jTranslation = new Matrix4().makeTranslation(0,0,0);
    jupiterGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    jupiterGeometry.create(loadedAssets.sphereJSON, loadedAssets.jupiterImage);
    jupiterGeometry.worldMatrix.makeIdentity();
    jupiterGeometry.worldMatrix.multiply(jTranslation).multiply(jScale);

    var uScale = new Matrix4().makeScale(0.066, 0.066, 0.066);
    var uTranslation = new Matrix4().makeTranslation(0,0,0);
    uranusGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    uranusGeometry.create(loadedAssets.sphereJSON, loadedAssets.uranusImage);
    uranusGeometry.worldMatrix.makeIdentity();
    uranusGeometry.worldMatrix.multiply(uTranslation).multiply(uScale);

    var nScale = new Matrix4().makeScale(0.078, 0.078, 0.078);
    var nTranslation = new Matrix4().makeTranslation(0, 0, 0);
    neptuneGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    neptuneGeometry.create(loadedAssets.sphereJSON, loadedAssets.neptuneImage);
    neptuneGeometry.worldMatrix.multiply(nTranslation).multiply(nScale);


     geometries = [
        mercuryGeometry,
        venusGeometry,
        earthGeometry,
        marsGeometry,
        jupiterGeometry,
        saturnGeometry,
        uranusGeometry,
        neptuneGeometry,
        hazeGeometry
    ];

    pointLightGeometry = new WebGLGeometryJSON(gl, phongShaderProgram);
    pointLightGeometry.create(loadedAssets.sphereJSON);
    var lightScale = new Matrix4().makeScale(0.015, 0.015, 0.015);
    var lightTranslation= new Matrix4().makeTranslation(-20, -50, -20);
    pointLightGeometry.worldMatrix.makeIdentity().multiply(lightTranslation).multiply(lightScale);
}

// -------------------------------------------------------------------------
function updateAndRender() {
    requestAnimationFrame(updateAndRender);

    var aspectRatio = gl.canvasWidth / gl.canvasHeight;

    time.update();
    camera.update(time.deltaTime);
    let startSpeed = 0.9;
    var cosTime = Math.cos((time.secondsElapsedSinceStart)*startSpeed);
    var sinTime = Math.sin((time.secondsElapsedSinceStart)*startSpeed);
    let m = new Matrix4();
    let sunRotationMatrix = new Matrix4();
    sunRotationMatrix.makeRotationY(140.0* time.deltaTime);
    sunGeometry.worldMatrix.multiply(sunRotationMatrix);

    lightPosition.x = sunGeometry.worldMatrix.elements[3];
    lightPosition.y = sunGeometry.worldMatrix.elements[7];
    lightPosition.z = sunGeometry.worldMatrix.elements[11];

    let distance = 25.0;
    let moonDistance = 3.0;
    let selfRotationSpeed = 0.0;
    for (let i = 0; i <8; i++) {
       
        const geometry = geometries[i];
        if (i == 4){
            geometries[i].worldMatrix.multiply(new Matrix4().makeRotationY(15.0));
        }
        else if (i == 1){
        geometries[i].worldMatrix.multiply(new Matrix4().makeRotationY(-8.0*selfRotationSpeed));
        }
        else{
            geometries[i].worldMatrix.multiply(new Matrix4().makeRotationY(1.0*selfRotationSpeed));
        }
        geometries[i].worldMatrix.elements[3] = distance * cosTime;
        geometries[i].worldMatrix.elements[7] = lightPosition.y;
        geometries[i].worldMatrix.elements[11] = distance * -sinTime;
        
        switch(i){
            case 0:
                //console.log("MERC");
                mercuryGeometry.worldMatrix =   geometries[i].worldMatrix;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/2);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/2);
                distance+=9.0;
            break;
            case(1):
                //console.log("VENUS");
                venusGeometry.worldMatrix = geometries[i].worldMatrix;
                distance+=15.0;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/3);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/3);
                break;
            case(2):
                //console.log("EARTH");
                earthGeometry.worldMatrix = geometries[i].worldMatrix;
                geometries[8].worldMatrix.elements[3] = distance * cosTime;
                geometries[8].worldMatrix.multiply(new Matrix4().makeRotationY(1.0*selfRotationSpeed));
                geometries[8].worldMatrix.elements[7] = lightPosition.y;
                geometries[8].worldMatrix.elements[11] = distance * -sinTime;
                hazeGeometry.worldMatrix = geometries[8].worldMatrix;
          
                moonGeometry.worldMatrix.elements[3] = earthGeometry.worldMatrix.elements[3] + moonDistance;
                moonGeometry.worldMatrix.elements[7] =  lightPosition.y;
                moonGeometry.worldMatrix.elements[11] = earthGeometry.worldMatrix.elements[11] + moonDistance;
                moonGeometry.worldMatrix.multiply(new Matrix4().makeRotationY(7.2*selfRotationSpeed))

                /*let moonTranslate = new Matrix4().makeTranslation(moonDistance, 0, 0);
                let moonRotate = new Matrix4().makeRotationY(7.2 * selfRotationSpeed);
                let moonScale = new Matrix4().makeScale(0.016, 0.016, 0.016);
                let moonMatrix = new Matrix4().makeIdentity().multiply(moonTranslate).multiply(moonRotate);
                let moonPositionRelativeToEarth = new Matrix4().makeIdentity().multiply(earthGeometry.worldMatrix).multiply(moonMatrix);
                moonGeometry.worldMatrix = moonPositionRelativeToEarth;*/
                //moonGeometry.worldMatrix.multiply(new Matrix4().makeRotationY(1.0));
                //console.log("EARTH");
                //earthGeometry.worldMatrix = geometries[i].worldMatrix;
                 
                cosTime = Math.cos((time.secondsElapsedSinceStart)/5);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/5);
                distance+=25.0;
                break;
            case(3):
                //console.log("MARS");
                marsGeometry.worldMatrix = geometries[i].worldMatrix;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/7);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/7);
                distance+=20.0;
                break; 
            case(4):
                //console.log("Jupiter");
                jupiterGeometry.worldMatrix = geometries[i].worldMatrix;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/4.5);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/4.5);
                distance+=50.0;
                break;   
            case(5):
                //console.log("Saturn");
                saturnGeometry.worldMatrix = geometries[i].worldMatrix;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/17);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/17);
                distance+=55.0;
                break;
            case(6):
                //console.log("Uranus");
                uranusGeometry.worldMatrix = geometries[i].worldMatrix;
                cosTime = Math.cos((time.secondsElapsedSinceStart)/9);
                sinTime = Math.sin((time.secondsElapsedSinceStart)/9);
                distance+=59.0;
                break; 
            case(7):
                neptuneGeometry.worldMatrix = geometries[i].worldMatrix;
                break;   
        }
        selfRotationSpeed += 0.7;
       
    }

    // specify what portion of the canvas we want to draw to (all of it, full width and height)
    gl.viewport(0, 0, gl.canvasWidth, gl.canvasHeight);

    // this is a new frame so let's clear out whatever happened last frame
    gl.clearColor(0.707, 0.707, 1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(phongShaderProgram);
    var uniforms = phongShaderProgram.uniforms;
    var cameraPosition = camera.getPosition();
    gl.uniform3f(uniforms.lightPositionUniform, lightPosition.x, lightPosition.y, lightPosition.z);
    gl.uniform3f(uniforms.cameraPositionUniform, cameraPosition.x, cameraPosition.y, cameraPosition.z);

    projectionMatrix.makePerspective(45, aspectRatio, 0.1, 1000);
    groundGeometry.render(camera, projectionMatrix, sunShaderProgram);
    groundGeometry2.render(camera, projectionMatrix,sunShaderProgram);
    groundGeometry3.render(camera, projectionMatrix, sunShaderProgram);
    groundGeometry4.render(camera, projectionMatrix, sunShaderProgram);
    groundGeometry5.render(camera, projectionMatrix, sunShaderProgram);
    groundGeometry6.render(camera, projectionMatrix, sunShaderProgram);
    sunGeometry.render(camera, projectionMatrix, sunShaderProgram);
    mercuryGeometry.render(camera, projectionMatrix, phongShaderProgram);
    venusGeometry.render(camera, projectionMatrix, phongShaderProgram);
    earthGeometry.render(camera, projectionMatrix,earthShaderProgram);
    moonGeometry.render(camera, projectionMatrix, phongShaderProgram);
    marsGeometry.render(camera, projectionMatrix, phongShaderProgram);
    jupiterGeometry.render(camera, projectionMatrix, phongShaderProgram);
    saturnGeometry.render(camera, projectionMatrix, phongShaderProgram);
    uranusGeometry.render(camera, projectionMatrix, phongShaderProgram);
    neptuneGeometry.render(camera, projectionMatrix, phongShaderProgram);
    hazeGeometry.render(camera, projectionMatrix, basicColorProgram);

    gl.depthMask(true);
    
    gl.useProgram(basicColorProgram);
    gl.useProgram(earthShaderProgram);
    gl.uniform4f(basicColorProgram.uniforms.colorUniform, 1.0, 1.0, 1.0, 1.0);
    
    //pointLightGeometry.render(camera, projectionMatrix, basicColorProgram);
}
