
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }

    onClose();
  };

  const handleWhatsApp = () => {
    const message = `
Hello Hair by Nelly, I am interested in this product:

Product: ${product.name}
Category: ${product.category}
Quantity: ${quantity}
Price: ₦${product.price.toLocaleString()}
Total: ₦${(
      product.price * quantity
    ).toLocaleString()}

Please provide more information about availability and delivery.
`;

    window.open(
      `https://wa.me/2347014580884?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="product-modal">
      <div
        className="product-modal-overlay"
        onClick={onClose}
      />

      <div className="product-details">
        <button
          className="product-close"
          onClick={onClose}
          type="button"
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />

          <span className="product-badge">
            PREMIUM
          </span>
        </div>

        <div className="product-details-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            <span>★★★★★</span>
            <small> Premium Collection</small>
          </div>

          <div className="product-price">
            ₦{product.price.toLocaleString()}
          </div>

          <p className="product-description">
            {product.description ||
              "Experience premium quality and effortless beauty with this carefully selected Hair by Nelly piece."}
          </p>

          <div className="product-features">
            <div>
              <strong>QUALITY</strong>
              <span>Premium Selection</span>
            </div>

            <div>
              <strong>STYLE</strong>
              <span>{product.category}</span>
            </div>

            <div>
              <strong>DELIVERY</strong>
              <span>Available Nationwide</span>
            </div>
          </div>

          <div className="quantity-section">
            <span>QUANTITY</span>

            <div className="product-quantity">
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <strong>{quantity}</strong>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button
              className="product-add"
              onClick={handleAddToCart}
              type="button"
            >
              ADD TO CART
            </button>

            <button
              className="product-whatsapp"
              onClick={handleWhatsApp}
              type="button"
            >
              ORDER ON WHATSAPP
            </button>
          </div>

          <div className="product-note">
            <span>✓</span>
            Need help choosing? Chat with Hair by Nelly
            on WhatsApp.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;