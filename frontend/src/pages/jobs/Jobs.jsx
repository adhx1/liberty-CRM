import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import Modal from "../../components/modals/Modal";
import JobForm from "../../components/forms/JobForm";
import "./Jobs.css";
import { getJobs, createJob, generateBill, updateJob, deleteJob } from "../../api/jobs";
import BillPreview from "../../components/jobs/BillPreview";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
const [billData, setBillData] = useState(null);
const [editingJob, setEditingJob] = useState(null);
  useEffect(() => {
    fetchJobs();
  }, []);
  const navigate = useNavigate();


  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (data) => {
    try {
      await createJob(data);
      setShowModal(false);
      fetchJobs();
    } catch (err) {
      console.error("Error creating job", err.response?.data);
    }
  };

  const handleGenerateBill = (jobId) => {
  navigate(`/invoice/${jobId}`);
};

const handleUpdateJob = async (data) => {
  try {
    await updateJob(editingJob.id, data);
    setEditingJob(null);
    fetchJobs();
  } catch (err) {
    console.error("Update failed:", err.response?.data);
  }
}; 

const handleDeleteJob = async (id) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error("Delete failed:", err.response?.data);
    }
  }
};
  return (
    <Layout>
      <div className="jobs-header">
        <h2>Job Listing</h2>
        <button onClick={() => setShowModal(true)}>
          Add Job
        </button>
      </div>

      <div className="jobs-table">
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <table>
            <thead className="table-header">
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Bill</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {jobs.map((job) => {
    const isOverdue =
      job.status !== "DELIVERED" &&
      new Date(job.due_date) < new Date();

    return (
      <tr
        key={job.id}
        className={isOverdue ? "overdue-row" : ""}
      >
        <td>{job.customer_name}</td>
        <td>{job.service_name}</td>
        <td>{job.due_date}</td>
        <td>AED{job.total_amount}</td>
        <td>
          <span className={`status-badge status-${job.status}`}>
            {job.status}
          </span>
        </td>
        <td>
          <span
            className="bill-btn"
            onClick={() => handleGenerateBill(job.id)}
          >
            Generate
          </span>
        </td>
        <td className="actions">
  <button onClick={() => setEditingJob(job)}>
    Edit
  </button>
  <button onClick={() => handleDeleteJob(job.id)}>
    Delete
  </button>
</td>
      </tr>
    );
  })}
</tbody>
          </table>
        )}
      </div>

      {(showModal || editingJob) && (
  <Modal
    onClose={() => {
      setShowModal(false);
      setEditingJob(null);
    }}
  >
    <JobForm
      initialData={editingJob}
      onSubmit={
        editingJob ? handleUpdateJob : handleAddJob
      }
    />
  </Modal>
)}

      {billData && (
  <Modal onClose={() => setBillData(null)}>
    <BillPreview data={billData} />
  </Modal>
)}
    </Layout>
  );
};

export default Jobs;