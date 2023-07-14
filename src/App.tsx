import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Simulator from "./pages/Simulator";
import TuringCracker from "./pages/TuringCracker";

const App = () => {
  // CONST
  const location = useLocation();
  const navigate = useNavigate();

  // HOOKS

  // FUNCTION

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-start bg-black text-white font-inter gap-10 py-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="sm:text-[36px] font-medium">ENIGMA M3</div>
        <div className="flex flex-row items-center justify-center gap-5 sm:text-[24px] font-semibold">
          <button
            className={`py-1 px-4 border-2 rounded-xl transition-all ${
              location.pathname === "/"
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95"
            }`}
            onClick={() => navigate("/")}
          >
            SIMULATOR
          </button>
          <button
            className={`py-1 px-4 border-2 rounded-xl transition-all ${
              location.pathname === "/decoder"
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95"
            }`}
            onClick={() => navigate("/decoder")}
          >
            DECODER
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Simulator />} />
        <Route path="/decoder" element={<TuringCracker />} />
      </Routes>
    </div>
  );
};

export default App;
