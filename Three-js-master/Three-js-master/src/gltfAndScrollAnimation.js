import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "./images/phone.glb";
import newModel from "./images/out.glb";
import damage from "./images/damage.glb";
import iphone from "./images/iphone.glb";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BufferAttribute, Mesh, WebGLRenderTarget } from "three";

gsap.registerPlugin(ScrollTrigger);

// Debug
/* ...code about lil-gui*/

// SCENE
const scene = new THREE.Scene();
// scene.background = new THREE.Color("white")
/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();

gltfLoader.load(
  iphone,
  function (gltf) {
    const phone = gltf.scene;
    phone.position.set(0, 0, 20);
    phone.rotation.x = -2
    scene.add(gltf.scene);
    // gsap.to(phone.position, {
    //   ease: "none",
    //   duration:7,
    //   // scrollTrigger: {
    //   //   trigger: "#canvas",
    //   //   start: "top top",
    //   //   end: "+=4000px",
    //   //   markers: true,
    //   //   scrub: 2,
    //   //   // toggleActions: "restart pause resume pause"
    //   // },
    //   z: -8,
    //   y: -24
    // });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section1",
    start: "top top",
    end: "300px",
    // markers: true,
    scrub: 2,
}
})
// tl.to(".section1",{opacity:1,ease:"none",duration:2})
// .to(".section2",{opacity:1,ease:"none",duration:2},"<")
// .to(".section1",{opacity:0,ease:"none",duration:1})
// .to(".section2",{opacity:0,ease:"none",duration:1},"<")

let titleTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".title",
    start: "top top",
    end: "300px",
    // markers: true,
    scrub: 2,
  }
})
titleTl
.to(".title h2",{opacity:0,duration:7},"<")
// gsap.to(".para",{opacity:1,
//   scrollTrigger: {
//     trigger: ".para",
//     // start: "top 200%",
//     // end: "+=300px",
//     markers: true,
//     // scrub: 2,
//     onUpdate:(self)=>console.log("self",self)
// }
// })

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.set(0, 0, 40);

// RENDERER

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas").appendChild(renderer.domElement);
// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(dLight1);
const dLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(dLight2);
const dLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(dLight3);
dLight1.position.set(-20, 0, 2);
dLight2.position.set(20, 0, -2);
dLight3.position.set(0, 2, 2);

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

// ScrollTrigger.create({
//   trigger:canvas,
//   start:"top center",
//   end:"3000px",
//   pin:true,
//   markers:true,
//   onUpdate:(self)=>console.log(self.previous)
// })

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
  const currentTimeline = window.scrollY / 3000;
  const rx = currentTimeline;
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
