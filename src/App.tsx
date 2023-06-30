import React, {useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import AddHabitModal from './components/AddHabitModal';
import './App.css';

type Habit = {
  name: string;
}
function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
    setShowModal(false);
  };


  return (
      <BrowserRouter>
        <Header onAddHabit={() => setShowModal(true)}/>
        <Routes>
          <Route
              path="/"
              element={
                <>{showModal && <AddHabitModal onAddHabit={handleAddHabit} />}</>
              }
          />
          <Route path="/focus" element={<div>Focus Page</div>} />
          <Route path="/journal" element={<div>Journal Page</div>} />
          <Route path="/other" element={<div>Other Page</div>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
