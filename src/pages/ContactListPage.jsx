import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import '../css/ContactPage.css';
import { AiFillPhone, AiFillMail, AiFillCaretRight, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';

const API_BASE = "https://playground.4geeks.com/contact/agendas/";
const imagenAleatorias = [
    'https://cdn.pixabay.com/photo/2024/02/26/20/14/person-8598853_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/01/03/19/54/fashion-3059143_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/07/28/09/23/woman-3567600_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/11/05/20/59/artistic-9176859_1280.jpg',]

export default function ContactListPage() {
    const { store, dispatch } = useGlobalReducer();
    const { contacts, USER_API } = store;
    const navigate = useNavigate();
    const randomIndex = Math.floor(Math.random() * imagenAleatorias.length);
    const imagenRandom = imagenAleatorias[randomIndex];
    
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const loadContacts = async () => {
        try {
            const response = await fetch(`${API_BASE}${USER_API}/contacts`);
            if (response.ok) {
                const data = await response.json();
                if (data.contacts.length === 0) {
                    const mockContact = {
                        id: "example",
                        name: "MARIA RODRIGUEZ",
                        phone: "123-456-7890",
                        email: "4geeks@correo.com",
                        address: "Calle 4Geeks 123 321, FLORIDA, USA"
                    };
                    dispatch({ type: 'SET_CONTACTS', payload: [mockContact] });
                } else {
                    dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
                }
            }
        } catch (error) {
            console.error("Error cargando contactos:", error);
        }
    };

    const prepareDelete = (id) => {
        setIdToDelete(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!idToDelete) return;

        if (idToDelete === "example") {
            dispatch({ type: 'DELETE_CONTACT', payload: idToDelete });
            setShowModal(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}${USER_API}/contacts/${idToDelete}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                dispatch({ type: 'DELETE_CONTACT', payload: idToDelete });
                setShowModal(false);
                setIdToDelete(null);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className='contenedor-lista-contactos'>
            <div className='contenedor-titulo'>

                <strong><h1>Lista de Contactos</h1></strong>
            </div>
            <div className='contenedor-btn-add'>
                <button className="addbotom btn btn-success" onClick={() => navigate("/addContact")}>
                    Agregar contacto
                </button>
            </div>

            {contacts && contacts.length > 0 ? (
                contacts.map((contact, index) => (
                    <div key={contact.id || index} id="contact" className="contact">
                        <div className="col-md-12">
                            <div className='contenedor-card'>
                                <div className="card mb-3" style={{ width: "100%" }}>
                                    <div className="row g-0">
                                        <div className="card-body">
                                            <div className="col-md-4 imagen-card">
                                                <img src={imagenRandom} alt="profile" />
                                            </div>
                                            <div className='info'>
                                                <div className='titulo-info'> <strong><p><AiFillCaretRight /> {contact.name}</p></strong></div>
                                                <div>
                                                    <p><FaLocationArrow /> {contact.address}</p>
                                                    <p><AiFillMail /> {contact.email}</p>
                                                    <p><AiFillPhone /> {contact.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='righthicon d-flex'>
                                            <div className='btn-editar'>
                                                <AiFillEdit onClick={() => navigate(`/editContact/${contact.id}`)} />
                                            </div>
                                            <div className='btn-eliminar'>
                                                <AiFillDelete onClick={() => prepareDelete(contact.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center mt-5">No hay contactos disponibles.</p>
            )}

            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-dark">
                            <div className="modal-header">
                                <h5 className="modal-title">¿Estás seguro?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Esta acción eliminará el contacto permanentemente de tu agenda.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cerrar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Eliminar definitivamente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


