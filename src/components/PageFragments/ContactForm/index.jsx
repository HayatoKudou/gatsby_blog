import {
  Col, Form, Input, Button, message,
} from 'antd';
import React from 'react';
import Config from '../../../../config';

const validateMessages = {
  required: '内容を入力してください',
  types: {
    email: 'メールアドレスの形式が正しくありません',
  },
};
export default () => {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    fetch(Config.contactFormUrl, { method: 'POST', body: formData })
      .then(() => {
        message.success('お問い合わせいただきありがとうございます🙂 折り返しご連絡いたします。');
        form.resetFields();
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Col sm={24} md={24} lg={12} className="widthFull">
      <Form form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['name']} rules={[{ required: true }]}>
          <Input size="large" placeholder="お名前 *" />
        </Form.Item>
        <Form.Item name={['email']} rules={[{ required: true, type: 'email' }]}>
          <Input size="large" placeholder="メールアドレス *" />
        </Form.Item>
        <Form.Item name={['description']} rules={[{ required: true }]}>
          <Input.TextArea size="large" rows={7} placeholder="お問い合わせ内容 *" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="round" size="large" htmlType="submit" style={{ background: '#304CFD' }}>
            送信
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};
