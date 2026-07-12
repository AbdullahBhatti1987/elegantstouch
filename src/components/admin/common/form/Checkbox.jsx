export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4"
      />

      <span className="text-gray-700 dark:text-gray-200">
        {label}
      </span>

    </label>
  );
}