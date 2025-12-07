import { useState, useCallback, useEffect } from 'react';
import {
  Match,
  Team,
  HandValue,
  MatchHistoryEntry,
  HAND_VALUE_SEQUENCE,
  MAX_SCORE
} from '@/types/truco';
import { supabase } from '@/lib/supabase';

const createNewMatch = (): Match => ({
  id: crypto.randomUUID(),
  scoreA: 0,
  scoreB: 0,
  currentHandValue: 2,
  history: [],
  status: 'active',
  createdAt: new Date(),
});

export function useTrucoMatch() {
  const [match, setMatch] = useState<Match>(createNewMatch());

  useEffect(() => {
    const saveMatch = async () => {
      try {
        await supabase
          .from('matches')
          .upsert({
            id: match.id,
            score_a: match.scoreA,
            score_b: match.scoreB,
            current_hand_value: match.currentHandValue,
            status: match.status,
            winner: match.winner || null,
          });
      } catch (err) {
        console.error('Erro ao salvar partida:', err);
      }
    };
    saveMatch();
  }, [match]);

  const incrementScore = useCallback((team: Team) => {
    setMatch(prev => {
      if (prev.status === 'finished') return prev;
      
      const key = team === 'A' ? 'scoreA' : 'scoreB';
      const newScore = Math.min(prev[key] + 1, MAX_SCORE);
      
      const updated = { ...prev, [key]: newScore };
      
      if (newScore >= MAX_SCORE) {
        updated.status = 'finished';
        updated.winner = team;
      }
      
      return updated;
    });
  }, []);

  const decrementScore = useCallback((team: Team) => {
    setMatch(prev => {
      if (prev.status === 'finished') return prev;
      
      const key = team === 'A' ? 'scoreA' : 'scoreB';
      const newScore = Math.max(prev[key] - 1, 0);
      
      return { ...prev, [key]: newScore };
    });
  }, []);

  const cycleHandValue = useCallback(() => {
    setMatch(prev => {
      if (prev.status === 'finished') return prev;
      
      const currentIndex = HAND_VALUE_SEQUENCE.indexOf(prev.currentHandValue);
      const nextIndex = (currentIndex + 1) % HAND_VALUE_SEQUENCE.length;
      
      return { ...prev, currentHandValue: HAND_VALUE_SEQUENCE[nextIndex] };
    });
  }, []);

  const finishHand = useCallback((winner: Team) => {
    setMatch(prev => {
      if (prev.status === 'finished') return prev;

      const key = winner === 'A' ? 'scoreA' : 'scoreB';
      const newScore = Math.min(prev[key] + prev.currentHandValue, MAX_SCORE);

      const historyEntry: MatchHistoryEntry = {
        id: crypto.randomUUID(),
        winner,
        points: prev.currentHandValue,
        timestamp: new Date(),
      };

      const updated: Match = {
        ...prev,
        [key]: newScore,
        currentHandValue: 2,
        history: [historyEntry, ...prev.history],
      };

      if (newScore >= MAX_SCORE) {
        updated.status = 'finished';
        updated.winner = winner;
      }

      (async () => {
        try {
          await supabase
            .from('match_history')
            .insert({
              match_id: prev.id,
              winner,
              points: prev.currentHandValue,
            });
        } catch (err) {
          console.error('Erro ao salvar histórico:', err);
        }
      })();

      return updated;
    });
  }, []);

  const resetMatch = useCallback(async () => {
    try {
      await supabase
        .from('matches')
        .delete()
        .eq('id', match.id);
    } catch (err) {
      console.error('Erro ao deletar partida:', err);
    }
    setMatch(createNewMatch());
  }, [match.id]);

  return {
    match,
    incrementScore,
    decrementScore,
    cycleHandValue,
    finishHand,
    resetMatch,
  };
}
