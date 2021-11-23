import React from 'react';

import Pagination from 'react-bootstrap/Pagination';

const MoviePagination = ({ active, pages, onClick }) => {
  const getItems = () => {
    const items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => onClick(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };
  return (
    <Pagination>
      <Pagination.First onClick={() => onClick(1)} />
      <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 0} />
      {getItems()}
      <Pagination.Next onClick={() => onClick(active + 1)} disabled={active === pages - 1} />
      <Pagination.Last onClick={() => onClick(pages)} />
    </Pagination>
  );
};

export default MoviePagination;
