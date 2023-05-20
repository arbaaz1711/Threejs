let geometry = new THREE.SphereGeometry( 1, 12, 8 );

let material = new THREE.MeshPhongMaterial( {
  color: 0x00ffff, 
  flatShading: true,
  transparent: true,
  opacity: 0.7,
} );

let mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );



var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
 scene.add(new THREE.PlaneHelper( plane, 100, 0xffff00 ));



var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var intersects = new THREE.Vector3();

function onMouseMove(e) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
   raycaster.ray.intersectPlane(plane, intersects); 
  mesh.position.set(intersects.x, intersects.y, intersects.z);
}
