import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonSize = "sm" | "default" | "lg";

type CommonButtonProps = {
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & CommonButtonProps & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & CommonButtonProps & { href: string });

const Button = ({ className = "", size = "default", children, href, ...props }: ButtonProps) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  if (typeof href === "string") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} href={href} {...anchorProps}>
        <span className="relative flex items-center justify-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;