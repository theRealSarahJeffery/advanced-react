const { forwardTo } = require("prisma-binding");

const Query = {
  async items(parents, args, ctx, info) {
    console.log(ctx.db.query);
    const items = await ctx.db.query.items();
    // return items;
    return [{ id: "blah", title: "cool", description: "dumb", price: 1000 }];
  },
};
module.exports = Query;
