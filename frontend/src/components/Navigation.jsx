

import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/createemp">Create Employee</Link></li>
        <li><Link to="/emplist">Employee List</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
