fetch('https://fakestoreapi.com/products')
    .then(response => response.json()) // Convierte la respuesta en formato JSON
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
                const card = document.createElement('div'); // Crea un nuevo elemento div para la tarjeta
                card.classList.add('product-card');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}"> <!-- Imagen del producto -->
                    <h3>${product.title}</h3> <!-- Título del producto -->
                    <p>$${product.price.toFixed(2)}</p> <!-- Precio del producto con dos decimales -->
                `;
                productsGrid.appendChild(card);
            });
        }

        displayProducts(products); // Muestra todos los productos al cargar la página

        // Detecta cambios en el selector de productos para filtrar la visualización
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
