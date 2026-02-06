import useRedirect from '@hooks/useRedirect';

export default function App() {
  useRedirect('write')();

  return (
    <body>
      <p>landing page</p>
      <p>also for (error) redirects</p>
    </body>
  );
}
