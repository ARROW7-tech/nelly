import "./cart.css";

function Cart({
  isOpen,
  onClose,
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>

      <aside className="cart-drawer">
        <div className="cart-header">
          <div>
            <span className="cart-label">YOUR SELECTION</span>
            <h2>Shopping Cart</h2>
          </div>

          <button className="cart-close" onClick={onClose}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍</div>

            <h3>Your cart is empty</h3>

            <p>
              Discover our premium hair collection and add something
              beautiful to your cart.
            </p>

            <button className="continue-shopping" onClick={onClose}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <span>{item.category}</span>

                    <h3>{item.name}</h3>

                    <strong>
                      ₦{item.price.toLocaleString()}
                    </strong>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          onClick={() => onDecrease(item.id)}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => onIncrease(item.id)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => onRemove(item.id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>SUBTOTAL</span>

                <strong>
                  ₦{subtotal.toLocaleString()}
                </strong>
              </div>

              <p className="cart-note">
                Delivery charges are calculated at checkout.
              </p>

              <button
                className="whatsapp-checkout"
                onClick={onCheckout}
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                className="continue-shopping"
                onClick={onClose}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;