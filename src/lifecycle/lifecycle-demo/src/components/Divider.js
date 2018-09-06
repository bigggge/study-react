/**
 * Divider.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/4/17.
 */
import styled from 'styled-components';

const Divider = styled.div`
  width: 100%
  height: ${props => props.height || 1}px;
  background-color: #e1e1e1;
`;

export default Divider;