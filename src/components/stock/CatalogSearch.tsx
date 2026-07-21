import './CatalogSearch.css'

interface CatalogSearchProps {
  query: string
  selectedPath: string[]
  /** tierOptions[0] = top categories; tierOptions[n] = children under selectedPath[0..n-1] */
  tierOptions: string[][]
  resultCount: number
  onQueryChange: (query: string) => void
  onPathChange: (path: string[]) => void
}

export function CatalogSearch({
  query,
  selectedPath,
  tierOptions,
  resultCount,
  onQueryChange,
  onPathChange,
}: CatalogSearchProps) {
  const tops = tierOptions[0] ?? []

  return (
    <div className="catalog-search">
      <label className="catalog-search__field">
        <span className="label">Search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Product name…"
          autoComplete="off"
          spellCheck={false}
        />
      </label>

      <div className="stocklist-filters" role="tablist" aria-label="Filter by category">
        <button
          type="button"
          role="tab"
          aria-selected={selectedPath.length === 0}
          className={`stocklist-filter${selectedPath.length === 0 ? ' stocklist-filter--active' : ''}`}
          onClick={() => onPathChange([])}
        >
          All
        </button>
        {tops.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedPath[0] === cat}
            className={`stocklist-filter${selectedPath[0] === cat ? ' stocklist-filter--active' : ''}`}
            onClick={() => onPathChange([cat])}
          >
            {cat}
          </button>
        ))}
      </div>

      {tierOptions.slice(1).map((options, index) => {
        const level = index + 1
        if (options.length === 0 || selectedPath.length < level) return null
        const parentPath = selectedPath.slice(0, level)
        const parentLabel = parentPath[parentPath.length - 1]
        const selectedChild = selectedPath[level]
        return (
          <div
            key={parentPath.join('\0')}
            className="stocklist-filters stocklist-filters--sub"
            role="tablist"
            aria-label={`Subcategories in ${parentLabel}`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={!selectedChild}
              className={`stocklist-filter${!selectedChild ? ' stocklist-filter--active' : ''}`}
              onClick={() => onPathChange(parentPath)}
            >
              All {parentLabel}
            </button>
            {options.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedChild === cat}
                className={`stocklist-filter${selectedChild === cat ? ' stocklist-filter--active' : ''}`}
                onClick={() => onPathChange([...parentPath, cat])}
              >
                {cat}
              </button>
            ))}
          </div>
        )
      })}

      <p className="catalog-search__count label" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'item' : 'items'}
        {selectedPath.length > 0 ? ` in ${selectedPath.join(' · ')}` : ''}
      </p>
    </div>
  )
}
