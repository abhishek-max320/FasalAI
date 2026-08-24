import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ScanCard from "./components/ScanCard";
import History from "./components/History.jsx";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <ScanCard />
        <History />
      </main>
    </div>
  );
}

export default App;