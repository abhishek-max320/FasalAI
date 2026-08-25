import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ScanCard from "./components/ScanCard";
import History from "./components/History.jsx";
import Weather from "./components/Weather.jsx";
function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Weather />
        <ScanCard />
        <History />
      </main>
    </div>
  );
}

export default App;