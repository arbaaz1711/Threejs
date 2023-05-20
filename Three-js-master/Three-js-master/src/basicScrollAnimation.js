import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import flare from "./images/flare.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BufferAttribute, Mesh, WebGLRenderTarget } from "three";

gsap.registerPlugin(ScrollTrigger)
// Debug
/* ...code about lil-gui*/

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  40
);
camera.position.set(0, 0, 20);

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
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.enablePan = false;
// orbit.enableRotate = true;
// orbit.maxDistance = 50;
// orbit.minZoom = 50;
// orbit.enableDamping = true;
// orbit.panSpeed = 30;
// orbit.zoomSpeed = 1;
// orbit.update();

/* LOADERS*/

/* Geometries, Materials and Meshes */

// Object 1
const particleGeo = new THREE.BufferGeometry();
const particleCount = 1500;

const posArr = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  if ((i - 1) % 3 == 0 && i < 1000) {
    continue;
  } else if (i % 3 == 0 && i < 2000) {
    posArr[i] = (Math.random() - 0.5) * 10;
  } else {
    posArr[i] = (Math.random() - 0.5) * 2;
  }
}
particleGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));

// const particleMat = new THREE.PointsMaterial({
//   size: 0.005,
// });
const positionAttribute = particleGeo.getAttribute("position");
// const PARTICLE_SIZE = 20;
const colors = [];
const partSizes = [];

const color = new THREE.Color();

for (let i = 0, l = positionAttribute.count; i < l; i++) {
  color.setHSL(0.01 + 0.4 * (i / l), 1, 0.6);
  // color.setRGB(0.001*i + 0.04,0.5/i,0.4*i)
  color.toArray(colors, i * 3);
  partSizes[i] = 0.02;
}

particleGeo.setAttribute("position", positionAttribute);
particleGeo.setAttribute(
  "customColor",
  new THREE.Float32BufferAttribute(colors, 3)
);
particleGeo.setAttribute(
  "size",
  new THREE.Float32BufferAttribute(partSizes, 1)
);
let uniform = {
  color: {
    value: new THREE.Color(0, 0, 0),
  },
  pointTexture: { value: new THREE.TextureLoader().load(flare) },
};
const particleMat = new THREE.ShaderMaterial({
  uniforms: uniform,
  vertexShader: document.getElementById("vertexshader").textContent,
  fragmentShader: document.getElementById("fragmentshader").textContent,
  // blending:THREE.AdditiveBlending,
  // depthTest:false,
  transparent: true,
});

const particle = new THREE.Points(particleGeo, particleMat);
scene.add(particle);

// Object 2
let uniforms2 = {
  time: { value: 1.0 },
};
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.ShaderMaterial({
  uniforms: uniforms2,

  vertexShader: document.getElementById("vertexshader2").textContent,
  fragmentShader: document.getElementById("fragmentshader2").textContent,
});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.set(0, 0, 0);
scene.add(cube);

//Object 3

// Object 4

// Object 5

/* EventListeners */
document.addEventListener("mousemove", particleMove);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
function particleMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// window.addEventListener("mousemove", cameraUpdate);
const tl = gsap.timeline();
// function cameraUpdate(){
//   tl.to(camera.position,{y:-1,z:20,ease:"linear",duration:3,})
//   .to(camera.position,{y:0,z:-22,ease:"linear",duration:4,})
//   .to(camera.position,{z:5,ease:"linear",duration:1})
// }

// ---------------start---------------------

ScrollTrigger.defaults({
  scrub: 3,
  ease: 'none',
})
const sections = document.querySelectorAll('.section');

const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const section4 = document.querySelector(".section4")
// gsap.from(cube.position, {
//   y: 1,
//   duration: 1,
//   ease: 'expo',
// })
// gsap.from('h1', {
//   yPercent: 100,
//   autoAlpha: 0,
//   ease: 'back',
//   delay: 0.3,
// })
// gsap.to(cube.rotation, {
//   x: 0,
//   scrollTrigger: {
//     trigger: section1,
//   },
// })
gsap.to(camera.position,{
   x:0,
   y:0,
  z:2,
  duration:5,
  scrollTrigger:{
    trigger:section2,
    start:"top top",
    // end:"top top",
    scrub:5
  }
})
// gsap.to(cube.position,{
//   x:0,
//   scrollTrigger:{
//     trigger:section2
//   }
// })
// gsap.to(cube.position.x, {
//   x: -2,
//   scrollTrigger: {
//     trigger: section2,
//   },
// })
// gsap.to(cube.position, {
//   x:0,
//   z:10,
//   scrollTrigger: {
//     trigger: section3,
//   },
// })

// ----------------end--------------------


// Animate
const animate = (time) => {
  particle.position.x = mouseX * 0.00008;
  particle.position.y = mouseY * 0.00008;

  uniforms2["time"].value = time / 1000;

  uniform["color"].value = new THREE.Color(time / 1000, 0.5, time * 0.000001);

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
