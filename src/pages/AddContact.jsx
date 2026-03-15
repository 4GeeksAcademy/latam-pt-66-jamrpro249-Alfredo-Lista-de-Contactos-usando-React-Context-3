import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import '../css/AddContact.css';

const API_BASE = "https://playground.4geeks.com/contact/agendas/";

export default function AddContact() {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { USER_API } = store;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "" || phone.trim() === "" || email.trim() === "") {
            alert("Por favor, completa los campos con datos reales.");
            return;
        }

        const newContact = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        try {
            const response = await fetch(`${API_BASE}${USER_API}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact)
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'ADD_CONTACT', payload: data });
                
                setName(""); setPhone(""); setEmail(""); setAddress("");
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="add-contact-page">
            <div className="contenedor-titulo"><h1>Agregar Nuevo Contacto</h1></div>
            <div className='contenedor-formulario'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" placeholder="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Guardar Contacto</button>
                    </div>
                </form>
            </div>
            <div className='link-list mt-3 text-center'>
                <button className="btn btn-link" onClick={() => navigate("/")}>Volver a la lista de contactos</button>
            </div>
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-dark">
                            <div className="modal-header">
                                <h5 className="modal-title">¡Contacto Agregado!</h5>
                            </div>
                            <div className="modal-body">
                                <p>El contacto se ha guardado correctamente en tu agenda con Usuario: <strong>{USER_API}</strong>.</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => navigate("/")}
                                >
                                    Ir a la lista de contactos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

