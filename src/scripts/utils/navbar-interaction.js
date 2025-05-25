export function setupProfileDropdown() {
  document.addEventListener('click', (event) => {
    const profileButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('user-dropdown');

    if (!profileButton || !dropdownMenu) return;

    if (profileButton.contains(event.target)) {
      dropdownMenu.classList.toggle('hidden');
    } else if (!dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });
}
