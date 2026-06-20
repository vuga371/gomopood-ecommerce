import pool from '../config/database.js';
import crypto from 'crypto';

// Create Order
export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod, items } = req.validatedBody;

  try {
    // Get customer ID
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE user_id = $1',
      [req.user.id]
    );

    let customerId;
    if (customerResult.rows.length === 0) {
      const newCustomer = await pool.query(
        'INSERT INTO customers (user_id) VALUES ($1) RETURNING id',
        [req.user.id]
      );
      customerId = newCustomer.rows[0].id;
    } else {
      customerId = customerResult.rows[0].id;
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      const productResult = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );
      subtotal += productResult.rows[0].price * item.quantity;
    }

    const tax = subtotal * 0.18; // 18% tax
    const shipping = 0; // Free shipping
    const total = subtotal + tax + shipping;

    // Generate order number
    const orderNumber = 'ORD-' + Date.now();

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (customer_id, order_number, status, payment_status, payment_method, subtotal, tax_amount, shipping_cost, total_amount, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [customerId, orderNumber, 'pending', 'unpaid', paymentMethod, subtotal, tax, shipping, total, JSON.stringify(shippingAddress)]
    );

    const orderId = orderResult.rows[0].id;

    // Add order items
    for (const item of items) {
      const productResult = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.productId, item.quantity, productResult.rows[0].price, productResult.rows[0].price * item.quantity]
      );
    }

    // Clear cart
    const cartResult = await pool.query(
      'SELECT id FROM shopping_carts WHERE user_id = $1',
      [req.user.id]
    );

    if (cartResult.rows.length > 0) {
      await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartResult.rows[0].id]);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: {
          id: orderId,
          orderNumber,
          status: 'pending',
          total,
          paymentMethod
        }
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to create order' }
    });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.* FROM orders o
       JOIN customers c ON o.customer_id = c.id
       WHERE c.user_id = $1
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: { orders: result.rows }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to fetch orders' }
    });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderResult = await pool.query(
      `SELECT o.* FROM orders o
       JOIN customers c ON o.customer_id = c.id
       WHERE o.id = $1 AND c.user_id = $2`,
      [orderId, req.user.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { status: 404, message: 'Order not found' }
      });
    }

    const order = orderResult.rows[0];

    // Get order items
    const itemsResult = await pool.query(
      'SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
      [orderId]
    );

    order.items = itemsResult.rows;

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      error: { status: 500, message: 'Failed to fetch order' }
    });
  }
};
