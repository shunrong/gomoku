import { GameConfig, GameStatus, Piece, PieceColor, Position } from './types';

/**
 * 方向定义：用于检查连线的方向常量
 */
enum Direction {
  HORIZONTAL = 'horizontal',       // 水平方向
  VERTICAL = 'vertical',           // 垂直方向
  DIAGONAL_DOWN = 'diagonalDown',  // 左上到右下对角线
  DIAGONAL_UP = 'diagonalUp',      // 右上到左下对角线
}

/**
 * 方向向量定义：每个方向对应的行列增量
 */
const DirectionVectors = {
  [Direction.HORIZONTAL]: { dx: 0, dy: 1 },   // 水平方向：行不变，列+1
  [Direction.VERTICAL]: { dx: 1, dy: 0 },     // 垂直方向：行+1，列不变
  [Direction.DIAGONAL_DOWN]: { dx: 1, dy: 1 }, // 左上到右下：行+1，列+1
  [Direction.DIAGONAL_UP]: { dx: 1, dy: -1 },  // 右上到左下：行+1，列-1
};

/**
 * 正反方向常量
 */
enum DirectionFactor {
  FORWARD = 1,    // 正向
  BACKWARD = -1,  // 反向
}

/**
 * 五子棋游戏模型
 */
export class Game {
  private pieces: Piece[] = [];
  private currentPlayer: PieceColor = PieceColor.BLACK;
  private status: GameStatus = GameStatus.READY;
  private winner: PieceColor | null = null;
  private board: (PieceColor | null)[][] = [];
  
  constructor(private config: GameConfig = { boardSize: 19, winCondition: 5 }) {
    this.initBoard();
  }

  /**
   * 初始化棋盘
   */
  private initBoard(): void {
    this.board = Array(this.config.boardSize)
      .fill(null)
      .map(() => Array(this.config.boardSize).fill(null));
    this.pieces = [];
    this.currentPlayer = PieceColor.BLACK;
    this.status = GameStatus.READY;
    this.winner = null;
  }

  /**
   * 开始游戏
   */
  public start(): void {
    this.initBoard();
    this.status = GameStatus.PLAYING;
  }

  /**
   * 重新开始游戏
   */
  public restart(): void {
    this.start();
  }

  /**
   * 放置棋子
   * @param position 位置
   * @returns 是否放置成功
   */
  public placePiece(position: Position): boolean {
    // 游戏未开始或已结束
    if (this.status !== GameStatus.PLAYING) {
      return false;
    }

    const { row, col } = position;
    
    // 位置越界
    if (row < 0 || row >= this.config.boardSize || col < 0 || col >= this.config.boardSize) {
      return false;
    }

    // 位置已有棋子
    if (this.board[row][col] !== null) {
      return false;
    }

    // 放置棋子
    const piece: Piece = {
      color: this.currentPlayer,
      position: { row, col },
    };
    
    this.pieces.push(piece);
    this.board[row][col] = this.currentPlayer;

    // 检查胜利
    if (this.checkWin(piece)) {
      this.status = GameStatus.WIN;
      this.winner = this.currentPlayer;
      return true;
    }

    // 检查平局（棋盘已满）
    if (this.pieces.length === this.config.boardSize * this.config.boardSize) {
      this.status = GameStatus.DRAW;
      return true;
    }

    // 切换玩家
    this.switchPlayer();
    return true;
  }

  /**
   * 检查是否获胜
   * @param piece 最后放置的棋子
   * @returns 是否获胜
   */
  private checkWin(piece: Piece): boolean {
    const { row, col } = piece.position;
    const color = piece.color;
    
    // 检查四个方向是否形成五子连线
    return (
      // 检查水平方向
      this.checkDirection(row, col, color, Direction.HORIZONTAL) ||
      // 检查垂直方向
      this.checkDirection(row, col, color, Direction.VERTICAL) ||
      // 检查左上到右下对角线
      this.checkDirection(row, col, color, Direction.DIAGONAL_DOWN) ||
      // 检查右上到左下对角线
      this.checkDirection(row, col, color, Direction.DIAGONAL_UP)
    );
  }

  /**
   * 检查指定方向是否形成连线
   * @param row 起始行坐标
   * @param col 起始列坐标
   * @param color 棋子颜色
   * @param direction 要检查的方向
   * @returns 是否在该方向形成足够长的连线
   */
  private checkDirection(row: number, col: number, color: PieceColor, direction: Direction): boolean {
    const winCondition = this.config.winCondition;
    let count = 1; // 当前位置的棋子计为1个
    
    // 获取方向对应的行列增量
    const { dx, dy } = DirectionVectors[direction];
    
    // 向正方向检查连续棋子
    count += this.countConsecutivePieces(row, col, color, dx, dy, DirectionFactor.FORWARD);
    
    // 向反方向检查连续棋子
    count += this.countConsecutivePieces(row, col, color, dx, dy, DirectionFactor.BACKWARD);
    
    // 如果连续棋子数量满足获胜条件
    return count >= winCondition;
  }

  /**
   * 计算指定起点沿指定方向的连续同色棋子数量
   * @param row 起始行坐标
   * @param col 起始列坐标
   * @param color 棋子颜色
   * @param dx 行方向增量
   * @param dy 列方向增量
   * @param directionFactor 方向因子(正向1或反向-1)
   * @returns 连续同色棋子数量(不包括起始点)
   */
  private countConsecutivePieces(
    row: number, 
    col: number, 
    color: PieceColor, 
    dx: number, 
    dy: number,
    directionFactor: DirectionFactor
  ): number {
    const boardSize = this.config.boardSize;
    const winCondition = this.config.winCondition;
    let count = 0;
    
    // 最多检查到获胜条件减1的距离(因为起始点已经算了1个)
    for (let i = 1; i < winCondition; i++) {
      // 计算要检查的位置坐标
      const newRow = row + i * dx * directionFactor;
      const newCol = col + i * dy * directionFactor;
      
      // 检查坐标是否在棋盘范围内
      if (
        newRow < 0 || 
        newRow >= boardSize || 
        newCol < 0 || 
        newCol >= boardSize
      ) {
        break; // 超出棋盘范围，停止检查
      }
      
      // 检查该位置是否有相同颜色的棋子
      if (this.board[newRow][newCol] === color) {
        count++; // 找到同色棋子，计数加1
      } else {
        break; // 遇到不同颜色或空位，停止检查
      }
    }
    
    return count;
  }

  /**
   * 切换当前玩家
   */
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === PieceColor.BLACK 
      ? PieceColor.WHITE 
      : PieceColor.BLACK;
  }

  /**
   * 获取游戏状态
   */
  public getStatus(): GameStatus {
    return this.status;
  }

  /**
   * 获取当前玩家
   */
  public getCurrentPlayer(): PieceColor {
    return this.currentPlayer;
  }

  /**
   * 获取获胜玩家
   */
  public getWinner(): PieceColor | null {
    return this.winner;
  }

  /**
   * 获取所有棋子
   */
  public getPieces(): Piece[] {
    return [...this.pieces];
  }

  /**
   * 获取棋盘
   */
  public getBoard(): (PieceColor | null)[][] {
    return this.board.map(row => [...row]);
  }

  /**
   * 获取棋盘大小
   */
  public getBoardSize(): number {
    return this.config.boardSize;
  }

  /**
   * 悔棋
   * @returns 是否成功悔棋
   */
  public undoMove(): boolean {
    if (this.pieces.length === 0 || this.status !== GameStatus.PLAYING) {
      return false;
    }

    const lastPiece = this.pieces.pop()!;
    const { row, col } = lastPiece.position;
    this.board[row][col] = null;
    this.switchPlayer();
    return true;
  }
} 