'use client';

import { MoveUp } from 'lucide-react';
import { ComponentProps, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function MoveToTopButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.onscroll = () => {
      if (document.documentElement.scrollTop > 0)
        buttonRef.current?.classList.add('opacity-100', 'pointer-events-auto');
      else
        buttonRef.current?.classList.remove(
          'opacity-100',
          'pointer-events-auto',
        );
    };
  }, []);

  const handleMoveToTop = () => {
    document.documentElement.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Button
              ref={buttonRef}
              variant="secondary"
              className={cn(
                'pointer-events-none rounded-full px-4 py-8 opacity-0 shadow-lg transition-all',
                className,
              )}
              onClick={handleMoveToTop}
              {...props}
            >
              <MoveUp className="h-14 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center" side="left">
            <p>Move to top</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
