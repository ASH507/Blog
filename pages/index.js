// pages/index.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Blog</h1>
      <p>Start exploring posts:</p>
      <ul>
        <li><Link href="/posts">View All Posts</Link></li>
        <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
      </ul>
    </div>
  );
}
