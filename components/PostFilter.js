const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'ai', label: 'AI' },
  { id: 'salesforce', label: 'Salesforce' },
  { id: 'builds', label: 'Builds' },
  { id: 'random', label: 'Random' },
];

export default function PostFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="mb-8">
      {/* Desktop: centered flex */}
      <div className="hidden md:flex justify-center gap-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`text-sm transition-colors duration-200 ${
              activeCategory === category.id
                ? 'text-white border-b border-white pb-1'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-6 px-6 pb-2" style={{ minWidth: 'max-content' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`text-sm whitespace-nowrap transition-colors duration-200 ${
                activeCategory === category.id
                  ? 'text-white border-b border-white pb-1'
                  : 'text-gray-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}