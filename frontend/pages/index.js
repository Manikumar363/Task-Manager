import useSWR from 'swr'
import { useState, useRef } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <h3 className="font-medium">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button className={`px-3 py-1 rounded ${task.status === 'done' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => onToggle(task.id)}>
          {task.status === 'done' ? 'Done' : 'Mark done'}
        </button>
        <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default function Home() {
  const { data: tasks = [], mutate } = useSWR(`${API}/tasks`)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function addTask(e) {
    e.preventDefault()
    if (!title) return
    setLoading(true)
    await fetch(`${API}/tasks`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
    setTitle('')
    setDescription('')
    setLoading(false)
    mutate()
  }

  async function toggleTask(id) {
    await fetch(`${API}/tasks/${id}/toggle`, { method: 'PATCH' })
    mutate()
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    mutate()
  }

  return (
    <div className="app-container">
      <main className="card max-w-3xl w-full p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-800">Cent Stage</h1>
            <p className="text-sm text-gray-600">A colorful, friendly task manager</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white" style={{background: 'linear-gradient(90deg,#3e6bff,#ff3f75)'}}>v0.1</span>
          </div>
        </header>

        <form onSubmit={addTask} className="mb-6">
          <div className="mb-3">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border rounded-md shadow-sm text-lg font-medium"
              aria-label="Task title"
            />
          </div>

          <div className="mb-3">
            <textarea
              ref={useRef(null)}
              value={description}
              onChange={e => setDescription(e.target.value)}
              onInput={e => {
                const ta = e.target;
                ta.style.height = 'auto';
                ta.style.height = `${ta.scrollHeight}px`;
              }}
              rows={6}
              placeholder="Description (optional)"
              className="w-full p-4 border rounded-md shadow-sm resize-y min-h-[140px] max-h-[480px] overflow-auto"
              aria-label="Task description"
            />
          </div>

          <div className="flex justify-end">
            <button className="btn-primary px-5 py-2 rounded-md text-white font-semibold" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
          </div>
        </form>

        <section>
          <h2 className="text-xl font-semibold mb-3">Tasks</h2>
          {tasks.length === 0 && <p className="text-gray-600">No tasks yet. Add your first task!</p>}
          <ul className="space-y-3">
            {tasks.map(t => (
              <li key={t.id} className="flex items-center justify-between p-3 border rounded-md bg-white">
                <div>
                  <h3 className="font-medium text-primary-700">{t.title}</h3>
                  {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${t.status === 'done' ? 'status-badge-done' : 'status-badge-pending'}`}>{t.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-1 rounded ${t.status === 'done' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => toggleTask(t.id)}>
                    {t.status === 'done' ? 'Done' : 'Mark done'}
                  </button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => deleteTask(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
