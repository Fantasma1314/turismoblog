import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/results.css"

export const Results = () => {
    const [locations, setLocations] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el ID del usuario autenticado
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setUserId(storedUser.id);
        } else {
            navigate("/login"); // Redirige si el usuario no ha iniciado sesión
            return;
        }

        // Obtener solo los destinos del usuario autenticado
        fetch("https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs")
            .then((response) => response.json())
            .then((results) => {
                // Filtrar los destinos que pertenecen al usuario actual
                const userDestinations = results.filter(
                    (location) => location.creator === storedUser.id
                );
                setLocations(userDestinations);
            })
            .catch((error) => console.error("Error al obtener los destinos:", error));
    }, [navigate]);

    const handleEdit = (locationId) => {
        // Navega a la ruta de edición con el ID del destino
        navigate(`/edit-destination/${locationId}`);
    };

    const handleDelete = async (locationId) => {
        try {
            await fetch(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${locationId}`, {
                method: "DELETE",
            });
            setLocations(locations.filter((location) => location.id !== locationId));
        } catch (error) {
            console.error("Error al eliminar el destino:", error);
        }
    };

    return (
        <main className="Results">
            <header className="header">
                <button onClick={() => navigate("/")} className="btn">
                    <i className="bx bx-home-alt-2"></i>Página Principal
                </button>

                <button onClick={() => navigate("/create-destination")} className="btn">
                    <i className="bx bx-bookmark-alt-plus"></i>Crear Destino
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                    }}
                    className="btn"
                >
                    <i className="bx bx-log-out"></i>Cerrar Sesión
                </button>
            </header>
            <div className="card-container">
                {locations.map((location) => (
                    <div key={location.id} className="card">
                        {/* Contenedor para la imagen de fondo */}
                        <div
                            className="card-background"
                            style={{ backgroundImage: `url(${location.imageUrl})` }}
                        ></div>
                        <div className="card-content">
                            <h3>{location.name}</h3>
                            <p>
                                <strong>Ubicación:</strong> {location.location}
                            </p>
                            <p>
                                <strong>Reseña:</strong> {location.review}
                            </p>
                            <p>
                                <strong>Calificación:</strong> {location.rating}
                            </p>
                            <div className="actions">
                                <button onClick={() => handleEdit(location.id)}>
                                    <i className="bx bx-edit-alt"></i>
                                </button>
                                <button onClick={() => handleDelete(location.id)}>
                                    <i className="bx bx-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};