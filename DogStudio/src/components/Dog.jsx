import * as THREE from "three";
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from "react";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
    gsap.registerPlugin(useGSAP())
    gsap.registerPlugin(ScrollTrigger)

    const model = useGLTF('/model/dog.drc.glb')

    useThree(({ camera, scene, gl }) => {
        camera.position.z = 1,
            gl.toneMapping = THREE.ReinhardToneMapping,
            gl.outputColorSpace = THREE.SRGBColorSpace
    })

    const { actions } = useAnimations(model.animations, model.scene)
    useEffect(() => {
        actions['Take 001'].play()
    }, [actions])


    // const texture = useTexture({
    //     normalMap:'/dog_normals.jpg',
    //     sampleMatCap:'/matcap/mat-2.png'
    // })
    // texture.normalMap.flipY = false
    // texture.sampleMatCap.colorSpace = THREE.SRGBColorSpace

    const [normalMap, sampleMatCap] = (useTexture(['/dog_normals.jpg', '/matcap/mat-2.png'])).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })
    const [branchNormalMap, branchMap] = (useTexture(['branches_normals.jpeg', 'branches_diffuse.jpeg'])).map((texture) => {
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })
    const DogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap,
    })
    const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        matcap: branchMap
    })
    model.scene.traverse((child) => {
        if (child.name.includes('DOG')) {
            child.material = DogMaterial
        } else {
            child.material = branchMaterial
        }
    })

    const modelRef = useRef(model)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#section-1',
                markers: true,
                start: 'top top',
                endTrigger: '#section-3',
                end: 'bottom bottom',
                scrub: true
            }
        })

        tl
        .to(modelRef.current.scene.position,{
            z:'-=1',
            y:'+=0.3'
        })
        .to(modelRef.current.scene.rotation,{
            x:`+=${Math.PI/8}`
        })
        .to(modelRef.current.scene.rotation,{
            y:`-=${Math.PI}`
        },'last')
        .to(modelRef.current.scene.position,{
            z:'+=0.5',
            x:'-=0.75',
            y:'-=0.1'
        },'last')
    }, [])


    return (
        <>
            <primitive object={model.scene} position={[0.25, -0.9, 0.3]} rotation={[0, Math.PI / 5, 0]} scale={[1.5, 1.5, 1.5]} />
            <directionalLight postion={[-0.15, 0.5, 1.5]} intensity={10} color={0xFFFFFF} />
        </>
    )
}

export default Dog
