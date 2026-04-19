const LOCAL_CART_KEY = "vyapara.localCart";
const LOCAL_ORDERS_KEY = "vyapara.localOrders";

function parsePrice(value) {
  const amount = Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function formatPrice(value) {
  return parsePrice(value).toFixed(2);
}

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name ?? product.title ?? "Product",
    price: formatPrice(product.price),
    stock: Number(product.stock ?? 99),
    image_url: product.image_url ?? product.image ?? null,
    category: product.category ?? "Collection",
    description: product.description ?? "",
  };
}

function enrichItem(item) {
  const unitPrice = parsePrice(item.product.price);
  const subtotal = unitPrice * item.quantity;

  return {
    ...item,
    subtotal: subtotal.toFixed(2),
    total_price: subtotal.toFixed(2),
  };
}

function buildCart(items = []) {
  const normalizedItems = items.map(enrichItem);
  const total = normalizedItems.reduce((sum, item) => sum + parsePrice(item.subtotal), 0);

  return {
    items: normalizedItems,
    total_price: total.toFixed(2),
  };
}

export function loadLocalCart() {
  const raw = localStorage.getItem(LOCAL_CART_KEY);
  if (!raw) return buildCart();

  try {
    const parsed = JSON.parse(raw);
    return buildCart(parsed.items ?? []);
  } catch {
    return buildCart();
  }
}

export function saveLocalCart(cart) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(buildCart(cart.items)));
}

export function clearLocalCart() {
  const emptyCart = buildCart();
  saveLocalCart(emptyCart);
  return emptyCart;
}

export function addLocalCartItem(product, quantity = 1) {
  const currentCart = loadLocalCart();
  const normalizedProduct = normalizeProduct(product);
  const itemId = `local-${normalizedProduct.id}`;
  const existingItem = currentCart.items.find((item) => item.id === itemId);

  const nextItems = existingItem
    ? currentCart.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(item.quantity + quantity, normalizedProduct.stock || 99) }
          : item,
      )
    : [
        ...currentCart.items,
        {
          id: itemId,
          quantity,
          product: normalizedProduct,
        },
      ];

  const nextCart = buildCart(nextItems);
  saveLocalCart(nextCart);
  return nextCart;
}

export function updateLocalCartItem(itemId, quantity) {
  const currentCart = loadLocalCart();
  const nextItems = currentCart.items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          quantity: Math.max(1, Math.min(quantity, item.product.stock || 99)),
        }
      : item,
  );

  const nextCart = buildCart(nextItems);
  saveLocalCart(nextCart);
  return nextCart;
}

export function removeLocalCartItem(itemId) {
  const currentCart = loadLocalCart();
  const nextCart = buildCart(currentCart.items.filter((item) => item.id !== itemId));
  saveLocalCart(nextCart);
  return nextCart;
}

export function loadLocalOrders() {
  const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function createLocalOrderFromCart({ cart, shippingAddress }) {
  const orders = loadLocalOrders();
  const order = {
    id: `local-${Date.now()}`,
    status: "confirmed",
    total_price: cart.total_price,
    shipping_address: shippingAddress,
    created_at: new Date().toISOString(),
    isLocal: true,
    items: cart.items.map((item) => ({
      id: item.id,
      product_name: item.product.name,
      quantity: item.quantity,
      image_url: item.product.image_url,
    })),
  };

  const nextOrders = [order, ...orders];
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(nextOrders));
  return order;
}
