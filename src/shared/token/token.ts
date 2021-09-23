import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secretoken';

interface IPayload {
  name: string;
  email: string;
  id: number;
}

const tokenSign = (payload: IPayload): string => {
  const generateToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

  return generateToken;
};

export default tokenSign;
