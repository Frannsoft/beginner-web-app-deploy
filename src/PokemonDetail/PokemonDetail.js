import React from 'react';
import './PokemonDetail.css';

export default props => {
  const { items, title, itemKey } = props;
  return (
    <div className='detail'>
      <span className='title'>{`${title}:`}</span>
      {items.map((arrItem, index) => {
        const data = arrItem[itemKey];
        return (
          <span className='item' key={index}>
            {data.name}
          </span>
        );
      })}
    </div>
  );
};
