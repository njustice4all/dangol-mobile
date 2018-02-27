import React, { Component } from 'react';
import { AppState, Linking, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';

import { PostMessageActionDispatcher } from './utils/PostMessageActionDispatcher';

const PostMessageController = MainWebview => {
  class WrappedComponent extends Component {
    state = { drawer: false };

    _onMessage = event => {
      const { customDispatch, navigation } = this.props;
      const msg = JSON.parse(event.nativeEvent.data);

      PostMessageActionDispatcher.dispatcher(msg, customDispatch, navigation, () => {
        this.setState(prevState => ({ drawer: true }));
      });
    };

    closeDrawer = () => this.setState(prevState => ({ drawer: false }));

    render() {
      const { _onMessage } = this;
      const { authFetching, orderFetching } = this.props;
      const { drawer } = this.state;

      return (
        <MainWebview
          {...this.props}
          _onMessage={_onMessage}
          fetching={authFetching || orderFetching}
          drawer={drawer}
          closeDrawer={this.closeDrawer}
        />
      );
    }
  }

  return connect(
    state => ({
      authFetching: state.getIn(['auth', 'isFetching']),
      orderFetching: state.getIn(['order', 'isFetching']),
    }),
    dispatch => ({
      logout: MainWebview => {
        /**
         * 1. close drawer
         * 2. asyncStorage clear
         * 3. logout
         * 4. change route
         */
        MainWebview.drawer.closeDrawer();
        AsyncStorage.clear();
        MainWebview.webview.postMessage(
          JSON.stringify({
            type: 'redux/action',
            payload: {
              type: 'auth/LOGOUT',
            },
          })
        );
        MainWebview.webview.postMessage(
          JSON.stringify({
            type: '@@router/LOCATION_CHANGE',
            payload: { route: '/' },
          })
        );
      },
      customDispatch: type => dispatch(type),
    })
  )(WrappedComponent);
};

export default PostMessageController;
