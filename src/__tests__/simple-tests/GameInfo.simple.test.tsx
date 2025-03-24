import { render } from '@testing-library/react';
import GameInfo from '../../components/GameInfo';
import { GameStatus, PieceColor } from '../../sdk';

// 简单测试，不模拟任何依赖，只确认组件能渲染不报错
describe('GameInfo组件简单测试', () => {
  test('组件能够渲染', () => {
    // 将console.error临时静音，防止样式渲染错误或警告影响测试
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    render(
      <GameInfo
        status={GameStatus.PLAYING}
        currentPlayer={PieceColor.BLACK}
        winner={null}
        onStart={() => {}}
        onRestart={() => {}}
        onUndo={() => {}}
      />
    );
    
    // 恢复console.error
    console.error = originalConsoleError;
    
    // 如果没有抛出异常，测试通过
    expect(true).toBeTruthy();
  });
}); 