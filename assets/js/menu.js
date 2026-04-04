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
        .category-heading {
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 20px;
            border-bottom: 2px solid #6f4e37;
            padding-bottom: 10px;
        }
        .menu-row {
            gap: 0px;
        }
        .menu-col {
            margin-bottom: 20px;
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
            const pageCategories = getPageCategories();
            renderMenu(data, container, pageCategories);
        })
        .catch((err) => {
            console.error('Failed to load menu data:', err);
            // Optionally, show error state
            container.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
        });
});

function getPageCategories() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('breakfast')) {
        return [
            { name: 'Breakfast', ids: [287360] }
        ];
    } else if (path.includes('vegan-menu')) {
        return [
            { name: 'Vegan Menu', ids: [287361] }
        ];
    } else if (path.includes('lunch-and-dinner')) {
        return [
            { name: 'BnB Mains', ids: [284954] },
            { name: 'Burgers', ids: [284955] },
            { name: 'Ribs', ids: [287366] },
            { name: 'Salads', ids: [287367] }
        ];
    } else if (path.includes('kids-menu')) {
        return [
            { name: 'Kids Mains', ids: [287365] },
            { name: 'Kids Burgers', ids: [284962] }
        ];
    } else if (path.includes('sides')) {
        return [
            { name: 'Sides', ids: [284965, 284959] }
        ];
    } else if (path.includes('cocktails')) {
        return [
            { name: 'Beers on Tap', ids: [284952] },
            { name: 'Fridge', ids: [284953] },
            { name: 'Spirits', ids: [284966] },
            { name: 'Wines', ids: [284967] },
            { name: 'Mocktails', ids: [284964] }
        ];
    } else if (path.includes('drinks')) {
        return [
            { name: 'Coffee', ids: [284957] },
            { name: 'Cool Sips', ids: [284958] },
            { name: 'Juices', ids: [284963] },
        ];
    } else {
        // Default: show all items if on other pages
        return [
            { name: 'All Items', ids: [] }
        ];
    }
}

function renderShimmer(container) {
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) { // Show 8 placeholder cards
        const col = document.createElement('div');
        col.className = 'col-md-3 menu-col';

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

function renderMenu(allItems, container, pageCategories) {
    console.log('Rendering menu items:', allItems);
    container.innerHTML = ''; // Clear shimmer placeholders

    const wrapper = document.createElement('div');
    wrapper.className = 'row';

    pageCategories.forEach((category) => {
        // Filter items for this category
        const categoryItems = allItems.filter(item =>
            category.ids.length === 0 ? true : category.ids.includes(item.product_category_id)
        );

        if (categoryItems.length > 0) {
            // Create category heading
            const headingRow = document.createElement('div');
            headingRow.className = 'row w-100';
            headingRow.style.marginLeft = '0';
            headingRow.style.marginRight = '0';

            const headingCol = document.createElement('div');
            headingCol.className = 'col-12';
            const heading = document.createElement('h3');
            heading.className = 'category-heading';
            heading.textContent = category.name;

            headingCol.appendChild(heading);
            headingRow.appendChild(headingCol);
            wrapper.appendChild(headingRow);

            // Create items row
            const itemsRow = document.createElement('div');
            itemsRow.className = 'row w-100 menu-row';
            itemsRow.style.marginLeft = '0';
            itemsRow.style.marginRight = '0';

            categoryItems.forEach((item) => {
                const col = document.createElement('div');
                col.className = 'col-md-3 menu-col';

                col.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <img src="${item.image_thumb_url || 'assets/images/services/burger.jpg'}" class="card-img-top" alt="${item.product_name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${item.product_name}</h5>
                            <p class="card-text">${item.product_desc || ''}</p>
                            <p class="card-text menu-price text-primary fw-bold mt-auto">${item.price === 0 ? `From $${item.price_min.toFixed(2)}` : `$${item.price.toFixed(2)}`}</p>
                        </div>
                    </div>
                `;

                itemsRow.appendChild(col);
            });

            wrapper.appendChild(itemsRow);
        }
    });

    container.appendChild(wrapper);

    // attach event listeners to any existing add-cart buttons
    container.addEventListener('click', (evt) => {
        if (evt.target && evt.target.classList.contains('add-cart')) {
            const card = evt.target.closest('.card');
            const nameElem = card && card.querySelector('.card-title');
            const itemName = nameElem ? nameElem.textContent : 'item';
            alert(`Added "${itemName}" to cart`);
        }
    });
}
