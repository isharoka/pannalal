/* 
  Pannalal Omprakash & Sons - JavaScript Controller
  Manages Catalog, Filtering, Inquiry Cart (localStorage), Modals, and WhatsApp Integration
*/

// Configuration
const WHATSAPP_PHONE = '919931867176'; // Replace with store's actual WhatsApp phone number (with country code, no +)

// Mock Product Database
const PRODUCTS = [
  // LEHENGAS
  {
    id: 1,
    code: 'PL-LH-101',
    title: 'Hand-Embroidered Multi-Color Zardozi Lehenga',
    category: 'lehengas',
    image: 'assets/category_lehenga.jpg',
    price: '₹24,500',
    description: 'A masterpiece of Indian bridal couture. Features heavy zardozi, dabka, and gold zari handwork across multi-colored panels with an intricate scallop border. Completed with a sheer beige dupatta.',
    fabric: 'Premium Silk, Velvet & Net',
    embroidery: 'Handcrafted Zardozi & Dabka',
    colors: ['Deep Wine', 'Royal Red', 'Emerald Green']
  },
  {
    id: 2,
    code: 'PL-LH-102',
    title: 'Royal Rani Pink Embroidered Silk Lehenga',
    category: 'lehengas',
    image: 'assets/category_suit.jpg',
    price: '₹14,800',
    description: 'An opulent Rani Pink lehenga crafted from pure silk, featuring luxurious gold zari floral embroidery and dense border embellishments. Perfect for grand weddings and festive occasions.',
    fabric: 'Pure Raw Silk & Net Dupatta',
    embroidery: 'Intricate Gold Zari & Sequin Work',
    colors: ['Maroon', 'Blush Pink', 'Mustard Yellow']
  },
  {
    id: 3,
    code: 'PL-LH-103',
    title: 'Champagne Grey Sequined Georgette Lehenga',
    category: 'lehengas',
    image: 'assets/category_saree.png',
    price: '₹18,200',
    description: 'Elegant champagne-grey georgette lehenga with delicate floral threadwork, all-over micro-sequins, and a majestic flare that flows beautifully.',
    fabric: 'Premium Georgette & Net',
    embroidery: 'Floral Threadwork & Micro-Sequins',
    colors: ['Deep Maroon & Gold', 'Emerald & Gold']
  },
  
  // SAREES
  {
    id: 4,
    code: 'PL-SR-201',
    title: 'Midnight Black Sequined Designer Saree',
    category: 'sarees',
    image: 'assets/real_saree.jpg',
    price: '₹8,900',
    description: 'A glamorous midnight black designer saree adorned with premium sequin work and an elegant border. Crafted for cocktail parties and modern celebrations.',
    fabric: 'Premium Georgette & Net',
    embroidery: 'All-Over Sequins & Velvet Border',
    colors: ['Classic Black', 'Midnight Blue']
  },
  {
    id: 5,
    code: 'PL-SR-202',
    title: 'Blush Pink Embroidered Festive Saree',
    category: 'sarees',
    image: 'assets/real_pink_saree.jpg',
    price: '₹11,500',
    description: 'A delicate blush pink saree featuring intricate floral embroidery, cut-dana border work, and a sophisticated sheen. Comes with a matching embellished blouse piece.',
    fabric: 'Organza & Silk Blend',
    embroidery: 'Floral Embroidery & Cut-dana borders',
    colors: ['Antique Gold', 'Peach-Rose', 'Wine']
  },
  {
    id: 6,
    code: 'PL-SR-203',
    title: 'Classic Orange-Red Banarasi Silk Saree',
    category: 'sarees',
    image: 'assets/cat_saree.jpg',
    price: '₹13,400',
    description: 'A traditional Banarasi silk saree in a vibrant orange-red shade. Embellished with classic gold zari motifs and a heavy designer border for an authentic heritage look.',
    fabric: 'Pure Banarasi Silk',
    embroidery: 'Gold Zari Weaving',
    colors: ['Burgundy', 'Deep Plum', 'Navy Blue']
  },
  
  // SUITS
  {
    id: 7,
    code: 'PL-ST-301',
    title: 'Burgundy Anarkali Zari Kurti & Pant Set',
    category: 'suits',
    image: 'assets/real_suit.jpg',
    price: '₹6,500',
    description: 'A majestic floor-length Anarkali suit set in premium burgundy micro-velvet. Elegantly embroidered with detailed zari floral work around the neck and sleeves.',
    fabric: 'Micro-Velvet & Chiffon Dupatta',
    embroidery: 'Neckline & Border Zari',
    colors: ['Royal Maroon', 'Teal Blue', 'Olive Green']
  },
  {
    id: 8,
    code: 'PL-ST-302',
    title: 'Deep Wine Straight Cut Zardozi Kurti Set',
    category: 'suits',
    image: 'assets/cat_suits.jpg',
    price: '₹5,800',
    description: 'A classic straight-cut kurti set tailored in deep wine silk, featuring a hand-crafted zardozi neckline and paired with comfortable straight pants and a designer dupatta.',
    fabric: 'Raw Silk & Banarasi Dupatta',
    embroidery: 'Hand-crafted Zardozi Yoke',
    colors: ['Wine Burgundy', 'Rust Orange', 'Forest Green']
  },
  {
    id: 9,
    code: 'PL-ST-303',
    title: 'Ornate Burgundy Velvet Suit Set',
    category: 'suits',
    image: 'assets/real_suit.jpg',
    price: '₹7,200',
    description: 'A premium velvet kurti set with gold zari work, paired with straight pants and a rich, traditional Banarasi dupatta for a classic festive appeal.',
    fabric: 'Micro-Velvet & Banarasi Silk',
    embroidery: 'Mirror Work & Gota Accents',
    colors: ['Wine Gold', 'Fuchsia', 'Emerald']
  },
  
  // INDO-WESTERN
  {
    id: 10,
    code: 'PL-IW-401',
    title: 'Gold-Embroidered Fusion Jacket & Dhoti Set',
    category: 'indowestern',
    image: 'assets/cat_indowestern.jpg',
    price: '₹12,600',
    description: 'A modern fusion silhouette featuring a structured gold-embroidered silk jacket with elaborate bandhgala detailing, paired with fluid draped dhoti pants.',
    fabric: 'Structured Art Silk & Georgette',
    embroidery: 'Jacket Zardozi & Button Motifs',
    colors: ['Burgundy-Wine', 'Imperial Navy', 'Charcoal Gold']
  },
  {
    id: 11,
    code: 'PL-IW-402',
    title: 'Rose Pink Hand-Embroidered Fusion Set',
    category: 'indowestern',
    image: 'assets/pink_fusion_suit.jpg',
    price: '₹9,400',
    description: 'A stunning rose pink Indo-Western outfit featuring an intricately hand-embroidered crop top and jacket drape, detailed with premium silver thread and delicate beadwork. Perfect for high-fashion festive wear.',
    fabric: 'Premium Silk Georgette & Net',
    embroidery: 'Silver Thread & Zardozi Yoke',
    colors: ['Rose Pink', 'Blush Pink']
  },
  {
    id: 12,
    code: 'PL-IW-403',
    title: 'Elegant Ivory High-Neck Lehenga Gown',
    category: 'indowestern',
    image: 'assets/category_indowestern.png',
    price: '₹15,900',
    description: 'A fusion of classic chikankari craftsmanship and modern styling. Features a high collar, structured silver thread embroidery, and a flowing silhouette.',
    fabric: 'Ivory Georgette',
    embroidery: 'Chikankari & Silver Threadwork',
    colors: ['Deep Wine Red', 'Champagne Gold', 'Midnight Blue']
  }
];

// App State
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBadge = document.getElementById('cart-badge');
const cartBadgeMobile = document.getElementById('cart-badge-mobile');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartToggle = document.getElementById('cart-toggle');
const cartToggleMobile = document.getElementById('cart-toggle-mobile');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalCount = document.getElementById('cart-total-count');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');
const contactAlert = document.getElementById('contact-alert');

// Product Details Modal Elements
const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalImg = document.getElementById('modal-img');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalFabric = document.getElementById('modal-fabric');
const modalEmbroidery = document.getElementById('modal-embroidery');
const modalColors = document.getElementById('modal-colors');
const modalCode = document.getElementById('modal-code');
const modalWhatsAppBtn = document.getElementById('modal-whatsapp-btn');
const modalAddCartBtn = document.getElementById('modal-add-cart-btn');

// Mobile Navbar Elements
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  // Load cart from LocalStorage
  const savedCart = localStorage.getItem('pannalal_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }

  // Render initial items
  renderCatalog();
  updateCartUI();

  // Scroll effect on Header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Search Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCatalog();
    });
  });

  // Cart Drawer open/close
  const toggleCart = () => {
    cartDrawer.classList.toggle('active');
    cartBackdrop.style.display = cartDrawer.classList.contains('active') ? 'block' : 'none';
  };

  if (cartToggle) cartToggle.addEventListener('click', toggleCart);
  if (cartToggleMobile) cartToggleMobile.addEventListener('click', toggleCart);
  if (cartClose) cartClose.addEventListener('click', toggleCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', toggleCart);

  // Close Modal
  const closeModal = () => {
    productModal.classList.remove('active');
    setTimeout(() => {
      productModal.style.display = 'none';
    }, 400); // match CSS transitions
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close Modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal.classList.contains('active')) {
        closeModal();
      }
      if (cartDrawer.classList.contains('active')) {
        toggleCart();
      }
    }
  });

  // Contact Form Submission is handled natively in HTML for reliable direct browser redirect to FormSubmit.co activation portal.

  // Handle inquiry checkout button click
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      
      // Build WhatsApp message for bulk inquiry
      let msg = `Hello Pannalal Omprakash & Sons,\n\nI am visiting your website and would like to make a wholesale inquiry for the following women's ethnic wear items:\n\n`;
      
      cart.forEach((item, index) => {
        msg += `${index + 1}. *${item.product.title}* (Code: *${item.product.code}*)\n`;
        msg += `   - Fabric: ${item.product.fabric}\n`;
        msg += `   - Quantity Requested: *${item.quantity}*\n\n`;
      });
      
      msg += `Please let me know the pricing, bulk order discounts, and stock availability. Thank you!`;
      
      // Open WhatsApp Link
      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`, '_blank');
    });
  }

  // Instagram Reels Carousel Logic
  const instaTrack = document.getElementById('insta-track');
  const instaPrev = document.getElementById('insta-prev');
  const instaNext = document.getElementById('insta-next');

  if (instaTrack && instaPrev && instaNext) {
    let currentSlideIndex = 0;
    
    const updateInstaCarousel = () => {
      const slides = instaTrack.querySelectorAll('.carousel-slide');
      if (slides.length === 0) return;

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 24; // match style.css gap of 24px
      
      // Calculate how many slides are visible in the wrapper
      let visibleSlides = 3; // desktop
      if (window.innerWidth <= 600) {
        visibleSlides = 1;
      } else if (window.innerWidth <= 992) {
        visibleSlides = 2;
      }
      
      const maxSlideIndex = Math.max(0, slides.length - visibleSlides);
      
      // Keep index within bounds
      if (currentSlideIndex > maxSlideIndex) {
        currentSlideIndex = maxSlideIndex;
      }
      if (currentSlideIndex < 0) {
        currentSlideIndex = 0;
      }

      // Calculate translate amount
      const amountToMove = (slideWidth + gap) * currentSlideIndex;
      instaTrack.style.transform = `translateX(-${amountToMove}px)`;

      // Update button disabled state
      instaPrev.disabled = currentSlideIndex === 0;
      instaNext.disabled = currentSlideIndex >= maxSlideIndex;
    };

    instaPrev.addEventListener('click', () => {
      currentSlideIndex--;
      updateInstaCarousel();
    });

    instaNext.addEventListener('click', () => {
      currentSlideIndex++;
      updateInstaCarousel();
    });

    // Initial setup and responsive resize hook
    updateInstaCarousel();
    window.addEventListener('resize', updateInstaCarousel);
  }
});

// Render Catalog Grid
function renderCatalog() {
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  // Filter products
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = currentFilter === 'all' || prod.category === currentFilter;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery) ||
                          prod.code.toLowerCase().includes(searchQuery) ||
                          prod.fabric.toLowerCase().includes(searchQuery) ||
                          prod.embroidery.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Empty state
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search" style="font-size: 2.5rem; color: var(--gold); margin-bottom: 15px; display: block;"></i>
        <h3>No products found matching "${searchQuery}"</h3>
        <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">Try checking spelling or choosing a different category.</p>
      </div>
    `;
    return;
  }

  // Create cards
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${product.image}" class="product-img" alt="${product.title}">
        <span class="product-badge">${product.code}</span>
        <div class="product-actions-overlay">
          <button class="product-action-btn quick-view-btn" title="Quick View">
            <i class="fas fa-eye"></i>
          </button>
          <button class="product-action-btn quick-add-btn" title="Add to Inquiry">
            <i class="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-meta">
          <div>
            <span class="product-price-label">EST. PRICE</span>
            <div class="product-price">${product.price}</div>
          </div>
          <button class="btn btn-primary btn-sm add-inquiry-btn" style="padding: 6px 12px; font-size: 0.75rem; border-color: var(--gold-dark);">
            + Inquiry
          </button>
        </div>
      </div>
    `;

    // Hook events
    const titleEl = card.querySelector('.product-title');
    const imgWrapEl = card.querySelector('.product-image-wrap');
    const quickViewBtn = card.querySelector('.quick-view-btn');
    const quickAddBtn = card.querySelector('.quick-add-btn');
    const addInquiryBtn = card.querySelector('.add-inquiry-btn');

    // Click on image, title or quick view opens details modal
    const openDetails = () => openProductModal(product);
    titleEl.addEventListener('click', openDetails);
    quickViewBtn.addEventListener('click', openDetails);

    // Click to add to inquiry cart
    const addAction = (e) => {
      e.stopPropagation();
      addToCart(product);
    };
    quickAddBtn.addEventListener('click', addAction);
    addInquiryBtn.addEventListener('click', addAction);

    productGrid.appendChild(card);
  });
}

// Open Product Details Modal
function openProductModal(product) {
  modalImg.src = product.image;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price;
  modalDesc.textContent = product.description;
  modalFabric.textContent = product.fabric;
  modalEmbroidery.textContent = product.embroidery;
  modalColors.textContent = product.colors.join(', ');
  modalCode.textContent = product.code;

  // Single Item WhatsApp link
  const singleMsg = `Hello Pannalal Omprakash & Sons,\n\nI am interested in inquiring about this product from your website:\n- *Product:* ${product.title}\n- *Code:* ${product.code}\n- *Fabric:* ${product.fabric}\n- *Price:* ${product.price}\n\nPlease share price, available colors, and order placement details.`;
  const encodedSingle = encodeURIComponent(singleMsg);
  modalWhatsAppBtn.onclick = () => {
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedSingle}`, '_blank');
  };

  // Add to inquiry cart button inside modal
  modalAddCartBtn.onclick = () => {
    addToCart(product);
    productModal.classList.remove('active');
    setTimeout(() => { productModal.style.display = 'none'; }, 400);
  };

  // Display modal
  productModal.style.display = 'flex';
  // Force reflow for transitions
  productModal.offsetHeight; 
  productModal.classList.add('active');
}

// Inquiry Cart Operations
function addToCart(product) {
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      product: product,
      quantity: 1
    });
  }

  updateCartUI();
  
  // Highlight and shake cart toggle to show success
  const badges = [cartToggle, cartToggleMobile];
  badges.forEach(b => {
    if (b) {
      b.style.transform = 'scale(1.25)';
      b.style.borderColor = 'var(--gold)';
      setTimeout(() => {
        b.style.transform = 'scale(1)';
        b.style.borderColor = '';
      }, 300);
    }
  });

  // Save to local storage
  localStorage.setItem('pannalal_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Update totals and badge count
  const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  
  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
  }
  if (cartBadgeMobile) {
    cartBadgeMobile.textContent = totalCount;
    cartBadgeMobile.style.display = totalCount > 0 ? 'flex' : 'none';
  }
  
  if (cartTotalCount) {
    cartTotalCount.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;
  }

  // Disable checkout button if empty
  if (checkoutBtn) {
    checkoutBtn.disabled = totalCount === 0;
    if (totalCount === 0) {
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.cursor = 'not-allowed';
    } else {
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.cursor = 'pointer';
    }
  }

  // Render list
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <i class="fas fa-shopping-bag"></i>
        <p style="font-weight: 500; margin-bottom: 5px;">Your Inquiry Cart is empty</p>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Explore our categories and add products you want to enquire prices for!</p>
      </div>
    `;
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    
    itemEl.innerHTML = `
      <div class="cart-item-img-wrap">
        <img src="${item.product.image}" class="cart-item-img" alt="${item.product.title}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.title}</h4>
        <span class="cart-item-code">${item.product.code}</span>
        <div class="cart-item-qty">
          <button class="qty-btn qty-minus" data-id="${item.product.id}">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn qty-plus" data-id="${item.product.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.product.id}">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Hook events inside cart
    itemEl.querySelector('.qty-minus').onclick = () => adjustQuantity(item.product.id, -1);
    itemEl.querySelector('.qty-plus').onclick = () => adjustQuantity(item.product.id, 1);
    itemEl.querySelector('.cart-item-remove').onclick = () => removeFromCart(item.product.id);

    cartItemsContainer.appendChild(itemEl);
  });
}

function adjustQuantity(productId, change) {
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    updateCartUI();
    localStorage.setItem('pannalal_cart', JSON.stringify(cart));
  }
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    updateCartUI();
    localStorage.setItem('pannalal_cart', JSON.stringify(cart));
  }
}

/* =====================================================
   HERO CARD STACK ANIMATION
   Rotates 4 stacked cards automatically + on click
===================================================== */
(function initCardStack() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;

  const cards = Array.from(stack.querySelectorAll('.stack-card'));
  const dots  = Array.from(document.querySelectorAll('.stack-dot'));
  const TOTAL = cards.length; // 4
  let currentFront = 0; // index of the card currently at position 0 (front)
  let autoTimer;

  const positions = ['card-pos-0', 'card-pos-1', 'card-pos-2', 'card-pos-3'];

  function applyPositions() {
    cards.forEach((card, i) => {
      // Clear all position classes
      card.classList.remove(...positions);
      // Calculate this card's visual position relative to currentFront
      const pos = ((i - currentFront) % TOTAL + TOTAL) % TOTAL;
      card.classList.add(positions[pos]);
    });
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentFront);
    });
  }

  function advance() {
    currentFront = (currentFront + 1) % TOTAL;
    applyPositions();
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(advance, 3000);
  }

  // Click on the stack cycles to next card
  stack.addEventListener('click', () => {
    advance();
    startAuto(); // reset timer on manual click
  });

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentFront = i;
      applyPositions();
      startAuto();
    });
  });

  // Init
  applyPositions();
  startAuto();
})();
