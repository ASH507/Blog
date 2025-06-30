import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async (slug) => {
    if (confirm('Delete this post?')) {
      await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.slug !== slug));
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href="/admin/create">
        <button>Create New Post</button>
      </Link>
      
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>Slug: {post.slug}</p>
            <Link href={`/admin/edit/${post.slug}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(post.slug)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
