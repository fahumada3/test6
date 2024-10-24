fetch('https://fakestoreapi.com/products')
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(products => {
        const productsGrid = document.getElementById('products-grid'); // Obtiene la sección donde se mostrarán los productos
        const productFilter = document.getElementById('product-filter'); // Obtiene el selector de productos

        // Itera sobre los productos para agregar opciones al filtro
        products.forEach(product => {
            const option = document.createElement('option'); // Crea un nuevo elemento option
            option.value = product.id; // Establece el valor del option al ID del producto
            option.textContent = product.title; // Establece el texto del option al título del producto
            productFilter.appendChild(option); // Agrega el option al selector
        });

        // Función para mostrar los productos en la cuadrícula
        function displayProducts(productsToShow) {
            productsGrid.innerHTML = ''; // Limpia el contenido previo de la cuadrícula
            productsToShow.forEach(product => { // Itera sobre los productos a mostrar
                const card = document.createElement('div'); // Crea un nuevo elemento div para la tarjeta
                card.classList.add('product-card'); // Agrega la clase product-card a la tarjeta
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}"> <!-- Imagen del producto -->
                    <h3>${product.title}</h3> <!-- Título del producto -->
                    <p>$${product.price.toFixed(2)}</p> <!-- Precio del producto con dos decimales -->
                `;
                productsGrid.appendChild(card); // Agrega la tarjeta a la cuadrícula de productos
            });
        }

        displayProducts(products); // Muestra todos los productos al cargar la página

        // Escucha cambios en el selector de productos para filtrar la visualización
        productFilter.addEventListener('change', (e) => {
            const selectedProductId = e.target.value; // Obtiene el valor del producto seleccionado
            if (selectedProductId === 'all') { // Si se selecciona "todos"
                displayProducts(products); // Muestra todos los productos
            } else { // Si se selecciona un producto específico
                const filteredProduct = products.filter(product => product.id == selectedProductId); // Filtra el producto seleccionado
                displayProducts(filteredProduct); // Muestra el producto filtrado
            }
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error)); // Manejo de errores si la solicitud falla
