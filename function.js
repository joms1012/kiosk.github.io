
    // Updated menuData for Mom and Nails Salon with new categories
    const menuData = [
      { id: 1, name: "Wax Package 8", category: "waxing package", description: "Under arm<br>Full Arm and Full Leg<br>Brazillian / Manzillian", price: 2900 },
      { id: 2, name: "Wax Package 7", category: "waxing package", description: "Under arm<br>Brazillian / Manzillian<br>Full Leg", price: 2200 },
      { id: 3, name: "Wax Package 6", category: "waxing package", description: "Under arm<br>Full Arm<br>Full Leg", price: 1800 },
      { id: 4, name: "Wax Package 5", category: "waxing package", description: "Under arm<br>Full Arm", price: 1050 },
      { id: 5, name: "Wax Package 4", category: "waxing package", description: "Under arm<br>Full Leg", price: 1100 },
      { id: 6, name: "Wax Package 3", category: "waxing package", description: "Under arm<br>Half Leg", price: 970 },
      { id: 7, name: "Wax Package 2", category: "waxing package", description: "Under arm <br>Half arm", price: 870 },
      { id: 8, name: "Wax Package 1", category: "waxing package", description: "Under arm<br>Bikini", price: 800 },
      { id: 9, name: "Kiddie Package 8", category: "Kiddie", description: "Hand Spa and 1hr Foot Massage with Foot Paraffin and Mani and Pedi", price: 1200 },
      { id: 10, name: "Kiddie Package 7", category: "kiddie", description: "Foot Spa and 1hr Foot Massage with Mani and Ped<br>(free nail art)", price: 920 },
      { id: 11, name: "Kiddie Package 6", category: "kiddie", description: "Hand Spa and Foot Spa with Mani and Ped<br>(free 20mins hand or foot massage)", price: 770 },
      { id: 12, name: "Kiddie Package 5", category: "kiddie", description: "1hr Body Massage with Mani and Ped<br>(free nail art)", price: 610 },
      { id: 13, name: "Kiddie Package 4", category: "kiddie", description: "1hr Foot Massage with Mani and Ped<br>(free nail art)", price: 590 },
      { id: 14, name: "Kiddie Package 3", category: "kiddie", description: "Foot spa with Mani and Ped<br>(free 20mins hand or foot massage)", price: 550 },
      { id: 15, name: "Kiddie Package 2", category: "kiddie", description: "Mani-Ped with 30mins foot massage<br>(free nail art)", price: 440 },
      { id: 16, name: "Kiddie Package 1", category: "kiddie", description: "Mani or Pedi with Foot Spa <br>(free 10mins hand or foot massage)", price: 420 },
      { id: 17, name: "Package 8", category: "pamper", description: "Foot Spa with Gel Mani and Gel Pedi", price: 2130 },
      { id: 18, name: "Package 7", category: "pamper", description: "Hand & Foot Spa with Hand & Foot Paraffin, Mani & Pedi", price: 2000 },
      { id: 19, name: "Package 6", category: "pamper", description: "Foot Spa with Gel Mani and Upgraded Pedi", price: 1530 },
      { id: 20, name: "Package 5", category: "pamper", description: "Foot Spa with Paraffin and Mani and Pedi", price: 1320 },
      { id: 21, name: "Package 4", category: "pamper", description: "Gel Mani with Upgraded Pedi", price: 1160 },
      { id: 22, name: "Package 3", category: "pamper", description: "30 minute Foot Massage with Mani and Pedi", price: 820 },
      { id: 23, name: "Package 2", category: "pamper", description: "Foot Spa with Mani and Pedi", price: 790 },
      { id: 24, name: "Package 1", category: "pamper", description: "Foot Spa with Mani or Pedi", price: 600 }
    ];

    const menuContainer = document.getElementById('menu');
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElem = document.getElementById('order-total');
    const proceedBtn = document.getElementById('btn-proceed');
    const receiptOverlay = document.getElementById('receipt-overlay');
    const receiptItemsList = document.getElementById('receipt-items');
    const receiptTotalElem = document.getElementById('receipt-total');
    const printBtn = document.getElementById('btn-print');
    const closeBtn = document.getElementById('btn-close');
    const confirmPaymentBtn = document.getElementById('btn-confirm-payment');
    const closePaymentBtn = document.getElementById('btn-close-payment');
    const paymentView = document.getElementById('payment-view');
    const receiptContent = document.getElementById('receipt-content');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentCategory = 'all';
    let order = {};

    function renderMenu(category) {
      menuContainer.innerHTML = '';
      const itemsToShow = category === 'all' ? menuData : menuData.filter(item => item.category === category);
      if (itemsToShow.length === 0) {
        menuContainer.innerHTML = '<p>No services found in this category.</p>';
        return;
      }
      itemsToShow.forEach(item => {
        const itemElem = document.createElement('article');
        itemElem.className = 'menu-item';
        itemElem.setAttribute('role', 'listitem');
        itemElem.setAttribute('tabindex', '0');
        itemElem.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button class="add-btn" aria-label="Add ${item.name} to order" data-id="${item.id}">Add</button>
        `;
        menuContainer.appendChild(itemElem);
      });
      // Attach event listeners for add buttons
      const addButtons = menuContainer.querySelectorAll('.add-btn');
      addButtons.forEach(btn => btn.addEventListener('click', () => {
        const id = +btn.dataset.id;
        addItemToOrder(id);
      }));
    }

    function addItemToOrder(id) {
      if (order[id]) {
        order[id].quantity += 1;
      } else {
        const item = menuData.find(m => m.id === id);
        if (!item) return;
        order[id] = { ...item, quantity: 1 };
      }
      renderOrder();
    }

    function removeItemFromOrder(id) {
      if (!order[id]) return;
      order[id].quantity -= 1;
      if (order[id].quantity <= 0) {
        delete order[id];
      }
      renderOrder();
    }

    function renderOrder() {
      orderItemsList.innerHTML = '';
      const entries = Object.values(order);
      if (entries.length === 0) {
        orderItemsList.innerHTML = '<li>Your order is empty.</li>';
        orderTotalElem.textContent = 'Total: ₱0.00';
        proceedBtn.disabled = true;
        proceedBtn.setAttribute('aria-disabled', 'true');
        return;
      }
      let total = 0;
      for (const item of entries) {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="quantity">${item.quantity}x</span>
          <span class="item-name">${item.name}</span>
          <span class="item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
          <button aria-label="Remove one ${item.name}" class="remove-item" data-id="${item.id}" title="Remove Item">&times;</button>
        `;
        orderItemsList.appendChild(li);
      }
      orderTotalElem.textContent = `Total: ₱${total.toFixed(2)}`;
      proceedBtn.disabled = false;
      proceedBtn.setAttribute('aria-disabled', 'false');

      // Add remove event listeners
      const removeBtns = orderItemsList.querySelectorAll('.remove-item');
      removeBtns.forEach(btn => btn.addEventListener('click', () => {
        const id = +btn.dataset.id;
        removeItemFromOrder(id);
      }));
    }

    function clearOrder() {
      order = {};
      renderOrder();
    }

    function renderReceipt() {
      receiptItemsList.innerHTML = '';
      const entries = Object.values(order);
      let total = 0;
      for (const item of entries) {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="quantity">${item.quantity}x</span>
          <span class="item-name">${item.name}</span>
          <span class="price">₱${(item.price * item.quantity).toFixed(2)}</span>
        `;
        receiptItemsList.appendChild(li);
      }
      receiptTotalElem.textContent = `TOTAL: ₱${total.toFixed(2)}`;
    }

    function showReceipt() {
      renderReceipt();
      receiptContent.style.display = 'flex';
      paymentView.style.display = 'none';
      receiptOverlay.classList.add('active');
      receiptOverlay.focus();
    }

    function showPayment() {
      receiptContent.style.display = 'none';
      paymentView.style.display = 'flex';
      receiptOverlay.classList.add('active');
      receiptOverlay.focus();
    }

    function closeReceipt() {
      receiptOverlay.classList.remove('active');
      clearOrder();
      showPayment(); // reset views for next use
      proceedBtn.focus();
    }

    // Navigation buttons event listeners
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderMenu(currentCategory);
        menuContainer.focus();
      });
    });

    proceedBtn.addEventListener('click', () => {
      showPayment();
    });

    confirmPaymentBtn.addEventListener('click', () => {
      showReceipt();
    });

    closeBtn.addEventListener('click', () => {
      closeReceipt();
    });

    closePaymentBtn.addEventListener('click', () => {
      receiptOverlay.classList.remove('active');
      // Optionally clear order or keep for user to edit or do nothing
      proceedBtn.focus();
    });

    printBtn.addEventListener('click', () => {
      window.print();
    });

    // Initial render
    renderMenu('all');
    renderOrder();
  