import gsap from 'gsap'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as OrbitControls from 'three-orbitcontrols';
import { BufferGeometry, Mesh } from 'three';

const gui = new dat.GUI()
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50
  }
}


gui.add(world.plane, 'width', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'height', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'widthSegments', 1, 20).onChange(regeneratePlane);
gui.add(world.plane, 'heightSegments', 1, 20).onChange(regeneratePlane);


function regeneratePlane () {
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width, 
    world.plane.height, 
    world.plane.widthSegments, 
    world.plane.heightSegments
  )
  remesh()
}

// raycaster & mouse
const raycaster = new THREE.Raycaster()
console.log(raycaster)
const mouse = {
  x: undefined,
  y: undefined
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

scene.background = new THREE.Color( 0xeeeeee );


renderer.setSize(innerWidth, innerHeight )
renderer.setPixelRatio(devicePixelRatio)
camera.position.z = 200

// boxGeometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00, 
  side:THREE.DoubleSide
})
console.log(boxGeometry)
console.log(material)
const mesh = new THREE.Mesh(boxGeometry, material)
// scene.add(mesh)

// planeGeometry
const planeGeometry = new THREE.PlaneGeometry(
  world.plane.width, 
  world.plane.height, 
  world.plane.widthSegments, 
  world.plane.heightSegments
)
const planeMaterial = new THREE.MeshPhongMaterial({
  // color: 0x666666, 
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: true,
})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
console.log('planeMesh',planeMesh)
scene.add(planeMesh)

// muplate the plane geometry point
function remesh() {
  console.log(planeMesh.geometry.attributes.position)
  const randomValues = []
  const { array } = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i]
      const y = array[i + 1]
      const z = array[i + 2]

      array[i] = x + (Math.random() - 0.5) * 3
      array[i + 1] = y + (Math.random() - 0.5) * 3
      array[i + 2] = z + (Math.random() - 0.5) * 3
    }
    randomValues.push(Math.random() * Math.PI * 2)
  }
  planeMesh.geometry.attributes.position.randomValues = randomValues
  planeMesh.geometry.attributes.position.originalPosition = 
    planeMesh.geometry.attributes.position.array


  // set color
  const colors = []
  for (let i = 0; i< planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4) // lightblue
  }
  planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  )
}

remesh()
  
// light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)
const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0, 0, 1)
scene.add(backLight)

// animate
let frame = 0
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  // mesh.rotation.x += 0.01
  // mesh.rotation.y += 0.01
  // planeMesh.rotation.x += 0.01
  raycaster.setFromCamera(mouse, camera)

  frame += 0.01
  const {
    array,
    originalPosition,
    randomValues
  } = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i += 3) {
    // x
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01

    // y
    array[i + 1] =
      originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001
  }

  planeMesh.geometry.attributes.position.needsUpdate = true



  // intersects
  const intersects = raycaster.intersectObject(planeMesh)
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes

    // console.log('intersects',intersects[0])
    // vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.5)
    color.setZ(intersects[0].face.a, 1)

    // vertice 2
    color.setX(intersects[0].face.b, 0.1)
    color.setY(intersects[0].face.b, 0.5)
    color.setZ(intersects[0].face.b, 1)

    // vertice 3
    color.setX(intersects[0].face.c, 0.1)
    color.setY(intersects[0].face.c, 0.5)
    color.setZ(intersects[0].face.c, 1)

    color.needsUpdate = true

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }
    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1
    }
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 0.8, 
      onUpdate: () => {
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)

        // vertice 2
        color.setX(intersects[0].face.b, hoverColor.r)
        color.setY(intersects[0].face.b, hoverColor.g)
        color.setZ(intersects[0].face.b, hoverColor.b)

        // vertice 3
        color.setX(intersects[0].face.c, hoverColor.r)
        color.setY(intersects[0].face.c, hoverColor.g)
        color.setZ(intersects[0].face.c, hoverColor.b)
        color.needsUpdate = true
      }
    })
  }
}

animate()

addEventListener('mousemove', (event) => {
  // 坐标轴对齐
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
  // console.log(mouse)
})
