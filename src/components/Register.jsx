import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";

export const Register = () =>{
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        //obtener valores del formulario

        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        try {
            //peticion post para agregar usuario
            const response = await fetch("https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users",{
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password})
            });
            
            if (!response.ok) {
                throw new Error("Error en el registro, intenta nuevamente.");
            }

            //redireccion al login, en caso de ser exitoso
            navigate("/");
        } catch (err){
            setError(err.message)
        }
    };

    return (
        <main className="Register">
            <div className="wrapper">

                <form onSubmit={handleRegister}>
                        <div className="welcome">
                            <img src={`${import.meta.env.BASE_URL}turismo.jpg`} alt="logo" />
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
                        </div>
                    
                    {error && <p className="error">{error}</p>}
                    <fieldset>
                        <div className="input-box">
                            <label>
                                    <input 
                                        name="name" 
                                        type="text" 
                                        placeholder="Tu nombre" 
                                        required 
                                    />
                                <i className='bx bxs-user'></i>
                            </label>
                        </div>
                        <div className="input-box">
                            <label>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        placeholder="Correo electrónico" 
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

                        <button className="btn">Registrarse</button>
                        
                        <div className="register-link">
                            <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                        </div>

                </form>
            </div>
        </main>
    );
};