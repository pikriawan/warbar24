<x-customer-layout>
    @push('styles')
        <link rel="stylesheet" href="/css/home.css">
    @endpush
    <section class="hero">
        <div class="hero-column">
            <h1 class="hero-title">
                Makan enak
                <br>
                Harga bersahabat
                <br>
                Serasa di rumah sendiri
            </h1>
            <p class="hero-text">Warteg Bahari 24 hadir dengan menu lengkap, rasa rumahan, dan harga yang ramah di kantong. Dari sarapan sampai makan malam, kami selalu siap menemani.</p>
            <a class="button button-primary button-icon-end hero-cta-desktop" href="menu.php">
                Pesan sekarang
                <i class="bi bi-arrow-right"></i>
            </a>
        </div>
        <img class="hero-image" src="images/makanan-di-piring.png" alt="Makanan di piring">
        <a class="button button-primary hero-cta-mobile">
            Pesan sekarang
            <i class="bi bi-arrow-right"></i>
        </a>
    </section>
    <section class="about" id="about">
        <h2 class="about-title">Tentang kami</h2>
        <p class="about-text">Warteg Bahari 24 merupakan tempat makan yang berdiri dengan semangat menghadirkan cita rasa rumahan khas Indonesia bagi semua kalangan. Kami berkomitmen untuk memberikan pengalaman makan yang nyaman, cepat, dan ramah di kantong tanpa mengurangi kualitas rasa.</p>
    </section>
    <section class="vission-mission">
        <h2 class="vission-mission-title">Visi &amp; Misi</h2>
        <div class="vission-mission-body">
            <div class="vission">
                <h3 class="vission-title">Visi</h3>
                <ul class="vission-list">
                    <li class="vission-item">Menjadi warteg modern yang dikenal luas karena cita rasa autentik, pelayanan cepat, dan komitmen terhadap kepuasan pelanggan di seluruh Indonesia.</li>
                </ul>
            </div>
            <div class="mission">
                <h3 class="mission-title">Misi</h3>
                <ul class="mission-list">
                    <li class="mission-item">Menyediakan makanan rumahan yang lezat, bergizi, dan terjangkau.</li>
                    <li class="mission-item">Memberikan pelayanan cepat dan ramah bagi setiap pelanggan.</li>
                    <li class="mission-item">Menjaga kebersihan, kenyamanan, dan kualitas bahan makanan setiap hari.</li>
                    <li class="mission-item">Mendukung kesejahteraan masyarakat sekitar dengan membuka lapangan kerja.</li>
                </ul>
            </div>
        </div>
    </section>
    <section class="advantages">
        <h2 class="advantages-title">Keunggulan kami</h2>
        <div class="advantages-body">
            <div class="advantage">
                <i class="bi bi-emoji-smile advantage-icon"></i>
                <h3 class="advantage-title">Pelayanan cepat &amp; ramah</h3>
                <p class="advantage-text">Setiap pelanggan kami layani dengan cepat dan penuh senyum, agar pengalaman makan lebih menyenangkan.</p>
            </div>
            <div class="advantage">
                <i class="bi bi-cup-hot advantage-icon"></i>
                <h3 class="advantage-title">Rasa rumahan</h3>
                <p class="advantage-text">Cita rasa masakan rumahan yang membuat pelanggan merasa seperti makan di rumah sendiri.</p>
            </div>
            <div class="advantage">
                <i class="bi bi-wallet2 advantage-icon"></i>
                <h3 class="advantage-title">Pelayanan cepat &amp; ramah</h3>
                <p class="advantage-text">Menu lengkap dengan harga terjangkau untuk semua kalangan, terutama mahasiswa dan pekerja.</p>
            </div>
            <div class="advantage">
                <i class="bi bi-clock-history advantage-icon"></i>
                <h3 class="advantage-title">Buka 24 jam</h3>
                <p class="advantage-text">Kapan pun lapar, Warteg Bahari 24 selalu siap melayani Anda siang maupun malam.</p>
            </div>
        </div>
    </section>
    <section class="menu">
        <h2 class="menu-title">Menu yang kami sajikan</h2>
        <div class="menu-cards">
            <div class="menu-card">
                <img class="menu-card-image" src="images/telur-balado.png" alt="Telur Balado">
                <h3 class="menu-card-title">Telur Balado</h3>
                <p class="menu-card-text">Telur rebus yang dilumuri sambal balado pedas gurih, menghadirkan rasa khas nusantara yang selalu bikin ingin tambah nasi.</p>
            </div>
            <div class="menu-card">
                <img class="menu-card-image" src="images/sayur-sop.png" alt="Sayur Sop">
                <h3 class="menu-card-title">Sayur Sop</h3>
                <p class="menu-card-text">Kuah bening hangat dengan campuran sayuran segar dan bumbu sederhana. Segar, menyehatkan dan cocok untuk semua suasana.</p>
            </div>
            <div class="menu-card">
                <img class="menu-card-image" src="images/tumis-pare.png" alt="Tumis Pare">
                <h3 class="menu-card-title">Tumis Pare</h3>
                <p class="menu-card-text">Tumis pare dengan sentuhan bumbu gurih pedas yang seimbang. Rasa khasnya justru bikin nagih di setiap suapan.</p>
            </div>
        </div>
        <a class="button button-primary menu-more-button" href="menu.php">Jelajahi menu lainnya</a>
    </section>
    <section class="review">
        <h2 class="review-title">Apa kata mereka?</h2>
        <div class="review-cards">
            <div class="review-card">
                <img class="review-card-image" src="images/reviewer-1.png" alt="Reviewer">
                <h3 class="review-card-title">Gamma Assyafi Fadhillah Ar Rasyad</h3>
                <p class="review-card-text">Makanan dan tempat seperti warteg pada umumnya. Kalau mau makan hemat bisa di sini, telur+nasi+sayur+es teh cuma 10rb. Cocok  buat anak kos yang pengen makan di luar tapi tetep hemat. Pelayanan sat  set ga pake lama~</p>
            </div>
            <div class="review-card">
                <img class="review-card-image" src="images/reviewer-2.png" alt="Reviewer">
                <h3 class="review-card-title">Putri Adibatur Rohmah</h3>
                <p class="review-card-text">Saya kesini bawa anak kecil masakan rata2 enak, tapi pedas. Jadi saya hanya bisa pesan soto saja untuk anak saya. Rasanya enak, kek soto seger Jatim. Saran saya kalau siang tambahi sayuran bening atau sop</p>
            </div>
            <div class="review-card">
                <img class="review-card-image" src="images/reviewer-3.png" alt="Reviewer">
                <h3 class="review-card-title">Hafidz Prasetya</h3>
                <p class="review-card-text">Seperti warteg bahari pada umumnya sih, tapi yang ini warna oren dan bukan wkb grup. Harga oke murah, es teh lebih manis dari yang sebelah. Tempat tidak terlalu besar sangat. Rasa mirip warteg dimana saja. Point plus belum ada tukang parkir liar.</p>
            </div>
            <div class="review-card">
                <img class="review-card-image" src="images/reviewer-4.png" alt="Reviewer">
                <h3 class="review-card-title">Muhammad Rifqi</h3>
                <p class="review-card-text">Harga murah rasanya enak cocok untuk para mahasiswa, buka 24 jam jadi bisa kapan aja makan di sini, tempat bersih dan nyaman, parkir gratis es teh/teh anget pun gratis jika makan ditempat</p>
            </div>
        </div>
        <a class="button button-primary review-more-button" href="#">Lihat ulasan lainnya</a>
    </section>
    <section class="contact" id="contact">
        <h2 class="contact-title">Hubungi kami</h2>
        <div class="contact-row-1">
            <a class="button button-outlined" href="#">
                <i class="bi bi-whatsapp"></i>
                Hubungi kami via WhatsApp
            </a>
            <a class="button button-outlined" href="#">
                <i class="bi bi-envelope"></i>
                Hubungi kami via email
            </a>
        </div>
        <p class="contact-or">atau</p>
        <div class="contact-row-2">
            <form class="contact-form" action="/message" method="post">
                @csrf
                <div class="input-field">
                    <label class="label" for="name">Nama</label>
                    <input class="input" type="text" id="name" name="name" placeholder="Nama Anda" required>
                </div>
                <div class="input-field">
                    <label class="label" for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" placeholder="example@email.com" required>
                </div>
                <div class="input-field textarea-field">
                    <label class="label" for="message">Pesan</label>
                    <textarea class="input textarea" id="message" name="message" placeholder="Tulis pesan Anda" required></textarea>
                </div>
                <button class="button button-primary">Kirim</button>
            </form>
            <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d589.6088243463973!2d110.8586531482735!3d-7.554362724909514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a17007fc39d2b%3A0xc6cea763d295c8a3!2sWarteg%20Bahari%2024%20UNS!5e0!3m2!1sid!2sid!4v1762347017058!5m2!1sid!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
    <section class="bottom-tagline">
        <h2 class="tagline-title">
            Perut kenyang, hati senang!
            <br>
            Semua ada di Warteg Bahari 24
        </h2>
        <a class="button button-primary button-icon-end bottom-cta" href="menu.php">
            Pesan sekarang
            <i class="bi bi-arrow-right"></i>
        </a>
    </section>
</x-customer-layout>
