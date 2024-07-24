import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl">Something went wrong!</h1>
    </div>
  );
};

export default ErrorPage;
