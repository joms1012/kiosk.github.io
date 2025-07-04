<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mom and Nails Salon Kiosk</title>
  <link rel="stylesheet" href="style.css">
   
</head>
<body>
  <div id="app" role="application" aria-label="Mom and Nails Salon Kiosk system">
    <nav id="sidebar" aria-label="Main navigation">
      <h2>Mom and Me Nails</h2>
      <ul>
        <li><button type="button" data-category="all" class="nav-btn active" aria-current="page">All Services</button></li>
        <li><button type="button" data-category="waxing package" class="nav-btn">Waxing Package</button></li>
        <li><button type="button" data-category="pamper" class="nav-btn">Pampering Package</button></li>
        <li><button type="button" data-category="kiddie" class="nav-btn">Kiddie Package</button></li>
      </ul>
    </nav>
    <main id="content">
      <section id="menu" aria-label="Services menu" role="list" tabindex="0"></section>
      <section id="order-summary" aria-labelledby="order-summary-title">
        <h2 id="order-summary-title">Order Summary</h2>
        <ul id="order-items" aria-live="polite" aria-relevant="additions removals" aria-atomic="true" tabindex="0"></ul>
        <p id="order-total" aria-live="polite" aria-atomic="true" tabindex="0">Total: ₱0.00</p>
        <button id="btn-proceed" disabled aria-disabled="true" aria-describedby="proceed-desc">Proceed to Payment</button>
        <p id="proceed-desc" style="font-size:0.875rem;color:#6b7280;margin-top:0.5rem;user-select:text;">Please complete payment using the GCash QR code.</p>
      </section>
    </main>
  </div>

  <!-- Payment & Receipt overlay -->
  <div id="receipt-overlay" role="dialog" aria-modal="true" aria-labelledby="receipt-title" tabindex="-1">
    <div id="receipt">
      <!-- Payment view initially visible -->
      <div id="payment-view" style="flex: 1 1 320px; display: flex; flex-direction: column; align-items: center;">
        <div id="gcash-container" aria-label="GCash Payment QR code">
          <h3>Pay with GCash</h3>
          <img
            src="gcash.png"
            alt="GCash Payment QR Code"
            class="qr-code"
            loading="lazy"
            decoding="async"
            width="220" height="220"
          />
          <p class="gc-text">Scan this QR code with your GCash app to pay.</p>
        </div>
        <button id="btn-confirm-payment" style="max-width: 300px; margin-top: 2rem;">Confirm Payment</button>
        <button id="btn-close-payment" style="max-width: 300px; margin-top: 1rem; background-color:#f9a8d4; color:#ec4899; border:none; border-radius:0.75rem; font-weight:700; font-family: 'Poppins', sans-serif; font-size: 1.2rem; cursor:pointer; box-shadow:none;">Close</button>
      </div>
      <!-- Receipt view initially hidden -->
      <div id="receipt-content" style="flex: 1 1 320px; display: none; flex-direction: column;">
        <h2 id="receipt-title">Your Receipt</h2>
        <ul id="receipt-items"></ul>
        <p class="total" id="receipt-total"></p>
        <button id="btn-print">Print Receipt</button>
        <button id="btn-close">Close</button>
        
      </div>
    </div>
  </div>
  <script src="function.js"></script>
</body>
</html>

