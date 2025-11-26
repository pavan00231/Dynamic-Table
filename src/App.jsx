
import './App.css'
import DataTable from './components/DataTable'
import data from "./data/MOCK_DATA.json";

function App() {

  return (
    <>
    <div>Dynamic Table</div>
    <DataTable data={data} />
    </>
  )
}

export default App
