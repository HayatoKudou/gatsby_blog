import React from 'react';
import { Row, Col } from 'antd';
import ProgressBar from '../../Progress';

const SkillsProgress = () => (
  <div>
    <h2>My Skills</h2>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={12}>

        <ProgressBar
          percent={50}
          text="Javascript"
        />
        <ProgressBar
          percent={60}
          text="React"
        />
        <ProgressBar
          percent={30}
          text="Redux"
        />
        <ProgressBar
          percent={30}
          text="jQuery"
        />
        <ProgressBar
          percent={40}
          text="AWS"
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar
          percent={50}
          text="PHP"
        />
        <ProgressBar
          percent={65}
          text="Laravel"
        />
        <ProgressBar
          percent={20}
          text="FuelPHP"
        />
        <ProgressBar
          percent={50}
          text="Mysql"
        />
        <ProgressBar
          percent={30}
          text="GCP"
        />
      </Col>
    </Row>
  </div>
);

export default SkillsProgress;
