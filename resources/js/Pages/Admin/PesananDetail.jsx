import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";

export default function PesananDetail({ pesanan }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    function handleVerifikasi() {
        if (confirm('Konfirmasi pembayaran telah diterima?')) {
            router.post(`/admin/pesanan/${pesanan.id}/verifikasi`);
        }
    }

    function handleLanjutkan() {
        router.post(`/admin/pesanan/${pesanan.id}/lanjutkan`);
    }

    function handleBatalkan() {
        if (confirm('Yakin ingin membatalkan pesanan ini?')) {
            router.post(`/admin/pesanan/${pesanan.id}/batalkan`);
        }
    }

    return (
        <AdminLayout css={["admin-detail-pesanan.css"]}>
            <div className="header">
                <h2>Detail Pesanan #{String(pesanan.id).padStart(5, '0')}</h2>
                <Link href="/admin/pesanan" className="btn-back">
                    ← Kembali
                </Link>
            </div>

            <div className="detail-container">
                {/* Info Pelanggan */}
                <div className="detail-card">
                    <h3>Informasi Pelanggan</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Nama:</label>
                            <span>{pesanan.nama_lengkap}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{pesanan.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Telepon:</label>
                            <span>{pesanan.telepon}</span>
                        </div>
                        <div className="info-item">
                            <label>Makan di tempat:</label>
                            <span>{pesanan.makan_ditempat ? '✅ Ya' : '❌ Tidak'}</span>
                        </div>
                        {pesanan.makan_ditempat && pesanan.minuman_gratis && (
                            <div className="info-item">
                                <label>Minuman Gratis:</label>
                                <span>🥤 {pesanan.minuman_gratis}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Pesanan */}
                <div className="detail-card">
                    <h3>Informasi Pesanan</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Tanggal Pesanan:</label>
                            <span>{formatDate(pesanan.tanggal_pesanan)} WIB</span>
                        </div>
                        <div className="info-item">
                            <label>Metode Pembayaran:</label>
                            <span className={`badge badge-${pesanan.metode_pembayaran}`}>
                                {pesanan.metode_pembayaran === 'cash' ? '💵 Cash' : '📱 Digital'}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Status Pembayaran:</label>
                            {pesanan.status_pembayaran === 'pending' && (
                                <span className="badge badge-warning">⏳ Pending</span>
                            )}
                            {pesanan.status_pembayaran === 'verified' && (
                                <span className="badge badge-success">✅ Verified</span>
                            )}
                            {pesanan.status_pembayaran === 'refunded' && (
                                <span className="badge badge-info">💸 Refunded</span>
                            )}
                            {pesanan.status_pembayaran === 'canceled' && (
                                <span className="badge badge-danger">❌ Canceled</span>
                            )}
                            {pesanan.status_pembayaran === 'failed' && (
                                <span className="badge badge-danger">❌ Failed</span>
                            )}
                        </div>
                        <div className="info-item">
                            <label>Status Pesanan:</label>
                            <span className={`badge status-${pesanan.status_pesanan}`}>
                                {pesanan.status_pesanan === 'pending' && '⏳ Pending'}
                                {pesanan.status_pesanan === 'diproses' && '🍳 Diproses'}
                                {pesanan.status_pesanan === 'selesai' && '✅ Selesai'}
                                {pesanan.status_pesanan === 'dibatalkan' && '❌ Dibatalkan'}
                            </span>
                        </div>
                        {pesanan.tanggal_selesai && (
                            <div className="info-item">
                                <label>Tanggal Selesai:</label>
                                <span>{formatDate(pesanan.tanggal_selesai)} WIB</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Daftar Item */}
                <div className="detail-card">
                    <h3>Item Pesanan</h3>
                    <table className="item-table">
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
                                    <td>Rp. {formatRupiah(item.harga)},-</td>
                                    <td>{item.jumlah}x</td>
                                    <td>Rp. {formatRupiah(item.subtotal)},-</td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td colSpan="3"><strong>Total Pembayaran</strong></td>
                                <td><strong>Rp. {formatRupiah(pesanan.total_harga)},-</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Aksi Cepat */}
                <div className="detail-card">
                    <h3>Aksi</h3>
                    <div className="action-grid">
                        {/* Verifikasi (ADMIN & KASIR) */}
                        {pesanan.metode_pembayaran === 'cash' &&
                         pesanan.status_pembayaran === 'pending' &&
                         ['admin', 'kasir'].includes(role) && (
                            <button
                                onClick={handleVerifikasi}
                                className="btn-action btn-verify"
                            >
                                ✅ Verifikasi Pembayaran
                            </button>
                        )}

                        {/* Mulai Proses (ADMIN & DAPUR) */}
                        {pesanan.status_pesanan === 'pending' &&
                         pesanan.status_pembayaran === 'verified' &&
                         ['admin', 'dapur'].includes(role) && (
                            <button
                                onClick={handleLanjutkan}
                                className="btn-action btn-process"
                            >
                                🍳 Mulai Proses
                            </button>
                        )}

                        {/* Tandai Selesai (ADMIN & DAPUR) */}
                        {pesanan.status_pesanan === 'diproses' &&
                         ['admin', 'dapur'].includes(role) && (
                            <button
                                onClick={handleLanjutkan}
                                className="btn-action btn-complete"
                            >
                                ✅ Tandai Selesai
                            </button>
                        )}

                        {/* Batalkan (ADMIN & KASIR) */}
                        {!['selesai', 'dibatalkan'].includes(pesanan.status_pesanan) &&
                         ['admin', 'kasir'].includes(role) && (
                            <button
                                onClick={handleBatalkan}
                                className="btn-action btn-cancel"
                            >
                                ❌ Batalkan Pesanan
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}