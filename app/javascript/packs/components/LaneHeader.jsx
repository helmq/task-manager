import React from 'react';
import PropTypes from 'prop-types';

const LaneHeader = ({ cards, totalCount, id }) => (
  <div>
    <b>{id}</b>({cards.length}/{totalCount})
  </div>
);

LaneHeader.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
};
LaneHeader.defaultProps = {
  cards: [],
  totalCount: 'None',
  id: '',
};

export default LaneHeader;
