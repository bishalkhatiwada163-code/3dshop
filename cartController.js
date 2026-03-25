const Cart = require('./CartModel');

function getSessionId(req) {
  return req.query.sessionId || req.body.sessionId;
}

async function getCart(req, res) {
  try {
    const sessionId = getSessionId(req);
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    let cart = await Cart.findOne({ sessionId }).populate('items.productId');
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }

    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch cart' });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = getSessionId(req);

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'sessionId and productId are required' });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }

    const existing = cart.items.find((item) => String(item.productId) === String(productId));
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate('items.productId');

    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to add item to cart', details: error.message });
  }
}

async function updateCartItem(req, res) {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'sessionId and productId are required' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find((entry) => String(entry.productId) === String(productId));
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = Number(quantity);
    await cart.save();
    await cart.populate('items.productId');

    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update cart item', details: error.message });
  }
}

async function removeFromCart(req, res) {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.params;

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'sessionId and productId are required' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => String(item.productId) !== String(productId));
    await cart.save();
    await cart.populate('items.productId');

    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to remove item from cart', details: error.message });
  }
}

async function clearCart(req, res) {
  try {
    const sessionId = getSessionId(req);

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.json({ message: 'Cart already empty', items: [] });
    }

    cart.items = [];
    await cart.save();

    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to clear cart', details: error.message });
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
};
