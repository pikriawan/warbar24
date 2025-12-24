import { Link } from "@inertiajs/react";

export default function Header() {
    return (
        <header className="header">
            <div className="announcement-banner" id="announcementBanner">
                <span className="announcement-text">
                    Gratis es teh/teh hangat jika makan di tempat | Buka 24 jam
                </span>
                <button className="button-base button-icon announcement-hide">
                    ✕
                </button>
            </div>

            <nav className="navbar">
                <div className="navbar-brand-container">
                    <Link href="/" className="link">
                        <img src="/images/brand.svg" alt="Brand" />
                    </Link>
                </div>

                <div className="navbar-desktop">
                    <Link href="/home" className="link navbar-link">Beranda</Link>
                    <Link href="/menu" className="link navbar-link">Pesan</Link>
                    <Link href="/#about" className="link navbar-link">Tentang</Link>
                    <Link href="/#contact" className="link navbar-link">Kontak</Link>
                    <Link href="/pesanan" className="button button-outlined">
                        Daftar pesanan
                    </Link>
                    <Link href="/cart" className="button button-primary">
                        Keranjang
                    </Link>
                </div>
            </nav>
        </header>
    );
}
