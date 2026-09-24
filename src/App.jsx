
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

import Admin from "./Admin";
import Shop from "./Shop";
import bundlesImage from "./assets/bundles.jpg";
import frontImage from "./assets/front.jpg";
import fronterImage from "./assets/fronter.jpg";
import nellyImage from "./assets/nelly.jpg";
import wigImage from "./assets/wig.jpg";
import initialProducts from "./products";

const Cart = lazy(() => import("./cart"));
const Checkout = lazy(() => import("./Checkout"));
const ProductDetails = lazy(() => import("./ProductDetails"));

const readStoredCart = () => {
  try {
    const storedCart = window.localStorage.getItem("nelly-cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

function App() {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    window.localStorage.setItem("nelly-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* =========================
     CART
  ========================= */

  const addProductToCart = (product) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* =========================
     CHECKOUT
  ========================= */

  const goToCheckout = () => {
    if (cartItems.length === 0) return;

    setCartOpen(false);
    setCheckoutOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openCart = () => {
    setCheckoutOpen(false);
    setCartOpen(true);
  };

  /* =========================
     CHECKOUT PAGE
  ========================= */

  if (checkoutOpen) {
    return (
      <Suspense fallback={<div className="page-loading">Loading checkout...</div>}>
        <Checkout
          cartItems={cartItems}
          onBackToCart={openCart}
          onOrderComplete={() => {
            setCartItems([]);
          }}
        />

        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
          onCheckout={goToCheckout}
        />
      </Suspense>
    );
  }

  return (
    <div className="app">

      {/* =========================
          ANNOUNCEMENT
      ========================= */}

      <div className="announcement-bar">
        <span>
          PREMIUM HAIR • CUSTOM WIGS • NATIONWIDE DELIVERY
        </span>
      </div>


      {/* =========================
          HEADER
      ========================= */}

      <header className="header">
        <div className="header-inner">

          <a href="#home" className="logo">
            <span className="logo-main">
              HAIR BY NELLY
            </span>

            <span className="logo-sub">
              LUXURY HAIR COLLECTION
            </span>
          </a>

          <nav className="nav">
            <a href="#home">HOME</a>
            <a href="#shop">SHOP</a>
            <a href="#admin">ADMIN</a>
            <a href="#services">SERVICES</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
            <a href="#faq">FAQ</a>
          </nav>

          <button
            className="header-cart"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <span className="cart-icon">
              🛍
            </span>

            <span>BAG</span>

            {cartCount > 0 && (
              <b className="cart-count">
                {cartCount}
              </b>
            )}
          </button>

        </div>
      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main>

        {/* =========================
            HERO
        ========================= */}

        <section className="hero" id="home">

          <div className="hero-image">
            <img
              src={frontImage}
              alt="Hair by Nelly frontal collection"
              width="1200"
              height="800"
              fetchPriority="high"
            />
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">

            <p className="hero-eyebrow">
              PREMIUM HAIR • BEAUTY • CONFIDENCE
            </p>

            <h1>
              Hair That Makes
              <br />
              <em>You Feel Beautiful.</em>
            </h1>

            <p className="hero-description">
              Discover premium wigs, extensions and
              custom hair solutions created for women
              who love to stand out.
            </p>

            <div className="hero-buttons">

              <a
                href="#shop"
                className="hero-primary"
              >
                SHOP COLLECTION
              </a>

              <a
                href="#services"
                className="hero-secondary"
              >
                OUR SERVICES
              </a>

            </div>

          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>

        </section>


        {/* =========================
            INTRO
        ========================= */}

        <section className="intro-section">

          <div className="intro-left">

            <p className="section-label">
              WELCOME TO HAIR BY NELLY
            </p>

            <h2>
              Your Beauty.
              <br />
              Your Confidence.
              <br />
              <em>Your Hair.</em>
            </h2>

          </div>

          <div className="intro-right">

            <p>
              Hair by Nelly is a premium hair brand
              dedicated to helping women discover
              beautiful, confident and effortless looks.
            </p>

            <p>
              From luxury wigs and quality extensions
              to professional installations and
              customization, every detail is handled
              with care.
            </p>

            <a
              href="#about"
              className="text-link"
            >
              DISCOVER OUR STORY →
            </a>

          </div>

        </section>


        {/* =========================
            FEATURED COLLECTIONS
        ========================= */}

        <section className="collections-section">

          <div className="section-heading">

            <p>
              EXPLORE OUR COLLECTION
            </p>

            <h2>
              Find Your Signature Look
            </h2>

          </div>

          <div className="collections-grid">

            <a
              href="#shop"
              className="collection-card collection-large"
            >
              <img
                src={wigImage}
                alt="Luxury Wigs"
                width="1000"
                height="800"
                loading="lazy"
              />

              <div className="collection-overlay" />

              <div className="collection-content">
                <span>01</span>
                <h3>Luxury Wigs</h3>
                <p>SHOP NOW →</p>
              </div>
            </a>


            <a
              href="#shop"
              className="collection-card"
            >
              <img
                src={bundlesImage}
                alt="Hair Bundles"
                width="900"
                height="800"
                loading="lazy"
              />

              <div className="collection-overlay" />

              <div className="collection-content">
                <span>02</span>
                <h3>Hair Bundles</h3>
                <p>SHOP NOW →</p>
              </div>
            </a>


            <a
              href="#shop"
              className="collection-card"
            >
              <img
                src={fronterImage}
                alt="HD Lace"
                width="900"
                height="800"
                loading="lazy"
              />

              <div className="collection-overlay" />

              <div className="collection-content">
                <span>03</span>
                <h3>HD Lace</h3>
                <p>SHOP NOW →</p>
              </div>
            </a>

          </div>

        </section>


        {/* =========================
            SERVICES
        ========================= */}

        <section
          className="services-section"
          id="services"
        >

          <div className="services-heading">

            <p>HAIR BY NELLY</p>

            <h2>
              Services & Collections
            </h2>

            <span>
              From custom installations to premium
              hair collections, everything you need
              for your perfect look.
            </span>

          </div>


          {/* PROFESSIONAL SERVICES */}

          <div className="services-subheading">

            <span>01</span>

            <div>
              <p>PROFESSIONAL SERVICES</p>

              <h3>
                Beauty & Hair Services
              </h3>
            </div>

          </div>


          <div className="services-grid">

            <div className="service-card">
              <span className="service-number">01</span>
              <div className="service-icon">✦</div>

              <h3>Frontal Install</h3>

              <p>
                Professional frontal installation
                for a seamless and natural-looking
                finish.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">02</span>
              <div className="service-icon">✦</div>

              <h3>Closure Install</h3>

              <p>
                Neat and secure closure installation
                designed for a beautiful natural finish.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">03</span>
              <div className="service-icon">✦</div>

              <h3>Wig Making</h3>

              <p>
                Custom-made wigs created to complement
                your style, personality and preference.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">04</span>
              <div className="service-icon">✦</div>

              <h3>Bone Straight</h3>

              <p>
                Sleek, silky and polished styling for
                an effortlessly luxurious appearance.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">05</span>
              <div className="service-icon">✦</div>

              <h3>Curls & Waves</h3>

              <p>
                Beautiful curls and waves designed
                to add volume, movement and glamour.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">06</span>
              <div className="service-icon">✦</div>

              <h3>Hair Coloring</h3>

              <p>
                Professional hair coloring tailored
                to achieve your desired shade and style.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">07</span>
              <div className="service-icon">✦</div>

              <h3>Lace Customization</h3>

              <p>
                Detailed lace customization for a more
                natural and undetectable appearance.
              </p>
            </div>


            <div className="service-card">
              <span className="service-number">08</span>
              <div className="service-icon">✦</div>

              <h3>Hair Revamp</h3>

              <p>
                Restore and transform your favourite
                hair pieces with professional care.
              </p>
            </div>

          </div>


          {/* COLLECTIONS */}

          <div className="services-subheading collections-subheading">

            <span>02</span>

            <div>
              <p>HAIR COLLECTION</p>

              <h3>
                Shop Our Collections
              </h3>
            </div>

          </div>


          <div className="hair-collection-banner">

            <div className="collection-track">

              <span>Wigs</span>
              <i>✦</i>

              <span>Frontal Units</span>
              <i>✦</i>

              <span>Closures</span>
              <i>✦</i>

              <span>Bundles</span>
              <i>✦</i>

              <span>Ponytails</span>
              <i>✦</i>

              <span>Custom Wigs</span>
              <i>✦</i>

              <span>HD Lace</span>
              <i>✦</i>

              <span>Hair Maintenance</span>
              <i>✦</i>

              <span>Wigs</span>
              <i>✦</i>

              <span>Frontal Units</span>
              <i>✦</i>

              <span>Closures</span>
              <i>✦</i>

              <span>Bundles</span>
              <i>✦</i>

              <span>Ponytails</span>
              <i>✦</i>

              <span>Custom Wigs</span>
              <i>✦</i>

              <span>HD Lace</span>
              <i>✦</i>

              <span>Hair Maintenance</span>
              <i>✦</i>

            </div>

          </div>


          {/* BOOKING CTA */}

          <div className="services-cta">

            <div>

              <p>
                YOUR HAIR. YOUR STYLE. YOUR CONFIDENCE.
              </p>

              <h3>
                Ready for your next transformation?
              </h3>

            </div>

            <a
              href="https://wa.me/2347014580884"
              target="_blank"
              rel="noreferrer"
            >
              BOOK A SERVICE →
            </a>

          </div>

        </section>


        {/* =========================
            SHOP
        ========================= */}

        <Shop
          products={products}
          onAddToCart={addProductToCart}
          onViewProduct={setSelectedProduct}
        />

        <Admin
          products={products}
          onAddProduct={(product) => {
            setProducts((currentProducts) => [
              ...currentProducts,
              product,
            ]);
          }}
        />


        {/* =========================
            ABOUT
        ========================= */}

        <section
          className="about-section"
          id="about"
        >

          <div className="about-image">

            <img
              src={nellyImage}
              alt="Nelly, founder of Hair by Nelly"
              width="1000"
              height="1000"
              loading="lazy"
            />

          </div>


          <div className="about-content">

            <p className="section-label">
              OUR STORY
            </p>

            <h2>
              More Than Hair.
              <br />
              <em>It's Confidence.</em>
            </h2>

            <p>
              At Hair by Nelly, we believe that the
              right hair can completely transform
              how you feel about yourself.
            </p>

            <p>
              Our goal is simple — to provide beautiful,
              quality hair and professional services
              that help every woman feel confident,
              elegant and completely herself.
            </p>

            <div className="about-signature">
              HAIR BY NELLY
            </div>

          </div>

        </section>


        {/* =========================
            WHY CHOOSE US
        ========================= */}

        <section className="why-section">

          <div className="section-heading">

            <p>
              THE NELLY EXPERIENCE
            </p>

            <h2>
              Why Choose Us
            </h2>

          </div>


          <div className="why-grid">

            <div className="why-card">
              <span>01</span>

              <h3>
                Premium Quality
              </h3>

              <p>
                Carefully selected hair and materials
                chosen for quality and longevity.
              </p>
            </div>


            <div className="why-card">
              <span>02</span>

              <h3>
                Custom Beauty
              </h3>

              <p>
                Every look can be customized to
                match your personal style.
              </p>
            </div>


            <div className="why-card">
              <span>03</span>

              <h3>
                Professional Service
              </h3>

              <p>
                Attention to detail from consultation
                through installation and maintenance.
              </p>
            </div>


            <div className="why-card">
              <span>04</span>

              <h3>
                Nationwide Delivery
              </h3>

              <p>
                Get your favourite Hair by Nelly
                pieces delivered across Nigeria.
              </p>
            </div>

          </div>

        </section>


        {/* =========================
            PROMO
        ========================= */}

        <section className="promo-section">

          <div className="promo-content">

            <p>
              YOUR NEXT LOOK STARTS HERE
            </p>

            <h2>
              Luxury Hair.
              <br />
              Effortless Beauty.
            </h2>

            <a
              href="#shop"
              className="promo-button"
            >
              SHOP NOW →
            </a>

          </div>

        </section>


        {/* =========================
            REVIEWS
        ========================= */}

        <section className="reviews-section">

          <div className="section-heading">

            <p>
              CLIENT LOVE
            </p>

            <h2>
              What Our Clients Say
            </h2>

          </div>


          <div className="reviews-grid">

            <article className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <p>
                "The quality of my wig was amazing.
                It looked so natural and beautiful.
                I absolutely love it."
              </p>

              <strong>
                — AMAKA
              </strong>

            </article>


            <article className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <p>
                "Nelly did an incredible job with my
                installation. Everything was neat and
                exactly how I wanted it."
              </p>

              <strong>
                — MERCY
              </strong>

            </article>


            <article className="review-card">

              <div className="stars">
                ★★★★★
              </div>

              <p>
                "Beautiful hair, great customer service
                and very professional. I will definitely
                be ordering again."
              </p>

              <strong>
                — CHIAMAKA
              </strong>

            </article>

          </div>

        </section>


        {/* =========================
            FAQ
        ========================= */}

        <section
          className="faq-section"
          id="faq"
        >

          <div className="faq-intro">

            <p className="section-label">
              QUESTIONS
            </p>

            <h2>
              Frequently Asked
              <br />
              <em>Questions.</em>
            </h2>

          </div>


          <div className="faq-list">

            <details>

              <summary>
                Do you deliver nationwide?
                <span>+</span>
              </summary>

              <p>
                Yes. Hair by Nelly offers delivery
                across Nigeria.
              </p>

            </details>


            <details>

              <summary>
                Can I request a custom wig?
                <span>+</span>
              </summary>

              <p>
                Yes. We offer custom wig making and
                lace customization services.
              </p>

            </details>


            <details>

              <summary>
                How can I book a service?
                <span>+</span>
              </summary>

              <p>
                You can contact Hair by Nelly directly
                through WhatsApp to discuss your desired
                service and appointment.
              </p>

            </details>


            <details>

              <summary>
                Do you offer hair revamp?
                <span>+</span>
              </summary>

              <p>
                Yes. We can help restore and refresh
                selected wigs and hair pieces.
              </p>

            </details>

          </div>

        </section>


        {/* =========================
            NEWSLETTER
        ========================= */}

        <section className="newsletter-section">

          <div>

            <p>
              STAY BEAUTIFUL
            </p>

            <h2>
              Join the Hair by Nelly List
            </h2>

            <span>
              Be the first to discover new collections,
              special offers and beauty updates.
            </span>

          </div>


          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();

              alert(
                "Thank you for joining Hair by Nelly!"
              );
            }}
          >

            <input
              type="email"
              placeholder="Your email address"
              required
            />

            <button type="submit">
              JOIN →
            </button>

          </form>

        </section>


        {/* =========================
            CONTACT
        ========================= */}

        <section
          className="contact-section"
          id="contact"
        >

          <div className="contact-heading">

            <p>
              GET IN TOUCH
            </p>

            <h2>
              Let's Talk
            </h2>

            <span>
              Have a question about a product,
              service or custom order?
            </span>

          </div>


          <div className="contact-grid">

            <a
              href="https://wa.me/2347014580884"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >

              <span>
                WHATSAPP
              </span>

              <strong>
                +234 701 458 0884
              </strong>

              <small>
                CHAT WITH US →
              </small>

            </a>


            <a
              href="tel:+2347014580884"
              className="contact-card"
            >

              <span>
                PHONE
              </span>

              <strong>
                +234 701 458 0884
              </strong>

              <small>
                CALL US →
              </small>

            </a>


            <div className="contact-card">

              <span>
                SERVICE
              </span>

              <strong>
                Hair & Beauty
              </strong>

              <small>
                NATIONWIDE DELIVERY
              </small>

            </div>

          </div>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">

            <div className="footer-logo">
              HAIR BY NELLY
            </div>

            <p>
              Premium hair, beautiful transformations
              and confidence in every look.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              SHOP
            </h4>

            <a href="#shop">
              Wigs
            </a>

            <a href="#shop">
              Bundles
            </a>

            <a href="#shop">
              Frontals
            </a>

            <a href="#shop">
              HD Lace
            </a>

          </div>


          <div className="footer-column">

            <h4>
              SERVICES
            </h4>

            <a href="#services">
              Wig Making
            </a>

            <a href="#services">
              Frontal Install
            </a>

            <a href="#services">
              Hair Coloring
            </a>

            <a href="#services">
              Hair Revamp
            </a>

          </div>


          <div className="footer-column">

            <h4>
              HELP
            </h4>

            <a href="#faq">
              FAQ
            </a>

            <a href="#contact">
              Contact
            </a>

            <a
              href="https://wa.me/2347014580884"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} Hair by Nelly.
            All rights reserved.
          </span>

          <span>
            LUXURY HAIR COLLECTION
          </span>

        </div>

      </footer>


      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addProductToCart}
          />
        )}
      </Suspense>


      {/* =========================
          CART
      ========================= */}

      <Suspense fallback={null}>
        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
          onCheckout={goToCheckout}
        />
      </Suspense>

    </div>
  );
}

export default App;

