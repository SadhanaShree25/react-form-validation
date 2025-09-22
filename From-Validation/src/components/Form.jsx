import React, { useState } from "react";
import "./Form.css";

function FormValidation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submittedUsers, setSubmittedUsers] = useState([]);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("⚠️ All fields are required!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("⚠️ Please enter a valid email address!");
      return;
    }

    setError("");
    setSubmittedUsers((prev) => [...prev, { name, email }]);

    setName("");
    setEmail("");
  };

  // ✅ Delete user by index
  const handleDelete = (index) => {
    setSubmittedUsers((prevUsers) =>
      prevUsers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-container">
      <h2>Form with Validation</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      {/* Show list of submitted users */}
      {submittedUsers.length > 0 && (
        <div className="submitted-data">
          <h3>Submitted Users</h3>
          <ul>
            {submittedUsers.map((user, index) => (
              <li key={index}>
                <span>
                  <strong>{user.name}</strong> – {user.email}
                </span>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FormValidation;
