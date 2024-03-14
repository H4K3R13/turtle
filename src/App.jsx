import "./App.css";
import Login from "./components/Login";
import { useEffect } from 'react';


function App() {

  // This useEffect() is to keep the extension tab in focus (unclosed) when clicked outside the extension box. 
  // useEffect(() => {
  //   const handleFocus = () => {
  //     console.log('Focused');
  //   };

  //   const handleBlur = () => {
  //     console.log('Blurred');
  //   };

  //   window.addEventListener('focus', handleFocus);
  //   window.addEventListener('blur', handleBlur);

  //   return () => {
  //     window.removeEventListener('focus', handleFocus);
  //     window.removeEventListener('blur', handleBlur);
  //   };
  // }, [])


  return (
    <>
      <Login />
    </>
  );
}

export default App;
