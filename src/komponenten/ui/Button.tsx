import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// Typdefinitionen für den Premium-Button
export interface ButtonEigenschaften extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap" | "children"> {
  children?: React.ReactNode;
  variante?: "primär" | "sekundär" | "umriss" | "geist" | "highlight";
  größe?: "klein" | "mittel" | "groß";
  icon?: LucideIcon;
  iconPosition?: "links" | "rechts";
  laden?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonEigenschaften>(
  (
    {
      children,
      className = "",
      variante = "primär",
      größe = "mittel",
      icon: Icon,
      iconPosition = "links",
      laden = false,
      disabled,
      ...restlicheEigenschaften
    },
    ref
  ) => {
    // Basis-Klassen für Styling
    const basisKlassen =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-marke-primaer/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    // Varianten-Klassen
    const variantenKlassen = {
      primär: "bg-marke-primaer text-white hover:bg-marke-primaer-hover shadow-md hover:shadow-lg shadow-marke-primaer/20",
      sekundär: "bg-[#0a1930] text-white hover:bg-[#0f2444] shadow-sm",
      umriss: "border border-gray-300 bg-white/50 backdrop-blur-sm text-[#0a1930] hover:bg-gray-50 hover:border-gray-400",
      geist: "text-[#0a1930] hover:bg-gray-100/80",
      highlight:
        "bg-gradient-to-r from-marke-primaer to-[#4f46e5] text-white hover:shadow-lg shadow-indigo-500/20 hover:from-marke-primaer-hover hover:to-[#4338ca]",
    };

    // Größen-Klassen
    const größenKlassen = {
      klein: "px-4 py-1.5 text-xs gap-1.5",
      mittel: "px-6 py-2.5 text-sm gap-2",
      groß: "px-8 py-3.5 text-base gap-2.5",
    };

    const istDeaktiviert = disabled || laden;

    return (
      <motion.button
        ref={ref}
        disabled={istDeaktiviert}
        whileHover={{ y: istDeaktiviert ? 0 : -2 }}
        whileTap={{ scale: istDeaktiviert ? 1 : 0.98 }}
        className={`${basisKlassen} ${variantenKlassen[variante]} ${größenKlassen[größe]} ${className}`}
        {...restlicheEigenschaften}
      >
        {/* Ladeindikator */}
        {laden && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {/* Icon links */}
        {!laden && Icon && iconPosition === "links" && (
          <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        )}

        {/* Textinhalt */}
        <span>{children}</span>

        {/* Icon rechts */}
        {!laden && Icon && iconPosition === "rechts" && (
          <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
