
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  to?: string; // Property for routing
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  title?: string; // For tooltip
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default', 
  size = 'sm',
  className = '',
  to,
  onClick,
  title,
  disabled = false,
  ...props 
}) => {
  // Determine class to use based on variant
  const getButtonClass = () => {
    switch (variant) {
      case 'default':
        return 'roman-btn';
      case 'destructive':
        return '';
      case 'secondary':
        return 'roman-btn-secondary';
      case 'outline':
        return 'roman-btn-outline';
      default:
        return '';
    }
  };
  
  const buttonClass = getButtonClass();
  const buttonContent = (
    <>
      {icon && <span className="mr-1">{icon}</span>}
      {label && <span>{label}</span>}
    </>
  );
  
  // Si un chemin de redirection est fourni, utiliser Link
  if (to) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={cn(buttonClass, "flex items-center gap-1", className)}
        title={title}
        disabled={disabled}
        asChild
        {...props}
      >
        <Link to={to}>
          {buttonContent}
        </Link>
      </Button>
    );
  }
  
  // Sinon, utilisons un bouton standard
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn(buttonClass, "flex items-center gap-1", className)}
      onClick={onClick}
      title={title}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </Button>
  );
};
