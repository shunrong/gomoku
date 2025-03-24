import { Game, PieceColor } from '../../sdk';

describe('Game SDK简单测试', () => {
  test('能创建游戏实例并进行基本操作', () => {
    // 创建游戏实例
    const game = new Game();
    
    // 验证初始状态
    expect(game.getBoardSize()).toBe(19);
    expect(game.getCurrentPlayer()).toBe(PieceColor.BLACK);
    expect(game.getBoard()).toHaveLength(19);
    expect(game.getWinner()).toBeNull();
    
    // 开始游戏
    game.start();
    
    // 执行一次落子
    const position = { row: 7, col: 7 };
    const moveResult = game.placePiece(position);
    expect(moveResult).toBeTruthy();
    
    // 验证当前玩家已切换
    expect(game.getCurrentPlayer()).toBe(PieceColor.WHITE);
    
    // 验证棋盘状态已更新
    const board = game.getBoard();
    expect(board[7][7]).toBe(PieceColor.BLACK);
    
    // 测试在已有棋子的位置落子
    const invalidMove = game.placePiece(position);
    expect(invalidMove).toBeFalsy();
  });
}); 