import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

// Setup



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

camera.position.set(0,0,0.4);
const orbitControls = new OrbitControls(camera, renderer.domElement)



renderer.render(scene, camera);

const light= new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,20)

scene.add(light)
const amblight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( amblight );

const loader = new GLTFLoader();

loader.load('untitled.glb', function ( glb ) {
  console.log(glb)
  const root=glb.scene
  root.scale.set(2,2,2)
	scene.add( root );
  

}, function(xhr)
{console.log((xhr.loaded/xhr.total*100)+"% loaded")
},function(error){
  console.log('An error has occured')
})

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'click', onClick, false );

function onClick(event) {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {
	    console.log( 'Intersection:', intersects[ 0 ].object.name );
      
    
      if(intersects[ 0 ].object.name == 'Osidinum_Tama' ) {
        console.log( 'Name is Root' );
      }
  
	}
}

function animate() {
  requestAnimationFrame(animate);


  // controls.update();

  renderer.render(scene, camera);
}



animate();



