import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { submitMReq, queryMReqList } from '../services/api';

export default {
  namespace: 'mreq',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMReqList, payload);
      yield put({
        type: 'save',
        payload: response,
      }); 
    },
    *submit({ payload }, { call }) {
      yield call(submitMReq, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    }
  },
};
