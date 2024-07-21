//npm start
import React, { useState, useEffect } from "react";
import axios from "axios";

const FormComponent = () => {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    query1: false,
    query2: false,
    messages: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/form")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the forms!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new form object with the current date
    const formWithDate = {
      ...form,
      date: new Date().toISOString(), // ISO string format of the current date and time
    };
    axios
      .post("http://localhost:5000/form", formWithDate)
      .then((response) => {
        setForms([...forms, response.data]);
        setForm({
          name: "",
          surname: "",
          email: "",
          query1: false,
          query2: false,
          messages: "",
          // Reset the date here if it's part of your form state
        });
      })
      .catch((error) => {
        console.error("There was an error creating the form!", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  //check 1 of 2 checkbox
  const handleCheckboxChange = (query) => {
    setForm((prevState) => ({
      ...prevState,
      query1: query === "query1" ? !prevState.query1 : false,
      query2: query === "query2" ? !prevState.query2 : false,
    }));
  };

  return (
    <div>
      <div className="card">
        <div className="left-contact">
          <h1 className="contact">Contact Us</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="names">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <div className="l-surname">
              <label htmlFor="">Surname</label>
            </div>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Surname"
              required
            />
          </div>
          <div className="email-section">
            <input
              className="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="check">
            <label>
              <div className="general">
                <input
                  type="checkbox"
                  checked={form.query1}
                  onChange={() => handleCheckboxChange("query1")}
                />
                General Enquiry
              </div>
            </label>
            <label>
              <div className="support">
                <input
                  type="checkbox"
                  checked={form.query2}
                  onChange={() => handleCheckboxChange("query2")}
                />
                Support Request
              </div>
            </label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="text">
            <textarea
              className="area"
              name="messages"
              value={form.messages}
              onChange={handleChange}
              placeholder="Messages"
              required
            ></textarea>
          </div>
          <div className="submit">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        {forms?.map((form) => (
          <div key={form._id}>
            <p>Name: {form.name}</p>
            <p>Surname: {form.surname}</p>
            <p>Email: {form.email}</p>
            <p>Query 1: {form.query1?.toString() ?? "N/A"}</p>
            <p>Query 2: {form.query2?.toString() ?? "N/A"}</p>
            <p>Messages: {form.messages ?? "No messages"}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FormComponent;
