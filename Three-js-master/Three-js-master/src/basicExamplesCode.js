import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import droid from "three/examples/fonts/droid/droid_sans_mono_regular.typeface.json";
import { BufferAttribute, Mesh, WebGLRenderTarget } from "three";
import worldMap from "./images/worldMap.png";
import coronaBk from "./images/coronaBk.png";
import corona_dn from "./images/corona_dn.png";
import corona_ft from "./images/corona_ft.png";
import corona_lf from "./images/corona_lf.png";
import corona_rt from "./images/corona_rt.png";
import corona_up from "./images/corona_up.png";

// Debug
/* ...code about lil-gui*/

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// CONTROLS
    /*Orbit Control */
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enablePan = false;
// orbit.maxAzimuthAngle = Math.PI / 2;
// orbit.minAzimuthAngle = Math.PI / 4;
orbit.update();

    /* Fly Controls */
// const controls = new FlyControls( camera, renderer.domElement );
// controls.movementSpeed = 100;
// controls.rollSpeed = Math.PI / 100;
// controls.autoForward = true;
// controls.dragToLook = true;
// controls.update(0.01)

    /* First Person Control */
// const firstControls = new FirstPersonControls (camera,renderer.domElement)
// firstControls.activeLook
// firstControls.movementSpeed = 100
// firstControls.lookVertical=false
// firstControls.update(0.1)

/* LOADERS*/
const loader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();
const textLoader = new FontLoader();

const texture = loader.load(worldMap);
// sphereMat.map = texture;
// scene.add(sphere);

const cubeTexture = cubeLoader.load([
  corona_ft, // front
  coronaBk, // back
  corona_up, // upside
  corona_dn, // downside
  corona_rt, // right
  corona_lf, // left
]);
scene.background = cubeTexture;

const font = textLoader.parse(droid);
const textGeometry = new TextGeometry("3D Globe", {
  font: font,
  size: 10,
  height: 5,
});
const textMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
const textMesh = new Mesh(textGeometry, textMat);
textMesh.position.set(-30, 27, -2);
scene.add(textMesh);

/* Geometries, Materials and Meshes */
// Object 1
const sphereGeo = new THREE.SphereGeometry(20, 50, 50);
const sphereMat = new THREE.MeshPhongMaterial({
  color: 0x0e87cc,
  shininess: 1000,
  map: texture,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Object 2
const buffGeo = new THREE.BufferGeometry();
const data = new Float32Array([-1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0]);
buffGeo.setAttribute("position", new THREE.BufferAttribute(data, 3));
buffGeo.center();
const point = new THREE.Points(buffGeo, new THREE.PointsMaterial());
point.position.x = 50;
scene.add(point);

//Object 3
// Demo how to use buffer geometry with points to draw simple line
const points = [];
points.push(new THREE.Vector3(-70, 0, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(10, -70, 0));
points.push(new THREE.Vector3(-70, -70, 0));
points.push(new THREE.Vector3(-70, 0, 0));
const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
const lineMat = new THREE.MeshBasicMaterial({ color: 0xff2345 });
const line = new THREE.Line(lineGeo, lineMat);
line.position.set(30, 40);
scene.add(line);

// Object 4
// creating cube to get its position points and normal points using BufferAttribute
const boxGeometry = new THREE.BoxGeometry(15, 15, 15);
const boxMaterial = new THREE.MeshPhongMaterial({
  color: 0xff65ff,
  shininess: 180,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-55, 5, 8);
// const positionArr = boxGeometry.getAttribute('position')
// const normalArr = boxGeometry.getAttribute('normal')
scene.add(box);

// Object 5
const planeGeo = new THREE.PlaneGeometry(5, 5, 65, 65);
const uv = planeGeo.getAttribute("uv");
const planeMat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  //   map:loader.load(terrain),
  //   displacementMap: loader.load(terrain),
  //   displacementScale: 10,
  side: THREE.FrontSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.set(0, -40, 22);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

/* EventListeners */
document.addEventListener("mousemove", shakeGlobe);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
function shakeGlobe(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// Animate
const animate = () => {
  sphere.rotation.y -= 0.01;
  //   if (mouseX > window.innerWidth / 2) {
  //     sphere.position.x = mouseX * -0.005;
  //   } else {
  //     sphere.position.x = (window.innerWidth - mouseX) * 0.005;
  //   }
  sphere.position.x = mouseX * 0.01;
  sphere.position.y = mouseY * 0.01;

  //   controls.update(1)
  // firstControls.update(0.1)
  //   labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
