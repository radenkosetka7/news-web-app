import {Button, Form, Input} from "antd";
import React from "react";

const {TextArea} = Input;

const Editor = ({onChange, onSubmit, submitting, value}) => (<>
    <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Unesite komentar
        </Button>
    </Form.Item>
</>);

export default Editor;