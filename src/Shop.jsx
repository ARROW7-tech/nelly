import { useState } from "react";
import "./Shop.css";
function Shop({ products: catalog, onAddToCart, onViewProduct }) {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Wigs",
    "Bundles",
    "Frontals",
  ];

  const filteredProducts =
    category === "All"
      ? catalog
      : catalog.filter(
          (product) => product.category === category
        );

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleViewProduct = (product) => {
    onViewProduct(product);
  };

  return (
    <section className="shop-page" id="shop">
      <div className="shop-header">
        <p>HAIR BY NELLY</p>

        <h1>Shop Our Hair</h1>

        <span>
          Discover premium hair collections selected to elevate
          your beauty, confidence and personal style.
        </span>
      </div>

      <div className="shop-content">

        {/* CATEGORY FILTER */}

        <div className="category-filter">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}

        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <article
              className="shop-product"
              key={product.id}
            >
              <div className="shop-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                  width="900"
                  height="1100"
                  loading="lazy"
                />

                <div className="shop-product-actions">

                  <button
                    type="button"
                    className="shop-view"
                    onClick={() =>
                      handleViewProduct(product)
                    }
                  >
                    VIEW DETAILS
                  </button>

                  <button
                    type="button"
                    className="shop-add"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    ADD TO CART
                  </button>

                </div>

                <span className="shop-product-badge">
                  PREMIUM
                </span>
              </div>

              <div className="shop-product-info">

                <small>{product.category}</small>

                <h2>{product.name}</h2>

                <strong>
                  ₦{product.price.toLocaleString()}
                </strong>

              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>
              Please select another category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Shop;