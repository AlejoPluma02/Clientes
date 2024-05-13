// Función para obtener la lista de clientes
export const listarClientes = async (setClientes) => {
    try {
        const response = await fetch('http://localhost:3000/api/clientes');
        const data = await response.json();
        setClientes(data);
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
};

// Función para crear una nuevo cliente
export const crearClientes = async (cliente, setClientes, setShouldReload) => {
    const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    };

    try {
        const response = await fetch('http://localhost:3000/api/clientes', requestInit);
        const data = await response.json();
        console.log(data);
        setClientes(prevClientes => [...prevClientes, data]); // Agregar un nuevo cliente al estado
        setShouldReload(true);
        document.getElementById("closeModal").click(); // Cerrar el modal después de guardar el cliente
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
    }
};

// Función para actualizar un cliente
export const actualizarClientes = async (IdCliente, clienteActualizado, setClientes) => {
    const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteActualizado)
    };

    try {
        const response = await fetch(`http://localhost:3000/api/clientes/${IdCliente}`, requestInit);
        const data = await response.json();
        console.log(data);
        // Actualizar el estado de clientes con el cliente actualizado
        setClientes(prevClientes =>
            prevClientes.map(cliente => (cliente.id === IdCliente ? clienteActualizado : cliente))
        );
        // Podrías también cerrar el modal o realizar otras acciones necesarias aquí
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
};

// Función para eliminar un cliente
export const eliminarClientes = async (IdCliente, setClientes) => {
    const requestInit = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(`http://localhost:3000/api/clientes/${IdCliente}`, requestInit);
        const data = await response.json();
        console.log(data);
        listarClientes(setClientes);
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
    }
};