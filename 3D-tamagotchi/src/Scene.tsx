import {Canvas, useFrame} from "@react-three/fiber"
import {useRef} from "react"
import {Mesh} from "three"
import {Body} from "./Body"
import {Button_left} from "./Button_left"
import {Button_right} from "./Button_right"
import {Button_middle} from "./Button_middle"
import Screen from "./Screen"

import { CameraControls, Float , ContactShadows, Html} from '@react-three/drei';



function ThreeScene(){
    const cameraControlRef = useRef<CameraControls | null>(null);
    return (
        
        <Canvas>
            <CameraControls ref={cameraControlRef} />
           <ambientLight />
           <pointLight position={[5, 5, 5]}/>
           <Float
            speed={1}
            rotationIntensity={1} 
            floatIntensity={1} 
            floatingRange={[0.1, 0.6]}>

           <Body/>
           <Html scale={1} transform occlude>
                <iframe src="screen.html" />
          </Html>
           

           <Button_left/>
           <Button_middle/>
           <Button_right/>

           </Float>
        </Canvas>
    )

}

export default ThreeScene
