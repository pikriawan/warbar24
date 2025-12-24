import { useEffect } from "react";

export default function AdminRiwayatFotoProfil({ riwayatFotoProfil }) {
    useEffect(() => {
        console.log(riwayatFotoProfil);
    }, [riwayatFotoProfil]);

    return (
        <>
            {riwayatFotoProfil && (
                <div>
                    {riwayatFotoProfil.map((url) => (
                        <div key={url}>
                            <a href={`/admin/riwayat-foto-profil?url=${url}`} download>
                                {url}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
