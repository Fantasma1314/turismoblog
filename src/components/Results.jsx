import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/results.css";

export const Results = () => {
    const [locations, setLocations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Nueva bandera para administrador
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setUserId(storedUser.id);

            // Verificar si el usuario es administrador
            if (
                storedUser.email === "jacobo@gmail.com" && // Cambiar por el correo del admin
                storedUser.password === "12345678" // Cambiar por la contraseña del admin
            ) {
                setIsAdmin(true);
            }
        } else {
            navigate("/login"); // Redirige si el usuario no ha iniciado sesión
            return;
        }

        // Obtener destinos turísticos
        fetch("https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs")
            .then((response) => response.json())
            .then((results) => {
                if (storedUser.email === "jacobo@gmail.com" && storedUser.password === "12345678") {
                    // Si es administrador, mostrar todos los destinos
                    setLocations(results);
                } else {
                    // Si no es administrador, filtrar los destinos por usuario
                    const userDestinations = results.filter(
                        (location) => location.creator === storedUser.id
                    );
                    setLocations(userDestinations);
                }
            })
            .catch((error) => console.error("Error al obtener los destinos:", error));
    }, [navigate]);

    const handleEdit = (locationId) => {
        navigate(`/edit-destination/${locationId}`);
    };

    const handleDelete = async (locationId) => {
        try {
            await fetch(
                `https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${locationId}`,
                {
                    method: "DELETE",
                }
            );
            setLocations(locations.filter((location) => location.id !== locationId));
        } catch (error) {
            console.error("Error al eliminar el destino:", error);
        }
    };
    return (
        <main className="Results">
            <header className="header">
                <button onClick={() => navigate("/")} className="btn">
                    <i className="bx bx-home-alt-2"></i>
                    <span>Página Principal</span>
                </button>

                <button onClick={() => navigate("/create-destination")} className="btn">
                    <i className="bx bx-bookmark-alt-plus"></i>
                    <span>Crear Destino</span>
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
            <div className="card-container">
                {locations.map((location) => (
                    <div key={location.id} className="card">
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
