/* eslint-disable */
import React from 'react';
import { Layout, Row, Col } from 'antd';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import ContactForm from '../../components/PageFragments/ContactForm';
import SEO from '../../components/Seo';
import Guide from '../../components/PageLayout/Guide';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Contact = ({ pageContext, location, data }) => {
  const { breadcrumb: { crumbs } } = pageContext
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          title="Contact"
          description="はじめまして。このページのお問い合わせフォームから私に連絡することがで来ます。
        感想でも、お仕事のご依頼でもお気軽にご連絡ください。"
          path="/contact"
          keywords={['工藤　颯斗', 'PHP', 'Laravel', 'web', 'Javascript', 'ReactJS']}
        />
        <Header />
        <SidebarWrapper>
          <Breadcrumb
            style={{ fontSize: '17px' }}
            crumbs={crumbs}
            crumbLabel={'Contact'}
          />
          <div className="marginTopTitle">
            <h1 className="titleSeparate">Contact</h1>
          </div>
          <Row gutter={[40, 20]}>
            <Col sm={24} md={24} lg={12}>
              <img
                src="../../contact.png"
                alt="contact"
                className="widthFull contactImgBorder"
              />
            </Col>
            <ContactForm />
          </Row>
        </SidebarWrapper>
        <Guide />
      </Layout>
    </Layout>
  )
};

export default Contact;
