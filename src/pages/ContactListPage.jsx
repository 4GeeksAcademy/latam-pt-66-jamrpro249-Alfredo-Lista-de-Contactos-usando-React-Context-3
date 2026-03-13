import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContactList } from '../ContactList.js';
import '../css/ContactPage.css';
import { AiFillPhone, AiFillMail, AiFillCaretRight, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';

export default function ContactListPage() {
    const contacts = useContactList((state) => state.contacts);
    const deleteContact = useContactList((state) => state.deleteContact);
    const navigate = useNavigate();
    const imagen = 'https://cdn.pixabay.com/photo/2024/02/26/20/14/person-8598853_1280.jpg';

    return (
        <div className='contenedor-lista-contactos'>

            <div className='contenedor-titulo'>
                <h1>Lista de Contactos</h1>
            </div>
            <div className='contenedor-btn-add'>
                <button className="addbotom btn btn-success" onClick={() => navigate("/addContact")}>
                    Agregar contacto
                </button>

            </div>
            {contacts.map((contact, index) => (
                <div key={contact.id || index} id="contact" className="contact">
                    <div className="col-md-12">
                        <div className='contenedor-card'>

                            <div className="card mb-3" style={{ Width: "100%" }}>
                                <div className="row g-0">
                                    <div className="card-body">
                                        <div className="col-md-4 imagen-card">
                                            <img src={imagen} alt="profile" />
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
                                            <AiFillDelete onClick={() => deleteContact(contact.id)} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
