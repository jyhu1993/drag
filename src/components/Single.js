import React, {useRef, useState} from 'react';
import styles from './Single.module.css';

const Single = () => {
  const singleEl = useRef(null);
  const [isMove, setMoveState] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  // 获取鼠标距离元素top, 和left的初始位置；
  const getInitialPosition = (e) => {
    const targetEl = singleEl.current;
    const x = e.clientX - targetEl.offsetLeft;
    const y = e.clientY - targetEl.offsetTop;
    setInitialX(x);
    setInitialY(y);
  }
  const handleMouseDown = (e) => {
    getInitialPosition(e);
    setMoveState(true)
  }
  const handleMouseMove = (e) => {
    const targetEl = singleEl.current;
    targetEl.style.left = (e.clientX - initialX) + 'px';
    targetEl.style.top = (e.clientY - initialY) + 'px';
  }
  const handleMouseUp = (e) => {
    setMoveState(false);
  }
  return (
    <div 
      ref={singleEl}
      className={styles.single}
      onMouseDown={handleMouseDown}
      onMouseMove={isMove ? handleMouseMove : null}
      onMouseUp={handleMouseUp}
    >
      可任意拖动
    </div>
  )
}

export default Single;