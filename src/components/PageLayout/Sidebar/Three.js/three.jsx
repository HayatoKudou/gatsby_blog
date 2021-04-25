import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import uniform from './uniform'
import './styles.css'
import { OrbitControls } from 'drei'

uniform.init(THREE)
const makeUrl = file => `https://raw.githubusercontent.com/flowers1225/threejs-earth/master/src/img/${file}.jpg`

function Earth() {
    const ref = useRef()
    const [texture, bump, moon] = useLoader(THREE.TextureLoader, [
        makeUrl('earth4'),
        makeUrl('earth_bump'),
        'http://jaanga.github.io/moon/heightmaps/WAC_GLD100_E000N1800_004P-1024x512.png'
    ])
    useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI))
    return (
        <group ref={ref}>
            <Stars />
            <rectAreaLight intensity={1} position={[10, 10, 10]} width={10} height={1000} onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))} />
            <rectAreaLight intensity={1} position={[-10, -10, -10]} width={1000} height={10} onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))} />
            <mesh>
                <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
                <meshStandardMaterial attach="material" map={texture} bumpMap={bump} bumpScale={0.05} />
            </mesh>
            <mesh position={[5, 0, -10]}>
                <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
                <meshStandardMaterial attach="material" color="gray" map={moon} />
            </mesh>
        </group>
    )
}

function Stars({ count = 5000 }) {
    const positions = useMemo(() => {
        let positions = []
        for (let i = 0; i < count; i++) {
            positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
            positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
            positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
        }
        return new Float32Array(positions)
    }, [count])
    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial attach="material" size={1} sizeAttenuation color="white" transparent opacity={0.8} />
        </points>
    )
}

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function isSmartPhone() {
    // UserAgentからのスマホ判定
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
    } else {
        return false;
    }
}

export const Three = () => {
    return (
        <div>
            {isSmartPhone() ? (
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <OrbitControls />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            ) : (

                <Canvas id="three_body"
                    camera={{ position: [0, 0, 10], fov: 40 }}
                    onCreated={({ gl }) => {
                        gl.gammaInput = true
                        gl.toneMapping = THREE.ACESFilmicToneMapping
                    }}>
                    <OrbitControls />
                    <pointLight intensity={0.1} position={[10, 10, 10]} />
                    <rectAreaLight intensity={3} position={[0, 10, -10]} width={30} height={30} onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))} />
                    <Suspense fallback={null}>
                        <Earth />
                    </Suspense>
                </Canvas>
            )}
        </div>
    )
}