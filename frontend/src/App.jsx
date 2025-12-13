import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function App() {
  const [activeTab, setActiveTab] = useState('workouts')
  
  // Workout state
  const [workouts, setWorkouts] = useState([])
  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    durationMinutes: 30,
    type: 'Cardio',
    caloriesBurned: 0
  })
  
  // Progress state
  const [progressList, setProgressList] = useState([])
  const [progressForm, setProgressForm] = useState({
    weight: '',
    notes: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch workouts
  const fetchWorkouts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_BASE}/api/workouts`)
      setWorkouts(response.data)
    } catch (err) {
      setError('Failed to load workouts')
    } finally {
      setLoading(false)
    }
  }

  // Add workout
  const handleAddWorkout = async (e) => {
    e.preventDefault()
    setError('')
    try {
      console.log('Submitting workout:', workoutForm)
      const response = await axios.post(`${API_BASE}/api/workouts`, workoutForm)
      console.log('Workout added:', response.data)
      setWorkouts([response.data, ...workouts])
      setWorkoutForm({ name: '', durationMinutes: 30, type: 'Cardio', caloriesBurned: 0 })
    } catch (err) {
      console.error('Error adding workout:', err)
      setError(`Failed to add workout: ${err.response?.data?.message || err.message}`)
    }
  }

  // Delete workout
  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/workouts/${id}`)
      setWorkouts(workouts.filter(w => w.id !== id))
    } catch (err) {
      setError('Failed to delete workout')
    }
  }

  // Fetch progress
  const fetchProgress = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_BASE}/api/progress`)
      setProgressList(response.data)
    } catch (err) {
      setError('Failed to load progress')
    } finally {
      setLoading(false)
    }
  }

  // Add progress
  const handleAddProgress = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${API_BASE}/api/progress`, progressForm)
      setProgressList([response.data, ...progressList])
      setProgressForm({ weight: '', notes: '' })
    } catch (err) {
      setError('Failed to add progress entry')
    }
  }

  // Delete progress
  const handleDeleteProgress = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/progress/${id}`)
      setProgressList(progressList.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete progress entry')
    }
  }

  useEffect(() => {
    if (activeTab === 'workouts') {
      fetchWorkouts()
    } else {
      fetchProgress()
    }
  }, [activeTab])

  return (
    <div className="app-container">
      <div className="header">
        <h1>💪 Fitness Tracker</h1>
        <p>Track your workouts and monitor your progress</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'workouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('workouts')}
        >
          🏋️ Workouts
        </button>
        <button
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
      </div>

      <div className="content-card">
        {error && <div className="error">{error}</div>}
        
        {activeTab === 'workouts' && (
          <>
            <div className="form-section">
              <h2>Log a Workout</h2>
              <form onSubmit={handleAddWorkout}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Workout Name</label>
                    <input
                      type="text"
                      value={workoutForm.name}
                      onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                      placeholder="e.g., Morning Run"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={workoutForm.type}
                      onChange={(e) => setWorkoutForm({ ...workoutForm, type: e.target.value })}
                    >
                      <option value="Cardio">Cardio</option>
                      <option value="Strength">Strength</option>
                      <option value="Yoga">Yoga</option>
                      <option value="HIIT">HIIT</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={workoutForm.durationMinutes}
                      onChange={(e) => setWorkoutForm({ ...workoutForm, durationMinutes: parseInt(e.target.value) || 0 })}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Calories Burned</label>
                    <input
                      type="number"
                      value={workoutForm.caloriesBurned}
                      onChange={(e) => setWorkoutForm({ ...workoutForm, caloriesBurned: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Add Workout</button>
              </form>
            </div>

            <div className="list-section">
              <h2>Recent Workouts</h2>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : workouts.length === 0 ? (
                <div className="empty-state">
                  <p>No workouts logged yet</p>
                  <p>Start by adding your first workout above!</p>
                </div>
              ) : (
                <div className="item-list">
                  {workouts.map(workout => (
                    <div key={workout.id} className="item-card">
                      <div className="item-info">
                        <h3>{workout.name}</h3>
                        <div className="item-details">
                          <span className={`badge badge-${workout.type.toLowerCase()}`}>
                            {workout.type}
                          </span>
                          <span className="item-detail">⏱️ {workout.durationMinutes} min</span>
                          <span className="item-detail">🔥 {workout.caloriesBurned} cal</span>
                          <span className="item-detail">📅 {workout.date}</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteWorkout(workout.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'progress' && (
          <>
            <div className="form-section">
              <h2>Log Your Progress</h2>
              <form onSubmit={handleAddProgress}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={progressForm.weight}
                      onChange={(e) => setProgressForm({ ...progressForm, weight: e.target.value })}
                      placeholder="e.g., 70.5"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    value={progressForm.notes}
                    onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
                    placeholder="How are you feeling? Any observations?"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Log Progress</button>
              </form>
            </div>

            <div className="list-section">
              <h2>Progress History</h2>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : progressList.length === 0 ? (
                <div className="empty-state">
                  <p>No progress entries yet</p>
                  <p>Start tracking your journey today!</p>
                </div>
              ) : (
                <div className="item-list">
                  {progressList.map(progress => (
                    <div key={progress.id} className="item-card">
                      <div className="item-info">
                        <h3>⚖️ {progress.weight} kg</h3>
                        <div className="item-details">
                          <span className="item-detail">📅 {progress.date}</span>
                          {progress.notes && (
                            <span className="item-detail">📝 {progress.notes}</span>
                          )}
                        </div>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProgress(progress.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


