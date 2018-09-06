/**
 * Avatar.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/4/17.
 */
import React from 'react';
import {Link} from 'react-router-dom';

export default (
  {
    src = 'https://avatars3.githubusercontent.com/u/9855604?s=460&v=4',
    size = 52,
    isCircle = true,
    me = false,
    path = '#',
    margin = 6
  }) => {

  const imgStyle = {
    height: `${size}px`,
    width: `${size}px`,
    borderRadius: isCircle ? '50%' : 'none',
    margin: `${margin}px`
  };

  const dotStyle = {
    height: '20px',
    width: '20px',
    display: 'inline-block',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    position: 'absolute',
    right: 0
  };

  return (
    <Link to={`${path}`}>
      <div style={{display: 'inline-block', position: 'relative'}}>
        <img src={src} style={imgStyle} alt="avatar"/>
        {me && <span style={dotStyle}>我</span>}
      </div>

    </Link>
  );
};