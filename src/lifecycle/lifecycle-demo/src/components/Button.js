/**
 * Button.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/4/19.
 */

import styled from 'styled-components';


const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.color || '#CB202D'};
  color: ${props => props.color || 'white' };
  font-size: 1em;
  padding: 0.25em 1em;
  width: 100%;
  border-radius: 0;
  outline: 0 none;
  height: 50px;
  appearance: none;
  border: none;
`;

export default Button;