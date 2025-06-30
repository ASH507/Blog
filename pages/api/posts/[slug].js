import { connectDB } from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await connectDB();
  const { slug } = req.query;

  switch (req.method) {
    case 'GET':
      const post = await Post.findOne({ slug });
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.status(200).json(post);
      break;
      
    case 'PUT':
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { slug },
          req.body,
          { new: true, runValidators: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        await Post.findOneAndDelete({ slug });
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
