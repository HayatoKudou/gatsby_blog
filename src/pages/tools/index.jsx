/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout, Row, Col } from 'antd';
import Header from '../../components/PageLayout/Header';

import SidebarWrapper from '../../components/PageLayout/Sidebar';
import PostCard from '../../components/PostCard';
import SEO from '../../components/Seo';
import Guide from '../../components/PageLayout/Guide';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Tools = ({ pageContext, location, data }) => {
  const { breadcrumb: { crumbs } } = pageContext
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title="Tools"
          description="駆け出しエンジニアが、PHP・JavaScriptを中心に、WEB関連の技術をブログで発信しています。"
          path="tools"
          keywords={['駆け出しエンジニア', 'エンジニア', 'ブログ', 'PHP', 'Laravel', 'Javascript', 'ReactJS']}

        />
        <SidebarWrapper>
          <Breadcrumb
            style={{ fontSize: '17px' }}
            crumbs={crumbs}
            crumbLabel={'Tools'}
          />
          <div className="marginTopTitle">
            <h1 className="titleSeparate">Tools</h1>
          </div>
          <Row gutter={[20, 20]}>
            {
              data.allMarkdownRemark && data.allMarkdownRemark.edges.map((val, key) => {
                return val.node.frontmatter.mode == 'tools' && (
                  <Col key={key} xs={24} sm={24} md={12} lg={8}>
                    <PostCard data={val} />
                  </Col>
                )
              })
            }
          </Row>
        </SidebarWrapper>
        <Guide />
      </Layout>
    </Layout>
  )
};

Tools.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/tools/" } }
    ) {
      edges {
        node {
          frontmatter {
            date
            path
            title
            tags
            excerpt
			mode
            cover {
              childImageSharp {
                fluid(maxWidth: 288) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Tools;
