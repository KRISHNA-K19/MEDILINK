import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
  console.log(`[MediLink API] Server listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
