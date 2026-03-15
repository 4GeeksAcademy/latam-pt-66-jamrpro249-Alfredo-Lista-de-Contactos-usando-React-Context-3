export const initialStore = () => {
  return {
    message: null,
    USER_API: "jamrpro249", 
    contacts: [], 
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {

    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload
      };

    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'EDIT_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map((contact) => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload)
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:
      
      return store;
  }    
}

