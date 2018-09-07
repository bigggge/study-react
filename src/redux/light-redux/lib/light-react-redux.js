// import React from '../../../light-react/lib/react';
import React from 'react';
import PropTypes from 'prop-types';

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store: this.store };
  }

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return this.props.children;
  }
}

// hoc
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => WrapComponent => {
  class WithConnect extends React.Component {

    static contextTypes = {
      store: PropTypes.object
    };

    constructor(props) {
      super(props);
      this.state = {
        allProps: {}
      };
    }

    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());
      this.update();
    }

    update() {
      const { store } = this.context;
      // const mapStateToProps = state => {
      //   return {
      //     todos: getVisibleTodos(state.todos, state.visibilityFilter)
      //   }
      // }
      const stateProps = mapStateToProps(store.getState());
      // const mapDispatchToProps = dispatch => {
      //   return {
      //     onTodoClick: id => {
      //       dispatch(toggleTodo(id))
      //     }
      //   }
      // }
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {}; // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps
        }
      });
    }

    render() {
      return <WrapComponent {...this.state.allProps} />;
    }
  };

  WithConnect.displayName = `HOC_WithConnect(${getDisplayName(WrapComponent)})`;

  return WithConnect;

};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}