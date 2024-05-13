// Importación de React y useState, useEffect desde 'react'
import React, { useState, useEffect } from "react";

// Importación de funciones de la API de Compras y estilos CSS
import {
  listarClientes,
  crearClientes,
  actualizarClientes,
  eliminarClientes,
}from "../../src/utils/api/Clientes";
import "../../src/views/clientes/clientes.css";


// Definición del componente Clientes
const Clientes = () => {
  // Declaración de estados utilizando useState
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [shouldReload, setShouldReload] = useState(false); // Indicador de recarga
  const [proveedorError, setProveedorError] = useState(""); // Mensaje de error para el proveedor
  const [fechaError, setFechaError] = useState(""); // Mensaje de error para la fecha
  const [totalError, setTotalError] = useState(""); // Mensaje de error para el total

  // Estado del cliente
  const [cliente, setCliente] = useState({
    TipoDocumento: "",
    NroDocumento: 0,
    NombreApellido: "",
    Telefono: 0,
    Direccion: "",
    Correo: "",
  });

  // Estado para almacenar el ID del cliente a anular
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Efecto para cargar los clientes
  useEffect(() => {
    listarClientes(setClientes);
  }, [shouldReload]);

  // Manejador de cambio de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  // Manejador para eliminar un cliente
  const handleDelete = (IdCliente) => {
    setConfirmDeleteId(IdCliente);
  };

  // Manejador para enviar el formulario de compra
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

    // Validaciones de formulario
    if (!cliente.TipoDocumento) {
      setTipoDocumentoError("Por favor seleccione un tipo de documento.");
      formIsValid = false;
    } else {
      setTipoDocumentoError("");
    }

    if (!cliente.NroDocumento) {
      setNroDocumentoError("Por favor ingrese un número de documento.");
      formIsValid = false;
    } else {
      setNroDocumentoError("");
    }

    if (!cliente.NombreApellido) {
      setNombreApellidoError("Por favor ingrese el nombre y apellido.");
      formIsValid = false;
    } else {
      setNombreApellidoError("");
    }

    if (!cliente.Telefono) {
      setTelefonoError("Por favor ingrese un número de teléfono.");
      formIsValid = false;
    } else {
      setTelefonoError("");
    }

    if (!cliente.Direccion) {
      setDireccionError("Por favor ingrese una dirección.");
      formIsValid = false;
    } else {
      setDireccionError("");
    }

    if (!cliente.Correo) {
      setCorreoError("Por favor ingrese un correo electrónico.");
      formIsValid = false;
    } else {
      setCorreoError("");
    }

    // Si el formulario es válido, se crea el cliente
    if (formIsValid) {
      await crearClientes(cliente, setClientes, setShouldReload);
    }
  };

  // Renderizado del componente Clientes
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Clientes</h6>
      </div>
      <div className="card-body">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#ModalCrearCliente"
        >
          Crear Cliente
        </button>

        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>TipoDocumento</th>
                <th>NroDocumento</th>
                <th>Nombre y Apellido</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>TipoDocumento</th>
                <th>NroDocumento</th>
                <th>Nombre y Apellido</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.TipoDocumento}</td>
                  <td>{cliente.NroDocumento}</td>
                  <td>{cliente.NombreApellido}</td>
                  <td>{cliente.Telefono}</td>
                  <td>{cliente.Correo}</td>
                  <td>{cliente.Direccion}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => handleDetalle(cliente.Id)}
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Ver detalle
                      </button>

                      <button
                        onClick={() => handleDelete(cliente.Id)}
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#confirmDeleteModal"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear un cliente */}
      <div
        className="modal fade"
        id="ModalCrearCliente"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalAñadirClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalAñadirClienteLabel">
                Crear Cliente
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {tipoDocumentoError && (
                <div className="alert alert-danger">{tipoDocumentoError}</div>
              )}
              {nroDocumentoError && (
                <div className="alert alert-danger">{nroDocumentoError}</div>
              )}
              {nombreApellidoError && (
                <div className="alert alert-danger">{nombreApellidoError}</div>
              )}
              {telefonoError && (
                <div className="alert alert-danger">{telefonoError}</div>
              )}
              {direccionError && (
                <div className="alert alert-danger">{direccionError}</div>
              )}
              {correoError && (
                <div className="alert alert-danger">{correoError}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="tipoDocumentoCliente">
                    Tipo de Documento:
                  </label>
                  <select
                    name="TipoDocumento"
                    onChange={handleChange}
                    className="form-control"
                    id="tipoDocumentoCliente"
                  >
                    <option value="">Selecciona un tipo de documento</option>
                    {/* Aquí podrías mapear opciones de tipo de documento si es necesario */}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nroDocumentoCliente">
                    Número de Documento:
                  </label>
                  <input
                    name="NroDocumento"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="nroDocumentoCliente"
                    placeholder="Ingrese el número de documento"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombreApellidoCliente">
                    Nombre y Apellido:
                  </label>
                  <input
                    name="NombreApellido"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="nombreApellidoCliente"
                    placeholder="Ingrese el nombre y apellido"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefonoCliente">Teléfono:</label>
                  <input
                    name="Telefono"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="telefonoCliente"
                    placeholder="Ingrese el número de teléfono"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccionCliente">Dirección:</label>
                  <input
                    name="Direccion"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="direccionCliente"
                    placeholder="Ingrese la dirección"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correoCliente">Correo Electrónico:</label>
                  <input
                    name="Correo"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="correoCliente"
                    placeholder="Ingrese el correo electrónico"
                  />
                </div>

                <button
                  id="closeModal"
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  style={{ display: "none" }}
                ></button>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar un cliente */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirmar Anulación de Cliente
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>¿Está seguro de que desea anular el cliente?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
                data-dismiss="modal"
              >
                Eliminar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportación del componente Compras
export default Compras;
