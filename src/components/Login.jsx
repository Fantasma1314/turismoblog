import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        const correo = event.target.elements.correo.value;
        const pass = event.target.elements.password.value;

        const response = await fetch("https://6740ae34d0b59228b7f0fabb.mockapi.io/users");
        const users = await response.json();

        const user = users.find(user => user.email === correo && user.password === pass);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
        } else {
            setError(true);
        }
    };

    return (
        <main className="login"> 
            <div className="wrapper">
                <form onSubmit={submit}>
                        <div className="welcome">
                        <img src={`${import.meta.env.BASE_URL}turismo.jpg`} alt="logo" />
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
                        </div>
                    
                    <p className="mensajeerror">{error ? "Las credenciales son incorrectas" : null}</p>
                    <fieldset className="container">
                                                
                        <div className="input-box">
                            <label>
                                <input 
                                    name="correo" 
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    required
                                />
                                <i className='bx bxs-envelope'></i>
                            </label>
                        </div>

                        <div className="input-box">
                            <label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </label>
                        </div>

                    </fieldset>

                    <button className="btn">Login</button>

                    <div className="register-link">

                        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
                    
                    </div>
                </form>
            </div>
        </main>
    );
};