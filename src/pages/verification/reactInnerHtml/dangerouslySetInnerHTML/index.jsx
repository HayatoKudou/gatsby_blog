import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import Header from '../../../../components/PageLayout/Header';

import SidebarWrapper from '../../../../components/PageLayout/Sidebar';
import Guide from '../../../../components/PageLayout/Guide';

function DEMO() {
    const [html, setHtml] = useState('');

    function renderAddDom(value) {
        setHtml(value);
    };

    return (
        <Layout className="outerPadding">
            <Layout className="container">
                <Header />
                <SidebarWrapper>
                    <div className="marginTopTitle">
                        <h1 className="titleSeparate">DEMO: dangerouslySetInnerHTML</h1>
                    </div>
                    <div>
                        <button onClick={() => renderAddDom('<p>child</p>')}>追加</button>
                        <button onClick={() => renderAddDom('')}>削除</button>
                        <div dangerouslySetInnerHTML={{__html: html}}></div>
                    </div>
                </SidebarWrapper>
                <Guide />
            </Layout>
        </Layout>
    )
};

export default DEMO;