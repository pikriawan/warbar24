import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function MenuCreate() {
    const { data, setData, post, processing } = useForm({
        nama: "",
        gambar: null,
        harga: "",
        kategori: "makanan",
        stok: "1",
    });

    const [imagePreview, setImagePreview] = useState(null);

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
        post("/admin/menu");
    }

    return (
        <AdminLayout css={["admin-menu.css"]}>
            <div className="form-container">
                <h2>Tambah menu</h2>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Nama</label>
                        <input
                            type="text"
                            name="nama"
                            placeholder="Nama menu"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gambar</label>
                        <div className="image-preview" id="imagePreview">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" />
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
                            placeholder="0"
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
                        <button type="submit" className="btn-simpan" disabled={processing}>
                            Tambahkan menu
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}