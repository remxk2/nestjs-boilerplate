import * as mongoose from 'mongoose';
import { encrypt, decrypt } from 'src/security';
import { User } from '../interfaces';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

UserSchema.pre<User>('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = encrypt(this.password);
  return next();
});

UserSchema.pre('findOne', function(next) {
  const { password } = this.getQuery();
  if (password)
    this.setQuery({ ...this.getQuery(), password: encrypt(password) });
  return next();
});

UserSchema.post('findOne', function(user: User, next) {
  if (user) user.password = decrypt(user.password);
  return next();
});

UserSchema.pre('find', function(next) {
  const { password } = this.getQuery();
  if (password)
    this.setQuery({ ...this.getQuery(), password: encrypt(password) });
  return next();
});

export { UserSchema };
