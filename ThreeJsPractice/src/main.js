import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00FF00
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

const light = new THREE.DirectionalLight(0xFFFFFF,1)
scene.add(light)


camera.position.z=5



const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)

document.body.appendChild(renderer.domElement)

const animate = ()=>{
  cube.rotation.x+=0.01
  cube.rotation.y+=0.01
  cube.rotation.z+=0.01
  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)