import React from 'react';
import { connect } from 'react-redux';
// import TextInput from 'components/TextInput/TextInput';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

class Answer extends React.Component {
  render() {
    return (
      <div className="math">
        <InlineMath>{this.props.math}</InlineMath>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Answer);
