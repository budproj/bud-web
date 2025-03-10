import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressSegment = {
  value: number;
  color?: string;
};

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  segments: ProgressSegment[];
};

const ProgressCustom = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, segments, ...props }, ref) => {
  const sortedSegments = segments.sort((a, b) => a.value - b.value);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-6 w-full overflow-hidden rounded bg-secondary",
        className
      )}
      {...props}
    >
      {sortedSegments.map((segment, index) => (
        <ProgressPrimitive.Indicator
          key={index}
          className={cn(
            "h-full transition-all absolute",
            segment.color ? segment.color : "bg-primary"
          )}
          style={{
            width: `${segment.value}%`,
            zIndex: sortedSegments.length - index,
            left: `${sortedSegments
              .slice(0, index)
              .reduce((acc, segment) => acc + segment.value, 0)}%`,
          }}
        >
            <span className="text-white font-bold p-1">{segment.value}%</span>
        </ProgressPrimitive.Indicator>
      ))}
    </ProgressPrimitive.Root>
  );
});

ProgressCustom.displayName = "Progress";

export { ProgressCustom };