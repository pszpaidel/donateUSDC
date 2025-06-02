export const SearchInput = () => (
  <div className="search">
    <div className="content-area">
      <form className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Enter your search query..."
            id="searchInput"
          />
          <button type="button" className="clear-button" id="clearButton" title="Clear search">
            ✕
          </button>
        </div>
      </form>
    </div>
  </div>
);
