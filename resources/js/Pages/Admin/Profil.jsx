import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Profil({ admin, errors }) {
    const { data, setData, post, processing } = useForm({
        foto_profil: null,
        username: admin.username || "",
        password_lama: "",
        password_baru: "",
        konfirmasi_password: "",
    });

    const [fotoPreview, setFotoPreview] = useState(
        admin.foto_profil ? `/storage/uploads/${admin.foto_profil}` : null
    );

    function previewImage(e) {
        const file = e.target.files[0];
        if (file) {
            setData("foto_profil", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function submit(e) {
        e.preventDefault();
        post("/admin/profil");
    }

    return (
        <AdminLayout css={["admin-profil.css"]}>
            <div className="header">
                <h2>Profil Saya</h2>
            </div>

            <div className="card">
                <form onSubmit={submit} encType="multipart/form-data" className="profil-form">
                    <div className="form-group">
                        <label>Foto Profil</label>
                        <div className="foto-preview">
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Profil" id="preview-foto" />
                            ) : (
                                <div className="no-foto" id="preview-foto">👤</div>
                            )}
                        </div>
                        <input
                            type="file"
                            name="foto_profil"
                            accept="image/*"
                            onChange={previewImage}
                        />
                        <small>Format: JPG, JPEG, PNG, GIF (Maks. 2MB)</small>
                    </div>

                    <Link href="/admin/riwayat-foto-profil">Lihat riwayat foto profil</Link>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={(e) => setData("username", e.target.value)}
                            required
                        />
                        {errors?.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>

                    <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />

                    <h3 style={{ marginBottom: '20px' }}>Ubah Password (Opsional)</h3>

                    <div className="form-group">
                        <label>Password Lama</label>
                        <input
                            type="password"
                            name="password_lama"
                            placeholder="Kosongkan jika tidak ingin mengubah password"
                            value={data.password_lama}
                            onChange={(e) => setData("password_lama", e.target.value)}
                        />
                        {errors?.password_lama && (
                            <span className="error-message">{errors.password_lama}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password Baru</label>
                        <input
                            type="password"
                            name="password_baru"
                            placeholder="Minimal 6 karakter"
                            value={data.password_baru}
                            onChange={(e) => setData("password_baru", e.target.value)}
                        />
                        {errors?.password_baru && (
                            <span className="error-message">{errors.password_baru}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Konfirmasi Password Baru</label>
                        <input
                            type="password"
                            name="konfirmasi_password"
                            placeholder="Ulangi password baru"
                            value={data.konfirmasi_password}
                            onChange={(e) => setData("konfirmasi_password", e.target.value)}
                        />
                        {errors?.konfirmasi_password && (
                            <span className="error-message">{errors.konfirmasi_password}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            💾 Simpan Perubahan
                        </button>
                        <Link href="/admin/dashboard" className="btn btn-secondary">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}