import _ from 'lodash';
import { connect } from 'react-redux';
import { keyboardEvent } from '~/redux/actions/editor';
import { GAP } from '~/redux/reducers/editor/gapBuffer';
import Document from '~/web/views/editor/components/document';

const getDocumentText = (state) => {
  const { content, paging } = state.document;
  const filteredContent = _.filter(content, (char) => char !== GAP);
  const text = _.map(paging, (pages) =>
    _.map(pages, (lines) =>
      _.map(_.slice(filteredContent, lines.start, lines.end + 1), (part) => part.char || part),
    ),
  );
  return text;
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
