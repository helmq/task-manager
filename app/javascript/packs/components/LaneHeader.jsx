import React from 'react';
import PropTypes from 'prop-types';

const LaneHeader = ({ cards, totalCount, id }) => (
  <div>
    <b>{id}</b>({cards.length}/{totalCount})
  </div>
);

LaneHeader.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  id: PropTypes.string,
};
LaneHeader.defaultProps = {
  cards: [],
  totalCount: 0,
  id: '',
};

export default LaneHeader;
