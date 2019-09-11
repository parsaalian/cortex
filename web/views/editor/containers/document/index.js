import _ from 'lodash';
import { connect } from 'react-redux';
import { keyboardEvent } from '~/store/actions/editor';
import Document from '~/web/views/editor/components/document';

const getDocumentText = (state) => {
  const { content, paging } = state.document;
  return _.map(paging, (pages) =>
    _.map(pages, (lines) =>
      _.map(_.slice(content, lines.start, lines.end + 1), (part) => part.char),
    ),
  );
};

const mapStateToProps = (state) => ({
  text: getDocumentText(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleType: (e) => {
    e.preventDefault();
    dispatch(keyboardEvent(e));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Document);
