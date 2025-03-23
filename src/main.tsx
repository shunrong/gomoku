import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { StyleProvider } from 'antd-style';
import GameApp from './pages/GameApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <StyleProvider>
        <GameApp />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>
); 