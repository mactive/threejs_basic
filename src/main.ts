import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as OrbitControls from 'three-orbitcontrols';

const gui = new dat.GUI()
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10
  }
}


gui.add(world.plane, 'width', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'height', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'widthSegments', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'heightSegments', 1, 20).onChange(regeneratePlane);


function regeneratePlane () {
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
  remesh()
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
console.log(scene)
console.log(camera)
console.log(renderer)
document.body.appendChild(renderer.domElement)

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
console.log(controls)
// controls.enableDamping = true
// controls.dampingFactor = 0.25
// controls.enableZoom = false

scene.background = new THREE.Color( 0x000000 );


renderer.setSize(innerWidth, innerHeight )
renderer.setPixelRatio(devicePixelRatio)
camera.position.z = 5

// boxGeometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, side:THREE.DoubleSide})
console.log(boxGeometry)
console.log(material)
const mesh = new THREE.Mesh(boxGeometry, material)
// scene.add(mesh)

// planeGeometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10)
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x666666, 
  side: THREE.DoubleSide,
  flatShading: true
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
console.log('planeMesh',planeMesh)
scene.add(planeMesh)

// muplate the plane geometry point
function remesh() {
  console.log(planeMesh.geometry.attributes.position)
  const { array } = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]
    array[i + 2] = z + Math.random()/2 
  }
}
remesh()
  
// light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)

// animate
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  // mesh.rotation.x += 0.01
  // mesh.rotation.y += 0.01
  // planeMesh.rotation.x += 0.01
}

animate()


