import {Canvas, useFrame} from "@react-three/fiber"
import {useRef} from "react"
import {Mesh} from "three"



function Device() {
    const deviceRef = useRef<Mesh>(null!)
    useFrame(() => {
        deviceRef.current.rotation.x += 0.005;})

    return (
            <mesh ref={deviceRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
    );
};



function ThreeScene(){
    return (
        <Canvas>
           <ambientLight />
           <pointLight position={[5, 5, 5]}/>
           <Device />
        </Canvas>
    )

}

export default ThreeScene