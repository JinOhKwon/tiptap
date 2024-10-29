import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const TipTap = dynamic(() => import('../components/TipTap'), {
  ssr: false,
});

export default function Home() {
  return (
    <Box>
      <h1>TipTap</h1>
      <TipTap />
    </Box>
  );
}
