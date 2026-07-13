export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  required,
  loading,
  error = '',
  className = '',
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={loading}
        required={required}
        className={`w-full rounded-lg border p-3 outline-none focus:border-black dark:bg-gray-800 dark:text-white ${className}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
