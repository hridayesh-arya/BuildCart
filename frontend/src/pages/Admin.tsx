import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Package, Plus, Trash2, ArrowLeft, Edit, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockProducts } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    stock: '',
    category: '',
  });

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-primary/10 text-primary' },
    { label: 'Total Orders', value: 156, icon: ShoppingBag, color: 'bg-success/10 text-success' },
    { label: 'Total Customers', value: 89, icon: Users, color: 'bg-accent/10 text-accent' },
    { label: 'Revenue', value: '$12,450', icon: DollarSign, color: 'bg-destructive/10 text-destructive' },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: String(products.length + 1),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      imageUrl: newProduct.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
    };
    setProducts([...products, product]);
    setShowAddForm(false);
    setNewProduct({ name: '', price: '', description: '', imageUrl: '', stock: '', category: '' });
    toast({ title: 'Product added', description: `${product.name} has been added to the catalog.` });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: 'Product deleted', description: 'The product has been removed.' });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and orders</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-6 shadow-sm animate-fade-in">
              <div className={`inline-flex p-3 rounded-lg mb-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Products Management */}
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Products</h2>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <form onSubmit={handleAddProduct} className="p-6 bg-secondary/50 border-b border-border">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Name</label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="form-label">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="form-label">Stock</label>
                  <Input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    required
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <Input
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                    placeholder="Electronics"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Description</label>
                  <Input
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    placeholder="Product description"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit">Save Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Product</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Category</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Price</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Stock</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-foreground">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock === 0
                            ? 'bg-destructive/10 text-destructive'
                            : product.stock <= 5
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-success/10 text-success'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
