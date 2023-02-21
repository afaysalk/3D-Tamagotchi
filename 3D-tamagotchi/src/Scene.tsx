import {Canvas, useFrame} from "@react-three/fiber"
import {useRef} from "react"
import {Mesh} from "three"
import {Body} from "./Body"
import {Button_left} from "./Button_left"
import {Button_right} from "./Button_right"
import {Button_middle} from "./Button_middle"


function ThreeScene(){
    return (
        <Canvas>
           <ambientLight />
           <pointLight position={[5, 5, 5]}/>
           <Body/>
           <Button_left/>
           <Button_middle/>
           <Button_right/>
        </Canvas>
    )

}

export default ThreeScene