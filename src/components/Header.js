import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services/">Serivices</Link></li>
          <li><Link to="/find/">Find</Link></li>
          <li><Link to="/analysis/">Analysis</Link></li>
          <li><Link to="/requests/">Get Requests</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
