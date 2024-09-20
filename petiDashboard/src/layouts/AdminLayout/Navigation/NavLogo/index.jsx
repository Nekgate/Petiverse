import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
	<Col md={1} xl={1} style={{marginBottom : -50, marginTop:10, width:250, borderRadius: '9px', overflow: 'hidden'}}>
      <div className="navbar-brand header-logo" style={{color: 'red', backgroundColor: 'green', height:40}}>
        <Link to="#" className="b-brand">
          <div className="b-bg">
            <i className="feather icon-trending-up" />
          </div>
          <span className="b-title">Petiverse</span>
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
	  </Col>
    </React.Fragment>
  );
};

export default NavLogo;
