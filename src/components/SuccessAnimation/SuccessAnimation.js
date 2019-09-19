import React, { useState } from 'react';
import './success-animation.scss';
export default function SuccessAnimation(props) {
  const [count, setCount] = useState(0);
  const toggle = () => {};
  return (
    <div className="succes-animation">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
    </div>
  );
}
