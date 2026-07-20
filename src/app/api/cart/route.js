const carts = await Cart.find()
  .populate({
    path: 'userId',
    select: 'name email phone',
  })
  .populate({
    path: 'items.productId',
    select: `
    name
    sku
    images
    price
    salePrice
    categoryId
    brand
    stock
  `,
  })
  .sort({
    updatedAt: -1,
  });
