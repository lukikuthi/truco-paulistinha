export type Team = 'A' | 'B';

export type HandValue = 2 | 4 | 6 | 9 | 12;

export interface MatchHistoryEntry {
  id: string;
  winner: Team;
  points: HandValue;
  timestamp: Date;
}

export interface Match {
  id: string;
  scoreA: number;
  scoreB: number;
  currentHandValue: HandValue;
  history: MatchHistoryEntry[];
  status: 'active' | 'finished';
  winner?: Team;
  createdAt: Date;
}

export const HAND_VALUE_SEQUENCE: HandValue[] = [2, 4, 6, 9, 12];

export const HAND_VALUE_NAMES: Record<HandValue, string> = {
  2: 'Normal',
  4: 'Truco!',
  6: 'Seis!',
  9: 'Nove!',
  12: 'Doze!',
};

export const MAX_SCORE = 12;
