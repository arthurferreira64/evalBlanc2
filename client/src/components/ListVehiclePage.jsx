import React, {useEffect, useState} from 'react';
import './ListVehicle.css';
import {useNavigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

const baseURI = import.meta.env.VITE_API_BASE_URL;

const ListVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(baseURI + 'api/vehicles', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setVehicles(data);
                } else {
                    alert('Erreur lors de la récupération des véhicules');
                    navigate('/');
                }
            } catch (error) {
                alert('Erreur réseau');
                navigate('/');
            }
        };

        fetchVehicles();
    }, []);
    const handleEdit = (id) => {
        navigate(`/add-vehicle/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?');
        if (confirmDelete) {
            try {
                const response = await fetch(baseURI + `api/vehicles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
                } else {
                    alert('Erreur lors de la suppression du véhicule');
                }
            } catch (error) {
                alert('Erreur réseau');
            }
        }
    };
    return (
        <>
            <Dashboard />
            <div className="list-vehicle">
                <h1>Listes des Véhicules</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Année</th>
                        <th>Client</th>
                        <th>Plaque d'immatriculation</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.firstname} {vehicle.lastname}</td>
                            <td>{vehicle.registration_plate}</td>
                            <td>
                                <button onClick={() => handleEdit(vehicle.id)}>Modifier</button>
                                <button onClick={() => handleDelete(vehicle.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListVehicle;
