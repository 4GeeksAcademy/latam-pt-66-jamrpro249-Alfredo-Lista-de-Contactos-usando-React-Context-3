import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactList } from '../ContactList.js';
import '../css/AddContact.css';

export default function AddContact() {
    const navigate = useNavigate();
    const { addContact } = useContactList();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact({ name, phone, email, address });
        navigate('/');
    };

    return (
        <div className="add-contact-page">
            <div className="contenedor-titulo"><h1>Agregar Nuevo Contacto</h1></div>
            <div className='contenedor-formulario'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <div>
                        <button type="submit">Agregar Contacto</button>
                    </div>
                </form>
            </div>
            <div className='link-list'>
                <button className="back-btn" onClick={() => navigate("/")}>or get back to contacts</button>
            </div>
        </div>

    );
}