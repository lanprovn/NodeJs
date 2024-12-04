/* eslint-disable no-unused-vars */
// const AddJob = () => {
//   return (
//     <h1>AddJob Page</h1>
//   )
// }
// export default AddJob;

import React, { useState } from "react";

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic gửi dữ liệu tới server ở đây
    alert("Job added successfully!");
    // Reset form
    setJobTitle("");
    setDescription("");
    setRequirements("");
    setLocation("");
    setSalary("");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <label style={styles.label}>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Requirements:</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Add Job
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    flexBasis: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "60%", // form chiếm 60% chiều rộng
    marginRight: "20px",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  label: {
    width: "30%", // nhãn chiếm 30% chiều rộng
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "70%", // ô nhập liệu chiếm 70% chiều rộng
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  textarea: {
    width: "70%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    resize: "vertical",
  },
  button: {
    alignSelf: "flex-start",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AddJob;
