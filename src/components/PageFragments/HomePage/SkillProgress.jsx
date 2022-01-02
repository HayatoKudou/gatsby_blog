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
          percent={30}
          text="Python"
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
          percent={20}
          text="jQuery"
        />
        <ProgressBar
          percent={40}
          text="Serverless Framework"
        />
        <ProgressBar
          percent={40}
          text="AWS"
        />
        <ProgressBar
          percent={40}
          text="GitHub"
        />
        <ProgressBar
          percent={20}
          text="Jenkins"
        />
        <ProgressBar
          percent={20}
          text="Redash"
        />
        <ProgressBar
          percent={20}
          text="CircleCI"
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar
          percent={50}
          text="PHP"
        />
        <ProgressBar
          percent={70}
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
          percent={15}
          text="Azure"
        />
        <ProgressBar
          percent={15}
          text="GCP"
        />
        <ProgressBar
          percent={30}
          text="BackLog"
        />
        <ProgressBar
          percent={20}
          text="DataDog"
        />
        <ProgressBar
          percent={20}
          text="Sentry"
        />
        <ProgressBar
          percent={20}
          text="Pager Duty"
        />
      </Col>
    </Row>
  </div>
);

export default SkillsProgress;
