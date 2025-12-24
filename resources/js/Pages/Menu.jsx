import CustomerLayout from "@/Layouts/CustomerLayout";
import { useState, useEffect } from "react";

export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeFilter, setActiveFilter] = useState("semua");

    useEffect(() => {
        loadMenu();
    }, []);

    async function loadMenu() {
        const response = await fetch("/api/menu");
        const data = await response.json();
        setMenu(data.data);
    }

    function handleSearch() {
        // Search akan otomatis ter-trigger dari filteredMenu()
    }

    function handleSearchInput(e) {
        setSearchKeyword(e.target.value);
        // Auto search saat input kosong
        if (e.target.value.trim() === "") {
            setSearchKeyword("");
        }
    }

    function filteredMenu() {
        let filtered = menu;

        // Filter by category
        if (activeFilter !== "semua") {
            filtered = filtered.filter((item) => item.kategori === activeFilter);
        }

        // Filter by search
        if (searchKeyword.trim()) {
            filtered = filtered.filter((item) =>
                item.nama.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        return filtered;
    }

    function groupByCategory(items) {
        return items.reduce((acc, item) => {
            if (!acc[item.kategori]) acc[item.kategori] = [];
            acc[item.kategori].push(item);
            return acc;
        }, {});
    }

    async function addToCart(menuId) {
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const response = await fetch("/cart/tambah", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ menu_id: menuId }),
        });

        const data = await response.json();
        if (data.status === "success") {
            alert("✅ Menu berhasil ditambahkan ke keranjang!");
        } else {
            alert("❌ Gagal menambahkan ke keranjang.");
        }
    }

    const groupedMenu = groupByCategory(filteredMenu());

    return (
        <CustomerLayout css={["menu.css"]}>
            <div className="judul">
                <h2>Mau pesan apa hari ini?</h2>
            </div>

            <div className="search-section">
                <label>Cari menu</label>
                <br />
                <div className="search-bar">
                    <input
                        id="searchInput"
                        placeholder="Ketik nama menu..."
                        value={searchKeyword}
                        onChange={handleSearchInput}
                    />
                    <button onClick={handleSearch}>Cari</button>
                </div>
            </div>

            <div className="filter-bar">
                <button
                    id="btnSemua"
                    className={activeFilter === "semua" ? "active" : ""}
                    onClick={() => setActiveFilter("semua")}
                >
                    Semua
                </button>
                <button
                    id="btnMakanan"
                    className={activeFilter === "makanan" ? "active" : ""}
                    onClick={() => setActiveFilter("makanan")}
                >
                    Makanan
                </button>
                <button
                    id="btnMinuman"
                    className={activeFilter === "minuman" ? "active" : ""}
                    onClick={() => setActiveFilter("minuman")}
                >
                    Minuman
                </button>
            </div>

            {/* BAGIAN MAKANAN */}
            {(activeFilter === "semua" || activeFilter === "makanan") &&
                groupedMenu.makanan && (
                    <div id="makanan" className="kategori">
                        <h2>Makanan</h2>
                        <div className="menu-grid" id="menuGridMakanan">
                            {groupedMenu.makanan.map((item) => (
                                <div key={item.id} className="item">
                                    <img
                                        src={`/storage/uploads/${item.gambar}`}
                                        alt={item.nama}
                                        className={
                                            item.stok <= 0 ? "gambar-habis" : ""
                                        }
                                    />
                                    <h3>{item.nama}</h3>
                                    <p className="harga">Rp. {item.harga},-/pcs</p>
                                    <p className="stok">
                                        Stok:{" "}
                                        {item.stok === 0
                                            ? "Habis"
                                            : "Tersedia"}
                                    </p>
                                    <button
                                        className="btn-cart-add"
                                        data-id={item.id}
                                        disabled={item.stok <= 0}
                                        onClick={() => addToCart(item.id)}
                                    >
                                        {item.stok <= 0
                                            ? "Habis"
                                            : "Tambah ke Keranjang"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {/* BAGIAN MINUMAN */}
            {(activeFilter === "semua" || activeFilter === "minuman") &&
                groupedMenu.minuman && (
                    <div id="minuman" className="kategori">
                        <h2>Minuman</h2>
                        <div className="menu-grid" id="menuGridMinuman">
                            {groupedMenu.minuman.map((item) => (
                                <div key={item.id} className="item">
                                    <img
                                        src={`/storage/uploads/${item.gambar}`}
                                        alt={item.nama}
                                        className={
                                            item.stok <= 0 ? "gambar-habis" : ""
                                        }
                                    />
                                    <h3>{item.nama}</h3>
                                    <p className="harga">Rp. {item.harga},-/pcs</p>
                                    <p className="stok">
                                        Stok:{" "}
                                        {item.stok === 0
                                            ? "Habis"
                                            : "Tersedia"}
                                    </p>
                                    <button
                                        className="btn-cart-add"
                                        data-id={item.id}
                                        disabled={item.stok <= 0}
                                        onClick={() => addToCart(item.id)}
                                    >
                                        {item.stok <= 0
                                            ? "Habis"
                                            : "Tambah ke Keranjang"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </CustomerLayout>
    );
}