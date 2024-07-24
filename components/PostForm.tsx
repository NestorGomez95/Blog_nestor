import { FC, useState, useEffect } from 'react';

interface PostFormProps {
  initialData?: { title: string, content: string };
  onSubmit: (data: { title: string, content: string }) => void;
}

const PostForm: FC<PostFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit({ title, content });
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveAsNote = () => {
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const newNote = { title, content };
    savedNotes.push(newNote);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    alert('Nota guardada');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cornflowerblue p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="mb-6">
        <label className="block text-maroon text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon"
          placeholder="Enter the title of your post"
        />
      </div>
      <div className="mb-6">
        <label className="block text-maroon text-sm font-bold mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-maroon"
          placeholder="Enter the content of your post"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between">
        <button
          type="submit"
          className={`py-3 px-4 rounded-lg text-white transition ${loading ? 'bg-gray-500' : 'bg-primary hover:bg-secondary'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={saveAsNote}
          className="py-3 px-4 bg-secondary text-white rounded-lg"
        >
          Guardar como Nota
        </button>
      </div>
    </form>
  );
};

export default PostForm;
