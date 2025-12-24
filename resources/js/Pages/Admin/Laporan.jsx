import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Laporan({
    periode,
    tanggal_awal,
    tanggal_akhir,
    stats,
    payment_cash,
    payment_digital,
    chart_data,
    chart_labels
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [showCustomDate, setShowCustomDate] = useState(periode === 'custom');

    const { data, setData, get } = useForm({
        periode: 'custom',
        tanggal_awal: tanggal_awal || '',
        tanggal_akhir: tanggal_akhir || ''
    });

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    function handleCustomDateSubmit(e) {
        e.preventDefault();
        get('/admin/laporan', { preserveState: true });
    }

    useEffect(() => {
        if (chart_data && chart_data.length > 0 && chartRef.current) {
            // Destroy previous chart instance
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Load Chart.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
            script.onload = () => {
                const ctx = chartRef.current;
                if (ctx && !ctx.dataset.rendered) {
                    ctx.dataset.rendered = 'true';
                    chartInstance.current = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: chart_labels,
                            datasets: [{
                                label: 'Pendapatan (Rp)',
                                data: chart_data,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                borderWidth: 2,
                                tension: 0.4,
                                fill: true,
                                pointRadius: 4,
                                pointHoverRadius: 6,
                                pointBackgroundColor: '#3498db',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: true, position: 'top' },
                                tooltip: {
                                    callbacks: {
                                        label: ctx => 'Pendapatan: Rp. ' + ctx.parsed.y.toLocaleString('id-ID')
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: val => 'Rp. ' + val.toLocaleString('id-ID')
                                    }
                                }
                            }
                        }
                    });
                }
            };
            document.body.appendChild(script);

            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            };
        }
    }, [chart_data, chart_labels]);

    return (
        <AdminLayout css={["admin-laporan.css"]}>
            <div className="header">
                <h2>Laporan Penjualan</h2>
                <button onClick={() => window.print()} className="btn-print">
                    🖨️ Cetak Laporan
                </button>
            </div>

            {/* Filter Periode */}
            <div className="filter-section">
                <div className="periode-buttons">
                    <Link
                        href="/admin/laporan?periode=hari_ini"
                        className={`periode-btn ${periode === 'hari_ini' ? 'active' : ''}`}
                    >
                        Hari Ini
                    </Link>
                    <Link
                        href="/admin/laporan?periode=minggu_ini"
                        className={`periode-btn ${periode === 'minggu_ini' ? 'active' : ''}`}
                    >
                        Minggu Ini
                    </Link>
                    <Link
                        href="/admin/laporan?periode=bulan_ini"
                        className={`periode-btn ${periode === 'bulan_ini' ? 'active' : ''}`}
                    >
                        Bulan Ini
                    </Link>
                    <Link
                        href="/admin/laporan?periode=tahun_ini"
                        className={`periode-btn ${periode === 'tahun_ini' ? 'active' : ''}`}
                    >
                        Tahun Ini
                    </Link>
                    <button
                        onClick={() => setShowCustomDate(!showCustomDate)}
                        className={`periode-btn ${periode === 'custom' ? 'active' : ''}`}
                    >
                        Custom
                    </button>
                </div>

                {showCustomDate && (
                    <form onSubmit={handleCustomDateSubmit} style={{ display: 'flex' }}>
                        <input
                            type="date"
                            name="tanggal_awal"
                            value={data.tanggal_awal}
                            onChange={(e) => setData('tanggal_awal', e.target.value)}
                            required
                        />
                        <span>sampai</span>
                        <input
                            type="date"
                            name="tanggal_akhir"
                            value={data.tanggal_akhir}
                            onChange={(e) => setData('tanggal_akhir', e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-apply">Terapkan</button>
                    </form>
                )}
            </div>

            <div className="periode-info">
                📅 Periode: {formatDate(tanggal_awal)} - {formatDate(tanggal_akhir)}
            </div>

            {/* Statistik Pesanan */}
            <div className="section-title">📊 Statistik Pesanan</div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#3498db' }}>📦</div>
                    <div className="stat-content">
                        <h4>Total Pesanan</h4>
                        <p className="stat-value">{formatRupiah(stats.total_pesanan)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#2ecc71' }}>✅</div>
                    <div className="stat-content">
                        <h4>Pesanan Selesai</h4>
                        <p className="stat-value">{formatRupiah(stats.pesanan_selesai)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f39c12' }}>⏳</div>
                    <div className="stat-content">
                        <h4>Pending</h4>
                        <p className="stat-value">{formatRupiah(stats.pesanan_pending)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#3498db' }}>🍳</div>
                    <div className="stat-content">
                        <h4>Diproses</h4>
                        <p className="stat-value">{formatRupiah(stats.pesanan_diproses)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#e74c3c' }}>❌</div>
                    <div className="stat-content">
                        <h4>Dibatalkan</h4>
                        <p className="stat-value">{formatRupiah(stats.pesanan_dibatalkan)}</p>
                    </div>
                </div>
            </div>

            {/* Statistik Keuangan */}
            <div className="section-title">💰 Statistik Keuangan</div>
            <div className="stats-grid">
                <div className="stat-card highlight">
                    <div className="stat-icon" style={{ background: '#27ae60' }}>💵</div>
                    <div className="stat-content">
                        <h4>Total Pendapatan</h4>
                        <p className="stat-value">Rp. {formatRupiah(stats.total_pendapatan)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f39c12' }}>⏳</div>
                    <div className="stat-content">
                        <h4>Pending Payment</h4>
                        <p className="stat-value">Rp. {formatRupiah(stats.pending_payment)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#3498db' }}>✅</div>
                    <div className="stat-content">
                        <h4>Verified (Belum Selesai)</h4>
                        <p className="stat-value">Rp. {formatRupiah(stats.verified_belum_selesai)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#9b59b6' }}>💸</div>
                    <div className="stat-content">
                        <h4>Total Refund</h4>
                        <p className="stat-value">Rp. {formatRupiah(stats.total_refund)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#e74c3c' }}>❌</div>
                    <div className="stat-content">
                        <h4>Payment Canceled</h4>
                        <p className="stat-value">Rp. {formatRupiah(stats.total_canceled)}</p>
                    </div>
                </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="section-title">💳 Metode Pembayaran (Pesanan Selesai)</div>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div className="stat-card payment-card">
                    <div className="stat-icon" style={{ background: '#27ae60' }}>💵</div>
                    <div className="stat-content">
                        <h4>Cash</h4>
                        <p className="stat-value">{formatRupiah(payment_cash.jumlah)} transaksi</p>
                        <p className="stat-sub">Rp. {formatRupiah(payment_cash.total)}</p>
                    </div>
                </div>
                <div className="stat-card payment-card">
                    <div className="stat-icon" style={{ background: '#3498db' }}>📱</div>
                    <div className="stat-content">
                        <h4>Digital</h4>
                        <p className="stat-value">{formatRupiah(payment_digital.jumlah)} transaksi</p>
                        <p className="stat-sub">Rp. {formatRupiah(payment_digital.total)}</p>
                    </div>
                </div>
            </div>

            {/* Grafik Pendapatan */}
            {chart_data && chart_data.length > 0 ? (
                <div className="report-card">
                    <h3>📈 Grafik Pendapatan Harian</h3>
                    <canvas ref={chartRef} style={{ maxHeight: '300px' }}></canvas>
                </div>
            ) : (
                <div className="report-card">
                    <h3>📈 Grafik Pendapatan Harian</h3>
                    <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
                        <p>Tidak ada data untuk ditampilkan</p>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}