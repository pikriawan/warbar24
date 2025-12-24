import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function Pesanan({ pesanan }) {
    useEffect(() => {
        // Auto-refresh setiap 15 detik
        const interval = setInterval(() => {
            location.reload();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

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

    function getStatusBadgeClass(status, type) {
        if (type === "payment") {
            return status === "verified"
                ? "status-dibayar"
                : "status-belum-dibayar";
        }

        // order status
        const statusMap = {
            pending: "status-belum-diproses",
            diproses: "status-diproses",
            selesai: "status-selesai",
            dibatalkan: "status-dibatalkan",
        };
        return statusMap[status] || "status-belum-diproses";
    }

    return (
        <CustomerLayout css={["daftar-pesanan.css"]}>
            <div className="container">
                <h1>Daftar pesanan</h1>

                <div className="table-wrapper" id="tableWrapper">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>No. pesanan</th>
                                <th>Total bayar</th>
                                <th>Metode pembayaran</th>
                                <th>Status pembayaran</th>
                                <th>Status pesanan</th>
                                <th>Tanggal pemesanan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pesanan.length > 0 ? (
                                pesanan.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            Rp.{" "}
                                            {order.total_harga.toLocaleString(
                                                "id-ID"
                                            )}
                                            ,-
                                        </td>
                                        <td>
                                            {order.metode_pembayaran
                                                .charAt(0)
                                                .toUpperCase() +
                                                order.metode_pembayaran.slice(
                                                    1
                                                )}
                                        </td>
                                        <td>
                                            <span
                                                className={`status-badge ${getStatusBadgeClass(
                                                    order.status_pembayaran,
                                                    "payment"
                                                )}`}
                                            >
                                                {order.status_pembayaran}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`status-badge ${getStatusBadgeClass(
                                                    order.status_pesanan,
                                                    "order"
                                                )}`}
                                            >
                                                {order.status_pesanan}
                                            </span>
                                        </td>
                                        <td>{order.tanggal_pesanan}</td>
                                        <td>
                                            <a
                                                href={`/pesanan/${order.id}`}
                                                className="btn-action"
                                            >
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty-state">
                                        <p>Belum ada pesanan</p>
                                        <a href="/menu" className="btn-order-now">
                                            Pesan Sekarang
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </CustomerLayout>
    );
}