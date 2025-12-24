import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function MenuIndex({ menus }) {
    return (
        <AdminLayout css={["admin-menu.css"]}>
            <div className="header">
                <h2>Menu</h2>
                <Link href="/admin/menu/create" className="btn-tambah">
                    Tambah menu
                </Link>
            </div>

            <table className="menu-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Gambar</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.length > 0 ? (
                        menus.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.nama}</td>
                                <td>
                                    <img
                                        src={menu.gambar ? `/storage/uploads/${menu.gambar}` : '/images/menu-placeholder.png'}
                                        alt={menu.nama}
                                    />
                                </td>
                                <td>Rp. {new Intl.NumberFormat('id-ID').format(menu.harga)},-</td>
                                <td>
                                    <span className={`badge ${menu.kategori === 'makanan' ? 'badge-makanan' : 'badge-minuman'}`}>
                                        {menu.kategori.charAt(0).toUpperCase() + menu.kategori.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    {menu.stok > 0 ? (
                                        <span className="badge badge-ya">Tersedia</span>
                                    ) : (
                                        <span className="badge badge-tidak">Habis</span>
                                    )}
                                </td>
                                <td>
                                    <Link
                                        href={`/admin/menu/${menu.id}/edit`}
                                        className="btn-action"
                                    >
                                        ✎
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                Belum ada menu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </AdminLayout>
    );
}