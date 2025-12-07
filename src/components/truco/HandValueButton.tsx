import { useState } from 'react';
import { HandValue, HAND_VALUE_NAMES } from '@/types/truco';
import { cn } from '@/lib/utils';

interface HandValueButtonProps {
  value: HandValue;
  onCycle: () => void;
  disabled?: boolean;
}

export function HandValueButton({ value, onCycle, disabled }: HandValueButtonProps) {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsShaking(true);
    onCycle();
    setTimeout(() => setIsShaking(false), 500);
  };

  const getValueColor = () => {
    switch (value) {
      case 2:
        return 'from-muted to-muted/80 text-foreground';
      case 4:
        return 'from-primary to-primary/80 text-primary-foreground';
      case 6:
        return 'from-accent to-accent/80 text-accent-foreground';
      case 9:
        return 'from-secondary to-secondary/80 text-secondary-foreground';
      case 12:
        return 'from-destructive to-destructive/80 text-destructive-foreground';
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm uppercase tracking-widest text-muted-foreground">
        Valor da Mão
      </span>

      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'relative h-28 w-28 rounded-full border-4 border-border',
          'bg-gradient-to-br shadow-xl transition-all duration-200',
          'hover:scale-105 active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          getValueColor(),
          isShaking && 'shake'
        )}
      >
        <span className="text-5xl font-bold text-shadow-md">{value}</span>
      </button>

      <span
        className={cn(
          'text-lg font-bold uppercase tracking-wider text-shadow-sm',
          value >= 4 && 'text-primary'
        )}
      >
        {HAND_VALUE_NAMES[value]}
      </span>

      <span className="text-xs text-muted-foreground">
        Toque para aumentar
      </span>
    </div>
  );
}
