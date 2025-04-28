// dashboard.js - Manage Dashboard-specific interactions

document.addEventListener('DOMContentLoaded', function () {
    // (1) Preparado para cuando quieras actualizar My Reading Journey dinámicamente
  
    const statusDropdowns = document.querySelectorAll('.status-dropdown');
    if (statusDropdowns.length) {
      statusDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (event) => {
          const selectedStatus = event.target.value;
          const bookTitle = event.target.closest('.book-card').querySelector('p').textContent;
          console.log(`Book "${bookTitle}" changed to: ${selectedStatus}`);
        });
      });
    }
  
    // (2) Si quieres más adelante hacer dinámica la barra de progreso de goal
    const updateGoalProgress = (completedBooks, totalGoalBooks) => {
      const progressPercentage = Math.round((completedBooks / totalGoalBooks) * 100);
      const goalBarFill = document.querySelector('.goal-bar-fill');
      const goalValue = document.querySelector('.goal-card .stat-value');
  
      if (goalBarFill && goalValue) {
        goalBarFill.style.width = `${progressPercentage}%`;
        goalValue.textContent = `${progressPercentage}%`;
      }
    };
  
    // Ejemplo de cómo llamarlo manualmente (luego se puede automatizar)
    // updateGoalProgress(12, 25); // ejemplo: 12 de 25 libros leídos → 48%
  
  });
  