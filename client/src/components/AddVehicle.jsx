import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddVehicle.css';
import Dashboard from "./Dashboard.jsx";

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AddVehicle = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        client_id: '',
        registration_plate: ''
    });
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(baseURI + 'api/clients', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                } else {
                    alert('Erreur lors de la récupération des clients');
                }
            } catch (error) {
                alert('Erreur réseau');
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchVehicle = async () => {
                try {
                    const response = await fetch(baseURI + `api/vehicles/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setFormData(data);
                    } else {
                        alert('Erreur lors de la récupération du véhicule');
                    }
                } catch (error) {
                    alert('Erreur réseau');
                }
            };

            fetchVehicle();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${baseURI}api/vehicles/${id}` : `${baseURI}api/vehicles`;
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate('/vehicles');
            } else {
                alert(`Erreur lors de ${id ? 'la modification' : 'l\'ajout'} du véhicule`);
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    return (
        <>
            <Dashboard />
            <div className="add-vehicle">
                <h1>{id ? 'Modifier' : 'Ajouter'} un véhicule</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Marque:
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                    </label>
                    <label>
                        Modèle:
                        <input type="text" name="model" value={formData.model} onChange={handleChange} required />
                    </label>
                    <label>
                        Année:
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                    </label>
                    <label>
                        ID Client:
                        <select name="client_id" value={formData.client_id} onChange={handleChange} required>
                            <option value="">Sélectionner un client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.id}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Plaque d'immatriculation:
                        <input type="text" name="registration_plate" value={formData.registration_plate} onChange={handleChange} required />
                    </label>
                    <button type="submit">{id ? 'Modifier' : 'Ajouter'}</button>
                </form>
            </div>
        </>
    );
};

export default AddVehicle;
