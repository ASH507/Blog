

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RichEditor from '../../../components/RichEditor';

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Post not found');
          return res.json();
        })
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
          setLoading(false);
        })
        .catch(err => {
          setError('Could not load post.');
          setLoading(false);
        });
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error('Failed to update post');
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Content:</label>
          <RichEditor value={content} onChange={setContent} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>
          Update Post
        </button>
      </form>
    </div>
  );
}
