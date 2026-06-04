import { useEffect, useState } from 'react'
import './App.css'

interface Post {
  id: number
  title: string
  body: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then((data: Post[]) => setPosts(data.slice(0, 24)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <h1>Postss</h1>

      {loading && <p className="status">Loading posts...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <span className="post-id">#{post.id}</span>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
