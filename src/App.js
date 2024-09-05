import TopBar from "./components/TopBar";
import AppRouter from './AppRouter';

function App() {
  return (
    <div className='w-screen h-screen overflow-x-hidden scrollbar-hide'>
      <TopBar />
      <AppRouter />
    </div>
  );
}

export default App;
