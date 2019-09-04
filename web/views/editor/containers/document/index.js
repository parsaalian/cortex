import _ from 'lodash';
import { connect } from 'react-redux';
import { typeChar } from '~/store/actions/editor';
import Document from '~/web/views/editor/components/document';

const getDocumentText = (state) => {
  const { document } = state;
  return _.map(document.pages, (page) =>
    _.map(page.lineGroups, (lineGroup) =>
      _.map(lineGroup.wordGroups, (wordGroup) =>
        _.map(wordGroup.characters, (character) => character),
      ),
    ),
  );
};

const mapStateToProps = (state) => ({
  text: getDocumentText(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleType: (e) => {
    dispatch(typeChar(e));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Document);
