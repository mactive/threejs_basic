import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Objects
 */

const geometry = new THREE.BufferGeometry()
const count = 100
const positionArray = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xC0D1CE });



const mesh = new THREE.Line(geometry, material);
scene.add(mesh)

/**
 * Sizes
 */

const sizes = {
    width: 600,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
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
