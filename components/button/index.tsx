interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "error";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  type = "button",
  variant = "primary",
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const classes = {
    primary:
      "inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm",
    secondary:
      "mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm",
    error:
      "inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm",
  };

  return (
    <button
      type={type}
      className={classes[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
