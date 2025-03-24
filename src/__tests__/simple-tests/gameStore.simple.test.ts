import { useGameStore } from '../../stores/gameStore';

describe('GameStore简单测试', () => {
  test('能够创建并访问store', () => {
    // 重置store状态
    const store = useGameStore.getState();
    
    // 验证初始状态
    expect(store.game).toBeDefined();
    expect(store.board).toHaveLength(19); // 默认棋盘大小是19x19
    expect(store.winner).toBeNull();
    
    // 开始游戏
    store.startGame();
    
    // 测试落子方法
    const position = { row: 7, col: 7 };
    store.placePiece(position);
    
    // 验证状态已更新
    const updatedStore = useGameStore.getState();
    expect(updatedStore.board[7][7]).toBeDefined();
    expect(updatedStore.board[7][7]).not.toBeNull();
  });
}); 