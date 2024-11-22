import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";

export const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <div className="home-container">
            <header className="header">
                <div className="logo">
                    <img src="turismo.jpg" alt="Logo pagina" />
                    <h2>Turismo Blog</h2>
                </div>                    
                <nav className="nav-links">
                    {user ? (
                        <>
                            <button className="btn">
                                <Link to="/results">
                                    <i className='bx bxs-book-bookmark'></i>
                                    <span>Mis destinos</span>    
                                </Link>
                            </button>
                            <button onClick={handleLogout} className="btn"><i className='bx bx-log-out'></i>
                                <span>Cerrar Sesión</span>
                            
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><h3>Iniciar Sesión</h3></Link>
                            <Link to="/register"><h3>Registrarse</h3></Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="main-content">
                <div className="main">
                    <h1>Elige tu lugar turístico favorito ahora</h1>
                    <p>Descubre los mejores destinos para tus próximas vacaciones. Explora nuestras recomendaciones y elige el lugar perfecto.</p>
                </div>
            </main>
            <h1 className="section-title">Explora Nuestros Destinos Turísticos</h1>
            <section className="destinations-list">
                
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
            </section>
        </div>
    );
};
