const {
    tables
} = require('..')

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.ProductData, (table) => {
            table.string('productId', 255)
                .primary();
            table.integer('syncId');
            table.integer('unitOfMeasureId');
            table.integer('productCategoryId');
            table.boolean('quantity') // same as productAvailability?
        })
    }
}