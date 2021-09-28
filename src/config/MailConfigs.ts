import 'dotenv/config';

class Configs {
  public host = 'smtp.umbler.com';
  public port = 587;
  public user = process.env.EMAIL_USER;
  public password = process.env.EMAIL_PASSWORD;
}

export default Configs;
