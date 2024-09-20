import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import { Row, Col, Card, Table, Tabs, ListGroup, Dropdown, Tab } from 'react-bootstrap';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';

import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';


import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import img1 from '../../assets/images/user/1.jpg';
import img2 from '../../assets/images/user/2.jpg';
import img3 from '../../assets/images/user/3.jpg';
import img4 from '../../assets/images/user/4.jpg';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
 
	
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);

  const { collapseMenu, headerFixedLayout } = configContext.state;
  const { dispatch } = configContext;

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }

    if (windowSize.width < 992) {
      dispatch({ type: actionType.CHANGE_LAYOUT, layout: 'vertical' });
    }
  }, [dispatch, windowSize]);

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  let mainClass = ['pcoded-wrapper'];

  let common = (
    <React.Fragment>
     	
      <Navigation />
      <NavBar />
    </React.Fragment>
  );

  let mainContainer = (
    <React.Fragment>
      <div className="pcoded-main-container">
        <div className={mainClass.join(' ')}>
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
               {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }
    if (headerFixedLayout) {
      outSideClass = [...outSideClass, 'mob-fixed'];
    }

    common = (
      <div style={{"width" : "100%"}}>
        {common}
      </div>
    );

    mainContainer = (
      <div
        role="button"
        tabIndex="0"
        className="pcoded-outside"
        onClick={() => mobileOutClickHandler}
        onKeyDown={() => mobileOutClickHandler}
      >
        {mainContainer}
      </div>
    );
  }

  return (
    <React.Fragment>
	  {common}
      <Row style={{margin : 10}}>
      
		<Col md={6} xl={3}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
				<span><b style={{marginLeft:5}}>John Doe</b>: View Profile </span>
                 
              </div>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  <tr className="unread"> <td> <i className="fa fa-cog" /> Menu </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-inbox" /> Notification </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-envelope" /> Messages </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-user" /> Saved </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-file" /> Favorite </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-fire" /> Friends </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-users" /> Groups </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-video" /> Video </td><td></td><td></td></tr>
                  <tr className="unread"> <td> <i className="fa fa-search" /> Find a Vet </td><td></td><td></td></tr>
                  
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={6}>
		
		
		<Card style={{marginBottom:10,   padding:10}}>
		<Row>
		
		<Col md={3} xl={3}><i className="fa fa-home" /> Home</Col>
		<Col md={3} xl={3}><i className="fa fa-video" /> Video</Col>
		<Col md={3} xl={3}><i className="fa fa-users" /> Friends</Col>
		<Col md={3} xl={3}><i className="fa fa-cog" /> Groups</Col>
		</Row>
		</Card>
		
		
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Updated</h5>
                </div> 
              </div>
			  
			  <Card.Header>
              <div className="pro-head">
                <img src={avatar2} className="img-radius" alt="User Profile" style={{marginLeft:-30}}/>
				<span><b style={{marginLeft:5}}>Alexandria Al-himcut</b>   </span><br></br>
                 <span><b style={{marginLeft:5}}>19 Sept 2024, 1:30pm</b>   </span> 
              </div>
            </Card.Header>
			
			  <h6>Just got Jackie from the vet, seems like we have got a long night...</h6>
              <img  style={{ width: '100%', marginTop:5 }} src={img1} alt="activity-user" />
			  <Row>
			  <Col md={6} xl={8}> <h6 className="text-muted mt-3 mb-0">50k Likes  </h6></Col>
			  <Col md={6} xl={2}> <h6 className="text-muted mt-3 mb-0">50k Comments  </h6></Col>
			  <Col md={6} xl={2}> <h6 className="text-muted mt-3 mb-0">10 Shares   </h6></Col>
			  </Row>
			  <Col md={6} xl={12}><hr></hr></Col>
			  <Row>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0"> Like   </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0"> Comment  </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0">   Repost   </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0">   Share   </h6></Col>
			  </Row>
              
               
            </Card.Body>
          </Card>
		
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Updated</h5>
                </div> 
              </div>
			  
			  <Card.Header>
              <div className="pro-head">
                <img src={avatar2} className="img-radius" alt="User Profile" style={{marginLeft:-30}}/>
				<span><b style={{marginLeft:5}}>Alexandria Al-himcut</b>   </span><br></br>
                 <span><b style={{marginLeft:5}}>19 Sept 2024, 1:30pm</b>   </span> 
              </div>
            </Card.Header>
			
			  <h6>Just got Jackie from the vet, seems like we have got a long night...</h6>
              <img  style={{ width: '100%', marginTop:5 }} src={img1} alt="activity-user" />
			  <Row>
			  <Col md={6} xl={8}> <h6 className="text-muted mt-3 mb-0">50k   </h6></Col>
			  <Col md={6} xl={2}> <h6 className="text-muted mt-3 mb-0">50k Comments  </h6></Col>
			  <Col md={6} xl={2}> <h6 className="text-muted mt-3 mb-0">10 Shares   </h6></Col>
			  </Row>
			  <Col md={6} xl={12}><hr></hr></Col>
			  <Row>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0"> Like   </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0"> Comment  </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0">   Repost   </h6></Col>
			  <Col md={6} xl={3}> <h6 className="text-muted mt-3 mb-0">   Share   </h6></Col>
			  </Row>
              
               
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="fa fa-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">235</h3>
                  <span className="d-block text-uppercase">total ideas</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="fa fa-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">26</h3>
                  <span className="d-block text-uppercase">total locations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Preffered Language</h5>
				  <h6 className="text-muted mt-3 mb-0">British English  </h6>
                </div> 
              </div> 
              <h6 className="mt-3 mb-0" style={{color: 'purple', }}>Puppy pets store now openening in Zundi fisher zone  </h6> 
              
			  <img  style={{ width: '100%', marginTop:5 }} src={img2} alt="activity-user" />
            </Card.Body>
			
			
            <Card.Body>
              <div className="row align-items-center justify-content-center" style={{marginTop:-44}}>
                 
              </div> 
              <h6   style={{color: 'purple' }}>Puppy pets store now openening in Zundi fisher zone  </h6> 
              
			  <img  style={{ width: '100%', marginTop:5 }} src={img3} alt="activity-user" />
            </Card.Body>
          </Card>
          
		   
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Connections</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Isabella Christensen</h6> 
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        11 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Mathilde Andersen</h6> 
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        11 MAY 10:35
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Karla Sorensen</h6> 
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Ida Jorgensen</h6> 
                    </td>
                    <td>
                      <h6 className="text-muted f-w-300">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        19 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                    </td>
                    <td>
                      <h6 className="mb-1">Albert Andersen</h6> 
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        21 July 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card> 
			
			
        </Col>
	  
	  
	 </Row>
    </React.Fragment>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node
};
export default AdminLayout;
