import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import model from "./images/phone.glb";
// import newModel from "./images/out.glb";
// import damage from "./images/damage.glb";
import iphone from "./images/iphone.glb";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BufferAttribute, Mesh, WebGLRenderTarget } from "three";

gsap.registerPlugin(ScrollTrigger);

// Debug
/* ...code about lil-gui*/

// SCENE
const scene = new THREE.Scene();
/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();

gltfLoader.load(
  iphone,
  function (gltf) {
    const phone = gltf.scene;
    phone.position.set(0, -65, 15);
    phone.rotation.x = 0.2;
    scene.add(gltf.scene);
    const phoneTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#canvas",
        start: "top top",
        end: "+=5000px",
        markers: true,
        scrub: 2,
      },
    });
    phoneTl
      .to(phone.position, {
        ease: "none",
        duration: 3,
        z: -8,
        y: -27,
      })
      .to(".title h2", { opacity: 0, ease: "linear", duration: 0.5 }, "<")
      .to(
        phone.rotation,
        {
          ease: "none",
          duration: 3,
          x: 0,
        },
        "<"
      )
      .to(phone.position, {
        ease: "linear",
        duration: 3,
        x: -45,
      })
      .to(
        ".section4 h2",
        { x: 580,opacity:1, duration: 2, scale: 1.6, ease: "none" },
        "-=2"
      )
      .to(phone.scale, {
        ease: "none",
        duration: 1,
        x: 0.6,
        y: 0.8,
      })
      .fromTo(
        ".section5 h2",
        { scale: 0, opacity: 0, duration: 2 },
        { scale: 1, opacity: 1, duration: 2 },
        "<"
      )
      .to(phone.rotation, {
        ease: "none",
        duration: 7,
        y: 10,
      })
      .to(".section5 h2", { opacity: 0 }, "<")
      .to(".section1", { opacity: 1, ease: "none", duration: 1 }, "-=6.3")
      .to(".section2", { opacity: 1, ease: "none", duration: 1 }, "<")
      .to(".section1", { opacity: 0, ease: "none" }, "-=5.3")
      .to(".section2", { opacity: 0, ease: "none" }, "<")
      .to(".section3", { opacity: 1, ease: "none", duration: 1 }, "-=4.8")
      .to(".section3", { opacity: 0, ease: "none", duration: 1 }, "-=3.8")
      // .to(".section6 img", { scale: 3, opacity: 1, duration: 1 }, "-=2.8")
      .fromTo(".innerBat",{x:-100,duration:1},{x:10,duration:1},"-=2.8")
      .fromTo(".battery",{scale:0,duration:1},{opacity:1,scale:1.2,duration:1},"<")
      .to(".section6 h2", { scale: 1.3, opacity: 1, duration: 1 }, "<")
      .to(".section6", { opacity: 0, duration: 1.8 }, "-=1.8")
      .to(".battery",{opacity:0,duration: 1.8},"<")
      .to(".section2",{opacity:0,duration:3})  
      // .to(".section6 h2", { opacity: 0, duration: 1 }, "<");
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// const myText = new SplitType('.section4')
// console.log(myText.chars)
// gsap.to(".big",{x:-60,delay:.5,duration:2,ease:"none"})

const [red, green, blue] = [153, 0, 153];
const section3 = document.querySelector(".section3");

//Background Color changing on scroll
window.addEventListener("scroll", () => {
  let y = (window.scrollY || window.pageYOffset) / 550;
  y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to Safari's elastic scroll)
  const [r, g, b] = [red / y, green / y, blue / y].map(Math.round);
  canvas.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.set(0, 0, 40);

// RENDERER

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas").appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement)
renderer.setClearColor(0x000000, 0);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(dLight1);
const dLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(dLight2);
const dLight3 = new THREE.DirectionalLight(0xeee9e9, 0.8);
scene.add(dLight3);
const spotLight = new THREE.SpotLight(0xfffff, 0.8);
scene.add(spotLight);
dLight1.position.set(-20, 0, 2);
dLight2.position.set(20, 0, -2);
spotLight.position.set(0, 4, -14);
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

/**
 * Shaders
 */
//  let g = new THREE.PlaneGeometry(2, 2);
//  let m = new THREE.ShaderMaterial({
//      uniforms: {
//        color1: { value: new THREE.Color(0xff00ff)},
//        color2: { value: new THREE.Color(0xff0000)},
//        ratio: {value: innerWidth / innerHeight}
//      },
//      vertexShader: `varying vec2 vUv;
//        void main(){
//          vUv = uv;
//          gl_Position = vec4(position, 1.);
//        }`,
//            fragmentShader: `varying vec2 vUv;
//          uniform vec3 color1;
//          uniform vec3 color2;
//          uniform float ratio;
//          void main(){
//            vec2 uv = (vUv - 0.5) * vec2(ratio, 1.);
//            gl_FragColor = vec4( mix( color1, color2, length(uv)), 1. );
//          }`
//      })
//  let p = new THREE.Mesh(g, m);
//  p.position.set(0, -70, 0)
//  scene.add(p);

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
var newIntersects = new THREE.Vector3();

/* Geometries, Materials and Meshes */

// Object 1
// const addNewSphereMesh = (x,y,z) => {
//   const sphereGeo = new THREE.SphereGeometry(1);
//   const sphereMaterial = new THREE.MeshPhongMaterial({
//     color:0xffffff,
//   });
//   const sphere = new THREE.Mesh(sphereGeo,sphereMaterial);
//   sphere.position.set(x,y,z);
//   scene.add(sphere)
// }

// Object 2
// const newBoxGeo = new THREE.BoxGeometry(5,5,5)
// const newBoxMat = new THREE.MeshStandardMaterial({
//   color:0xffffff,
//   metalness:0.4,
//   roughness:0,
// });
// const newBox = new Mesh(newBoxGeo,newBoxMat);
// newBox.position.set(0,7,5)
// scene.add(newBox)

//Object 3

// Object 4

// Object 5

/* EventListeners */

// const onMouseMove = (event) => {
//   pointer.x = (event.clientX/window.innerWidth)*2-1;
//   pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   raycaster.setFromCamera(pointer,camera);
//   const intersects = raycaster.intersectObjects( scene.children );

// for ( let i = 0; i < intersects.length; i ++ ) {
// 	intersects[ i ].object.material.color.set( 0xff0000 );
// }

// if (intersects.length > 0){
//   intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff )
//   // scene.background = new THREE.Color("white")
// }
// }
// function resetMaterial(){
//   for(let i = 0; i < scene.children.length ; i++){
//     if(scene.children[i].material){
//       scene.children[i].material.color.set(0xffffff)
// scene.background = new THREE.Color("black")
//     }
//   }
// }
// window.addEventListener("mousemove",resetMaterial)
// window.addEventListener("mousemove",onMouseMove);
// function Calling
// addNewSphereMesh(0,2,0)
// addNewSphereMesh(3,2,0)
// addNewSphereMesh(-3,2,0)
// addNewSphereMesh(0,2,-3)
// addNewSphereMesh(3,2,-3)
// addNewSphereMesh(-3,2,-3)
// addNewSphereMesh(0,2,3)
// addNewSphereMesh(3,2,3)
// addNewSphereMesh(-3,2,3)

// Animate
const animate = (time) => {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
