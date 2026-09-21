import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const STATUS_OPTIONS = ['Added', 'Looking', 'Applied', 'Interviewing', 'Offer', 'Rejected'];
const STORAGE_KEY = 'job_board_tracker_data';

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isServerOnline, setIsServerOnline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [form, setForm] = useState({ title: '', company: '', location: '', status: STATUS_OPTIONS[0], notes: '' });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get('/api/jobs', { timeout: 1000 });
        setIsServerOnline(true);
        setSyncStatus('Backend connected.');
      } catch (err) {
        setIsServerOnline(false);
        setSyncStatus('Running in Local Mode (Offline).');
      }
    };
    checkBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const isMongoId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
  
  //generates a valid ID for MongoDB if the job is not yet synced to the database
  const generateObjectID= () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomHex = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.floor(Math.random() * 16)).toString(16));
    return timestamp + randomHex;
  }

  const handlePushToCloud = async () => {
    try {
      setSyncStatus('Syncing to database...');

      for (const item of jobs) {
       const jobData = item.job || item; // Handle both { job: {...} } and direct job objects

       const jobWithLocalId = { 
        ...jobData,
        localId: jobData.localId || generateObjectID() };


        await axios.post('/api/jobs', jobWithLocalId);
      }

    // Resync UI state with the clean database records
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
      setSyncStatus('Database synced successfully!');
    } catch (err) {
      console.error('Sync failed:', err.response?.data || err.message);
      setSyncStatus('Sync failed.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.company) return;

    const newJob = {
      localId: generateObjectID(), // Generate a temporary ID
      title: form.title,
      company: form.company,
      location: form.location || 'Remote',
      status: form.status,
      applyDate: new Date().toISOString(),
      notes: form.notes,
    };

    setJobs((prev) => [newJob, ...prev]);

    if (isServerOnline) {
      try {
        const res = await axios.post('/api/jobs', newJob);
        const serverJob = res.data.job || res.data;

        if (serverJob && serverJob._id) {
          setJobs((prev) => prev.map((job) => (job._id === newJob._id ? serverJob : job)));
        }
      } catch (err) {
        console.error('Failed to save job to server:', err.response?.data || err.message);
      }
    }

    setForm({ title: '', company: '', location: '', status: STATUS_OPTIONS[0], notes: '' });
  };

  const handleStatusChange = async (id, newStatus) => {
    setJobs((prev) => prev.map((j) => (j.localId === id ? { ...j, status: newStatus } : j)));
    if (isServerOnline) {
      try {
        await axios.put(`/api/jobs/${localId}`, { status: newStatus });
      } catch (e) {}
    }
  };

  const handleDelete = async (id) => {
    setJobs((prev) => prev.filter((j) => j.localId !== id));
    if (isServerOnline) {
      try {
        await axios.delete(`/api/jobs/${id}`);
      } catch (e) {}
    }
  };

  

  return (
    <div className="app-container">
      <div className={`status-banner ${isServerOnline ? 'online' : 'offline'}`}>
        Status: {syncStatus}
      </div>
      {isServerOnline && (
        <button className="btn-sync" onClick={handlePushToCloud}>
          Push Local Data to Database
        </button>
      )}

      <div>
        <h1>Job Board Tracker</h1>

        <form className="job-form" onSubmit={handleSubmit}>
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button type="submit">Add Job</button>
        </form>

        <div className="kanban-board">
          {STATUS_OPTIONS.map((status) => (
            <div key={status} className="kanban-column">
              <h2 className="kanban-header">{status}</h2>
              <div className="job-list">
                {jobs
                  .filter((job) => job.status === status)
                  .sort((a, b) => new Date(b.applyDate) - new Date(a.applyDate))
                  .map((job) => (
                    <div key={job.localId} className="job-card">
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                      <p className="job-detail"><strong>Applied:</strong> {new Date(job.applyDate).toLocaleDateString()}</p>
                      <div className="job-actions">
                        <select className="status-select" value={job.status} onChange={(e) => handleStatusChange(job.localId, e.target.value)}>
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button className="btn-delete" onClick={() => handleDelete(job.localId)}>Delete</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}