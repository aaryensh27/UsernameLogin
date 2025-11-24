import React, { useState } from "react";
import axios from "axios";

const Data = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = "http://localhost:5009/api/users";

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data } = await axios.get(backendURL);
      const user = data.find(
        (u) => u.uname.toLowerCase() === username.toLowerCase()
      );

      if (user) {
        setResult(user);
      } else {
        setResult({ notFound: true });
      }
    } catch (err) {
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary text-uppercase">
           Find User by Username ?
        </h3>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g Mohan)"
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary "
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        <div className="mt-4">
          {error && <div className="alert alert-danger">{error}</div>}

          {result?.notFound && (
            <div className="alert alert-warning text-center fw-bold">
              !! User not found
            </div>
          )}

          {result && !result.notFound && (
            <div className="card shadow-sm border-0 mt-3" style={{ borderRadius: "15px" }}>
              <div
                className="card-header text-white"
                style={{ background: "#007bff", borderRadius: "15px 15px 0 0" }}
              >
                <h5 className="mb-0 text-center"> User Details</h5>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Username:</strong> {result.uname}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {result.email}
                </p>
                <p className="mb-0">
                  <strong>Phone:</strong> {result.contact}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
