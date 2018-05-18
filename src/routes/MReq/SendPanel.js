import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload,
  message,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import * as R from 'ramda';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['mreq/submit'],
}))
@Form.create()
export default class SendPanel extends PureComponent {

  state = {
    mobiles: [],
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'mreq/submit',
          payload: {
            ...values,
            mobiles: this.state.mobiles,
            createdAt: new Date().toISOString(),
          },
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const uploadProps = {
      accept: ".csv",
      customRequest: ({ file, onSuccess }) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const text = event.target.result
          const mobiles = text.split('\n')
          if (R.isEmpty(R.last(mobiles))) {
            mobiles.pop()
          }
          this.setState({
            mobiles,
          });
          console.log(mobiles.length)
          onSuccess()
        }
        reader.readAsText(file)
      }
    }

    return (
      <PageHeaderLayout
        title="发送面板"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="发送者">
              {getFieldDecorator('sender', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的姓名',
                  },
                ],
              })(<Input placeholder="请输入您的姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="短信内容">
              {getFieldDecorator('content', {
                rules: [
                  {
                    max: 70,
                    message: '短信内容不能超过70字',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入短信内容"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="发送列表">
              <Upload {...uploadProps} >
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
              <Tooltip>
                <span>
                  * 仅支持.csv文件，每行一个手机号，不能有多余列
                </span>
              </Tooltip>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
