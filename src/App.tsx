import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCountdown, setBackgroundColor, generateRandomColor } from './redux/slices/mainSlice';
import './App.css';

const App = () => {
  const { count, backgroundColor } = useSelector((state: any) => state.mainSlice.countdown);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(startCountdown());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const calculateColor = () => {
    if (count === 0) {
      return 'red';
    }

    const hue = Math.floor((count / 10) * 70); // Calculate hue based on count value
    return `hsl(${hue}, 100%, 50%)`; // Use HSL color model
  };

  useEffect(() => {
    const checkBackgroundColor = () => {
      const newColor = generateRandomColor();
      if (newColor === backgroundColor) {
        checkBackgroundColor();
      } else {
        dispatch(setBackgroundColor(newColor));
      }
    };

    if (count === 0) {
      checkBackgroundColor();
    }
  }, [count, backgroundColor, dispatch]);

  return (
    <div className='main'>
      <h1 className='count'>
        Color will change in{' '}
        <span className='count-num' style={{ color: calculateColor() }}>
          {count}
        </span>{' '}
        seconds
      </h1>
    </div>
  );
};

export default App;
