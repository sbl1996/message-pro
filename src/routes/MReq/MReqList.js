import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './MReqList.less';

const FormItem = Form.Item;

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '发送者',
    dataIndex: 'sender',
  },
  {
    title: '短信内容',
    dataIndex: 'content',
    width: "40%",
  },
  {
    title: '发送条数',
    dataIndex: 'mobiles',
    sorter: true,
  },
  {
    title: '提交时间',
    dataIndex: 'createdAt',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
];

@connect(({ mreq, loading }) => ({
  mreq,
  loading: loading.models.mreq,
}))
@Form.create()
export default class MReqList extends PureComponent {
  state = {
    
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mreq/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'mreq/fetch',
      payload: params,
    });
  };

  render() {
    const { mreq: { list }, loading } = this.props;

    return (
      <PageHeaderLayout title="历史记录">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              rowKey={record => record.id}
              loading={loading}
              dataSource={list}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
