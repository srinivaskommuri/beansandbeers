// menu.js - fetch JSON data and render menu items dynamically

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('menu-items');
    if (!container) return; // nothing to render

    fetch('assets/data/menu.json')
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then((data) => renderMenu(data, container))
        .catch((err) => console.error('Failed to load menu data:', err));
});

function renderMenu(items, container) {
    items.forEach((item) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text text-primary fw-bold">${item.price}</p>
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
