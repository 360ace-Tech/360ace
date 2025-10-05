import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[hsl(var(--brand-500))] text-white hover:bg-[hsl(var(--brand-600))] focus-visible:ring-[hsl(var(--brand-300))]",
        outline: "border-[hsl(var(--brand-400))] text-[hsl(var(--brand-600))] bg-transparent hover:bg-[hsl(var(--brand-50))] focus-visible:ring-[hsl(var(--brand-300))]",
        ghost: "bg-transparent text-[hsl(var(--neutral-700))] hover:bg-[hsl(var(--brand-50))]",
        tech: "bg-[hsl(var(--tech-color))] text-white hover:brightness-110",
        food: "bg-[hsl(var(--food-color))] text-white hover:brightness-110"
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
