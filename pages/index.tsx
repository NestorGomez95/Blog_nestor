import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/layout';
import { useEffect, useState } from 'react';

const IndexPage: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => setError('Failed to load posts'));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.id !== id));
      setMessage('Post deleted successfully.');
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Blog Posts</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-4">
          {posts.map((post: { id: number, title: string, content: string }) => (
            <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex justify-between">
                <Link href={`/edit?id=${post.id}`} className="mr-2 text-blue-500 hover:underline">Edit</Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link href="/create" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block">
            Create New Post
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
