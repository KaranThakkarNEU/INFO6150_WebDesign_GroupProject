import Image from 'next/image';
import styles from './page.module.css';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
    </>
  );
}
