import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function MenuEdit({ menu }) {
    const { data, setData, post, processing } = useForm({
        _method: 'PUT',
        nama: menu.nama || "",
        gambar: null,
        harga: menu.harga || "",
        kategori: menu.kategori || "makanan",
        stok: menu.stok > 0 ? "1" : "0",
    });

    const [imagePreview, setImagePreview] = useState(
        menu.gambar ? `/storage/uploads/${menu.gambar}` : null
    );

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData("gambar", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function submit(e) {
        e.preventDefault();
        post(`/admin/menu/${menu.id}`);
    }

    function confirmDelete() {
        if (confirm(`🗑️ HAPUS MENU: ${menu.nama}\n\n✅ Menu akan dihapus dari database\n✅ Dihapus dari keranjang pelanggan\n✅ Tidak muncul lagi di tampilan\n\n📊 LAPORAN TETAP LENGKAP\n(nama menu & harga tetap tercatat)\n\nLanjutkan?`)) {
            router.delete(`/admin/menu/${menu.id}`);
        }
    }

    return (
        <AdminLayout css={["admin-menu.css"]}>
            <div className="form-container">
                <h2>Edit menu</h2>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gambar</label>
                        <div className="image-preview">
                            {imagePreview ? (
                                <img src={imagePreview} alt={menu.nama} />
                            ) : (
                                <span style={{ color: '#999' }}>Tidak ada gambar</span>
                            )}
                        </div>
                        <input
                            type="file"
                            name="gambar"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            className="btn-upload"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            Upload
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Harga</label>
                        <input
                            type="number"
                            name="harga"
                            value={data.harga}
                            onChange={(e) => setData("harga", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Kategori</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="kategori"
                                    value="makanan"
                                    checked={data.kategori === "makanan"}
                                    onChange={(e) => setData("kategori", e.target.value)}
                                />
                                Makanan
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="kategori"
                                    value="minuman"
                                    checked={data.kategori === "minuman"}
                                    onChange={(e) => setData("kategori", e.target.value)}
                                />
                                Minuman
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Stok</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="stok"
                                    value="1"
                                    checked={data.stok === "1"}
                                    onChange={(e) => setData("stok", e.target.value)}
                                />
                                Tersedia
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="stok"
                                    value="0"
                                    checked={data.stok === "0"}
                                    onChange={(e) => setData("stok", e.target.value)}
                                />
                                Habis
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link href="/admin/menu" className="btn-batal">
                            Batal
                        </Link>
                        <button
                            type="button"
                            className="btn-hapus"
                            onClick={confirmDelete}
                        >
                            Hapus menu
                        </button>
                        <button type="submit" className="btn-simpan" disabled={processing}>
                            Simpan perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}