"use client";
import { ButtonHTMLAttributes, ElementType } from "react";

interface ButtonLoginProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType; 
}

export const ButtonLogin = ({ 
  as: Component = "button", 
  ...props 
}: ButtonLoginProps) => {
  return <Component {...props} />;
};