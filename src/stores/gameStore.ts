import { create } from 'zustand';
import { Game, GameStatus, PieceColor, Position } from '../sdk';

interface GameState {
  game: Game;
  status: GameStatus;
  currentPlayer: PieceColor;
  winner: PieceColor | null;
  board: (PieceColor | null)[][];
  boardSize: number;
  // 操作
  startGame: () => void;
  restartGame: () => void;
  placePiece: (position: Position) => boolean;
  undoMove: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => {
  const game = new Game();
  
  return {
    game,
    status: game.getStatus(),
    currentPlayer: game.getCurrentPlayer(),
    winner: game.getWinner(),
    board: game.getBoard(),
    boardSize: game.getBoardSize(),
    
    startGame: () => {
      const { game } = get();
      game.start();
      set({
        status: game.getStatus(),
        currentPlayer: game.getCurrentPlayer(),
        winner: game.getWinner(),
        board: game.getBoard(),
      });
    },
    
    restartGame: () => {
      const { game } = get();
      game.restart();
      set({
        status: game.getStatus(),
        currentPlayer: game.getCurrentPlayer(),
        winner: game.getWinner(),
        board: game.getBoard(),
      });
    },
    
    placePiece: (position) => {
      const { game } = get();
      const success = game.placePiece(position);
      
      if (success) {
        set({
          status: game.getStatus(),
          currentPlayer: game.getCurrentPlayer(),
          winner: game.getWinner(),
          board: game.getBoard(),
        });
      }
      
      return success;
    },
    
    undoMove: () => {
      const { game } = get();
      const success = game.undoMove();
      
      if (success) {
        set({
          status: game.getStatus(),
          currentPlayer: game.getCurrentPlayer(),
          winner: game.getWinner(),
          board: game.getBoard(),
        });
      }
      
      return success;
    },
  };
}); 