import React, { useState } from 'react';
import './tabs.scss';
export default function Tabs(props) {
  const [selected, setSelected] = useState('Математика');
  const selectElement = element => {
    props.selectSubject(element.id);
    setSelected(element.name);
  };
  return (
    <div className="tabs">
      {props.elements.map((item, index) => {
        return (
          <div
            key={index}
            className={`tabs__item button ${selected == item.name && 'button--selected'}`}
            onClick={() => {
              selectElement(item);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
