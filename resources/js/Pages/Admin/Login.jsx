import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Login({ errors, recaptchaKey }) {
    const { data, setData, post, processing } = useForm({
        username: "",
        password: "",
        "g-recaptcha-response": "",
    });

    function submit(e) {
        e.preventDefault();
        post("/admin/login");
    }

    // Load & render reCAPTCHA
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.render("recaptcha-box", {
                        sitekey: recaptchaKey,
                        callback: (token) => {
                            setData("g-recaptcha-response", token);
                        },
                    });
                });
            }
        };

        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <>
            <Head>
                <title>Login Admin | Warteg Bahari 24</title>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
                />
                <link rel="stylesheet" href="/css/admin-login.css" />
            </Head>

            <div className="login-container">
                <h1 className="logo">
                    <img
                        src="/images/brand.svg"
                        alt="WARBAR24 Logo"
                        style={{ maxWidth: "150px" }}
                    />
                </h1>

                <h2 className="title">Login Admin</h2>

                {/* error umum */}
                {errors?.error && <div className="error">{errors.error}</div>}

                {/* error captcha */}
                {errors?.["g-recaptcha-response"] && (
                    <div className="error">
                        {errors["g-recaptcha-response"]}
                    </div>
                )}

                <form onSubmit={submit} className="login-form">
                    <label>Username</label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    {/* CAPTCHA */}
                    <div id="recaptcha-box" style={{ marginTop: "15px" }}></div>

                    <button
                        type="submit"
                        className="btn-login"
                    >
                        Login →
                    </button>
                </form>
            </div>
        </>
    );
}
