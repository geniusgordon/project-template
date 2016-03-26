import React from 'react';
import { connect } from 'react-redux';
import Text from '../components/Text';
import { hello } from '../actions/index';

class Index extends React.Component {
  componentDidMount() {
    this.props.hello();
  }
  render() {
    return <Text text={this.props.text} />;
  }
}

Index.propTypes = {
  text: React.PropTypes.string,
  hello: React.PropTypes.func,
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  hello() {
    dispatch(hello());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

