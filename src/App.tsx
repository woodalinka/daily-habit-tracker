import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import AddHabitModal from "./components/AddHabitModal";
import Other from "./Routes/Other";
import Focus from './Routes/Focus';
import Habits from './Routes/Habits';
import Journal from "./Routes/Journal";

type Habit = {
    name: string;
    _isCompleted: boolean;
    _completedDates: string[];
}

function App() {

    const [showModal, setShowModal] = useState(false);
    const [habits, setHabits] = useState<Habit[]>([]);

    const addHabit = (newHabit: Habit) => {
        setHabits([...habits, newHabit]);
        setShowModal(false);
    }

  return (
      <BrowserRouter>
        <Header onAddHabit={() => setShowModal(true)}/>
          {showModal && <AddHabitModal onAddHabit={addHabit} />}
          <Routes>
              <Route path="/" element={<Habits habits={habits}/>} />
              <Route path="/focus" element={<Focus />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/other" element={<Other />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
