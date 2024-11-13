import logo from './logo.svg';
import './App.css';
import SortableTable from './SortableTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ASS Power Rankings</h1>
      </header>
      <main>
        <SortableTable />
      </main>
    </div>
  );
}

export default App;
