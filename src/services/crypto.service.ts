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

export async function comparePassword(plainPassword: string, hashedPassword: string){
    await bcrypt.compare(plainPassword, hashedPassword, function(err: any, res:boolean){
        if(err){
            console.error(err);
            return err
        }
        return res;
    })
}
