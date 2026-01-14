import styled from 'styled-components';
import { css } from 'styled-components';


type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';


const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  
  &:focus-visible {
    box-shadow: 0 0 0 2px var(--ring-color), 0 0 0 4px var(--ring-offset-color);
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

const variantStyles = {
  default: css`
    background-color: var(--primary);
    color: var(--primary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--primary) 90%, transparent);
    }
  `,
  destructive: css`
    background-color: var(--destructive);
    color: var(--destructive-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--destructive) 90%, transparent);
    }
  `,
  outline: css`
    border: 1px solid var(--input);
    background-color: var(--background);
    
    &:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  `,
  secondary: css`
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    
    &:hover {
      background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
    }
  `,
  ghost: css`
    &:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  `,
  link: css`
    color: var(--primary);
    text-underline-offset: 4px;
    
    &:hover {
      text-decoration: underline;
    }
  `,
};

const sizeStyles = {
  default: css`
    height: 2.5rem;
    padding: 0.5rem 1rem;
  `,
  sm: css`
    height: 2.25rem;
    padding: 0 0.75rem;
    border-radius: 0.375rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0 2rem;
    border-radius: 0.375rem;
  `,
  icon: css`
    width: 2.5rem;
    height: 2.5rem;
  `,
};
export const StyledButton = styled.button<{
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}>`
  ${baseStyles}
  ${({ $variant = 'default' }) => variantStyles[$variant]}
  ${({ $size = 'default' }) => sizeStyles[$size]}
`;
export type ButtonVariants = typeof variantStyles;
export type ButtonSizes = typeof sizeStyles;