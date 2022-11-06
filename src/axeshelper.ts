import * as THREE from 'three';

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Objects
 */

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(1, -0.5, 0.5)
mesh.scale.set(2, 0.5, 0.5)

/**
 * group
 */
const material_a = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
const mesh_a = new THREE.Mesh(geometry, material_a)
mesh_a.position.set(0, 0, 0)

const material_b = new THREE.MeshBasicMaterial({ color: 0x0000FF })
const mesh_b = new THREE.Mesh(geometry, material_b)
mesh_b.position.set(2, 0, 0)

const material_c = new THREE.MeshBasicMaterial({ color: 0x00FFFF })
const mesh_c = new THREE.Mesh(geometry, material_c)
mesh_c.position.set(4, 0, 0)

const group = new THREE.Group()
group.add(mesh_a)
group.add(mesh_b)
group.add(mesh_c)

scene.add(group)

scene.add(mesh)


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



// animate
const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)
    requestAnimationFrame(animate)
    mesh.rotation.y = elapsedTime * Math.PI * 2
    group.rotation.y += Math.PI / 600
    renderer.render(scene, camera)
}
animate()
renderer.render(scene, camera)
