import React, { useState } from "react";

const HomePage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const resetFields = () => {
    setId("");
    setName("");
    setEmail("");
  };

  const handleAdd = () => {
    if (isEdit) {
      const updatedData = data.map((item) =>
        item.id === id ? { id, name, email } : item
      );
      setData(updatedData);
    } else {
      const formData = { name, id, email };
      setData((prev) => [...prev, formData]);
    }
    resetFields();
    setIsEdit(false);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleUpdate = (selectedId) => {
    const selectedUser = data.find((item) => item.id === selectedId);
    if (selectedUser) {
      setId(selectedUser.id);
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setIsEdit(true);
      setModalVisible(true);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo Application</h1>
      <div className="table-fields p-5">
        <div>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => {
              resetFields();
              setIsEdit(false);
              setModalVisible(true);
            }}>
            Add Details
          </button>

          {modalVisible && (
            <div
              className={`modal fade show`}
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-modal="true"
              role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      {isEdit ? "Update User Details" : "Add User Details"}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setModalVisible(false);
                        setIsEdit(false);
                        resetFields();
                      }}
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="exampleInputId" className="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputId"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled={isEdit} // Cannot change id when editing
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setModalVisible(false);
                        setIsEdit(false);
                        resetFields();
                      }}>
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAdd}>
                      {isEdit ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <table className="table table-dark table-sm text-center">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x, i) => (
              <tr key={i}>
                <th scope="row">{x.id}</th>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdate(x.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(x.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
