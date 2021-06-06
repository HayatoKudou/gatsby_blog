import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Row, Col } from 'antd';
import Header from '../../../components/PageLayout/Header';

import SidebarWrapper from '../../../components/PageLayout/Sidebar';
import Guide from '../../../components/PageLayout/Guide';

function renderAddDom(){
    const elm = <p>child</p>
    console.log(elm)
    ReactDOM.render(elm, document.getElementById('parent'));
}

function renderDeleteDom(){
    ReactDOM.render('', document.getElementById('parent'));
}

const DEMO = ({ data }) => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <div className="marginTopTitle">
          <h1 className="titleSeparate">DEMO</h1>
        </div>
        <div>
            <button onClick={() => renderAddDom()}>追加</button>
            <button onClick={() => renderDeleteDom()}>削除</button>
            <div id="parent"></div>
        </div>
      </SidebarWrapper>
      <Guide />
    </Layout>
  </Layout>
);

export default DEMO;