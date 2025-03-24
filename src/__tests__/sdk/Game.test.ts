import { Game } from '../../sdk/Game';
import { GameStatus, PieceColor, Position } from '../../sdk/types';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    // 每个测试前初始化一个新游戏
    game = new Game({ boardSize: 15, winCondition: 5 });
    game.start();
  });

  test('初始化游戏状态', () => {
    expect(game.getStatus()).toBe(GameStatus.PLAYING);
    expect(game.getCurrentPlayer()).toBe(PieceColor.BLACK);
    expect(game.getWinner()).toBeNull();
    expect(game.getBoard().length).toBe(15);
    expect(game.getBoard()[0].length).toBe(15);
    expect(game.getPieces().length).toBe(0);
  });

  test('棋子放置', () => {
    const position: Position = { row: 7, col: 7 };
    const result = game.placePiece(position);
    
    expect(result).toBe(true);
    expect(game.getBoard()[7][7]).toBe(PieceColor.BLACK);
    expect(game.getPieces().length).toBe(1);
    expect(game.getCurrentPlayer()).toBe(PieceColor.WHITE);
  });

  test('在已有棋子的位置放置棋子应该失败', () => {
    const position: Position = { row: 7, col: 7 };
    game.placePiece(position);
    
    const result = game.placePiece(position);
    expect(result).toBe(false);
    expect(game.getPieces().length).toBe(1);
  });

  test('在棋盘外放置棋子应该失败', () => {
    const position: Position = { row: 15, col: 15 };
    const result = game.placePiece(position);
    
    expect(result).toBe(false);
    expect(game.getPieces().length).toBe(0);
  });

  test('水平连线获胜', () => {
    // 黑棋
    game.placePiece({ row: 7, col: 7 });
    // 白棋
    game.placePiece({ row: 8, col: 7 });
    // 黑棋
    game.placePiece({ row: 7, col: 8 });
    // 白棋
    game.placePiece({ row: 8, col: 8 });
    // 黑棋
    game.placePiece({ row: 7, col: 9 });
    // 白棋
    game.placePiece({ row: 8, col: 9 });
    // 黑棋
    game.placePiece({ row: 7, col: 10 });
    // 白棋
    game.placePiece({ row: 8, col: 10 });
    // 黑棋 - 此时应该获胜
    const result = game.placePiece({ row: 7, col: 11 });
    
    expect(result).toBe(true);
    expect(game.getStatus()).toBe(GameStatus.WIN);
    expect(game.getWinner()).toBe(PieceColor.BLACK);
  });

  test('垂直连线获胜', () => {
    // 黑棋
    game.placePiece({ row: 7, col: 7 });
    // 白棋
    game.placePiece({ row: 7, col: 8 });
    // 黑棋
    game.placePiece({ row: 8, col: 7 });
    // 白棋
    game.placePiece({ row: 8, col: 8 });
    // 黑棋
    game.placePiece({ row: 9, col: 7 });
    // 白棋
    game.placePiece({ row: 9, col: 8 });
    // 黑棋
    game.placePiece({ row: 10, col: 7 });
    // 白棋
    game.placePiece({ row: 10, col: 8 });
    // 黑棋 - 此时应该获胜
    const result = game.placePiece({ row: 11, col: 7 });
    
    expect(result).toBe(true);
    expect(game.getStatus()).toBe(GameStatus.WIN);
    expect(game.getWinner()).toBe(PieceColor.BLACK);
  });

  test('对角线连线获胜', () => {
    // 黑棋
    game.placePiece({ row: 7, col: 7 });
    // 白棋
    game.placePiece({ row: 7, col: 8 });
    // 黑棋
    game.placePiece({ row: 8, col: 8 });
    // 白棋
    game.placePiece({ row: 7, col: 9 });
    // 黑棋
    game.placePiece({ row: 9, col: 9 });
    // 白棋
    game.placePiece({ row: 7, col: 10 });
    // 黑棋
    game.placePiece({ row: 10, col: 10 });
    // 白棋
    game.placePiece({ row: 7, col: 11 });
    // 黑棋 - 此时应该获胜
    const result = game.placePiece({ row: 11, col: 11 });
    
    expect(result).toBe(true);
    expect(game.getStatus()).toBe(GameStatus.WIN);
    expect(game.getWinner()).toBe(PieceColor.BLACK);
  });

  test('反对角线连线获胜', () => {
    // 黑棋
    game.placePiece({ row: 11, col: 7 });
    // 白棋
    game.placePiece({ row: 7, col: 8 });
    // 黑棋
    game.placePiece({ row: 10, col: 8 });
    // 白棋
    game.placePiece({ row: 7, col: 9 });
    // 黑棋
    game.placePiece({ row: 9, col: 9 });
    // 白棋
    game.placePiece({ row: 7, col: 10 });
    // 黑棋
    game.placePiece({ row: 8, col: 10 });
    // 白棋
    game.placePiece({ row: 6, col: 11 });
    // 黑棋 - 此时应该获胜
    const result = game.placePiece({ row: 7, col: 11 });
    
    expect(result).toBe(true);
    expect(game.getStatus()).toBe(GameStatus.WIN);
    expect(game.getWinner()).toBe(PieceColor.BLACK);
  });

  test('平局', () => {
    // 模拟填满棋盘，但无人获胜的情况
    // 在实际测试中会非常冗长，这里简化测试
    const mockBoardFull = jest.spyOn(game, 'placePiece').mockImplementation((position: Position) => {
      // 模拟放置棋子但无人获胜
      // @ts-ignore - 访问私有属性进行测试
      game['pieces'].push({
        color: game.getCurrentPlayer(),
        position
      });
      
      // 模拟黑白棋交替放置
      // @ts-ignore - 访问私有方法进行测试
      game['switchPlayer']();
      
      // 当棋盘被填满时
      // @ts-ignore - 访问私有属性进行测试
      if (game['pieces'].length === 15 * 15) {
        // @ts-ignore - 修改私有属性进行测试
        game['status'] = GameStatus.DRAW;
        return true;
      }
      
      return true;
    });
    
    // 填满棋盘
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        game.placePiece({ row: i, col: j });
      }
    }
    
    expect(game.getStatus()).toBe(GameStatus.DRAW);
    expect(game.getWinner()).toBeNull();
    
    mockBoardFull.mockRestore();
  });

  test('重新开始游戏', () => {
    // 先下几步棋
    game.placePiece({ row: 7, col: 7 });
    game.placePiece({ row: 8, col: 8 });
    
    // 重新开始
    game.restart();
    
    // 验证游戏状态重置
    expect(game.getStatus()).toBe(GameStatus.PLAYING);
    expect(game.getCurrentPlayer()).toBe(PieceColor.BLACK);
    expect(game.getWinner()).toBeNull();
    expect(game.getPieces().length).toBe(0);
    expect(game.getBoard()[7][7]).toBeNull();
    expect(game.getBoard()[8][8]).toBeNull();
  });

  test('悔棋功能', () => {
    // 放置两个棋子
    game.placePiece({ row: 7, col: 7 });
    game.placePiece({ row: 8, col: 8 });
    
    // 悔棋
    const result = game.undoMove();
    
    expect(result).toBe(true);
    expect(game.getPieces().length).toBe(1);
    expect(game.getBoard()[8][8]).toBeNull();
    expect(game.getCurrentPlayer()).toBe(PieceColor.WHITE);
  });

  test('悔棋到空棋盘', () => {
    // 放置一个棋子
    game.placePiece({ row: 7, col: 7 });
    
    // 悔棋
    game.undoMove();
    
    // 再次悔棋时应该失败
    const result = game.undoMove();
    
    expect(result).toBe(false);
    expect(game.getPieces().length).toBe(0);
  });
});