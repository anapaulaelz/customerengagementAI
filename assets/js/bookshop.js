// bookshop.js - Manage Search and Genre Filter

document.addEventListener('DOMContentLoaded', function () {
    // Obtiene las entradas de búsqueda y el selector de género
    const searchInput = document.querySelector('.search-input');
    const genreSelect = document.querySelector('.genre-select');
    const bookCards = document.querySelectorAll('.book-card');  // Obtiene todas las tarjetas de libros
  
    // Añadir los eventos para la búsqueda y los filtros
    searchInput.addEventListener('input', filterBooks);  // Filtro de búsqueda
    genreSelect.addEventListener('change', filterBooks);  // Filtro de género
  
    // Función para filtrar libros
    function filterBooks() {
      const searchTerm = searchInput.value.toLowerCase();  // Convierte la búsqueda a minúsculas
      const selectedGenre = genreSelect.value.toLowerCase();  // Convierte el género seleccionado a minúsculas
  
      bookCards.forEach(card => {
        // Obtiene el título, autor y género de cada libro
        const title = card.querySelector('h3').textContent.toLowerCase();
        const author = card.querySelector('p').textContent.toLowerCase();
        const genre = card.getAttribute('data-genre').toLowerCase();  // Asegúrate de que cada tarjeta tenga el atributo 'data-genre'
  
        // Verifica si el libro coincide con la búsqueda o el género
        const matchesSearch = title.includes(searchTerm) || author.includes(searchTerm);
        const matchesGenre = selectedGenre ? genre === selectedGenre : true;
  
        // Si el libro coincide con la búsqueda y el género, mostrarlo; si no, ocultarlo
        if (matchesSearch && matchesGenre) {
          card.style.display = '';  // Mostrar el libro
        } else {
          card.style.display = 'none';  // Ocultar el libro
        }
      });
    }
  });
  