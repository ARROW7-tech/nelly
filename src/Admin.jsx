import { useState } from "react";
import "./Admin.css";

const emptyForm = {
  name: "",
  price: "",
  category: "Wigs",
  image: "",
  description: "",
};

function Admin({ products, onAddProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddProduct({
      id: Date.now(),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
      description: form.description.trim(),
    });

    setForm(emptyForm);
    setMessage("Product added to the shop.");
  };

  return (
    <section className="admin-section" id="admin">
      <div className="admin-header">
        <p className="section-label">ADMIN AREA</p>
        <h2>Add a Product</h2>
        <span>Manage the products shown in your shop.</span>
      </div>

      <div className="admin-layout">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            PRODUCT NAME
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Luxury Body Wave Wig"
              required
            />
          </label>

          <div className="admin-form-row">
            <label>
              PRICE (NGN)
              <input
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={handleChange}
                placeholder="150000"
                required
              />
            </label>

            <label>
              CATEGORY
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Wigs</option>
                <option>Bundles</option>
                <option>Frontals</option>
              </select>
            </label>
          </div>

          <label>
            IMAGE URL
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/product-image.jpg"
              required
            />
          </label>

          <label>
            DESCRIPTION
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the product"
              rows="4"
              required
            />
          </label>

          <button className="admin-submit" type="submit">
            ADD PRODUCT
          </button>

          {message && <p className="admin-message">{message}</p>}
        </form>

        <div className="admin-summary">
          <span className="section-label">CURRENT CATALOG</span>
          <strong>{products.length}</strong>
          <p>products are currently displayed in the shop.</p>
        </div>
      </div>
    </section>
  );
}

export default Admin;
