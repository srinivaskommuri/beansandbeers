// menu.js - fetch JSON data and render menu items dynamically

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('menu-items');
    if (!container) return; // nothing to render

    // Add shimmer CSS
    const style = document.createElement('style');
    style.textContent = `
        .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);

    // Render shimmer placeholders
    renderShimmer(container);

    fetch('https://orders.bopple.me/api/venues/14953/menu/products/')
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            console.log('Menu data loaded successfully', res);
            return res.json();
        })
        .then((data) => {
            const filteredData = data.filter(getCategoryFilter());
            renderMenu(filteredData, container);
        })
        .catch((err) => {
            console.error('Failed to load menu data:', err);
            // Optionally, show error state
            container.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
        });
});

function getCategoryFilter() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('breakfast')) {
        return item => item.product_category_id === 287360;
    } else if (path.includes('vegan-menu')) {
        const veganMenu = item => {
            const isVeganCategory = item.product_category_id === 287361;
            const isSpecificVeganItem = item.product_category_id === 284955 && item.id === 1481628;
            return isVeganCategory || isSpecificVeganItem;
        };
        return veganMenu;
    } else if (path.includes('lunch-and-dinner')) {
        // Lunch and Dinner categories: BnB Mains, Burgers, Ribs, Salads
        const categories = [284954, 284955, 287366, 287367];
        return item => categories.includes(item.product_category_id);
    } else if (path.includes('kids-menu')) {
        // Kids Menu categories: BnB Mains, Burgers, Ribs, Salads
        const categories = [287365, 284962];
        return item => categories.includes(item.product_category_id);
    } else if (path.includes('sides')) {
        // Sides categories
        const categories = [284965, 284959];
        return item => categories.includes(item.product_category_id);
    } else {
        // Default: show all items if on other pages
        return () => true;
    }
}

function renderShimmer(container) {
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) { // Show 8 placeholder cards
        const col = document.createElement('div');
        col.className = 'col-md-3';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-img-top shimmer" style="height: 200px;"></div>
                <div class="card-body d-flex flex-column">
                    <div class="shimmer" style="height: 20px; margin-bottom: 10px;"></div>
                    <div class="shimmer" style="height: 40px; margin-bottom: 10px;"></div>
                    <div class="shimmer" style="height: 15px; margin-bottom: 10px;"></div>
                    <div class="shimmer" style="height: 15px; margin-top: auto;"></div>
                </div>
            </div>
        `;

        container.appendChild(col);
    }
}

function renderMenu(items, container) {
    console.log('Rendering menu items:', items);
    container.innerHTML = ''; // Clear shimmer placeholders
    items.forEach((item) => {
        const col = document.createElement('div');
        col.className = 'col-md-3';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image_thumb_url || 'assets/images/services/burger.jpg'}" class="card-img-top" alt="${item.product_name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.product_name}</h5>
                    <p class="card-text">${item.product_desc || ''}</p>
                    <p class="card-text menu-price text-primary fw-bold mt-auto">${`$${item.price.toFixed(2)}`}</p>
                </div>
            </div>
        `;

        container.appendChild(col);
    });

    // attach event listeners to any existing add-cart buttons (in case items were injected previously)
    container.addEventListener('click', (evt) => {
        if (evt.target && evt.target.classList.contains('add-cart')) {
            const card = evt.target.closest('.card');
            const nameElem = card && card.querySelector('.card-title');
            const itemName = nameElem ? nameElem.textContent : 'item';
            alert(`Added "${itemName}" to cart`);
        }
    });
}
