import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  username: "",
  email: "",
};

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState(initialState);

  const onInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, form);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`, form);
    setForm(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <form className="mt-3" onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-center w-100">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                onChange={onInputChange}
                placeholder="Enter your name"
                type="text"
                value={form.name}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label text-center w-100"
              >
                Username
              </label>
              <input
                className="form-control"
                id="username"
                name="username"
                onChange={onInputChange}
                placeholder="Enter your Username"
                type="text"
                value={form.username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-center w-100">
                E-mail
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={onInputChange}
                placeholder="Enter your email"
                type="email"
                value={form.email}
              />
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link
                to={"/"}
                type="submit"
                className="btn btn-outline-danger mx-2"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
