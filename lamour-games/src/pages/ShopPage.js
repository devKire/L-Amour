import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ProductList = ({ products }) => (
  <div className="products-list">
    {products.map(product => (
      <div key={product.id} className="product-item">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>R${product.price}</p>
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
  const [products, setProducts] = useState([]); // Inicializar como um array vazio
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch products from Firestore on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products"); // Nome da coleção
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id, // A ID do documento
        ...doc.data(), // Os dados do documento
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []); // Dependência vazia para rodar apenas uma vez ao montar

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
    setSortBy("name");
    setSortOrder("asc");
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
              <option value="">Select a category</option>
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
