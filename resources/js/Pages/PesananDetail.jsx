import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";

export default function PesananDetail({ pesanan }) {
    useEffect(() => {
        // Auto-refresh setiap 10 detik jika pesanan belum selesai/dibatalkan
        if (
            pesanan.status_pesanan !== "selesai" &&
            pesanan.status_pesanan !== "dibatalkan"
        ) {
            const interval = setInterval(() => {
                location.reload();
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [pesanan.status_pesanan]);

    useEffect(() => {
        // Hilangkan indikator scroll
        const tableWrapper = document.getElementById("tableWrapper");
        if (tableWrapper) {
            const handleScroll = function () {
                if (this.scrollLeft > 0) {
                    this.classList.add("scrolled");
                }
            };
            tableWrapper.addEventListener("scroll", handleScroll, {
                once: true,
            });

            return () => {
                tableWrapper.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    function batalkanPesanan(pesananId) {
        if (confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) {
            fetch("/pesanan/batalkan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ pesanan_id: pesananId }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        alert("✅ Pesanan berhasil dibatalkan");
                        location.reload();
                    } else {
                        alert("❌ Gagal membatalkan pesanan");
                    }
                })
                .catch((err) => {
                    alert("❌ Terjadi kesalahan: " + err);
                });
        }
    }

    function getPaymentStatusClass(status) {
        if (status === "verified") return "text-green";
        if (["pending", "failed", "refunded", "canceled"].includes(status))
            return "text-red";
        return "text-red";
    }

    function getOrderStatusClass(status) {
        if (["selesai", "dibatalkan"].includes(status)) return "text-green";
        if (status === "diproses") return "text-yellow";
        return "text-red";
    }

    function renderAlertBox() {
        const { status_pembayaran, metode_pembayaran, status_pesanan } =
            pesanan;

        if (status_pembayaran === "pending" && metode_pembayaran === "cash") {
            return (
                <>
                    <div className="status">
                        <h2>Selesaikan pembayaran!</h2>
                    </div>
                    <div className="alert-box alert-success">
                        <p>Lakukan pembayaran cash di kasir!</p>
                        <button
                            className="btn-red"
                            onClick={() => batalkanPesanan(pesanan.id)}
                        >
                            Batalkan pesanan
                        </button>
                    </div>
                </>
            );
        }

        if (
            status_pembayaran === "pending" &&
            metode_pembayaran === "digital"
        ) {
            return (
                <>
                    <div className="status">
                        <h2>Selesaikan pembayaran!</h2>
                    </div>
                    <div className="alert-box alert-success">
                        <p>Lakukan pembayaran di halaman pembayaran!</p>
                        <div className="button-group">
                            <button
                                className="btn-green"
                                onClick={() =>
                                    window.open(
                                        `https://app.sandbox.midtrans.com/snap/v2/vtweb/${pesanan.transaction_token}`,
                                        "_blank"
                                    )
                                }
                            >
                                Pergi ke halaman pembayaran
                            </button>
                            <button
                                className="btn-red"
                                onClick={() => batalkanPesanan(pesanan.id)}
                            >
                                Batalkan pesanan
                            </button>
                        </div>
                    </div>
                </>
            );
        }

        if (status_pembayaran === "failed") {
            return (
                <>
                    <div className="status">
                        <h2>Pembayaran gagal!</h2>
                    </div>
                    <div className="alert-box alert-danger">
                        <div className="alert-icon">✕</div>
                        <p>Terjadi kesalahan saat memproses pembayaranmu</p>
                        <div className="button-group">
                            <button
                                className="btn-green"
                                onClick={() =>
                                    window.open(
                                        `https://app.sandbox.midtrans.com/snap/v2/vtweb/${pesanan.transaction_token}`,
                                        "_blank"
                                    )
                                }
                            >
                                Ulang pembayaran
                            </button>
                            <button
                                className="btn-red"
                                onClick={() => batalkanPesanan(pesanan.id)}
                            >
                                Batalkan pesanan
                            </button>
                        </div>
                    </div>
                </>
            );
        }

        if (status_pesanan === "dibatalkan") {
            return (
                <>
                    <div className="status">
                        <h2>Pesanan dibatalkan!</h2>
                    </div>
                    <div className="alert-box alert-success">
                        <div className="alert-icon">✕</div>
                        <p>Pesananmu berhasil dibatalkan</p>
                        <div className="button-group">
                            <a href="/menu" className="btn-green">
                                Pesan lagi
                            </a>
                            <a href="/" className="btn-outline">
                                Kembali ke beranda
                            </a>
                        </div>
                    </div>
                </>
            );
        }

        if (
            status_pembayaran === "verified" &&
            status_pesanan !== "selesai"
        ) {
            return (
                <>
                    <div className="status">
                        <h2>Pembayaran berhasil!</h2>
                    </div>
                    <div className="alert-box alert-success">
                        <div className="alert-icon">✓</div>
                        <p>
                            Kami sedang memproses pesananmu. Silahkan tunggu!
                        </p>
                    </div>
                </>
            );
        }

        if (status_pesanan === "selesai") {
            return (
                <>
                    <div className="status">
                        <h2>Pesanan selesai!</h2>
                    </div>
                    <div className="alert-box alert-success">
                        <div className="alert-icon">✓</div>
                        <p>Pesananmu selesai! Selamat menikmati!</p>
                        <div className="button-group">
                            <a href="/menu" className="btn-green">
                                Pesan lagi
                            </a>
                            <a href="/" className="btn-outline">
                                Kembali ke beranda
                            </a>
                        </div>
                    </div>
                </>
            );
        }

        return null;
    }

    return (
        <CustomerLayout css={["detail-pesanan.css"]}>
            <div className="container">
                {renderAlertBox()}

                {/* Detail Pesanan */}
                <div className="detail-section">
                    <h2>Detail pesanan</h2>
                    <div className="detail-grid">
                        <div className="detail-row">
                            <span className="label">No. pesanan</span>
                            <span className="value">{pesanan.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Nama</span>
                            <span className="value">
                                {pesanan.nama_lengkap}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Total bayar</span>
                            <span className="value">
                                Rp.{" "}
                                {pesanan.total_harga.toLocaleString("id-ID")},-
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Metode pembayaran</span>
                            <span className="value">
                                {pesanan.metode_pembayaran
                                    .charAt(0)
                                    .toUpperCase() +
                                    pesanan.metode_pembayaran.slice(1)}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Status pembayaran</span>
                            <span
                                className={`value ${getPaymentStatusClass(
                                    pesanan.status_pembayaran
                                )}`}
                            >
                                {pesanan.status_pembayaran}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Status pesanan</span>
                            <span
                                className={`value ${getOrderStatusClass(
                                    pesanan.status_pesanan
                                )}`}
                            >
                                {pesanan.status_pesanan}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Tanggal pemesanan</span>
                            <span className="value">
                                {pesanan.tanggal_pesanan}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Item Pesanan */}
                <div className="items-section">
                    <h2>Item pesanan</h2>
                    <div className="table-wrapper" id="tableWrapper">
                        <table className="items-table">
                            <thead>
                                <tr>
                                    <th>Menu</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pesanan.detail_pesanan.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nama_menu}</td>
                                        <td>
                                            Rp.{" "}
                                            {item.harga.toLocaleString("id-ID")}
                                            ,-
                                        </td>
                                        <td>{item.jumlah}</td>
                                        <td>
                                            Rp.{" "}
                                            {item.subtotal.toLocaleString(
                                                "id-ID"
                                            )}
                                            ,-
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="3">
                                        <strong>Total bayar</strong>
                                    </td>
                                    <td>
                                        <strong>
                                            Rp.{" "}
                                            {pesanan.total_harga.toLocaleString(
                                                "id-ID"
                                            )}
                                            ,-
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}