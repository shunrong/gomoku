import React from 'react';
import { createStyles } from 'antd-style';
import { Layout, Typography } from 'antd';
import Board from '../components/Board';
import GameInfo from '../components/GameInfo';
import { Position } from '../sdk/types';
import { useGameStore } from '../stores/gameStore';

const { Content } = Layout;
const { Title } = Typography;

const useStyles = createStyles({
  styledLayout: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  styledContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100vh',
    alignItems: 'center',
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    width: '300px',
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    height: '100%',
  },
  titleContainer: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  gameTitle: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  gameSubtitle: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#666',
  },
});

const GameApp: React.FC = () => {
  const { styles } = useStyles();
  const {
    status,
    currentPlayer,
    winner,
    board,
    boardSize,
    startGame,
    restartGame,
    placePiece,
    undoMove,
  } = useGameStore();

  const handlePlacePiece = (position: Position) => {
    placePiece(position);
  };

  return (
    <Layout className={styles.styledLayout}>
      <Content className={styles.styledContent}>
        {/* 左侧棋盘 */}
        <div className={styles.leftSection}>
          <Board
            boardSize={boardSize}
            board={board}
            onPlacePiece={handlePlacePiece}
          />
        </div>
        
        {/* 右侧标题和游戏信息 */}
        <div className={styles.rightSection}>
          {/* 上部分：标题 */}
          <div className={styles.titleContainer}>
            <Title level={1} className={styles.gameTitle}>五子棋</Title>
            <Title level={4} className={styles.gameSubtitle}>经典棋盘游戏</Title>
          </div>
          
          {/* 下部分：游戏信息 */}
          <GameInfo
            status={status}
            currentPlayer={currentPlayer}
            winner={winner}
            onStart={startGame}
            onRestart={restartGame}
            onUndo={undoMove}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default GameApp; 