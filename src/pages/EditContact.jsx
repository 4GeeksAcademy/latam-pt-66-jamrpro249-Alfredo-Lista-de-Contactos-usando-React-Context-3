import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import '../css/EditContact.css';
const API_BASE = "https://playground.4geeks.com/contact/agendas/";

export default function EditContact() {
    const { store, dispatch } = useGlobalReducer();
    const { contacts, USER_API } = store;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const contactToEdit = contacts.find(c => c.id === parseInt(id));
        if (contactToEdit) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
            setAddress(contactToEdit.address);
        }
    }, [id, contacts]);

    const onSubmit = async () => {
        if (!name || !email.includes('@') || phone.length < 7) {
            alert('Por favor, verifica los campos');
            return;
        }

        const updatedContact = {
            name,
            email,
            phone,
            address
        };

        try {
            const response = await fetch(`${API_BASE}${USER_API}/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedContact)
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'EDIT_CONTACT', payload: data });
                setShowModal(true);
            } else {
                alert("Error al actualizar el contacto en el servidor");
            }
        } catch (error) {
            console.error("Error en el PUT:", error);
            alert("Error de conexión con el servidor");
        }
    }
    const handleCloseAndNavigate = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <div className="contenedor-edit-contact">
            <div><h1>Editar Contacto</h1></div>
            <div className="contenedor-form">

                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input className="form-control" value={name} onChange={(ev) => setName(ev.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input className="form-control" value={email} onChange={(ev) => setEmail(ev.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input className="form-control" value={phone} onChange={(ev) => setPhone(ev.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input className="form-control" value={address} onChange={(ev) => setAddress(ev.target.value)} required />
                </div>
                <div className="d-grid">
                    <button type="button" onClick={onSubmit} className="btn btn-primary">Actualizar Contacto</button>
                </div>
            </div>
            
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Éxito</h5>
                                <button type="button" className="btn-close" onClick={handleCloseAndNavigate}></button>
                            </div>
                            <div className="modal-body">
                                <p>¡El contacto ha sido actualizado correctamente!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCloseAndNavigate}>
                                    Volver a la lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}





