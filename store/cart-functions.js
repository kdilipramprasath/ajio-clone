import { toReducedPrice } from "../utilities/products-utilities";

export const addToBag = (state, action) => {
  const product = action.payload.product;
  const reducedPrice = toReducedPrice(+product.price, +product.discount);
  const discountPrice = +product.price - reducedPrice;
  const existingProduct = state.products.find(
    (item) =>
      item.id === product.id &&
      item.size === product.size &&
      item.color === product.color
  );
  if (!existingProduct) {
    state.products.push({
      ...product,
      qty: 1,
      reducedPrice,
      discountPrice,
      totalPrice: +product.price,
      totalDiscount: discountPrice,
      totalReducedPrice: reducedPrice,
    });
  } else {
    existingProduct.qty++;
    existingProduct.totalPrice += +product.price;
    existingProduct.totalDiscount += discountPrice;
    existingProduct.totalReducedPrice += reducedPrice;
  }
  state.totalPrice += +product.price;
  state.totalReducedPrice += reducedPrice;
  state.totalDiscountPrice += discountPrice;
};

// --------------------------------------------------------------------------------------------

export const updateProductSizeAndQty = (state, action) => {
  const productId = action.payload.productId;
  const productSize = action.payload.productSize;
  const productColor = action.payload.productColor;
  const changeSize = action.payload.changeSize;
  const changeQty = action.payload.changeQty;

  // Change quantity code

  const currentProduct = state.products.find((product) => {
    return (
      product.id === productId &&
      product.size === productSize &&
      product.color === productColor
    );
  });

  // const currentProduct = state.products[currentProductIndex];

  const differInQty = changeQty - currentProduct.qty;

  currentProduct.qty = changeQty;
  currentProduct.totalPrice = currentProduct.qty * currentProduct.price;
  currentProduct.totalReducedPrice =
    currentProduct.qty * currentProduct.reducedPrice;
  currentProduct.totalDiscount =
    currentProduct.qty * currentProduct.discountPrice;

  state.totalPrice += differInQty * currentProduct.price;
  state.totalReducedPrice += differInQty * currentProduct.reducedPrice;
  state.totalDiscountPrice += differInQty * currentProduct.discountPrice;

  // End of change quantity code

  // ----------------------------------------------------------------------------

  // If size wasn't changed then do nothing code

  if (currentProduct.size === changeSize) {
    return;
  }

  // ----------------------------------------------------------------------------

  const existingProductIndex = state.products.findIndex((product) => {
    return (
      product.id === productId &&
      product.size === changeSize &&
      product.color === productColor
    );
  });

  const existingProduct = state.products[existingProductIndex];

  if (!existingProduct) {
    // If existing product not exists already
    state.products = state.products.map((product) => {
      if (
        product.id === productId &&
        product.size === productSize &&
        product.color === productColor
      ) {
        product.size = changeSize;
      }
      return product;
    });
  } else {
    // If existing product already exists
    existingProduct.qty += currentProduct.qty;
    //---
    existingProduct.totalPrice += existingProduct.price * currentProduct.qty;
    state.totalPrice -= currentProduct.totalPrice;
    state.totalPrice += existingProduct.price * currentProduct.qty;
    //---
    existingProduct.totalReducedPrice +=
      existingProduct.reducedPrice * currentProduct.qty;
    state.totalReducedPrice -= currentProduct.totalReducedPrice;
    state.totalReducedPrice +=
      existingProduct.reducedPrice * currentProduct.qty;
    //---
    existingProduct.totalDiscount +=
      existingProduct.discountPrice * currentProduct.qty;
    state.totalDiscountPrice -= currentProduct.totalDiscount;
    state.totalDiscountPrice +=
      existingProduct.discountPrice * currentProduct.qty;
    //---

    state.products = deleteUtility(state.products, {
      id: currentProduct.id,
      size: currentProduct.size,
      color: currentProduct.color,
    });
  }
};

// --------------------------------------------------------------------------------------------

export const deleteProduct = (state, action) => {
  const productId = action.payload.productId;
  const productSize = action.payload.productSize;
  const productColor = action.payload.productColor;

  const existingProduct = state.products.find((product) => {
    return (
      product.id === productId &&
      product.size === productSize &&
      product.color === productColor
    );
  });

  state.totalReducedPrice -= existingProduct.totalReducedPrice;
  state.totalPrice -= existingProduct.totalPrice;
  state.totalDiscountPrice -= existingProduct.totalDiscount;

  state.products = deleteUtility(state.products, {
    id: productId,
    size: productSize,
    color: productColor,
  });
};

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------

const deleteUtility = (products, productToDelete) => {
  const updatedProducts = products.filter((product) => {
    return !(
      product.id === productToDelete.id &&
      product.size === productToDelete.size &&
      product.color === productToDelete.color
    );
  });

  return updatedProducts;
};
