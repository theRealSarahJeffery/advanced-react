const { forwardTo } = require("prisma-binding");

const Query = {
  async items(parents, args, ctx, info) {
    const items = await ctx.db.query.items();
    console.log(items);
    return items;
  },
};
module.exports = Query;
