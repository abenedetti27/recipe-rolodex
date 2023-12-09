import { Outlet } from 'react-router-dom';


function App() {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <main className="mx-3">
      {/*https://reactrouter.com/en/main/components/outlet*/}
      {/*An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.*/}
        <Outlet />
      </main>
    </>
  );
}

export default App
