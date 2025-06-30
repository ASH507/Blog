import { connectDB } from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await connectDB();
  
  if (req.method === 'POST') {
    try {
      const { title, content } = req.body;
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const post = new Post({ title, content, slug });
      await post.save();
      
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
