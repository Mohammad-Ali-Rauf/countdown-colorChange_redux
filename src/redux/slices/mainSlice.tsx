import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    countdown: {
      count: 10,
      backgroundColor: '#000000',
    },
  },
  reducers: {
    startCountdown: (state: any) => {
      state.countdown.count -= 1;
      if (state.countdown.count === 0) {
        state.countdown.count = 10;
        state.countdown.backgroundColor = generateRandomColor();
      }
    },
    setBackgroundColor: (state: any, action) => {
      state.countdown.backgroundColor = action.payload;
    },
  },
});

const generateRandomColor = () => {
  const excludedColors = ['red', 'green'];
  const letters = '0123456789ABCDEF';
  let color = '#';
  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (excludedColors.includes(color));
  return color;
};

export const { startCountdown, setBackgroundColor } = mainSlice.actions;
export { generateRandomColor };
export default mainSlice.reducer;
