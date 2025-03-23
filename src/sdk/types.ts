/**
 * 棋子颜色
 */
export enum PieceColor {
  BLACK = 'black',
  WHITE = 'white',
}

/**
 * 游戏状态
 */
export enum GameStatus {
  READY = 'ready',     // 准备开始
  PLAYING = 'playing', // 游戏进行中
  WIN = 'win',         // 有玩家胜利
  DRAW = 'draw',       // 平局
}

/**
 * 棋盘位置
 */
export interface Position {
  row: number;
  col: number;
}

/**
 * 棋子
 */
export interface Piece {
  color: PieceColor;
  position: Position;
}

/**
 * 游戏配置
 */
export interface GameConfig {
  boardSize: number;  // 棋盘大小，默认为19x19
  winCondition: number; // 获胜条件，默认为5子连线
} 