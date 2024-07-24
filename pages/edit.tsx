import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import PostForm from '../components/PostForm';
import useAuth from '@/hook/useAuth';

const EditPostPage: NextPage = () => {
  useAuth(); // Verifica la autenticación al cargar la página
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<{ title: string, content: string }>({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => console.error('Failed to load post'));
    }
  }, [id]);

  const handleSubmit = async (data: { title: string, content: string }) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Edit Post {id}</h2>
        <PostForm initialData={{ title: post.title, content: post.content }} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default EditPostPage;
