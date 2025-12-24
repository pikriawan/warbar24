import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ totalMenu, totalMakanan, totalMinuman, totalTersedia }) {
    return (
        <AdminLayout css={["admin-dashboard.css"]}>
            <div className="header">
                <h2>Dashboard</h2>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Menu</h3>
                    <p className="stat-number">{totalMenu}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Makanan</h3>
                    <p className="stat-number">{totalMakanan}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Minuman</h3>
                    <p className="stat-number">{totalMinuman}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Stok Tersedia</h3>
                    <p className="stat-number">{totalTersedia}</p>
                </div>
            </div>
        </AdminLayout>
    );
}