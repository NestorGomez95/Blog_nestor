import { NextApiRequest, NextApiResponse } from 'next';

interface Post {
  id: number;
  title: string;
  content: string;
}

let posts: Post[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const postId = parseInt(id as string);

  if (req.method === 'GET') {
    const post = posts.find(post => post.id === postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].title = title;
      posts[postIndex].content = content;
      res.status(200).json(posts[postIndex]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } else if (req.method === 'DELETE') {
    posts = posts.filter(post => post.id !== postId);
    res.status(200).json({ message: 'Post deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
