import React, { useState } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

const DisplayCard = ({ title, displayItems }) => {
  const [showAll, setShowAll] = useState(false)
  const link = title === "Minhas comunidades" ? "community" : "users";

  const displayable = showAll ? displayItems : displayItems.slice(0,6);

  const handleShowAll = () => {
    showAll ? setShowAll(false) : setShowAll(true);
  };

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({displayItems.length})
      </h2>

      <ul>
        {
          displayable.map((item) => {
            return (
              <li key={item.id}>
                <a 
                  href={ link === 'users' ? `https://github.com/${item.title}` : 'https://github.com/jomaalves'}
                  target="_blank"
                >
                  <img src={item.image} />
                  <span>{item.title}</span>
                </a>
              </li>
            );
          })
        }
      </ul>
      <br />
    </ProfileRelationsBoxWrapper>
  );
}

export default DisplayCard;