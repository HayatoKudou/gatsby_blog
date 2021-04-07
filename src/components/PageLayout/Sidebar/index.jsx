import render from 'react-dom'
import React, { useRef, useState } from 'react'
import {
    Affix, Layout, Row, Col,
} from 'antd';
import FA from 'react-fontawesome';
import FeatherIcon from 'feather-icons-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { globalHistory } from '@reach/router';
import * as style from './sidebar.module.less';
import { useWindowSize } from '../../../utils/hooks';
import Config from '../../../../config';

import { OrbitControls } from 'drei'
import { Canvas, useFrame } from 'react-three-fiber'
// import './styles.css'

const { Content } = Layout;
const {
    github, qiita, twitter,
} = Config.social;

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


const DomContent = () => (
    <aside>
        {/* <div className={style.profileAvatar} /> */}
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <OrbitControls />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
        <div className={`${style.name} centerAlign`}>
            <div className={`${style.boxName} centerAlign`}>
                <h2 className="myname">
                    <span>Hayato Kudo</span>
                </h2>
            </div>
            <div className={`${style.badge} ${style.badgeGray}`}>WEBエンジニア</div>
            <div className="centerAlign box">
                <a href={twitter} target="_blank" label="button" rel="noopener noreferrer"><FA name="twitter" /></a>
                <a href={github} target="_blank" label="button" rel="noopener noreferrer"><FA name="github" /></a>
                <a href={qiita} target="_blank" label="button" rel="noopener noreferrer"><FA name="search" /></a>
            </div>
            <ul className={`box ${style.badge} contactBlock`}>
                <li className={`${style.contactBlockItem}`}>
                    <span>
                        <FeatherIcon size="19" icon="calendar" />
                        {' '}
                    </span>
                    &nbsp; &nbsp; 1999/6/18
                </li>
                <li className={`${style.contactBlockItem}`}>
                    <span><FeatherIcon size="19" icon="map-pin" /></span>
                    {' '}
                    &nbsp; &nbsp; Japan, Tokyo
                </li>
                <li className={`${style.contactBlockItem}`}>
                    <span><FeatherIcon size="19" icon="mail" /></span>
                    {' '}
                    &nbsp; &nbsp;
                    <a href="mailto:kudoh115@gmail.com" target="_top">
                        <span className={style.emailHider}>@</span>
                    </a>
                </li>
            </ul>
            {/* <div className={style.resumeDownload}>
                <a href="../resume.pdf" download target="_blank">Download CV</a>
              </div> */}
        </div>
    </aside>
);

const Sidebar = (props) => {
    const [width] = useWindowSize();
    const { children } = props;
    const { pathname } = globalHistory.location;
    let domContent = <DomContent />;
    if (width > 997) {
        domContent = (
            <Affix offsetTop={0}>
                <DomContent />
            </Affix>
        );
    }
    if (width < 768) {
        domContent = <></>;
        if (pathname === '/') {
            domContent = <DomContent />;
        }
    }
    return (
        <>
            <Layout>
                <Content className={`${style.content} ${style.background}`}>
                    <Row>
                        <Col sm={24} md={9} lg={6} className={style.sidebarContent}>
                            {domContent}
                        </Col>
                        <Col sm={24} md={15} lg={18}>
                            <Layout className={`${style.background} ${style.boxContent} borderRadiusSection`}>
                                {children}
                            </Layout>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export const Sidebar404 = (props) => {
    const { children } = props;
    return (
        <Layout>
            <Content className={`${style.content} ${style.background} `}>
                <Row>
                    <Col sm={24} md={24} lg={24}>
                        <Layout className={`${style.background} ${style.boxContent} ${style.sideBar404Radius}`}>
                            {children}
                        </Layout>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Sidebar;
