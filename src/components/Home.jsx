import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Estado para el usuario


    //Verificacion si el usuario ha iniciado sesión
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser); // Si el usuario está en localStorage, actualizar el estado
        }
    }, []); 

    // Obtener destinos desde MockAPI al cargar el componente
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch("https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs");
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error("Error al obtener los destinos:", error);
            }
        };

        fetchDestinations();
    }, []);

        
    // Cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("user"); // Remover usuario de localStorage
        setUser(null); // Limpiar estado del usuario
        navigate("/"); // Redirigir a la página inicial
    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src="/turismo.jpg" alt="Logo pagina" />
                    <h2>Turismo Blog</h2>                    
                </div>
                <nav className="nav-links">
                    {user ? (
                        <>
                            <button>
                                    <Link to="/results">
                                        <i className='bx bxs-book-bookmark' ></i>Mis destinos
                                    </Link>
                                </button>
                            <button onClick={handleLogout}><i class='bx bx-log-out' ></i></button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><h3>Iniciar Sesión</h3></Link>
                            <Link to="/register"><h3>Registrarse</h3></Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Lista de destinos turísticos */}
            <main className="destinations-list">
                {destinations.length > 0 ? (
                    destinations.map((destination) => (
                        <div key={destination.id} className="destination-card">
                            <h2>{destination.name}</h2>
                            <p><strong>Ubicación:</strong> {destination.location}</p>
                            {destination.imageUrl && (
                                <img src={destination.imageUrl} alt={destination.name} />
                            )}
                            <p>{destination.review}</p>

                        </div>
                    ))
                ) : (
                    <p>No hay destinos disponibles.</p>
                )}
            </main>
        </div>
    );
};
