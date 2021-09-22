import app from './shared/http/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
