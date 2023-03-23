const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
        name: 'joris',
        firstName: 'Joris',
        lastName: 'Van Duyse',
        street: "Voskenslaan",
        streetNumber: "34",
        zipCode: "9000",
        city: "Gent",
        country: "Belgium",
        email: 'test@gmail.com',
        salt: 'EmdaG/Ks3SRf1kKVzabARJwNqRLnXlpCN60kCmLX5tt2faDlaXrkE1BI1R8mFKMo/Sj6VOjeZEvCb/CaPLw68bUs6p9qpPhSYT1DJVoYyWoovbN4VTTVwE6lsqy40/XHpECzr9wjpfdYAs/770EBzzou/e1rue/7VoZhJau0UFI=',
        hash: 'hQXWdE01+n+yibcH1LqjpuMUhcufBMBT2NkNmuV6x7DoeSPbFRvM3laXdIfnqyOi9rknLoBeok5m6y+4yHbsQQ==',
        companyId: 1,
        role: 'employee',
      }, {
        id: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
        name: 'qwertic',
        firstName: 'Joris',
        lastName: 'Van Duyse',
        street: "Voskenslaan",
        streetNumber: "34",
        zipCode: "9000",
        city: "Gent",
        country: "Belgium",
        email: 'qwertic@qwict.com',
        salt: '9E0GXD66M8RELO3TmF5u4fwH00m6d/lgr/uwtOAn2ZZOH2GkCcCTGAqOBX/lBbQyURzzXX62su3mDv/AIVq2HH6x2anecMeV74TAgTeugqG3vclg06ihthA0JpRX+TSxTbNqeHiSrEzQjRdi3ffExXO3Ctt7xZm6dMy8BinXBZo=',
        hash: 'YKFJWMM9fJRy3+3ki/rOGfO1dFTIfOoRNZ1KHow3jSpGoUcPXwIuOmcootFFp8k4Xpgy4gxR/9sn2+l8ejFZNQ==',
        companyId: 1,
        role: 'admin',
      }, {
        id: '95e3745e-7a8d-4947-9ff1-59f76544564b',
        name: 'joris',
        firstName: 'Joris',
        lastName: 'Van Duyse',
        street: "Voskenslaan",
        streetNumber: "34",
        zipCode: "9000",
        city: "Gent",
        country: "Belgium",
        email: 'joris@qwict.com',
        salt: 'b1hJZPuM4LvPcjovXVlnmIrdcwK0tsra6+0b+5wDA38lNRCMHx1doeVeXOS9NaAgtjH/HJ6t2cYt6tf3r8aebI0WJfzyftoRFCfkvg2VLS841DzEWLtO+NKaGvacaxhTmxMVv0sgmUYRsu8ck6skhpayyvl3Pf53ajirkfSxKIU=',
        hash: '+C+tbWUa+PF8u7iWMDW4bj4Bh9nwDCcdGUeG4yEWDHG8GlURa/HvSwcudfzc7T+JhasQON1kLl+dkCI5fOBH3w==',
        companyId: 1,
        role: 'employee',
      },
    ]);
  },
};