const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO : check if they are logged in
    console.log(ctx.db);

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // This is how to create a relationship between the Item and the User
          ...args,
        },
      },
      info
    );

    return item;
  },
};

module.exports = Mutations;
