import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cornflowerblue">
      <header className="bg-maroon text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">My Blog</h1>
          <nav>
            <Link href="/" className="mr-6 text-xl font-semibold hover:text-gray-300">
              Home
            </Link>
            <Link href="/create" className="mr-6 text-xl font-semibold hover:text-gray-300">
              Create New Post
            </Link>
            <Link href="/login" className="text-xl font-semibold hover:text-gray-300">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 text-black font-bold">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
