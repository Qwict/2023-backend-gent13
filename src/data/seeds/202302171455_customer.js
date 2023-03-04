module.exports = {
    seed: async (knex) => {
        await knex('user').insert([{
            id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
            name: 'joris',
            email: 'test@gmail.com',
            salt: 'EmdaG/Ks3SRf1kKVzabARJwNqRLnXlpCN60kCmLX5tt2faDlaXrkE1BI1R8mFKMo/Sj6VOjeZEvCb/CaPLw68bUs6p9qpPhSYT1DJVoYyWoovbN4VTTVwE6lsqy40/XHpECzr9wjpfdYAs/770EBzzou/e1rue/7VoZhJau0UFI=',
            hash: 'hQXWdE01+n+yibcH1LqjpuMUhcufBMBT2NkNmuV6x7DoeSPbFRvM3laXdIfnqyOi9rknLoBeok5m6y+4yHbsQQ==',
            companyId: 1,
            verificated: true,
            role: 2,
        }]);
    },
};