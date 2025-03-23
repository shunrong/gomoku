import React from 'react';
import { createStyles } from 'antd-style';
import { Button, Space, Typography } from 'antd';
import { GameStatus, PieceColor } from '../sdk';

const { Text, Title } = Typography;

interface GameInfoProps {
  status: GameStatus;
  currentPlayer: PieceColor;
  winner: PieceColor | null;
  onStart: () => void;
  onRestart: () => void;
  onUndo: () => void;
}

const useStyles = createStyles({
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '48px 16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  statusTitle: {
    marginBottom: '16px',
    textAlign: 'center',
  },
  playerIndicator: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    justifyContent: 'center',
  },
  playerPiece: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid #ccc',
    marginRight: '12px',
  },
  blackPiece: {
    backgroundColor: '#000',
  },
  whitePiece: {
    backgroundColor: '#fff',
  },
  buttonGroup: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  statusTextReady: {
    fontSize: '20px',
    color: '#1890ff',
    marginBottom: '16px',
    textAlign: 'center',
  },
  statusTextPlaying: {
    fontSize: '20px',
    color: '#1890ff',
    marginBottom: '16px',
    textAlign: 'center',
  },
  statusTextWin: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#52c41a',
    marginBottom: '16px',
    textAlign: 'center',
  },
  statusTextDraw: {
    fontSize: '20px',
    color: '#faad14',
    marginBottom: '16px',
    textAlign: 'center',
  },
});

const GameInfo: React.FC<GameInfoProps> = ({
  status,
  currentPlayer,
  winner,
  onStart,
  onRestart,
  onUndo,
}) => {
  const { styles, cx } = useStyles();

  // 游戏状态显示文本
  const getStatusText = (): string => {
    switch (status) {
      case GameStatus.READY:
        return '准备开始游戏';
      case GameStatus.PLAYING:
        return `当前回合: ${currentPlayer === PieceColor.BLACK ? '黑方' : '白方'}`;
      case GameStatus.WIN:
        return `${winner === PieceColor.BLACK ? '黑方' : '白方'}获胜!`;
      case GameStatus.DRAW:
        return '平局!';
      default:
        return '';
    }
  };

  // 获取状态文本样式
  const getStatusTextStyle = () => {
    switch (status) {
      case GameStatus.READY:
        return styles.statusTextReady;
      case GameStatus.PLAYING:
        return styles.statusTextPlaying;
      case GameStatus.WIN:
        return styles.statusTextWin;
      case GameStatus.DRAW:
        return styles.statusTextDraw;
      default:
        return styles.statusTextPlaying;
    }
  };

  return (
    <div className={styles.infoContainer}>
      <Title level={3} className={styles.statusTitle}>游戏状态</Title>
      <Text className={getStatusTextStyle()}>{getStatusText()}</Text>
      
      {status === GameStatus.PLAYING && (
        <div className={styles.playerIndicator}>
          <span className={cx(
            styles.playerPiece, 
            currentPlayer === PieceColor.BLACK ? styles.blackPiece : styles.whitePiece
          )} />
          <Text strong style={{ fontSize: '18px' }}>{currentPlayer === PieceColor.BLACK ? '黑方' : '白方'}回合</Text>
        </div>
      )}
      
      <Space className={styles.buttonGroup} size="middle">
        {status === GameStatus.READY && (
          <Button type="primary" size="large" onClick={onStart}>
            开始游戏
          </Button>
        )}
        
        {(status === GameStatus.WIN || status === GameStatus.DRAW) && (
          <Button type="primary" size="large" onClick={onRestart}>
            再来一局
          </Button>
        )}
        
        {status === GameStatus.PLAYING && (
          <>
            <Button size="large" onClick={onUndo}>悔棋</Button>
            <Button type="primary" danger size="large" onClick={onRestart}>
              重新开始
            </Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default GameInfo; 