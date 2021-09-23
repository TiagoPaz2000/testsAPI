import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByRole(role: string): Promise<User | undefined> {
    const userSelected = this.findOne({
      where: {
        role,
      },
    });

    return userSelected;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userSelected = this.findOne({
      where: {
        email,
      },
    });

    return userSelected;
  }
}

export default UserRepository;
