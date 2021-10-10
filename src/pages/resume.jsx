/* eslint-disable */
import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { Button, Row, Col } from 'antd';
import SEO from '../components/Seo';

export default class Resume extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    let number;
    const pageToggle = (page) => {
      if(page === 'Next Page'){
        number = pageNumber + 1;
      } else if(page === 'Previous Page'){
        number = pageNumber - 1;
      }
      if(number <= 0){
        number = 1;
      }
      this.setState({ pageNumber: number });
      return 1;
    };

    return (
      <div>
        <SEO
          description="職務経歴書"
          title="Resume"
          path="resume"
        />
        <Document
          file="../resume.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <Row justify="center" style={{ background: 'lightslategray' }}>
          <Col span={2}>
            <p>{`Page ${pageNumber} of ${numPages}`}</p>
          </Col>
          <Col span={2}>
            {pageNumber === 1 ? (
              <Button type="primary" onClick={() => pageToggle('Next Page')}>{'Next Page'}</Button>
            ) : pageNumber === 2 ? (
              <div style={{display: "flex"}}>
                <Button type="primary" onClick={() => pageToggle('Previous Page')} style={{marginRight: "10px"}}>{'Previous Page'}</Button>
                <Button type="primary" onClick={() => pageToggle('Next Page')}>{'Next Page'}</Button>
              </div>
            ) : pageNumber === 3 ? (
              <div style={{display: "flex"}}>
                <Button type="primary" onClick={() => pageToggle('Previous Page')} style={{marginRight: "10px"}}>{'Previous Page'}</Button>
                <Button type="primary" onClick={() => pageToggle('Next Page')}>{'Next Page'}</Button>
              </div>
            ) : pageNumber === 4 ? (
              <Button type="primary" onClick={() => pageToggle('Previous Page')}>{'Previous Page'}</Button>
            ) : (
              <Button type="primary" onClick={() => pageToggle('Previous Page')}>{'Previous Page'}</Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
