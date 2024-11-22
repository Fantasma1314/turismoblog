import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/edit.css"

export const EditDestination = () => {
    const [error, setError] = useState(null); // Manejo de errores
    const [destination, setDestination] = useState({
        name: "",
        review: "",
        location: "",
        rating: "",
        imageUrl: ""
    });
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del destino desde la URL

    // Obtener el ID del usuario actual desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    // Cargar los datos actuales del destino
    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${id}`);
                if (!response.ok) throw new Error("Error al cargar el destino.");
                
                const data = await response.json();
                
                // Verificar que el creador coincida con el usuario actual
                if (data.creator !== userId) {
                    setError("No tienes permiso para editar este destino.");
                    return;
                }

                setDestination(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDestination();
    }, [id, userId]);

    // Manejar la edición de destino
    const handleEdit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination)
            });

            if (!response.ok) throw new Error("Error al actualizar el destino.");

            navigate("/results"); // Redirige a resultados tras la actualización
        } catch (err) {
            setError(err.message);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDestination(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <main className="Edit">
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
            <div className="content">
                {/* Formulario de edición */}
                <form onSubmit={handleEdit} className="edit-form">
                    <h1>Editar Destino</h1>
                    {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si ocurre */}
                    <fieldset>
                        <label>
                            <span>Nombre del destino</span>
                            <input
                                name="name"
                                type="text"
                                value={destination.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>Descripción</span>
                            <textarea
                                name="review"
                                value={destination.review}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>Ubicación</span>
                            <input
                                name="location"
                                type="text"
                                value={destination.location}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>Calificación</span>
                            <input
                                name="rating"
                                type="text"
                                value={destination.rating}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <span>Imagen (URL)</span>
                            <input
                                name="imageUrl"
                                type="url"
                                value={destination.imageUrl}
                                onChange={handleChange}
                            />
                        </label>
                    </fieldset>
                    <button className="Actualizar">Actualizar Destino</button>
                </form>
    
                {/* Previsualización */}
                <div className="preview">
                    <h2>Previsualización</h2>
                    <div className="preview-content">
                        {destination.imageUrl && (
                            <img
                                src={destination.imageUrl}
                                alt="Destino"
                                className="preview-image"
                            />
                        )}
                        <h3>{destination.name || "Nombre del destino"}</h3>
                        <p>
                            <strong>Descripción:</strong>{" "}
                            {destination.review || "Agrega una descripción..."}
                        </p>
                        <p>
                            <strong>Ubicación:</strong>{" "}
                            {destination.location || "Agrega una ubicación..."}
                        </p>
                        <p>
                            <strong>Calificación:</strong>{" "}
                            {destination.rating || "0"}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
    
};
