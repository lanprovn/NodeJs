// const AllJobs = () => {
//   return (
//     <h1>AllJobs Page</h1>
//   )
// }
// export default AllJobs;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain web applications.",
      location: "San Francisco, CA",
      salary: "120,000",
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Manage product development lifecycle.",
      location: "New York, NY",
      salary: "110,000",
    },
    {
      id: 3,
      title: "Data Analyst",
      description: "Analyze data and provide insights.",
      location: "Chicago, IL",
      salary: "90,000",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        <h1 style={styles.title}>All Jobs</h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.jobList}>
        {filteredJobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <h2 style={styles.jobTitle}>{job.title}</h2>
            <p style={styles.jobDescription}>{job.description}</p>
            <p style={styles.jobLocation}>Location: {job.location}</p>
            <p style={styles.jobSalary}>Salary: ${job.salary}</p>
            <div style={styles.buttonContainer}>
              <button style={styles.editButton}>Edit</button>
              <button style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  searchSection: {
    width: "30%",
    padding: "10px",
  },
  title: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  jobList: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "10px",
  },
  jobCard: {
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  jobTitle: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "8px",
  },
  jobDescription: {
    color: "#555",
    marginBottom: "8px",
  },
  jobLocation: {
    color: "#777",
    marginBottom: "8px",
  },
  jobSalary: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer",
  },
};

export default AllJobs;
