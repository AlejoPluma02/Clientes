import React, { useState, useEffect } from "react";
import {
  listarClientes,
  crearClientes,
  eliminarClientes
} from "../../utils/api/Clientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [tipoDocumentoError, setTipoDocumentoError] = useState("");
  const [nroDocumentoError, setNroDocumentoError] = useState("");
  const [nombreApellidoError, setNombreApellidoError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [direccionError, setDireccionError] = useState("");
  const [correoError, setCorreoError] = useState("");

  const [cliente, setCliente] = useState({
    TipoDocumento: "",
    NroDocumento: "",
    NombreApellido: "",
    Telefono: "",
    Direccion: "",
    Correo: "",
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    listarClientes(setClientes);
  }, [shouldReload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Correo") {
      setCliente({
        ...cliente,
        Correo: value,
      });
    } else if (name === "Direccion") {
      setCliente({
        ...cliente,
        Direccion: value,
      });
    } else {
      setCliente({
        ...cliente,
        [name]: value,
      });
    }
  };

  const handleDelete = (IdCliente) => {
    setConfirmDeleteId(IdCliente);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;

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

    if (formIsValid) {
      await crearClientes(cliente, setClientes, setShouldReload);
    }
  };

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
                        onClick={() => handleDelete(cliente.IdCliente)}
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
                    <option value="Cedula">Cédula</option>
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
                onClick={() => handleDelete(confirmDeleteId)}
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

export default Clientes;
