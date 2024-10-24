// Obtener productos desde la API y cargar los datos
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        const productsGrid = document.getElementById('products-grid');
        const productFilter = document.getElementById('product-filter');

        // Generar las opciones de filtro
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });

        // Mostrar las cards de los productos
        function displayProducts(productsToShow) {
            productsGrid.innerHTML = ''; // Limpiar contenido previo
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

        // Mostrar todos los productos inicialmente
        displayProducts(products);

        // Filtrar productos por selección
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
