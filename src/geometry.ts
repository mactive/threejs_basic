import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Objects
 */

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

const points = [];
points.push( new THREE.Vector3( - 1, 0, 1 ) );
points.push( new THREE.Vector3( 0, 1, 1 ) );
points.push( new THREE.Vector3( 1, 0, 1 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );


const mesh = new THREE.Line( geometry, material );
// mesh.position.set(100, 100, 0)

scene.add(mesh)

// light
const light = new THREE.PointLight(0xffffff, 10)
light.position.set(2, 0, 0)
scene.add(light)
const backLight = new THREE.PointLight(0xffffff, 10)
backLight.position.set(0, 0, 2)
scene.add(backLight)
const topLight = new THREE.PointLight(0xffffff, 10)
topLight.position.set(0, 2, 0)
scene.add(topLight)


/**
 * Sizes
 */

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.set(1, 1, 3)
scene.add(camera)

camera.lookAt(mesh.position)

const axeshelper = new THREE.AxesHelper(2)
scene.add(axeshelper)




/**
 * renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Cursor
 */
let corsor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    corsor.x = event.clientX / sizes.width - 0.5
    corsor.y = - (event.clientY / sizes.height - 0.5) 
})

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
console.log(controls)
// controls.enableDamping = true // 拖拽阻尼
// controls.enableZoom = true // 开启缩放

// animate
const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()

    // camera.position.x = Math.sin(corsor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(corsor.x * Math.PI * 2) * 3
    // camera.position.y = corsor.y * 5
    // camera.lookAt(mesh.position)
    renderer.render(scene, camera)

    requestAnimationFrame(animate)

}
animate() 
renderer.render(scene, camera)
