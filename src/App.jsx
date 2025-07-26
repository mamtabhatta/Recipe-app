import { Route, Router, Routes } from 'react-router-dom';
import Mainpage from './components/Mainpage';
import MealInfo from './components/MealInfo';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Mainpage/>} />
        <Route path='/:mealid' element={<MealInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
