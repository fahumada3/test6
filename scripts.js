fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        const productsGrid = document.getElementById('products-grid');
        const productFilter = document.getElementById('product-filter');

        
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });

        
        function displayProducts(productsToShow) {
            productsGrid.innerHTML = ''; 
            productsToShow.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                `;
                productsGrid.appendChild(card);
            });
        }

        
        displayProducts(products);

        
        productFilter.addEventListener('change', (e) => {
            const selectedProductId = e.target.value;
            if (selectedProductId === 'all') {
                displayProducts(products);
            } else {
                const filteredProduct = products.filter(product => product.id == selectedProductId);
                displayProducts(filteredProduct);
            }
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
