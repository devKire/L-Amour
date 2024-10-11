import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";
import { fetchProducts } from "../firebase-config"; 

const ProductList = ({ products, onProductClick }) => (
  <div className="products-list">
    {products.map((product) => {
      const originalPrice = Number(product.price);
      const salePercentage = product.sale ? parseFloat(product.sale) : 0; 
      const discountedPrice =
        salePercentage > 0
          ? originalPrice * (1 - salePercentage / 100)
          : originalPrice;

      return (
        <div
          key={product.id}
          className="product-item"
          onClick={() => onProductClick(product)}
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>R${originalPrice.toFixed(2)}{salePercentage > 0 && <> Para R$ {discountedPrice.toFixed(2)}</>}</p>
          <button className="button primary">DETALHES</button>
        </div>
      );
    })}
  </div>
);

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
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadProducts = async () => {
      const productsList = await fetchProducts(); 
      setProducts(productsList);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.price.replace("R$", ""));
    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(product.type);
    const matchesSubcategory =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategory);

    const matchesPrice =
      (!minPrice || productPrice >= parseFloat(minPrice)) &&
      (!maxPrice || productPrice <= parseFloat(maxPrice));
    const matchesStock = !inStockOnly || (inStockOnly && product.inStock > 0);
    const matchesSale = !onSaleOnly || (onSaleOnly && product.onSale);

    return (
      matchesSearch &&
      matchesType &&
      matchesSubcategory &&
      matchesPrice &&
      matchesStock &&
      matchesSale
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      comparison =
        parseFloat(a.price.replace("R$", "")) -
        parseFloat(b.price.replace("R$", ""));
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const types = [...new Set(products.map((product) => product.type))];

  const subcategories = activeCategory
    ? [
        ...new Set(
          products
            .filter((product) => product.type === activeCategory)
            .map((product) => product.subcategory)
        ),
      ]
    : [];

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
      setActiveCategory(type);
    }
  };

  const toggleSubcategory = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTypes([]);
    setSelectedSubcategories([]);
    setActiveCategory("");
    setSortBy("name");
    setSortOrder("asc");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setOnSaleOnly(false);

  };

  const handleInStockChange = (e) => {
    setInStockOnly(e.target.checked);
  };

  const handleOnSaleChange = (e) => {
    setOnSaleOnly(e.target.checked);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Header />
      <main className="shop-content">
        <div className="filter-container">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="toggle-filters"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtros {showFilters ? "▲" : "▼"} 
          </button>
          {showFilters && (
            <>
              <div className="stock-filter">
                <input
                  type="checkbox"
                  id="in-stock"
                  className="custom-checkbox"
                  checked={inStockOnly}
                  onChange={handleInStockChange}
                />
                <label htmlFor="in-stock">Somente produtos em estoque</label>
              </div>

              <div className="sale-filter">
                <input
                  type="checkbox"
                  id="on-sale"
                  className="custom-checkbox"
                  checked={onSaleOnly}
                  onChange={handleOnSaleChange}
                />
                <label htmlFor="on-sale">Somente produtos em promoção</label>
              </div>

              <div className="sorting-filter">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="price">Ordenar pelo preço</option>
                  <option value="name">Ordem alfabética</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc"
                    ? "Maior para o Menor"
                    : "Menor para o Maior"}
                </button>
              </div>
              <div className="category-filter">
                <select
                  value={activeCategory}
                  onChange={(e) => toggleType(e.target.value)}
                  className="category-select"
                >
                  <option value="">Selecione uma Categoria</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {activeCategory && subcategories.length > 0 && (
                  <ul className="subcategory-dropdown">
                    {subcategories.map((sub) => (
                      <li key={sub} className="subcategory-item">
                        <input
                          type="checkbox"
                          id={`subcategory-${sub}`} 
                          className="custom-checkbox" 
                          checked={selectedSubcategories.includes(sub)}
                          onChange={() => toggleSubcategory(sub)}
                        />
                        <label htmlFor={`subcategory-${sub}`}>{sub}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="price-filter">
                <label htmlFor="min-price">Preço Mínimo:</label>
                <input
                  type="number"
                  id="min-price"
                  placeholder="R$"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />

                <label htmlFor="max-price">Preço Máximo:</label>
                <input
                  type="number"
                  id="max-price"
                  placeholder="R$"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <button className="reset-button" onClick={resetFilters}>
                Reset Filters
              </button>
            </>
          )}
        </div>

        {/* Passando a função handleProductClick para o ProductList */}
        <ProductList
          products={sortedProducts}
          onProductClick={handleProductClick}
        />

        {/* Modal para mostrar detalhes do produto */}
        <ProductModal
          show={showModal}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </main>
    </>
  );
}

export default ShopPage;
