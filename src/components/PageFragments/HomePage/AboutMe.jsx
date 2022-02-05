import React from 'react';
import { Row, Col } from 'antd';
import AboutTile from '../../AbouTile';
import { stripTags, domHtml } from '../../../utils/stripTags';

import SEO from '../../Seo';

const pageText = {
  paraOne: `はじめまして、私は都内のベンチャー企業でwebエンジニアをしています。
メイン言語はPHPでLaravel・Reactを使用することが多いです。
担当箇所は、詳細設計・実装・テスト・保守で、これまで幅広く開発に携わってきました。
最近は何かとSPAアプリを作る機会が多く、このブログもGatsby+Reactで構築しています。`,
  paraTwo: `2018.4.   新卒でSES系企業に入社、クラウドの監視業務を担当
2019.11.   受託系企業に入社、開発業務を担当
2021.12.   自社開発系企業に入社、開発業務を担当`,
};

const AboutMe = () => {
  const description = `${pageText.paraOne} ${stripTags(pageText.paraTwo)}`;
  return (
    <>
      <div>
        <SEO
          title="About"
          description={description}
          path=""
          keywords={['Web', 'Javascript', 'Webエンジニア', 'React', 'FullStack developer', 'Redux', 'jQuery', 'PHP', 'Laravel']}
        />
        <h1 className="titleSeparate">自己紹介</h1>
        <p className="about_text">
          {pageText.paraOne}
        </p>
        <p className="about_text" dangerouslySetInnerHTML={domHtml(pageText.paraTwo)} />
      </div>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="location.png"
            height={60}
            alt="location image"
            textH4="hometown"
            textH3="Aomori"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="coffee.png"
            alt="coffee image"
            textH4="Love Coffee"
            textH3="Coffee + Me = Happiness"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="Indoor.png"
            alt="Indoor image"
            textH4="Indoor nerd"
            textH3="At times outdoors"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="otaku.jpeg"
            alt="otaku image"
            textH4="I'm otaku"
            textH3="Love Game and Anime"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="web.png"
            alt="web image"
            textH4="Self Taught Programmer"
            textH3="Thanks to the Web Resources"
            height={60}
            width={60}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <AboutTile
            img="php.png"
            alt="php image"
            textH4="I'm phper"
            textH3="Love PHP"
            height={60}
            width={60}
          />
        </Col>
      </Row>
    </>
  );
};
export default AboutMe;
