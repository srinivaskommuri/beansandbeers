// menu.js - fetch JSON data and render menu items dynamically

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('menu-items');
    if (!container) return; // nothing to render

    fetch('https://orders.bopple.me/api/venues/14953/menu/products/')
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            console.log('Menu data loaded successfully', res);
            return res.json();
        })
        .then((data) => renderMenu(data, container))
        .catch((err) => console.error('Failed to load menu data:', err));
});

function renderMenu(items, container) {
    console.log('Rendering menu items:', items);
    items.forEach((item) => {
        const col = document.createElement('div');
        col.className = 'col-md-3';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image_thumb_url || 'assets/images/services/burger.jpg'}" class="card-img-top" alt="${item.product_name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.product_name}</h5>
                    <p class="card-text">${item.product_desc || ''}</p>
                    <p class="card-text text-primary fw-bold">${`$${item.price.toFixed(2)}`}</p>
                    <button class="btn btn-primary mt-auto add-cart">Add to Cart</button>
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
