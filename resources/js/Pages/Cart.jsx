import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Cart({ keranjang = [], totalHarga = 0 }) {
    const [selectedDrink, setSelectedDrink] = useState("Es Teh");
    const [makanDitempat, setMakanDitempat] = useState(true);

    const drinks = [
        { name: "Es Teh", image: "/uploads/es-teh.png" },
        { name: "Teh Hangat", image: "/uploads/teh-hangat.png" },
        { name: "Air es", image: "/uploads/air-es.png" },
    ];

    const updateQuantity = (id, action) => {
        router.post(
            "/cart/update",
            { id, action },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Cart will be automatically updated via Inertia
                },
            }
        );
    };

    const handleCheckout = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        nama: formData.get('nama'),
        nama_belakang: formData.get('nama_belakang'),
        email: formData.get('email'),
        telepon: formData.get('telepon'),
        metode: formData.get('metode'),
        makan_ditempat: makanDitempat ? 1 : 0,
        minuman_gratis: makanDitempat ? selectedDrink : null,
    };

    router.post('/cart/checkout', data, {
        preserveScroll: false,
        onSuccess: (page) => {
            // Inertia akan otomatis handle redirect dari backend
            console.log('Checkout berhasil');
        },
        onError: (errors) => {
            console.error('Checkout error:', errors);
            alert('Terjadi kesalahan: ' + JSON.stringify(errors));
            }
        });
    };

    return (
        <CustomerLayout css={["cart.css"]}>
            <div className="container">
                <h1 className="page-title">Keranjang Anda</h1>

                {/* Tabel Keranjang */}
                <div className="cart-section">
                    {keranjang?.length > 0 ? (
                        <>
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Menu</th>
                                        <th>Jumlah</th>
                                        <th>Harga Satuan</th>
                                        <th>Total Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {keranjang.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="menu-info">
                                                    <img
                                                        src={`/uploads/${item.menu.gambar}`}
                                                        alt={item.menu.nama}
                                                    />
                                                    <span>{item.menu.nama}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity-control">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                "minus"
                                                            )
                                                        }
                                                    >
                                                        −
                                                    </button>
                                                    <span className="qty-display">
                                                        {item.jumlah}
                                                    </span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                "plus"
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                Rp.{" "}
                                                {item.menu.harga.toLocaleString(
                                                    "id-ID"
                                                )}
                                                ,-
                                            </td>
                                            <td>
                                                Rp.{" "}
                                                {item.total.toLocaleString(
                                                    "id-ID"
                                                )}
                                                ,-
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="cart-total">
                                <span>Jumlah yang harus dibayar</span>
                                <strong>
                                    Rp. {totalHarga.toLocaleString("id-ID")},-
                                </strong>
                            </div>
                        </>
                    ) : (
                        <div className="cart-box">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Keranjangmu kosong!</p>
                            <Link href="/menu" className="btn-solid">
                                Yuk, isi keranjangmu sekarang!
                            </Link>
                        </div>
                    )}
                </div>

                {keranjang?.length > 0 && (
                    <>
                        {/* Minuman Gratis */}
                        <div className="free-drink-section">
                            <h2 className="section-title">
                                Makan ditempat? Dapatkan minuman gratis!
                            </h2>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="makanDitempat"
                                    checked={makanDitempat}
                                    onChange={(e) =>
                                        setMakanDitempat(e.target.checked)
                                    }
                                />
                                <label htmlFor="makanDitempat">
                                    Makan di tempat
                                </label>
                            </div>
                            {makanDitempat && (
                                <div className="drink-options">
                                    {drinks.map((drink) => (
                                        <div
                                            key={drink.name}
                                            className={`drink-card ${
                                                selectedDrink === drink.name
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedDrink(drink.name)
                                            }
                                        >
                                            <img
                                                src={drink.image}
                                                alt={drink.name}
                                            />
                                            <span>{drink.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Form Pembayaran */}
                        <div className="payment-section">
                            <h2 className="section-title">Pembayaran</h2>
                            <form onSubmit={handleCheckout}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nama depan</label>
                                        <input
                                            type="text"
                                            placeholder="Nama depan Anda"
                                            name="nama"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nama belakang</label>
                                        <input
                                            type="text"
                                            placeholder="Nama belakang Anda"
                                            name="nama_belakang"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        name="email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Telepon</label>
                                    <input
                                        type="tel"
                                        placeholder="0812222222"
                                        name="telepon"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Metode pembayaran</label>
                                    <div className="payment-methods">
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                value="cash"
                                                name="metode"
                                                required
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="payment-icon">
                                                💵
                                            </span>
                                            <span>Cash</span>
                                        </label>
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="metode"
                                                value="digital"
                                                required
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="payment-icon">
                                                📱
                                            </span>
                                            <span>Digital</span>
                                        </label>
                                    </div>
                                    <p className="payment-note">
                                        * Pembayaran cash dilakukan langsung di
                                        kasir
                                    </p>
                                </div>

                                <button type="submit" className="btn-checkout">
                                    Lanjut checkout →
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </CustomerLayout>
    );
}