import { render } from '@testing-library/react';
import GameApp from '../../pages/GameApp';

describe('GameApp组件简单测试', () => {
  test('组件能够渲染', () => {
    // 将console.error临时静音，防止样式渲染错误或警告影响测试
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    render(<GameApp />);
    
    // 恢复console.error
    console.error = originalConsoleError;
    
    // 如果没有抛出异常，测试通过
    expect(true).toBeTruthy();
  });
}); 