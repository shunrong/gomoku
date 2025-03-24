import { renderHook, act } from '@testing-library/react';
import { useGameStore } from '../../stores/gameStore';
import { GameStatus, PieceColor } from '../../sdk';

// 重置store状态
const resetStore = () => {
  const { result } = renderHook(() => useGameStore());
  act(() => {
    result.current.restartGame();
  });
};

describe('GameStore', () => {
  // 每个测试前重置store
  beforeEach(() => {
    resetStore();
  });

  test('初始化状态', () => {
    const { result } = renderHook(() => useGameStore());
    
    expect(result.current.status).toBe(GameStatus.PLAYING);
    expect(result.current.currentPlayer).toBe(PieceColor.BLACK);
    expect(result.current.winner).toBeNull();
    expect(result.current.board.length).toBe(19); // 默认棋盘大小
    expect(result.current.board[0].length).toBe(19);
  });

  test('开始游戏', () => {
    const { result } = renderHook(() => useGameStore());
    
    act(() => {
      result.current.startGame();
    });
    
    expect(result.current.status).toBe(GameStatus.PLAYING);
    expect(result.current.currentPlayer).toBe(PieceColor.BLACK);
    expect(result.current.winner).toBeNull();
  });

  test('放置棋子', () => {
    const { result } = renderHook(() => useGameStore());
    
    // 开始游戏
    act(() => {
      result.current.startGame();
    });
    
    // 放置棋子
    act(() => {
      const success = result.current.placePiece({ row: 9, col: 9 });
      expect(success).toBe(true);
    });
    
    // 验证状态更新
    expect(result.current.board[9][9]).toBe(PieceColor.BLACK);
    expect(result.current.currentPlayer).toBe(PieceColor.WHITE);
  });

  test('放置棋子失败时不改变状态', () => {
    const { result } = renderHook(() => useGameStore());
    
    // 开始游戏
    act(() => {
      result.current.startGame();
    });
    
    // 在有效位置放置棋子
    act(() => {
      result.current.placePiece({ row: 9, col: 9 });
    });
    
    // 第二次在同一位置放置棋子应该失败
    act(() => {
      const success = result.current.placePiece({ row: 9, col: 9 });
      expect(success).toBe(false);
    });
    
    // 状态应该不变
    expect(result.current.board[9][9]).toBe(PieceColor.BLACK);
    expect(result.current.currentPlayer).toBe(PieceColor.WHITE);
  });

  test('悔棋功能', () => {
    const { result } = renderHook(() => useGameStore());
    
    // 开始游戏
    act(() => {
      result.current.startGame();
    });
    
    // 放置棋子
    act(() => {
      result.current.placePiece({ row: 9, col: 9 });
    });
    
    // 验证棋子放置成功
    expect(result.current.board[9][9]).toBe(PieceColor.BLACK);
    expect(result.current.currentPlayer).toBe(PieceColor.WHITE);
    
    // 悔棋
    act(() => {
      const success = result.current.undoMove();
      expect(success).toBe(true);
    });
    
    // 验证状态更新
    expect(result.current.board[9][9]).toBeNull();
    expect(result.current.currentPlayer).toBe(PieceColor.BLACK);
  });

  test('重新开始游戏', () => {
    const { result } = renderHook(() => useGameStore());
    
    // 开始游戏
    act(() => {
      result.current.startGame();
    });
    
    // 放置棋子
    act(() => {
      result.current.placePiece({ row: 9, col: 9 });
    });
    
    // 重新开始游戏
    act(() => {
      result.current.restartGame();
    });
    
    // 验证状态重置
    expect(result.current.status).toBe(GameStatus.PLAYING);
    expect(result.current.currentPlayer).toBe(PieceColor.BLACK);
    expect(result.current.winner).toBeNull();
    expect(result.current.board[9][9]).toBeNull();
  });

  test('胜利状态更新', () => {
    const { result } = renderHook(() => useGameStore());
    
    // 开始游戏
    act(() => {
      result.current.startGame();
    });
    
    // 模拟五子连线获胜
    // 黑棋
    act(() => { result.current.placePiece({ row: 7, col: 7 }); });
    // 白棋
    act(() => { result.current.placePiece({ row: 8, col: 7 }); });
    // 黑棋
    act(() => { result.current.placePiece({ row: 7, col: 8 }); });
    // 白棋
    act(() => { result.current.placePiece({ row: 8, col: 8 }); });
    // 黑棋
    act(() => { result.current.placePiece({ row: 7, col: 9 }); });
    // 白棋
    act(() => { result.current.placePiece({ row: 8, col: 9 }); });
    // 黑棋
    act(() => { result.current.placePiece({ row: 7, col: 10 }); });
    // 白棋
    act(() => { result.current.placePiece({ row: 8, col: 10 }); });
    // 黑棋 - 此时应该获胜
    act(() => { result.current.placePiece({ row: 7, col: 11 }); });
    
    // 验证状态更新
    expect(result.current.status).toBe(GameStatus.WIN);
    expect(result.current.winner).toBe(PieceColor.BLACK);
  });
}); 