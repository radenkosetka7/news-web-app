import {Button, Col, Form, Input} from "antd";
import React from "react";

const {TextArea} = Input;


const Editor = ({onChange, onSubmit, submitting, value, name, onNameChange}) => {
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        onSubmit(values);
        form.resetFields();
    }

    return (
        <Form
            form={form}
            onFinish={handleFinish}
        >
            <Col span={6}>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Molim vas unesite ime!'}]}
                >
                    <Input
                        placeholder="Unesite ime"
                        value={name}
                        onChange={onNameChange}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="comment"
                    rules={[{required: true, message: 'Molim vas unesite komentar!'}]}
                >
                    <TextArea maxLength={1000} rows={4} onChange={onChange} value={value}/>
                </Form.Item>
            </Col>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} type="primary">
                    Unesite komentar
                </Button>
            </Form.Item>
        </Form>)
};

export default Editor;