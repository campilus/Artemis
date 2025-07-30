/*
  Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script.
  Ini adalah praktik yang baik untuk memastikan semua elemen HTML sudah ada.
*/
document.addEventListener('DOMContentLoaded', function() {

    // Inisialisasi Feather Icons untuk merender ikon SVG
    try {
        feather.replace();
    } catch (e) {
        console.error("Feather Icons tidak dapat dimuat.", e);
    }
    
    // Logika untuk fungsionalitas menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Logika baru untuk filter kategori ---
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const postCards = document.querySelectorAll('#posts-grid .post-card');

    if (filterButtonsContainer && postCards.length > 0) {
        filterButtonsContainer.addEventListener('click', (event) => {
            // Hanya proses jika yang diklik adalah sebuah tombol dengan kelas 'filter-btn'
            if (event.target.classList.contains('filter-btn')) {
                const filterValue = event.target.getAttribute('data-filter');

                // 1. Update tampilan tombol: hapus kelas aktif dari semua tombol
                document.querySelectorAll('#filter-buttons .filter-btn').forEach(btn => {
                    btn.classList.remove('active-filter');
                });

                // 2. Tambahkan kelas aktif ke tombol yang baru saja diklik
                event.target.classList.add('active-filter');

                // 3. Lakukan filter pada setiap kartu postingan
                postCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    // Tampilkan kartu jika filter adalah 'semua' ATAU kategori kartu cocok dengan filter
                    if (filterValue === 'semua' || filterValue === cardCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none'; // Sembunyikan jika tidak cocok
                    }
                });
            }
        });
    }
});
