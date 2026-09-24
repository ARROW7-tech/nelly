import { useState } from "react";
import "./Checkout.css";

function Checkout({ cartItems, onBackToCart, onOrderComplete }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    delivery: "Standard Delivery",
  });

  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee =
    form.delivery === "Express Delivery" ? 7000 : 3500;

  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let message = `Hello Hair by Nelly, I would like to place an order.%0A%0A`;

    message += `CUSTOMER DETAILS%0A`;
    message += `Name: ${form.fullName}%0A`;
    message += `Phone: ${form.phone}%0A`;
    message += `Email: ${form.email}%0A%0A`;

    message += `DELIVERY DETAILS%0A`;
    message += `Address: ${form.address}%0A`;
    message += `City: ${form.city}%0A`;
    message += `State: ${form.state}%0A`;
    message += `Delivery: ${form.delivery}%0A%0A`;

    message += `ORDER ITEMS%0A`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}%0A`;
      message += `Quantity: ${item.quantity}%0A`;
      message += `Price: ₦${item.price.toLocaleString()}%0A`;
      message += `Subtotal: ₦${(
        item.price * item.quantity
      ).toLocaleString()}%0A%0A`;
    });

    message += `Subtotal: ₦${subtotal.toLocaleString()}%0A`;
    message += `Delivery: ₦${deliveryFee.toLocaleString()}%0A`;
    message += `TOTAL: ₦${total.toLocaleString()}%0A%0A`;

    message += `Please confirm availability and payment details.`;

    setSubmitted(true);

    window.open(
      `https://wa.me/2347014580884?text=${message}`,
      "_blank"
    );

    if (onOrderComplete) {
      onOrderComplete();
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <span>🛍</span>

          <h1>Your cart is empty</h1>

          <p>
            Add some beautiful hair pieces before
            proceeding to checkout.
          </p>

          <button
            onClick={onBackToCart}
            className="checkout-back-button"
          >
            BACK TO SHOP
          </button>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>

          <p className="checkout-label">
            ORDER STARTED
          </p>

          <h1>Thank You!</h1>

          <p>
            Your order details have been prepared for
            WhatsApp. Please complete the conversation
            with Hair by Nelly to confirm your order.
          </p>

          <button
            className="checkout-back-button"
            onClick={onBackToCart}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-top">
          <div>
            <p className="checkout-label">
              HAIR BY NELLY
            </p>

            <h1>Checkout</h1>

            <p>
              Complete your details to place your
              order.
            </p>
          </div>

          <button
            className="checkout-return"
            onClick={onBackToCart}
          >
            ← BACK TO CART
          </button>
        </div>

        <div className="checkout-layout">

          {/* FORM */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <div className="checkout-card">
              <div className="checkout-card-title">
                <span>01</span>

                <div>
                  <h2>Customer Information</h2>
                  <p>
                    Tell us how we can reach you.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group full">
                  <label>
                    FULL NAME *
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    PHONE NUMBER *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>

              </div>
            </div>

            <div className="checkout-card">

              <div className="checkout-card-title">
                <span>02</span>

                <div>
                  <h2>Delivery Information</h2>

                  <p>
                    Where should we deliver your
                    order?
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group full">
                  <label>
                    DELIVERY ADDRESS *
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street name, area..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    CITY *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lagos"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    STATE *
                  </label>

                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select state
                    </option>

                    <option value="Abia">
                      Abia
                    </option>

                    <option value="Abuja">
                      Abuja FCT
                    </option>

                    <option value="Adamawa">
                      Adamawa
                    </option>

                    <option value="Akwa Ibom">
                      Akwa Ibom
                    </option>

                    <option value="Anambra">
                      Anambra
                    </option>

                    <option value="Bauchi">
                      Bauchi
                    </option>

                    <option value="Bayelsa">
                      Bayelsa
                    </option>

                    <option value="Benue">
                      Benue
                    </option>

                    <option value="Borno">
                      Borno
                    </option>

                    <option value="Cross River">
                      Cross River
                    </option>

                    <option value="Delta">
                      Delta
                    </option>

                    <option value="Ebonyi">
                      Ebonyi
                    </option>

                    <option value="Edo">
                      Edo
                    </option>

                    <option value="Ekiti">
                      Ekiti
                    </option>

                    <option value="Enugu">
                      Enugu
                    </option>

                    <option value="Gombe">
                      Gombe
                    </option>

                    <option value="Imo">
                      Imo
                    </option>

                    <option value="Jigawa">
                      Jigawa
                    </option>

                    <option value="Kaduna">
                      Kaduna
                    </option>

                    <option value="Kano">
                      Kano
                    </option>

                    <option value="Katsina">
                      Katsina
                    </option>

                    <option value="Kebbi">
                      Kebbi
                    </option>

                    <option value="Kogi">
                      Kogi
                    </option>

                    <option value="Kwara">
                      Kwara
                    </option>

                    <option value="Lagos">
                      Lagos
                    </option>

                    <option value="Nasarawa">
                      Nasarawa
                    </option>

                    <option value="Niger">
                      Niger
                    </option>

                    <option value="Ogun">
                      Ogun
                    </option>

                    <option value="Ondo">
                      Ondo
                    </option>

                    <option value="Osun">
                      Osun
                    </option>

                    <option value="Oyo">
                      Oyo
                    </option>

                    <option value="Plateau">
                      Plateau
                    </option>

                    <option value="Rivers">
                      Rivers
                    </option>

                    <option value="Sokoto">
                      Sokoto
                    </option>

                    <option value="Taraba">
                      Taraba
                    </option>

                    <option value="Yobe">
                      Yobe
                    </option>

                    <option value="Zamfara">
                      Zamfara
                    </option>
                  </select>
                </div>

              </div>
            </div>

            <div className="checkout-card">

              <div className="checkout-card-title">
                <span>03</span>

                <div>
                  <h2>Delivery Method</h2>

                  <p>
                    Choose how you would like to
                    receive your order.
                  </p>
                </div>
              </div>

              <div className="delivery-options">

                <label
                  className={
                    form.delivery ===
                    "Standard Delivery"
                      ? "delivery-option active"
                      : "delivery-option"
                  }
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="Standard Delivery"
                    checked={
                      form.delivery ===
                      "Standard Delivery"
                    }
                    onChange={handleChange}
                  />

                  <div>
                    <strong>
                      Standard Delivery
                    </strong>

                    <span>
                      Nationwide delivery
                    </span>
                  </div>

                  <b>₦3,500</b>
                </label>

                <label
                  className={
                    form.delivery ===
                    "Express Delivery"
                      ? "delivery-option active"
                      : "delivery-option"
                  }
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="Express Delivery"
                    checked={
                      form.delivery ===
                      "Express Delivery"
                    }
                    onChange={handleChange}
                  />

                  <div>
                    <strong>
                      Express Delivery
                    </strong>

                    <span>
                      Faster delivery option
                    </span>
                  </div>

                  <b>₦7,000</b>
                </label>

              </div>
            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              PLACE ORDER ON WHATSAPP →
            </button>
          </form>

          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <div className="summary-heading">
              <p>YOUR ORDER</p>

              <h2>Order Summary</h2>
            </div>

            <div className="checkout-products">
              {cartItems.map((item) => (
                <div
                  className="checkout-product"
                  key={item.id}
                >
                  <div className="checkout-product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>
                      {item.quantity}
                    </span>
                  </div>

                  <div>
                    <h3>{item.name}</h3>

                    <small>
                      {item.category}
                    </small>

                    <strong>
                      ₦
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-lines">

              <div>
                <span>Subtotal</span>

                <strong>
                  ₦{subtotal.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Delivery</span>

                <strong>
                  ₦{deliveryFee.toLocaleString()}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  ₦{total.toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="secure-note">
              <span>✓</span>

              <p>
                Your order will be sent securely
                through WhatsApp for confirmation
                and payment instructions.
              </p>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}

export default Checkout;