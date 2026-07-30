export default function SectionHeader({
  icon: Icon,
  title,
  description,
  iconSize = 45,
  align = 'left',
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-4 ${
        align === 'center'
          ? 'justify-center text-center'
          : 'justify-start text-left'
      }`}
    >
      {Icon && (
        <div className="bg-primary/10 flex shrink-0 items-center justify-center rounded-xl p-3">
          <Icon
            size={iconSize}
            strokeWidth={1.8}
            className="text-primary"
          />
        </div>
      )}

      <div className="mb-4 shrink-0">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500 md:text-base dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
