import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Home() {
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        message: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/message");
    }

    return (
        <CustomerLayout css={["home.css"]}>
            {/* HERO */}
            <section className="hero">
                <div className="hero-column">
                    <h1 className="hero-title">
                        Makan enak
                        <br />
                        Harga bersahabat
                        <br />
                        Serasa di rumah sendiri
                    </h1>
                    <p className="hero-text">
                        Warteg Bahari 24 hadir dengan menu lengkap, rasa rumahan,
                        dan harga yang ramah di kantong. Dari sarapan sampai
                        makan malam, kami selalu siap menemani.
                    </p>

                    <Link
                        href="/menu"
                        className="button button-primary button-icon-end hero-cta-desktop"
                    >
                        Pesan sekarang
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>

                <img
                    className="hero-image"
                    src="images/makanan-di-piring.png"
                    alt="Makanan di piring"
                />

                <Link
                    href="/menu"
                    className="button button-primary hero-cta-mobile"
                >
                    Pesan sekarang
                    <i className="bi bi-arrow-right"></i>
                </Link>
            </section>

            {/* ABOUT */}
            <section className="about" id="about">
                <h2 className="about-title">Tentang kami</h2>
                <p className="about-text">
                    Warteg Bahari 24 merupakan tempat makan yang berdiri dengan
                    semangat menghadirkan cita rasa rumahan khas Indonesia bagi
                    semua kalangan. Kami berkomitmen untuk memberikan pengalaman
                    makan yang nyaman, cepat, dan ramah di kantong tanpa
                    mengurangi kualitas rasa.
                </p>
            </section>

            {/* VISI MISI */}
            <section className="vission-mission">
                <h2 className="vission-mission-title">Visi &amp; Misi</h2>

                <div className="vission-mission-body">
                    <div className="vission">
                        <h3 className="vission-title">Visi</h3>
                        <ul className="vission-list">
                            <li className="vission-item">
                                Menjadi warteg modern yang dikenal luas karena
                                cita rasa autentik, pelayanan cepat, dan
                                komitmen terhadap kepuasan pelanggan di seluruh
                                Indonesia.
                            </li>
                        </ul>
                    </div>

                    <div className="mission">
                        <h3 className="mission-title">Misi</h3>
                        <ul className="mission-list">
                            <li className="mission-item">
                                Menyediakan makanan rumahan yang lezat, bergizi,
                                dan terjangkau.
                            </li>
                            <li className="mission-item">
                                Memberikan pelayanan cepat dan ramah bagi setiap
                                pelanggan.
                            </li>
                            <li className="mission-item">
                                Menjaga kebersihan, kenyamanan, dan kualitas
                                bahan makanan setiap hari.
                            </li>
                            <li className="mission-item">
                                Mendukung kesejahteraan masyarakat sekitar
                                dengan membuka lapangan kerja.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* KEUNGGULAN */}
            <section className="advantages">
                <h2 className="advantages-title">Keunggulan kami</h2>

                <div className="advantages-body">
                    <div className="advantage">
                        <i className="bi bi-emoji-smile advantage-icon"></i>
                        <h3 className="advantage-title">
                            Pelayanan cepat &amp; ramah
                        </h3>
                        <p className="advantage-text">
                            Setiap pelanggan kami layani dengan cepat dan penuh
                            senyum, agar pengalaman makan lebih menyenangkan.
                        </p>
                    </div>

                    <div className="advantage">
                        <i className="bi bi-cup-hot advantage-icon"></i>
                        <h3 className="advantage-title">Rasa rumahan</h3>
                        <p className="advantage-text">
                            Cita rasa masakan rumahan yang membuat pelanggan
                            merasa seperti makan di rumah sendiri.
                        </p>
                    </div>

                    <div className="advantage">
                        <i className="bi bi-wallet2 advantage-icon"></i>
                        <h3 className="advantage-title">Harga terjangkau</h3>
                        <p className="advantage-text">
                            Menu lengkap dengan harga terjangkau untuk semua
                            kalangan, terutama mahasiswa dan pekerja.
                        </p>
                    </div>

                    <div className="advantage">
                        <i className="bi bi-clock-history advantage-icon"></i>
                        <h3 className="advantage-title">Buka 24 jam</h3>
                        <p className="advantage-text">
                            Kapan pun lapar, Warteg Bahari 24 selalu siap
                            melayani Anda siang maupun malam.
                        </p>
                    </div>
                </div>
            </section>

            {/* MENU */}
            <section className="menu">
                <h2 className="menu-title">Menu yang kami sajikan</h2>

                <div className="menu-cards">
                    <div className="menu-card">
                        <img
                            className="menu-card-image"
                            src="images/telur-balado.png"
                            alt="Telur Balado"
                        />
                        <h3 className="menu-card-title">Telur Balado</h3>
                        <p className="menu-card-text">
                            Telur rebus yang dilumuri sambal balado pedas gurih, menghadirkan rasa khas nusantara yang selalu bikin ingin tambah nasi.
                        </p>
                    </div>

                    <div className="menu-card">
                        <img
                            className="menu-card-image"
                            src="images/sayur-sop.png"
                            alt="Sayur Sop"
                        />
                        <h3 className="menu-card-title">Sayur Sop</h3>
                        <p className="menu-card-text">
                            Kuah bening hangat dengan campuran sayuran segar dan bumbu sederhana. Segar, menyehatkan dan cocok untuk semua suasana.
                        </p>
                    </div>

                    <div className="menu-card">
                        <img
                            className="menu-card-image"
                            src="images/tumis-pare.png"
                            alt="Tumis Pare"
                        />
                        <h3 className="menu-card-title">Tumis Pare</h3>
                        <p className="menu-card-text">
                            Tumis pare dengan sentuhan bumbu gurih pedas yang seimbang. Rasa khasnya justru bikin nagih di setiap suapan.
                        </p>
                    </div>
                </div>

                <Link
                    href="/menu"
                    className="button button-primary menu-more-button"
                >
                    Jelajahi menu lainnya
                </Link>
            </section>

            {/* REVIEW */}
            <section className="review">
                <h2 className="review-title">Apa kata mereka?</h2>

                <div className="review-cards">
                    <div className="review-card">
                        <img
                            className="review-card-image"
                            src="images/reviewer-1.png"
                            alt="Reviewer"
                        />
                        <h3 className="review-card-title">
                            Gamma Assyafi Fadhillah Ar Rasyad
                        </h3>
                        <p className="review-card-text">
                            Makanan dan tempat seperti warteg pada umumnya. Kalau mau makan hemat bisa di sini, telur+nasi+sayur+es teh cuma 10rb. Cocok buat anak kos yang pengen makan di luar tapi tetep hemat. Pelayanan sat set ga pake lama~
                        </p>
                    </div>

                    <div className="review-card">
                        <img
                            className="review-card-image"
                            src="images/reviewer-2.png"
                            alt="Reviewer"
                        />
                        <h3 className="review-card-title">
                            Putri Adibatur Rohmah
                        </h3>
                        <p className="review-card-text">
                            Saya kesini bawa anak kecil masakan rata2 enak, tapi pedas. Jadi saya hanya bisa pesan soto saja untuk anak saya. Rasanya enak, kek soto seger Jatim. Saran saya kalau siang tambahi sayuran bening atau sop
                        </p>
                    </div>

                    <div className="review-card">
                        <img
                            className="review-card-image"
                            src="images/reviewer-3.png"
                            alt="Reviewer"
                        />
                        <h3 className="review-card-title">
                            Hafidz Prasetya
                        </h3>
                        <p className="review-card-text">
                            Seperti warteg bahari pada umumnya sih, tapi yang ini warna oren dan bukan wkb grup. Harga oke murah, es teh lebih manis dari yang sebelah. Tempat tidak terlalu besar sangat. Rasa mirip warteg dimana saja. Point plus belum ada tukang parkir liar.
                        </p>
                    </div>

                    <div className="review-card">
                        <img
                            className="review-card-image"
                            src="images/reviewer-4.png"
                            alt="Reviewer"
                        />
                        <h3 className="review-card-title">
                            Muhammad Rifqi
                        </h3>
                        <p className="review-card-text">
                            Harga murah rasanya enak cocok untuk para mahasiswa, buka 24 jam jadi bisa kapan aja makan di sini, tempat bersih dan nyaman, parkir gratis es teh/teh anget pun gratis jika makan ditempat
                        </p>
                    </div>
                </div>

                <a
                    className="button button-primary review-more-button"
                    href="#"
                >
                    Lihat ulasan lainnya
                </a>
            </section>

            {/* CONTACT */}
            <section className="contact" id="contact">
                <h2 className="contact-title">Hubungi kami</h2>

                <div className="contact-row-2">
                    <form className="contact-form" onSubmit={submit}>
                        <div className="input-field">
                            <label className="label" htmlFor="name">
                                Nama
                            </label>
                            <input
                                className="input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nama Anda"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-field">
                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@email.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="input-field textarea-field">
                            <label className="label" htmlFor="message">
                                Pesan
                            </label>
                            <textarea
                                className="input textarea"
                                id="message"
                                name="message"
                                placeholder="Tulis pesan Anda"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            className="button button-primary"
                            disabled={processing}
                        >
                            Kirim
                        </button>
                    </form>

                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d589.6088243463973!2d110.8586531482735!3d-7.554362724909514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a17007fc39d2b%3A0xc6cea763d295c8a3!2sWarteg%20Bahari%2024%20UNS!5e0!3m2!1sid!2sid!4v1762347017058!5m2!1sid!2sid"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* BOTTOM TAGLINE */}
            <section className="bottom-tagline">
                <h2 className="tagline-title">
                    Perut kenyang, hati senang!
                    <br />
                    Semua ada di Warteg Bahari 24
                </h2>
                <Link
                    href="/menu"
                    className="button button-primary button-icon-end bottom-cta"
                >
                    Pesan sekarang
                    <i className="bi bi-arrow-right"></i>
                </Link>
            </section>
        </CustomerLayout>
    );
}