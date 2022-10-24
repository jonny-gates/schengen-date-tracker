import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classnames from "classnames";

interface InputProps {
  name: string;
  label: string;
  id?: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  type?: "text" | "date" | "email";
  description?: string;
  error?: string;
}

export default function Input({
  name,
  label,
  id,
  value,
  onChange,
  onBlur,
  type = "text",
  description,
  error,
}: InputProps) {
  const classes = classnames(
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    {
      "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500":
        !!error,
    }
  );
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={classes}
          aria-invalid={!!error}
          aria-describedby={name + "-error"}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={name + "-error"}>
          {error}
        </p>
      )}
      {description && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {description}
        </p>
      )}
    </div>
  );
}
