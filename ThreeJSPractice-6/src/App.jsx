import { useGLTF } from '@react-three/drei'

const App = () => {
  const model = useGLTF('/sun.glb')
  console.log(model.scene);

  return (
    <>
      <primitive object={model.scene} position={[0,0,0]}/>
    </>
  )
}

export default App
