import './style.css'; 
import * as THREE from "three"; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Setup: Need Scene, Camera, and a Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

//Renders the Scene
renderer.render( scene, camera );

const torusGeometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const torusMaterial = new THREE.MeshBasicMaterial( {color: 0xff6347} ); 
const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.z = 200;

scene.add(torus);

//Will light everything in the scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  torus.position.z = t * -0.05 - 200;
}

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera );
}

//Handles if the window is resized
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize);
document.body.onscroll = moveCamera;
moveCamera();
animate();

window.addEventListener("load", function() {
  var element = document.querySelector(".education");
  setTimeout(function() {
    element.classList.add("visible");
  }, 1000);
});