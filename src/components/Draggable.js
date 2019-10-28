import React, {useState} from 'react';
import styles from './Draggable.module.css';


const items = [
  { name: 111, key: 1 },
  { name: 222, key: 2 },
  { name: 333, key: 3 },
  { name: 444, key: 4 },
  { name: 555, key: 5 },
  { name: 666, key: 6 },
  { name: 777, key: 7 },
  { name: 888, key: 8 },
  { name: 999, key: 9 }
];

const Draggable = () => {
  const [draggedElementId, setDraggedElementIdt ] = useState('');
  const handleDragStart = (e) => {
    setDraggedElementIdt( e.target.id);
    // 可模拟隐藏被拖拽元素在原位置
    e.target.style.opacity = 0.01;
  };
  const handleDrop = (e) => {
    const draggedEl = document.getElementById(draggedElementId);
    // 加个定时器，使得 transition 生效
    setTimeout(() => draggedEl.style.opacity = 1, 100 );
   
    if (!e.target.draggable) {
      e.target.appendChild(draggedEl);
    } else {
      e.target.parentNode.insertBefore(draggedEl, e.target);
    }
  };
  const handleDragEnter = (e) => {
    const draggedEl = document.getElementById(draggedElementId);
    if (e.target.id !== draggedElementId) {
      console.log(e.target);
      e.target.parentNode.insertBefore(draggedEl, e.target);
    }
  }
  
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  return (
    <div className={styles.list}>
      <div 
        className={styles.item}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className={styles.title}>待办</h3>
        {
          items.map(item => (
            <div
              className={styles.subItem}
              key={item.key}
              draggable={true}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              id={`draggable-item-${item.key}`}
            >
              {item.name}
            </div>
          ))
        }
      </div>
      <div 
        className={styles.item}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className={styles.title}>
          进行中
        </h3>
      </div>
      <div 
        className={styles.item}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className={styles.title}>已完成</h3>
      </div>
    </div>
  )
}

export default Draggable;