/**
 * Text.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/4/17.
 */

// import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Text = styled.p`
  margin: ${props => props.margin || 2}px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  font-size: ${props => props.size || 1}rem;
  color: ${props => props.color || '#333'};
`;

export default Text;