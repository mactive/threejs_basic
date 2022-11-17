import * as THREE from 'three';
import typefacefont from './assets/fonts/Roboto_Bold.json';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Mesh } from 'three';

/**
 * Scene
 */
const scene = new THREE.Scene();

// /**
//  * Objects
//  */

// const geometry = new THREE.BufferGeometry()
// const count = 100
// const positionArray = new Float32Array(count * 3)

// for (let i = 0; i < count * 3; i++) {
//     positionArray[i] = (Math.random() - 0.5) * 4
// }
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionAttribute)

// const material = new THREE.MeshBasicMaterial({ color: 0xC0D1CE });



// const mesh = new THREE.Line(geometry, material);
// scene.add(mesh)



/**
 * font converts ttf -> json
 * https://gero3.github.io/facetype.js/
 */

 const fontLoader = new FontLoader()
 const font = fontLoader.load(
     // resource URL
     'fonts/Roboto_Bold.json',
 
     // onLoad callback
     ( theFont ) => {
         // do something with the font
         console.log( "font loaded" );
         const textGeometry = new TextGeometry(
             'Hello Three.js', 
             {
                 font: theFont,
                 size: 2,
                 height: 1,
                 curveSegments: 12,
                 bevelEnabled: true,
                 bevelThickness: 0.03,
                 bevelSize: 0.02,
                 bevelOffset: 0,
                 bevelSegments: 5
             }
         )
         const textMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
         const text = new THREE.Mesh(textGeometry, textMaterial)
         scene.add(text)
     },
 )
 

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(5, 5, 5)
scene.add(camera)


const axeshelper = new THREE.AxesHelper(2)
scene.add(axeshelper)

camera.lookAt(axeshelper.position)



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


// onresize

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}, false)
