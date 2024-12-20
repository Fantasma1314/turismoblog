import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create.css"


export const CreateDestination = () => {
    const [error, setError] = useState(null); // Manejo de errores
    const navigate = useNavigate();

    // Obtener el ID del usuario actual desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // Verificar si existe el usuario y obtener su ID

    // Función que se ejecuta cuando el formulario es enviado
    const handleCreate = async (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const name = event.target.elements.name.value;
        const review = event.target.elements.review.value;
        const location = event.target.elements.location.value;
        const rating = event.target.elements.rating.value; 
        const imageUrl = event.target.elements.imageUrl.value; 


        try {
            // Hacer una solicitud POST para agregar el destino
            const response = await fetch("https://6740ae34d0b59228b7f0fabb.mockapi.io/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name,
                    review,
                    location,
                    imageUrl,
                    rating, 
                    creator: userId
                }), 
            });

            if (!response.ok) {
                throw new Error("Error al crear el destino. Intenta nuevamente.");
            }

            // Redirección en caso de éxito
            navigate("/"); 
        } catch (err) {
            setError(err.message); // Mostrar el mensaje de error
        }
    };


    return (
        <main className="CreateDestination">

            <header className="header">
                <button onClick={() => navigate("/")} className="btn">
                    <i className="bx bx-home-alt-2"></i>
                    <span>Página Principal</span>
                </button>

                <button onClick={() => navigate("/Results")} className="btn">
                    <i className="bx bx-bookmark-alt-plus"></i>
                    <span>Mis Destinos</span>
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                    }}
                    className="btn"
                >
                    <i className="bx bx-log-out"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </header>
            <div className="form">
                <form onSubmit={handleCreate}>
                    <h1>Crear Destino</h1>
                    {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si ocurre */}
                    <fieldset>
                        <label>
                            <span>Nombre del destino</span>
                            <input 
                            name="name" 
                            type="text" 
                            placeholder="Nombre" 
                            required 
                            />
                        </label>
                        <label>
                            <span>Descripción</span>
                            <textarea 
                            name="review" 
                            placeholder="Descripción"
                            required
                            >
                            </textarea>
                        </label>
                        <label>
                            <span>Ubicación</span>
                            <input 
                            name="location" 
                            type="text" 
                            placeholder="Ubicación" 
                            required 
                            />
                        </label>
                        <label>
                            <span>Calificación</span>
                            <input 
                            name="rating" 
                            type="text" 
                            placeholder="Calificación" 
                            required 
                            />
                        </label>
                        <label>
                            <span>Imagen (URL)</span>
                            <input 
                            name="imageUrl" 
                            type="url" 
                            placeholder="URL de la imagen" 
                            />
                        </label>

                    </fieldset>
                    <button>Crear Destino</button>
                </form>
            </div>
            
        </main>
    );
};
