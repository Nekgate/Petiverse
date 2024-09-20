import React from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';

const NavLeft = () => {
  const windowSize = useWindowSize();

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
         
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm" >
                    <i className="fa fa-bars" /> <>&nbsp;</>  <>&nbsp;</> Menu
                  </Button>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm" >
                    <i className="fa fa-inbox" /> <>&nbsp;</>  <>&nbsp;</> Notification
                  </Button>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm" >
                    <i className="fa fa-envelope" /> <>&nbsp;</>  <>&nbsp;</> Messages
                  </Button>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm" >
                    <i className="fa fa-user" /> <>&nbsp;</>  <>&nbsp;</> Profile
                  </Button>
        </ListGroup.Item> 
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
