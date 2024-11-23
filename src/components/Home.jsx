import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";
import commentsData from "./comments.json";

export const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [comments, setComments] = useState([]);
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
                const response = await fetch("https://6740ae34d0b59228b7f0fabb.mockapi.io/blogs/");
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error("Error al obtener los destinos:", error);
            }
        };

        fetchDestinations();
        setComments(commentsData); // Cargar comentarios del archivo JSON
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
                            <button onClick={handleLogout} className="btn">
                                <i className='bx bx-log-out'></i>
                                <span>Cerrar Sesión</span>
                            </button>
                        </>
                    ) : (
                        <>
                        
                            <Link to="/"><h3>Inicio</h3></Link>
                            <Link to="/login"><h3>Iniciar Sesión</h3></Link>
                        </>
                    )}
                </nav>
            </header>

            <main className="main-content">
                <div className="main">
                    <h1>Descubre los 4 mundos del Ecuador</h1>
                    <p>Descubre los mejores destinos para tus próximas vacaciones de nuestro Ecuador. Explora nuestras recomendaciones y elige el lugar perfecto.</p>
                </div>
            </main>

            <h1 className="section-title">Opiniones de nuestros visitantes</h1>
            <section className="comments-carousel">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={comment.id} className={`comment-card ${index === 0 ? "active" : ""}`}>
                            <h3>{comment.user}</h3>
                            <p>{comment.comment}</p>
                            <p><strong>Calificación:</strong> {comment.rating} / 5</p>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios disponibles.</p>
                )}

            </section>
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
                            <p><strong>Calificación:</strong> {destination.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay destinos disponibles.</p>
                )}
            </section>
            
            {/* Call to Action */}
            <section className="call-to-action">
                <h2>¿Quieres descubrir más secretos de Ecuador?</h2>
                <p>Regístrate ahora y obtén acceso exclusivo a destinos ocultos y recomendaciones personalizadas.</p>
                <button onClick={() => navigate("/login")} className="btn-highlight">
                    ¡Inicia Sesión!
                </button>
            </section>

            <footer className="footer">
                <p>© 2024 Turismo Blog | Ecuador</p>
                <p>Diseñado por Jóvenes Creativos</p>
            </footer>
        </div>
    );
};
