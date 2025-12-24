import { Link, usePage, router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children, css = [] }) {
    // ✅ AMBIL page DENGAN AMAN
    const page = usePage();

    // props dari backend
    const { auth = {}, flash = {} } = page.props || {};

    // url SELALU string (anti undefined)
    const currentUrl = typeof page.url === "string" ? page.url : "";

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // ✅ AUTO HIDE FLASH MESSAGE
    useEffect(() => {
        if (!flash?.success && !flash?.error) return;

        const timer = setTimeout(() => {
            const alerts = document.querySelectorAll(".alert");
            alerts.forEach(alert => {
                alert.style.transition = "opacity 0.5s";
                alert.style.opacity = "0";
                setTimeout(() => alert.remove(), 500);
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [flash]);

    const handleLogout = (e) => {
        e.preventDefault();
        if (confirm("Yakin ingin logout?")) {
            router.post("/admin/logout");
        }
    };

    const getRoleLabel = (role) => {
        const roles = {
            admin: "Administrator",
            kasir: "Cashier",
            dapur: "Kitchen",
        };
        return roles[role] || role || "-";
    };

    // ✅ HELPER ACTIVE MENU (AMAN)
    const isActive = (path) => {
        if (!currentUrl) return false;
        return currentUrl.startsWith(path);
    };

    return (
        <>
            {/* ===== HEAD ===== */}
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
                />
                <link rel="stylesheet" href="/css/admin.css" />
                {css.map((file, index) => (
                    <link key={index} rel="stylesheet" href={`/css/${file}`} />
                ))}
            </Head>

            <div className="container">
                {/* ===== SIDEBAR ===== */}
                <aside className="sidebar">
                    <div className="logo">
                        <img src="/images/brand.svg" alt="WARBAR24" />
                    </div>

                    <nav className="menu">
                        <Link
                            href="/admin/dashboard"
                            className={`menu-item ${isActive("/admin/dashboard") ? "active" : ""}`}
                        >
                            📊 Dashboard
                        </Link>

                        {auth?.user?.role === "admin" && (
                            <Link
                                href="/admin/menu"
                                className={`menu-item ${isActive("/admin/menu") ? "active" : ""}`}
                            >
                                🍽️ Menu
                            </Link>
                        )}

                        <Link
                            href="/admin/pesanan"
                            className={`menu-item ${isActive("/admin/pesanan") ? "active" : ""}`}
                        >
                            📋 Daftar Pesanan
                        </Link>

                        {["admin", "kasir"].includes(auth?.user?.role) && (
                            <Link
                                href="/admin/laporan"
                                className={`menu-item ${isActive("/admin/laporan") ? "active" : ""}`}
                            >
                                📈 Laporan
                            </Link>
                        )}
                    </nav>

                    {/* ===== USER PROFILE ===== */}
                    {auth?.user && (
                        <div
                            className="user-profile"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="avatar">
                                {auth.user.foto_profil ? (
                                    <img
                                        src={`/storage/uploads/${auth.user.foto_profil}`}
                                        alt="Profil"
                                    />
                                ) : (
                                    "👤"
                                )}
                            </div>

                            <div className="user-info">
                                <p className="user-name">{auth.user.username}</p>
                                <p className="user-role">
                                    {getRoleLabel(auth.user.role)}
                                </p>
                            </div>

                            <div
                                className={`profile-dropdown ${
                                    showProfileMenu ? "show" : ""
                                }`}
                            >
                                <Link
                                    href="/admin/profil"
                                    className="dropdown-item"
                                >
                                    ⚙️ Profil Saya
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="dropdown-item logout"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    )}
                </aside>

                {/* ===== MAIN CONTENT ===== */}
                <main className="content">
                    {flash?.success && (
                        <div className="alert alert-success">
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="alert alert-danger">
                            {flash.error}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </>
    );
}
