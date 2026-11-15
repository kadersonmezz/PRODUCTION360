import {
  LayoutDashboard,
  Package,
  Layers,
  Factory,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  UserRound,
  Boxes,
  Warehouse,
  Activity,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

import { useState, useEffect } from 'react';

import './App.css';

import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';


function App() {
const [activePage, setActivePage] = useState('Dashboard');
const [products, setProducts] = useState(() => {
  const savedProducts = localStorage.getItem('production360-products');

  return savedProducts ? JSON.parse(savedProducts) : [
      {
    id: 1,
    name: 'Industrial Motor',
    category: 'Electronics',
    sku: 'PRD-001',
    price: 450,
    stock: 120,
  },
  {
    id: 2,
    name: 'Control Panel',
    category: 'Components',
    sku: 'PRD-002',
    price: 280,
    stock: 85,
  },
  {
    id: 3,
    name: 'Steel Component',
    category: 'Raw Materials',
    sku: 'PRD-003',
    price: 95,
    stock: 240,
  },
  {
    id: 4,
    name: 'Hydraulic Pump',
    category: 'Machinery',
    sku: 'PRD-004',
    price: 620,
    stock: 45,
  },
  ];
});
  useEffect(() => {
  localStorage.setItem('production360-products', JSON.stringify(products));
}, [products]);
const [showProductForm, setShowProductForm] = useState(false);
const [editingProduct, setEditingProduct] = useState(null);
const [productionOrders, setProductionOrders] = useState(() => {
  const savedOrders = localStorage.getItem('production360-orders');

  return savedOrders ? JSON.parse(savedOrders) : [
    {
      id: 1,
      product: 'Industrial Motor',
      quantity: 250,
      startDate: '2026-11-10',
      status: 'In Progress',
    },
    {
      id: 2,
      product: 'Control Panel',
      quantity: 120,
      startDate: '2026-11-12',
      status: 'Completed',
    },
    {
      id: 3,
      product: 'Hydraulic Pump',
      quantity: 400,
      startDate: '2026-11-15',
      status: 'Pending',
    },
  ];
});

useEffect(() => {
  localStorage.setItem(
    'production360-orders',
    JSON.stringify(productionOrders)
  );
}, [productionOrders]);
const [showOrderForm, setShowOrderForm] = useState(false);

const [newOrder, setNewOrder] = useState({
  product: 'Industrial Motor',
  quantity: '',
  startDate: '',
});
const [searchTerm, setSearchTerm] = useState('');
const [newProduct, setNewProduct] = useState({
  name: '',
  category: '',
  sku: '',
  price: '',
  stock: '',
});
const handleAddProduct = () => {
  if (
    !newProduct.name.trim() ||
    !newProduct.category.trim() ||
    !newProduct.sku.trim() ||
    newProduct.price === '' ||
    newProduct.stock === ''
  ) {
    alert('Please fill in all fields.');
    return;
  }

  if (Number(newProduct.price) < 0 || Number(newProduct.stock) < 0) {
    alert('Price and stock cannot be negative.');
    return;
  }

  const product = {
    id: Date.now(),
    name: newProduct.name.trim(),
    category: newProduct.category.trim(),
    sku: newProduct.sku.trim(),
    price: Number(newProduct.price),
    stock: Number(newProduct.stock),
  };

if (editingProduct) {
  setProducts(
    products.map((item) =>
      item.id === editingProduct.id
        ? { ...product, id: editingProduct.id }
        : item
    )
  );
} else {
  setProducts([...products, product]);
}

  setNewProduct({
    name: '',
    category: '',
    sku: '',
    price: '',
    stock: '',
  });

  setShowProductForm(false);
  setEditingProduct(null);
};

  const productionData = [
  { day: 'Monday', target: 400, actual: 350 },
  { day: 'Tuesday', target: 450, actual: 420 },
  { day: 'Wednesday', target: 500, actual: 470 },
  { day: 'Thursday', target: 480, actual: 510 },
  { day: 'Friday', target: 550, actual: 490 },
  { day: 'Saturday', target: 400, actual: 430 },
  { day: 'Sunday', target: 300, actual: 320 },
];
const inventoryData = [
  { category: 'Raw Materials', quantity: 4500 },
  { category: 'Components', quantity: 3200 },
  { category: 'Finished Goods', quantity: 2800 },
  { category: 'Packaging', quantity: 1980 },
];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          PRODUCTION<span>360</span>
        </div>

<nav className="sidebar-menu">
<div
  className={`menu-item ${activePage === 'Dashboard' ? 'active' : ''}`}
  onClick={() => setActivePage('Dashboard')}
>
  <LayoutDashboard size={20} />
  <span>Dashboard</span>
</div>

<div
  className={`menu-item ${activePage === 'Products' ? 'active' : ''}`}
  onClick={() => setActivePage('Products')}
>
  <Package size={20} />
  <span>Products</span>
</div>

<div
  className={`menu-item ${activePage === 'Inventory' ? 'active' : ''}`}
  onClick={() => setActivePage('Inventory')}
>
  <Layers size={20} />
  <span>Inventory</span>
</div>

<div
  className={`menu-item ${activePage === 'Production' ? 'active' : ''}`}
  onClick={() => setActivePage('Production')}
>
  <Factory size={20} />
  <span>Production</span>
</div>

<div
  className={`menu-item ${activePage === 'Reports' ? 'active' : ''}`}
  onClick={() => setActivePage('Reports')}
>
  <ChartNoAxesCombined size={20} />
  <span>Reports</span>
</div>
</nav>

<div className="sidebar-bottom">
<div
  className={`menu-item ${activePage === 'Settings' ? 'active' : ''}`}
  onClick={() => setActivePage('Settings')}
>
  <Settings size={20} />
  <span>Settings</span>
</div>
</div>

      </aside>

      <main className="main-content">
       <header className="topbar">

  <div className="search-wrapper">
    <Search size={19} />
    <input
      type="text"
      placeholder="Search anything..."
    />
  </div>

  <div className="topbar-actions">

    <button className="notification-btn">
      <Bell size={21} />
      <span className="notification-dot"></span>
    </button>

    <div className="admin-profile">
      <div className="admin-avatar">
        <UserRound size={20} />
      </div>

      <div className="admin-info">
        <strong>Admin</strong>
        <span>Administrator</span>
      </div>

    </div>

  </div>

</header>


{activePage === 'Dashboard' && (
  <>
        <section className="page-heading">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>
        </section>

       <section className="stats-grid">

  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <h3>Total Products</h3>
        <h2>248</h2>
      </div>
      <div className="stat-icon blue">
        <Boxes size={23} />
      </div>
    </div>
    <div className="stat-footer">
      <TrendingUp size={15} />
      <span>12.5% increase</span>
      <small>vs last month</small>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <h3>Inventory Units</h3>
        <h2>12,480</h2>
      </div>
      <div className="stat-icon cyan">
        <Warehouse size={23} />
      </div>
    </div>
    <div className="stat-footer">
      <TrendingUp size={15} />
      <span>8.2% increase</span>
      <small>vs last month</small>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <h3>Active Production</h3>
        <h2>18</h2>
      </div>
      <div className="stat-icon purple">
        <Activity size={23} />
      </div>
    </div>
    <div className="stat-footer">
      <TrendingUp size={15} />
      <span>5.4% increase</span>
      <small>vs last month</small>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <h3>Completed Orders</h3>
        <h2>126</h2>
      </div>
      <div className="stat-icon green">
        <CheckCircle2 size={23} />
      </div>
    </div>
    <div className="stat-footer">
      <TrendingUp size={15} />
      <span>18.6% increase</span>
      <small>vs last month</small>
    </div>
  </div>

</section>

        <section className="content-grid">
          <div className="content-card">
<h2>Production Performance</h2>

<div className="chart-legend">
  <span className="legend-actual">Actual Production</span>
  <span className="legend-target">Production Target</span>
</div>

<div className="production-chart">
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={productionData}>
      <defs>
        <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#087cff" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#087cff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7edf5" />

      <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />

      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="target"
        stroke="#00c9d8"
        strokeDasharray="5 5"
        fill="none"
        name="Target"
      />

      <Area
        type="monotone"
        dataKey="actual"
        stroke="#087cff"
        strokeWidth={3}
        fill="url(#actualGradient)"
        name="Actual"
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
          </div>

          <div className="content-card">
            <h2>Inventory Overview</h2>
<div className="inventory-chart">
  <ResponsiveContainer width="100%" height={260}>
    <BarChart
      data={inventoryData}
      layout="vertical"
      margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />

      <XAxis type="number" tick={{ fontSize: 10 }} />

      <YAxis
        type="category"
        dataKey="category"
        width={105}
        tick={{ fontSize: 10 }}
      />

      <Tooltip />

      <Bar
        dataKey="quantity"
        fill="#087cff"
        radius={[0, 6, 6, 0]}
        barSize={20}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
          </div>
        </section>

        <section className="content-card">
          <h2>Recent Production Orders</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
               <tr>
  <td className="order-id">#PR-001</td>
  <td>Industrial Motor</td>
  <td>250</td>
  <td>
    <span className="status-badge in-progress">
      <span className="status-dot"></span>
      In Progress
    </span>
  </td>
</tr>

<tr>
  <td className="order-id">#PR-002</td>
  <td>Control Panel</td>
  <td>120</td>
  <td>
    <span className="status-badge completed">
      <span className="status-dot"></span>
      Completed
    </span>
  </td>
</tr>

<tr>
  <td className="order-id">#PR-003</td>
  <td>Steel Component</td>
  <td>400</td>
  <td>
    <span className="status-badge pending">
      <span className="status-dot"></span>
      Pending
    </span>
  </td>
</tr>
              </tbody>
            </table>
          </div>
        </section>
          </>
                )}
                        {activePage === 'Products' && (
          <>
            <section className="page-heading">
              <div>
                <h1>Product Management</h1>
                <p>Manage and monitor your products.</p>
              </div>
            </section>

            <section className="content-card">
<div className="products-header">
  <h2>Products</h2>
  <div className="product-search">
  <Search size={18} />
  <input
    type="text"
    placeholder="Search by product name or SKU..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
<button
  className="add-product-btn"
  onClick={() => setShowProductForm(true)}
>
      + Add Product
  </button>
</div>
{showProductForm && (
  <div className="product-form">
    <h3>Add New Product</h3>

    <div>
      <label>Product Name</label>
<input
  type="text"
  placeholder="Enter product name"
  value={newProduct.name}
  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
/>
    </div>

    <div>
      <label>Category</label>
<input
  type="text"
  placeholder="Enter category"
  value={newProduct.category}
  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
/>
    </div>

    <div>
      <label>SKU</label>
<input
  type="text"
  placeholder="Enter SKU"
  value={newProduct.sku}
  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
/>
    </div>

    <div>
      <label>Price ($)</label>
<input
  type="number"
  placeholder="Enter price"
  value={newProduct.price}
  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
/>
    </div>

    <div>
      <label>Stock Quantity</label>
<input
  type="number"
  placeholder="Enter quantity"
  value={newProduct.stock}
  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
/>
    </div>

    <button type="button" onClick={() => setShowProductForm(false)}>
      Cancel
    </button>

<button type="button" onClick={handleAddProduct}>
  Save Product
</button>

  </div>
)}
<div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Category</th>
        <th>SKU</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
{products
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>{product.sku}</td>
          <td>${product.price}</td>
          <td>{product.stock}</td>
          <td>
<button
  onClick={() => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      sku: product.sku,
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowProductForm(true);
  }}
>
  Edit
</button>
<button
  onClick={() => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (confirmDelete) {
      setProducts(products.filter((item) => item.id !== product.id));
    }
  }}
>
  Delete
</button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
            </section>
          </>
        )}
        {activePage === 'Inventory' && (
  <>
    <section className="page-heading">
      <div>
        <h1>Inventory Management</h1>
        <p>Monitor stock levels and manage your inventory.</p>
      </div>
    </section>

    <section className="content-card">
      <h2>Inventory Overview</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Stock Quantity</th>
              <th>Stock Status</th>
              <th>Stock Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.sku}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${
                    product.stock < 50 ? 'pending' : 'completed'
                  }`}>
                    {product.stock < 50 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td>
  <button
    onClick={() =>
      setProducts(products.map((item) =>
        item.id === product.id
          ? { ...item, stock: item.stock + 1 }
          : item
      ))
    }
  >
    +
  </button>

  <button
    onClick={() =>
      setProducts(products.map((item) =>
        item.id === product.id
          ? { ...item, stock: Math.max(0, item.stock - 1) }
          : item
      ))
    }
  >
    −
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </>
)}
{activePage === 'Production' && (
  <>
    <section className="page-heading">
      <div>
        <h1>Production Management</h1>
        <p>Manage production orders and monitor manufacturing progress.</p>
      </div>
      <button
        className="add-product-btn"
        onClick={() => setShowOrderForm(true)}
      >
        + New Production Order
      </button>
    </section>

    <section className="content-card">
      <h2>Production Orders</h2>

      {showOrderForm && (
        <div className="product-form">
          <h3>Create Production Order</h3>

          <label>Product</label>
          <select
            value={newOrder.product}
            onChange={(e) =>
              setNewOrder({ ...newOrder, product: e.target.value })
            }
          >
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={newOrder.quantity}
            onChange={(e) =>
              setNewOrder({ ...newOrder, quantity: e.target.value })
            }
          />

          <label>Start Date</label>
          <input
            type="date"
            value={newOrder.startDate}
            onChange={(e) =>
              setNewOrder({ ...newOrder, startDate: e.target.value })
            }
          />

          <button
            className="add-product-btn"
            onClick={() => {
              if (
                !newOrder.product ||
                Number(newOrder.quantity) <= 0 ||
                !newOrder.startDate
              ) {
                alert('Please fill in all fields correctly.');
                return;
              }

              setProductionOrders([
                ...productionOrders,
                {
                  id: Date.now(),
                  product: newOrder.product,
                  quantity: Number(newOrder.quantity),
                  startDate: newOrder.startDate,
                  status: 'Pending',
                },
              ]);

              setNewOrder({
                product: 'Industrial Motor',
                quantity: '',
                startDate: '',
              });

              setShowOrderForm(false);
            }}
          >
            Save Order
          </button>

          <button
            onClick={() => setShowOrderForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {productionOrders.map((order) => (
              <tr key={order.id}>
                <td>ORD-{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.startDate}</td>
                <td>
                  <span className={`status-badge ${
                    order.status === 'Completed'
                      ? 'completed'
                      : order.status === 'In Progress'
                      ? 'pending'
                      : 'pending'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      setProductionOrders(
                        productionOrders.map((item) =>
                          item.id === order.id
                            ? { ...item, status: e.target.value }
                            : item
                        )
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this production order?')) {
                        setProductionOrders(
                          productionOrders.filter(
                            (item) => item.id !== order.id
                          )
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </>
)}
{activePage === 'Reports' && (
  <>
    <section className="page-heading">
      <div>
        <h1>Reports & Analytics</h1>
        <p>View production and inventory performance reports.</p>
      </div>
    </section>

    <section className="stats-grid">
      <div className="stat-card">
        <h3>Total Products</h3>
        <h2>{products.length}</h2>
        <p>Products registered in the system</p>
      </div>

      <div className="stat-card">
        <h3>Total Inventory</h3>
        <h2>
          {products.reduce((total, product) => total + product.stock, 0).toLocaleString()}
        </h2>
        <p>Total units in stock</p>
      </div>

      <div className="stat-card">
        <h3>Total Production Orders</h3>
        <h2>{productionOrders.length}</h2>
        <p>All registered production orders</p>
      </div>

      <div className="stat-card">
        <h3>Completed Orders</h3>
        <h2>
          {productionOrders.filter(
            (order) => order.status === 'Completed'
          ).length}
        </h2>
        <p>Successfully completed orders</p>
      </div>
    </section>

    <section className="content-card">
      <h2>Production Report</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {productionOrders.map((order) => (
              <tr key={order.id}>
                <td>ORD-{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.startDate}</td>
                <td>
                  <span className="status-badge">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="content-card">
      <h2>Low Stock Report</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products
              .filter((product) => product.stock < 50)
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className="status-badge pending">
                      Low Stock
                    </span>
                  </td>
                </tr>
              ))}

            {products.filter((product) => product.stock < 50).length === 0 && (
              <tr>
                <td colSpan="4">No low stock products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  </>
)}
{activePage === 'Settings' && (
  <>
    <section className="page-heading">
      <div>
        <h1>Settings</h1>
        <p>Manage your account and application preferences.</p>
      </div>
    </section>

    <section className="content-card">
      <h2>Profile Information</h2>

      <div className="settings-info">
        <div>
          <label>Full Name</label>
          <p>Admin</p>
        </div>

        <div>
          <label>Role</label>
          <p>Administrator</p>
        </div>

        <div>
          <label>Email Address</label>
          <p>admin@production360.com</p>
        </div>
      </div>
    </section>

    <section className="content-card">
      <h2>System Information</h2>

      <div className="settings-info">
        <div>
          <label>Application Name</label>
          <p>PRODUCTION360</p>
        </div>

        <div>
          <label>Application Version</label>
          <p>1.0.0</p>
        </div>

        <div>
          <label>Platform</label>
          <p>Web Application</p>
        </div>
      </div>
    </section>

    <section className="content-card">
      <h2>Application Preferences</h2>

      <div className="settings-info">
        <div>
          <label>Language</label>
          <p>English</p>
        </div>

        <div>
          <label>Theme</label>
          <p>Light Mode</p>
        </div>

        <div>
          <label>Data Storage</label>
          <p>Local Storage</p>
        </div>
      </div>
    </section>
  </>
)}
      </main>
    </div>
  );
}

export default App;