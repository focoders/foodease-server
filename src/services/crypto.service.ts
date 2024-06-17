const bcrypt = require("bcrypt");

export async function hashPassword(plainPassword: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainPassword, 12, (err:any, hash:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err:any, result:any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
