import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import PostForm from '../components/PostForm';
import useAuth from '../hook/useAuth'; // Importa el hook de autenticación

const CreatePostPage: NextPage = () => {
  useAuth(); // Verifica la autenticación al cargar la página
  const router = useRouter();

  const handleSubmit = async (data: { title: string, content: string }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Create New Post</h2>
        <PostForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default CreatePostPage;
