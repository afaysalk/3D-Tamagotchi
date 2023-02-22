import {Canvas, useFrame} from "@react-three/fiber"
import {useRef} from "react"
import {Group, Mesh} from "three"
import {Body} from "./Body"
import {Button_left} from "./Button_left"
import {Button_right} from "./Button_right"
import {Button_middle} from "./Button_middle"
import Screen from "./Screen"

import { CameraControls, Float , ContactShadows, Html} from '@react-three/drei';



function ThreeScene(){
    const cameraControlRef = useRef<CameraControls | null>(null);
    return (
        
        <Canvas camera={{ position: [0, 0, 30]}} >
            
            <CameraControls ref={cameraControlRef}  />
           <ambientLight />
           <pointLight position={[30, 30, 30]}/>
           <Float
            speed={1}
            rotationIntensity={1} 
            floatIntensity={1} 
            floatingRange={[1, 6]}>
              
           <Body/>
           <group rotation={[-0.1,0,0]}>
           <Html scale={1} transform occlude position={[0, -0.6, 3]}>
                <iframe src="screen.html" style= {{ width: 700, height: 640}}/>
          </Html>
            </group>  
           

           <Button_left/>
           <Button_middle/>
           <Button_right/>

           </Float>
        </Canvas>
    )

}

export default ThreeScene
