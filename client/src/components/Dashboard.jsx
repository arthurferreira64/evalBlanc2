import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
    const [clientCount, setClientCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientCount = async () => {
            try {
                const response = await fetch(`${baseURI}api/clients/count`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du nombre de clients');
                }

                const data = await response.json();
                setClientCount(data.count);
            } catch (error) {
                setError(error.message);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchClientCount();
    }, [navigate]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="admin-dashboard">
            <div className="underheaderhead">
                <Link to="/vehicles">
                    <button className="login-button">Listes des Véhicules</button>
                </Link>
                <Link to="/add-vehicle">
                    <button className="login-button">Ajouter un Véhicule</button>
                </Link>
            </div>
            <h2>Tableau de bord admin</h2>
            <p>Nombre de clients inscrits : {clientCount}</p>
        </div>
    );
};

export default AdminDashboard;
