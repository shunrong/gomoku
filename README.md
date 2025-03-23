# 五子棋游戏

一个基于React和TypeScript开发的现代化五子棋游戏应用。

## 功能特性

- 🎮 经典五子棋玩法
- 🎯 黑白双方轮流落子
- 🏆 智能判断胜负
- 🔄 支持悔棋和重新开始
- 🖌️ 精美仿真棋盘UI
- 📱 响应式设计，支持各种设备

## 技术栈

- React 18
- TypeScript
- Ant Design & antd-style
- Zustand（状态管理）
- Vite（构建工具）

## 如何运行

确保已安装Node.js和pnpm，然后执行以下命令：

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 项目结构

```
src/
  ├── components/      # UI组件
  ├── models/          # 领域模型和类型定义
  ├── stores/          # 状态管理
  ├── styles/          # 全局样式
  ├── main.tsx         # 应用入口
```

## 领域模型设计

项目采用了面向对象和领域驱动设计，业务逻辑和UI表现分离：

- `Game`类：封装了五子棋游戏的核心逻辑
- `GameStore`：基于zustand的状态管理，连接Game模型和React组件
- UI组件：负责界面展示，通过Store与模型交互

## 游戏规则

1. 黑方先行，双方轮流在棋盘交叉点上放置棋子
2. 先在横、竖或斜线上形成连续五子的一方获胜
3. 如果棋盘填满仍无人获胜，则为平局

## 许可证

ISC 