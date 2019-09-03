import _ from 'lodash';
import { connect } from 'react-redux';
import { typeChar } from '~/store/actions/editor';
import Document from '~/web/views/editor/components/document';

const getDocumentText = (state) => {
  const { document } = state;
  console.log(document);
};

const mapStateToProps = (state) => {
  getDocumentText(state);
  return {
    text: [[[['ab']]]],
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleType: (e) => {
    dispatch(typeChar(e));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Document);
