import React from 'react';
import { createStyles } from 'antd-style';
import { Position, PieceColor } from '../sdk';

interface BoardProps {
  boardSize: number;
  board: (PieceColor | null)[][];
  onPlacePiece: (position: Position) => void;
}

const useStyles = createStyles(({ css }) => ({
  boardContainer: {
    position: 'relative',
    margin: '20px auto',
    perspective: '1000px',
  },
  boardOuter: {
    position: 'relative',
    backgroundColor: '#dcb35c',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'woodgrain\' patternUnits=\'userSpaceOnUse\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' %3E%3Cpath fill=\'%23c19a49\' d=\'M0,0 l0,200 l200,0 l0,-200 l-200,0z M45,1 l3,2 l-3,1z M102,9 l4,2 l-4,1z M149,19 l3,3 l-3,2z M175,29 l5,2 l-3,3z M130,40 l6,1 l-2,3z M65,48 l4,3 l-3,3z M32,59 l3,3 l-5,2z M0,75 l3,1 l-2,3z M25,87 l4,2 l-3,3z M59,93 l3,2 l-3,3z M79,108 l5,2 l-4,3z M101,123 l4,2 l-3,2z M139,132 l3,1 l-2,2z M177,154 l3,3 l-5,4z M139,177 l3,2 l-3,2z M59,189 l4,5 l-3,6z\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23woodgrain)\' /%3E%3C/svg%3E")',
    backgroundSize: 'cover',
    borderRadius: '4px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    padding: '30px',
    transform: 'rotateX(5deg)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.3s ease',
    border: '4px solid #8b6b3d',
    '&:hover': {
      transform: 'rotateX(0deg)',
    }
  },
  boardInner: {
    position: 'relative',
    width: 'min(80vw, 600px)',
    height: 'min(80vw, 600px)',
    border: '2px solid rgba(0, 0, 0, 0.8)',
    boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(135deg, #e8c180 0%, #dcb35c 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: 0.1,
      pointerEvents: 'none',
    }
  },
  boardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    boxShadow: '1px 0 1px rgba(0, 0, 0, 0.1)',
  },
  intersections: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  intersection: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    margin: '-15px 0 0 -15px', // 使点击区域居中在交叉点上
    cursor: 'pointer',
    zIndex: 5,
    transition: 'transform 0.1s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  starPoint: {
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '6px',
      height: '6px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
      zIndex: 2,
    }
  },
  pieceContainer: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transformStyle: 'preserve-3d',
  },
  blackPiece: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #666 0%, #000 70%)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 -3px 10px rgba(0, 0, 0, 0.8)',
    transform: 'translateZ(2px)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '10%',
      left: '25%',
      width: '20%',
      height: '12%',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), transparent 60%)',
      transform: 'rotate(-45deg)',
    }
  },
  whitePiece: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #fff 0%, #eee 60%, #ddd 100%)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2), inset 0 -3px 10px rgba(0, 0, 0, 0.1)',
    transform: 'translateZ(2px)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '15%',
      left: '25%',
      width: '35%',
      height: '15%',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), transparent 70%)',
      transform: 'rotate(-45deg) scale(1.2)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '15%',
      right: '20%',
      width: '20%',
      height: '10%',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05), transparent 70%)',
    }
  },
  coordinates: {
    position: 'absolute',
    fontSize: '14px',
    color: '#000',
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
  },
  topCoordinates: css`
    top: 4px;
    left: 16px;
    right: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  `,
  leftCoordinates: css`
    top: 16px;
    bottom: 16px;
    left: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    text-align: center;
  `,
}));

// 判断是否为星位点或天元
const isStarPoint = (row: number, col: number, size: number): boolean => {
  if (size !== 19) return false; // 只有19路棋盘才有标准星位
  
  // 天元 (10,10) - 根据图片是第10行第10列
  if (row === 9 && col === 9) return true;
  
  // 四角星位 - 根据图片是第4、16行/列交叉点
  if ((row === 3 && col === 3) || 
      (row === 3 && col === 15) || 
      (row === 15 && col === 3) || 
      (row === 15 && col === 15)) {
    return true;
  }
  
  // 四边星位 - 根据图片是第4、10、16行/列交叉点
  if ((row === 3 && col === 9) || 
      (row === 9 && col === 3) || 
      (row === 15 && col === 9) || 
      (row === 9 && col === 15)) {
    return true;
  }
  
  return false;
};

// 中文数字
const chineseNumerals = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九'
];

const Board: React.FC<BoardProps> = ({ boardSize, board, onPlacePiece }) => {
  const { styles, cx } = useStyles();
  
  const handleIntersectionClick = (row: number, col: number) => {
    onPlacePiece({ row, col });
  };

  // 创建水平线 (所有格线)
  const horizontalLines = Array.from({ length: boardSize }, (_, index) => {
    const position = `${100 * index / (boardSize - 1)}%`;
    return (
      <div 
        key={`h-${index}`} 
        className={styles.horizontalLine} 
        style={{ top: position }} 
      />
    );
  });

  // 创建垂直线 (所有格线)
  const verticalLines = Array.from({ length: boardSize }, (_, index) => {
    const position = `${100 * index / (boardSize - 1)}%`;
    return (
      <div 
        key={`v-${index}`} 
        className={styles.verticalLine} 
        style={{ left: position }} 
      />
    );
  });

  // 创建顶部坐标 (1-19)
  const topCoordinates = (
    <div className={styles.coordinates + ' ' + styles.topCoordinates}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
    </div>
  );

  // 创建左侧坐标 (一至十九)
  const leftCoordinates = (
    <div className={styles.coordinates + ' ' + styles.leftCoordinates}>
      {chineseNumerals.map((num, index) => (
        <div key={index}>{num}</div>
      ))}
    </div>
  );

  // 创建交叉点
  const intersections = Array.from({ length: boardSize }, (_, row) => (
    Array.from({ length: boardSize }, (_, col) => {
      const positionX = `${100 * col / (boardSize - 1)}%`;
      const positionY = `${100 * row / (boardSize - 1)}%`;
      const starPoint = isStarPoint(row, col, boardSize);
      
      return (
        <div
          key={`${row}-${col}`}
          className={cx(
            styles.intersection,
            starPoint && styles.starPoint
          )}
          style={{ 
            left: positionX, 
            top: positionY 
          }}
          onClick={() => handleIntersectionClick(row, col)}
        >
          {board[row][col] && (
            <div className={styles.pieceContainer}>
              <div className={
                board[row][col] === PieceColor.BLACK
                  ? styles.blackPiece
                  : styles.whitePiece
              } />
            </div>
          )}
        </div>
      );
    })
  )).flat();

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardOuter}>
        {/* 顶部坐标 */}
        {topCoordinates}
        
        {/* 左侧坐标 */}
        {leftCoordinates}
        
        <div className={styles.boardInner}>
          <div className={styles.boardContent}>
            {/* 绘制网格线 */}
            <div className={styles.gridLines}>
              {horizontalLines}
              {verticalLines}
            </div>
            
            {/* 交叉点和棋子 */}
            <div className={styles.intersections}>
              {intersections}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board; 