import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameInfo from '../../components/GameInfo';
import { GameStatus, PieceColor } from '../../sdk';
import { ReactNode } from 'react';

// 不再模拟GameInfo组件本身，只模拟其依赖

// 模拟antd组件
jest.mock('antd', () => ({
  Card: ({ children }: { children: ReactNode }) => <div data-testid="card">{children}</div>,
  Typography: {
    Title: ({ children, level, className }: { children: ReactNode; level?: number; className?: string }) => 
      <h2 data-testid={`title-${level}`} className={className}>{children}</h2>,
    Text: ({ children, className, strong, style }: { children: ReactNode; className?: string; strong?: boolean; style?: any }) => 
      <span data-testid="text" className={className} style={style}>{children}</span>,
  },
  Space: ({ children, className, size }: { children: ReactNode; className?: string; size?: string }) => 
    <div data-testid="space" className={className}>{children}</div>,
  Button: ({ 
    children, 
    onClick, 
    type,
    danger 
  }: { 
    children: ReactNode; 
    onClick?: () => void; 
    type?: string; 
    size?: string;
    danger?: boolean;
  }) => (
    <button 
      data-testid={`button-${type || 'default'}${danger ? '-danger' : ''}`} 
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// 模拟createStyles
jest.mock('antd-style', () => ({
  createStyles: () => {
    // 返回函数组件会使用的样式对象和cx函数
    return {
      styles: {
        infoContainer: 'info-container-class',
        statusTitle: 'status-title-class',
        playerIndicator: 'player-indicator-class',
        playerPiece: 'player-piece-class',
        blackPiece: 'black-piece-class',
        whitePiece: 'white-piece-class',
        buttonGroup: 'button-group-class',
        statusTextReady: 'status-text-ready-class',
        statusTextPlaying: 'status-text-playing-class',
        statusTextWin: 'status-text-win-class',
        statusTextDraw: 'status-text-draw-class',
      },
      cx: (...classNames: any[]) => classNames.filter(Boolean).join(' '),
    };
  },
}));

describe('GameInfo组件', () => {
  const mockStart = jest.fn();
  const mockRestart = jest.fn();
  const mockUndo = jest.fn();

  beforeEach(() => {
    mockStart.mockClear();
    mockRestart.mockClear();
    mockUndo.mockClear();
  });

  test('游戏准备状态下显示开始游戏按钮', () => {
    render(
      <GameInfo
        status={GameStatus.READY}
        currentPlayer={PieceColor.BLACK}
        winner={null}
        onStart={mockStart}
        onRestart={mockRestart}
        onUndo={mockUndo}
      />
    );
    
    // 验证游戏状态文本
    expect(screen.getByText('准备开始游戏')).toBeInTheDocument();
    
    // 验证开始游戏按钮可见并可点击
    const startButton = screen.getByText('开始游戏');
    expect(startButton).toBeInTheDocument();
    
    // 点击开始按钮应该调用onStart
    fireEvent.click(startButton);
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  test('游戏进行中显示当前玩家和悔棋按钮', () => {
    render(
      <GameInfo
        status={GameStatus.PLAYING}
        currentPlayer={PieceColor.BLACK}
        winner={null}
        onStart={mockStart}
        onRestart={mockRestart}
        onUndo={mockUndo}
      />
    );
    
    // 验证游戏状态文本
    expect(screen.getByText('当前回合: 黑方')).toBeInTheDocument();
    
    // 验证当前玩家提示正确
    expect(screen.getByText('黑方回合')).toBeInTheDocument();
    
    // 验证悔棋按钮可见
    const undoButton = screen.getByText('悔棋');
    expect(undoButton).toBeInTheDocument();
    
    // 验证重新开始按钮可见
    const restartButton = screen.getByText('重新开始');
    expect(restartButton).toBeInTheDocument();
    
    // 点击悔棋按钮应该调用onUndo
    fireEvent.click(undoButton);
    expect(mockUndo).toHaveBeenCalledTimes(1);
    
    // 点击重新开始按钮应该调用onRestart
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });

  test('游戏结束时显示获胜者和重新开始按钮', () => {
    render(
      <GameInfo
        status={GameStatus.WIN}
        currentPlayer={PieceColor.WHITE}
        winner={PieceColor.BLACK}
        onStart={mockStart}
        onRestart={mockRestart}
        onUndo={mockUndo}
      />
    );
    
    // 验证显示获胜信息
    expect(screen.getByText('黑方获胜!')).toBeInTheDocument();
    
    // 验证重新开始按钮可见
    const restartButton = screen.getByText('再来一局');
    expect(restartButton).toBeInTheDocument();
    
    // 点击重新开始按钮应该调用onRestart
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });

  test('平局时显示平局信息和重新开始按钮', () => {
    render(
      <GameInfo
        status={GameStatus.DRAW}
        currentPlayer={PieceColor.BLACK}
        winner={null}
        onStart={mockStart}
        onRestart={mockRestart}
        onUndo={mockUndo}
      />
    );
    
    // 验证显示平局信息
    expect(screen.getByText('平局!')).toBeInTheDocument();
    
    // 验证重新开始按钮可见
    const restartButton = screen.getByText('再来一局');
    expect(restartButton).toBeInTheDocument();
    
    // 点击重新开始按钮应该调用onRestart
    fireEvent.click(restartButton);
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });
}); 