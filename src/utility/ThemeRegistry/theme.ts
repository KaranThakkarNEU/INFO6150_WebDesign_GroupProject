import { Rubik } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: rubik.style.fontFamily,
  },
  components: {},
});

export default theme;
