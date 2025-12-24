import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";

export default function PesananIndex({ pesanans, filter }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    function handleVerifikasi(pesananId) {
        if (confirm(`💵 Apakah Anda yakin pembayaran CASH untuk pesanan #${pesananId} sudah diterima?`)) {
            router.post(`/admin/pesanan/${pesananId}/verifikasi`);
        }
    }

    function handleLanjutkan(pesananId, status) {
        const nextStatus = status === 'pending' ? 'DIPROSES' : 'SELESAI';
        if (confirm(`➡️ Apakah Anda yakin ingin melanjutkan pesanan ke status ${nextStatus}?`)) {
            router.post(`/admin/pesanan/${pesananId}/lanjutkan`);
        }
    }

    function handleBatalkan(pesananId) {
        if (confirm(`⚠️ Apakah Anda yakin ingin MEMBATALKAN pesanan #${pesananId}?\n\n• Jika pembayaran sudah verified → akan di-REFUND\n• Jika pembayaran masih pending → akan di-CANCEL`)) {
            router.post(`/admin/pesanan/${pesananId}/batalkan`);
        }
    }

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const getStatusBadge = (status) => {
        const badges = {
            'pending': '⏳ Pending',
            'verified': '✅ Verified',
            'refunded': '💸 Refunded',
            'canceled': '❌ Canceled',
            'failed': '❌ Failed'
        };
        return badges[status] || status;
    };

    const getStatusPesananBadge = (status) => {
        const badges = {
            'pending': '⏳ Pending',
            'diproses': '🍳 Diproses',
            'selesai': '✅ Selesai',
            'dibatalkan': '❌ Dibatalkan'
        };
        return badges[status] || status;
    };

    return (
        <AdminLayout css={["admin-pesanan.css"]}>
            <div className="header">
                <h2>Daftar Pesanan</h2>
                <div className="filter-buttons">
                    <Link
                        href="/admin/pesanan?filter=all"
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    >
                        Semua
                    </Link>
                    <Link
                        href="/admin/pesanan?filter=pending"
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    >
                        Pending
                    </Link>
                    <Link
                        href="/admin/pesanan?filter=diproses"
                        className={`filter-btn ${filter === 'diproses' ? 'active' : ''}`}
                    >
                        Diproses
                    </Link>
                    <Link
                        href="/admin/pesanan?filter=selesai"
                        className={`filter-btn ${filter === 'selesai' ? 'active' : ''}`}
                    >
                        Selesai
                    </Link>
                    <Link
                        href="/admin/pesanan?filter=dibatalkan"
                        className={`filter-btn ${filter === 'dibatalkan' ? 'active' : ''}`}
                    >
                        Dibatalkan
                    </Link>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>No. Pesanan</th>
                            <th>Pelanggan</th>
                            <th>Kontak</th>
                            <th>Total</th>
                            <th>Pembayaran</th>
                            <th>Status Bayar</th>
                            <th>Status Pesanan</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesanans.length > 0 ? (
                            pesanans.map((pesanan) => (
                                <tr key={pesanan.id}>
                                    <td>
                                        <Link
                                            href={`/admin/pesanan/${pesanan.id}`}
                                            className="order-link"
                                        >
                                            #{String(pesanan.id).padStart(5, '0')}
                                        </Link>
                                    </td>
                                    <td>{pesanan.nama_depan + ' ' + pesanan.nama_belakang}</td>
                                    <td>
                                        <div className="contact-info">
                                            <div>📞 {pesanan.telepon}</div>
                                            <div>✉️ {pesanan.email}</div>
                                        </div>
                                    </td>
                                    <td>Rp. {formatRupiah(pesanan.total_harga)},-</td>
                                    <td>
                                        <span className={`badge badge-${pesanan.metode_pembayaran}`}>
                                            {pesanan.metode_pembayaran === 'cash' ? '💵 Cash' : '📱 Digital'}
                                        </span>
                                    </td>
                                    <td>
                                        {pesanan.metode_pembayaran === 'cash' ? (
                                            pesanan.status_pembayaran === 'pending' && ['admin', 'kasir'].includes(role) ? (
                                                <button
                                                    onClick={() => handleVerifikasi(pesanan.id)}
                                                    className="checkbox-btn"
                                                    title="Klik untuk verifikasi pembayaran"
                                                >
                                                    <span className="checkbox unchecked">☐</span> Pending
                                                </button>
                                            ) : pesanan.status_pembayaran === 'verified' ? (
                                                <span className="badge badge-success">
                                                    <span className="checkbox checked">☑</span> Verified
                                                </span>
                                            ) : (
                                                <span className={`badge badge-${pesanan.status_pembayaran === 'refunded' ? 'info' : 'danger'}`}>
                                                    {getStatusBadge(pesanan.status_pembayaran)}
                                                </span>
                                            )
                                        ) : (
                                            <span className={`badge badge-${pesanan.status_pembayaran === 'verified' ? 'success' : pesanan.status_pembayaran === 'refunded' ? 'info' : pesanan.status_pembayaran === 'pending' ? 'warning' : 'danger'}`}>
                                                {getStatusBadge(pesanan.status_pembayaran)}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="status-flow">
                                            <span className={`badge-status badge-${pesanan.status_pesanan}`}>
                                                {getStatusPesananBadge(pesanan.status_pesanan)}
                                            </span>

                                            {pesanan.status_pesanan === 'pending' && 
                                             pesanan.status_pembayaran === 'verified' && 
                                             ['admin', 'dapur'].includes(role) && (
                                                <button
                                                    onClick={() => handleLanjutkan(pesanan.id, 'pending')}
                                                    className="btn-arrow"
                                                    title="Lanjutkan ke Diproses"
                                                >
                                                    ➡️
                                                </button>
                                            )}

                                            {pesanan.status_pesanan === 'diproses' && 
                                             ['admin', 'dapur'].includes(role) && (
                                                <button
                                                    onClick={() => handleLanjutkan(pesanan.id, 'diproses')}
                                                    className="btn-arrow"
                                                    title="Lanjutkan ke Selesai"
                                                >
                                                    ➡️
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td>{new Date(pesanan.tanggal_pesanan).toLocaleString('id-ID')}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link
                                                href={`/admin/pesanan/${pesanan.id}`}
                                                className="btn-icon btn-view"
                                                title="Lihat Detail"
                                            >
                                                👁️
                                            </Link>

                                            {!['selesai', 'dibatalkan'].includes(pesanan.status_pesanan) && 
                                             ['admin', 'kasir'].includes(role) && (
                                                <button
                                                    onClick={() => handleBatalkan(pesanan.id)}
                                                    className="btn-icon btn-cancel"
                                                    title="Batalkan Pesanan"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                                    <p style={{ color: '#999' }}>Belum ada pesanan</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}