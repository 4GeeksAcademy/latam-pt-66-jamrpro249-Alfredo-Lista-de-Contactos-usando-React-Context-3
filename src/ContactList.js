import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useContactList = create(
  persist(
    (set) => ({
      contacts: [
        {
          id: 1,
          name: 'Maria Rodríguez',
          email: 'testemail@gmail.com',
          phone: '+58-412-5359759',
          address: '8952 NW 24th Ter'
        }
      ],
      addContact: (data) =>
        set((state) => ({ contacts: [...state.contacts, { ...data, id: Date.now() }] })),

      editContact: (id, updatedContact) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            
            contact.id == id ? { ...contact, ...updatedContact } : contact
          ),
        })),

      deleteContact: (id) =>
        set((state) => ({ contacts: state.contacts.filter(c => c.id !== id) })),
    }),
    {
      name: 'contact-storage',
    }
  )
)

