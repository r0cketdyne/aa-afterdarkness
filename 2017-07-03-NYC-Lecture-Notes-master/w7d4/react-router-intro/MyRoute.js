import React from 'react';
import { withRouter } from 'react-router-dom';


const MyRoute = (props) => {
  // Capitalize as we will be rendering this as a component (see return statement below)
  const Component = props.component;
  const path  = window.location.href.split('#')[1];

  return path === props.path ? <Component /> : null;
};

const MyRoute2 = (props) => {
  // debugger;
  const Component = props.component;
  const path  = props.location.pathname;

  return path === props.path ? <Component /> : null;
};



export default withRouter(MyRoute2);
