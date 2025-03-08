
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4 relative", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative pl-8 pb-4 border-l", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center mb-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-semibold", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TimelineTitle.displayName = "TimelineTitle";

interface TimelineBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const TimelineBadge = React.forwardRef<HTMLDivElement, TimelineBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ml-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineBadge.displayName = "TimelineBadge";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";

Timeline.Item = TimelineItem;
Timeline.Header = TimelineHeader;
Timeline.Title = TimelineTitle;
Timeline.Badge = TimelineBadge;
Timeline.Content = TimelineContent;

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineBadge,
  TimelineContent,
};
