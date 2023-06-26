import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(0, 0, 30);
const cubeGeometry = new THREE.BoxGeometry(1, 5, 1);
const cubeMaterial = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.set( 0, -10, 0);
scene.add( cube);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff); 

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const danielTexture = new THREE.TextureLoader().load('images/LangDaniel.jpg');

const daniel = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, .1),
  new THREE.MeshBasicMaterial( { map: danielTexture } )
);
daniel.position.setY(-10);
scene.add(daniel);

function moveCamera(){
 
  const t = document.body.getBoundingClientRect().top;
  cube.rotation.y += 0.03;

  daniel.position.y = t * -0.006 - 10;
  daniel.position.x = Math.sin((t-8) * 0.005) * 10;
  daniel.position.z = Math.cos((t-8) * 0.005) * 15;

  document.addEventListener('mousemove', function(event) {
    var cursorX = event.clientX;
    var cursorY = event.clientY;
    
    console.log("Cursor position - X: " + cursorX + ", Y: " + cursorY);
    var pixelLocation = getGeometryPixelLocation(daniel);
    console.log("Mesh pixel location - X: " + pixelLocation.x + ", Y: " + pixelLocation.y);
  });



}

document.body.onscroll = moveCamera;
moveCamera();
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getGeometryPixelLocation(geometry) {
  var vector = new THREE.Vector3();

  // Get world position of the geometry
  geometry.getWorldPosition(vector);

  // Project world position to screen coordinates
  vector.project(camera);

  // Convert to pixel coordinates
  var x = Math.round((vector.x + 1) * window.innerWidth / 2);
  var y = Math.round((-vector.y + 1) * window.innerHeight / 2);

  return { x: x, y: y };
}


window.addEventListener('resize', handleWindowResize);




