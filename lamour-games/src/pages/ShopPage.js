import React, { useState } from "react";
import Header from "../components/Header";

// Sample product data (or fetch from API)
const initialProducts = [
  { id: 1, name: "Gift Card Play Store", type: "GiftCard", subcategory: "Google Play", image: "url_do_gif", price: "$2.99" },
  { id: 2, name: "Game 1", type: "Game", subcategory: "Ação", image: "url_do_jogo", price: "$29.99" },
  { id: 3, name: "Gamepass", type: "Subscription", subcategory: "Xbox", image: "https://cdn.sistemawbuy.com.br/arquivos/b7f36453f415a540dffee82d02b0ae0c/produtos/6468c308af8ff/gamepass-ultimate-6468c3095ca29.jpg", price: "$9.99" },
  { id: 4, name: "Spotify Premium", type: "Subscription", subcategory: "Música", image: "https://products.eneba.games/resized-products/sQhfdOKr8vNAQVGQD9WITrefNUszi4Ajkb1NPl0MTkg_1920x1080_1x-0.jpeg", price: "$29.99" },
  { id: 5, name: "PlayPlus", type: "Subscription", subcategory: "Streaming", image: "url_da_assinatura", price: "$829.99" },
  { id: 6, name: "Gift Card Steam", type: "GiftCard", subcategory: "Steam", image: "url_do_gif", price: "$9929.99" },
  { id: 7, name: "Game 2", type: "Game", subcategory: "RPG", image: "url_do_jogo", price: "$29.99" },
  { id: 8, name: "Playstation Plus", type: "Subscription", subcategory: "Playstation", image: "url_da_assinatura", price: "$289.99" },
  { id: 9, name: "Netflix", type: "Subscription", subcategory: "Streaming", image: "url_da_assinatura", price: "$29.99" },
  { id: 10, name: "Youtube Music Premium", type: "Subscription", subcategory: "Música", image: "url_da_assinatura", price: "$9.99" },
];

const ProductList = ({ products }) => (
  <div className="products-list">
    {products.map(product => (
      <div key={product.id} className="product-item">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    ))}
  </div>
);

// Debounce function to limit the frequency of a function call
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function ShopPage() {
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("name"); // Add state for sorting
  const [sortOrder, setSortOrder] = useState("asc"); // Add state for sorting order

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce

  // Derived state for filtering
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory);
    
    return matchesSearch && matchesType && matchesSubcategory;
  });

  // Sort filtered products based on the selected criteria and order
  const sortedProducts = filteredProducts.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      comparison = parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Unique types and subcategories
  const types = [...new Set(products.map(product => product.type))];

  // Filter subcategories based on the active category
  const subcategories = activeCategory
    ? [...new Set(products.filter(product => product.type === activeCategory).map(product => product.subcategory))]
    : [];

  // Toggle selected types
  const toggleType = (type) => {
    if (activeCategory === type) {
      setActiveCategory(null);
      setSelectedTypes([]);
    } else {
      setActiveCategory(type);
      setSelectedTypes([type]);
      setSelectedSubcategories([]);
    }
  };

  // Toggle selected subcategory (only one at a time)
  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories([subcategory]);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTypes([]);
    setSelectedSubcategories([]);
    setActiveCategory(null);
    setSortBy("name"); // Reset sorting to default
    setSortOrder("asc"); // Reset sorting order to ascending
  };

  return (
    <>
      <Header />
      <main className="shop-content">
        <div className="filter-container">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sorting-filter">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
            </button>
          </div>
          <div className="category-filter">
            <select 
              value={activeCategory} 
              onChange={(e) => toggleType(e.target.value)} 
              className="category-select"
            >
              <option value="">Select a category</option> {/* Placeholder for dropdown */}
              {types.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
  
            {activeCategory && subcategories.length > 0 && (
              <ul className="subcategory-dropdown">
                {subcategories.map(sub => (
                  <li key={sub}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() => toggleSubcategory(sub)}
                      />
                      {sub}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        </div>
  
        <ProductList products={sortedProducts} />
      </main>
    </>
  );
}
export default ShopPage;
