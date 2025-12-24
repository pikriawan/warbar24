import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

export default function CustomerLayout({ children, css = [] }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/global.css" />
                <link rel="stylesheet" href="/css/header.css" />
                <link rel="stylesheet" href="/css/footer.css" />

                {css.map((file, i) => (
                    <link key={i} rel="stylesheet" href={`/css/${file}`} />
                ))}
            </Head>

            <Header />
            <main className="page">{children}</main>
            <Footer />
        </>
    );
}
