/**
 * Title.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/4/17.
 */

// import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h2`
  font-weight: ${props => props.normal ? 'normal':'bold'};
  font-size: ${props => props.size || 1.3}rem;
  color: ${props => props.color || '#333'};
`;

export default Title;