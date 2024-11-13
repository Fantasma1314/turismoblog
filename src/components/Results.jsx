import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <button onClick={() => navigate("/")}>Página Principal</button>
                <button onClick={() => navigate("/create-destination")}>Crear Destino</button>
                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                    }}
                >
                    <i class='bx bx-log-out' ></i>
                </button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Reseña</th>
                        <th>Calificación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.id}>
                            <td>{location.name}</td>
                            <td>{location.location}</td>
                            <td>{location.review}</td>
                            <td>{location.rating}</td>
                            <td>
                                <button onClick={() => handleEdit(location.id)}>Editar</button>
                                <button onClick={() => handleDelete(location.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};
