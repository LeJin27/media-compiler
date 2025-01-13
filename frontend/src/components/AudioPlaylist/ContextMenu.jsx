import React from 'react';
import styles from './ContextMenu.module.css'

const ContextMenu = ({ items, position }) => {
  return (
    <div  className = {`${styles.context}`} style={{ position: 'absolute', top: position.y, left: position.x }}>
      {items.map((item, index) => (
        <div className = {`${styles.box}`} key={index} onClick={item.action}>{item.label}</div>
      ))}
    </div>
  );

};


export default ContextMenu;