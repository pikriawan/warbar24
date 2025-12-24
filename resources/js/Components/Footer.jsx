import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-row">
                <div className="footer-brand-container">
                    <Link href="/" className="link">
                        <img src="/images/WARBAR24.svg" alt="Brand" />
                    </Link>
                    Jl. Kartika, Jebres, Surakarta
                </div>
                <div className="footer-navigation-container">
                    <div className="footer-navigation">
                        <h3 className="footer-navigation-title">Tautan</h3>
                        <div className="footer-navigation-links">
                            <Link className="link footer-navigation-link" href="/">
                                Beranda
                            </Link>
                            <Link className="link footer-navigation-link" href="/menu">
                                Pesan
                            </Link>
                            <Link className="link footer-navigation-link" href="/#about">
                                Tentang
                            </Link>
                            <Link className="link footer-navigation-link" href="/#contact">
                                Kontak
                            </Link>
                            <Link className="link footer-navigation-link" href="/orders">
                                Daftar pesanan
                            </Link>
                            <Link className="link footer-navigation-link" href="/cart">
                                Keranjang
                            </Link>
                        </div>
                    </div>
                    <div className="footer-navigation">
                        <h3 className="footer-navigation-title">Sosial Media</h3>
                        <div className="footer-navigation-links">
                            <a className="link footer-navigation-link" href="#">
                                Facebook
                            </a>
                            <a className="link footer-navigation-link" href="#">
                                Instagram
                            </a>
                            <a className="link footer-navigation-link" href="#">
                                TikTok
                            </a>
                            <a className="link footer-navigation-link" href="#">
                                X
                            </a>
                        </div>
                    </div>
                    <div className="footer-navigation">
                        <h3 className="footer-navigation-title">Kontak</h3>
                        <div className="footer-navigation-links">
                            <a className="link footer-navigation-link" href="#">
                                <i className="bi bi-whatsapp"></i>
                                0811 1111 1111
                            </a>
                            <a className="link footer-navigation-link" href="#">
                                <i className="bi bi-envelope"></i>
                                warbar24@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <span className="copyright">&copy; 2025 Warteg Bahari 24</span>
        </footer>
    );
}