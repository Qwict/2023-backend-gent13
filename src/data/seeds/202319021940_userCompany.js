module.exports = {
  seed: async (knex) => {
      await knex('userCompany').insert([
        {
          id: 1,
          admin: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
          employee: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
          companyId: 1,
        }, {
          id: 2,
          admin: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
          employee: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
          companyId: 2,
        },
      ]);
    },
  };