import './CatalogSearch.css'

interface CatalogSearchProps {
  query: string
  category: string
  categories: string[]
  resultCount: number
  onQueryChange: (query: string) => void
  onCategoryChange: (category: string) => void
}

export function CatalogSearch({
  query,
  category,
  categories,
  resultCount,
  onQueryChange,
  onCategoryChange,
}: CatalogSearchProps) {
  return (
    <div className="catalog-search">
      <div className="catalog-search__fields">
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
        <label className="catalog-search__field catalog-search__field--category">
          <span className="label">Category</span>
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="catalog-search__count label" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'item' : 'items'}
      </p>
    </div>
  )
}
