import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
console.log(scene)
console.log(camera)
console.log(renderer)

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
console.log(planeMesh.geometry.attributes.position)
const { array } = planeMesh.geometry.attributes.position
for (let i = 0; i < array.length; i += 3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]
  array[i + 2] = z + Math.random()/2 
}

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
  planeMesh.rotation.x += 0.01
}

animate()



// renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)