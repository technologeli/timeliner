const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="rounded border px-2 py-2 transition hover:shadow-lg"
    >
      {children}
    </button>
  );
};

export default Button;
