import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const API_BASE = "http://localhost:5000/api";

interface Order {
  _id: string;
  totalAmount: number;
  createdAt: string;
  products: {
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

const Orders = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Please log in
          </h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to view your orders.
          </p>
          <Button asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            My Orders
          </h1>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading orders...
          </p>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-card rounded-xl p-12 shadow-sm text-center animate-fade-in">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6">
              When you place orders, they'll appear here.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-card rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Order ID
                    </p>
                    <p className="font-medium text-foreground">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Total
                    </p>
                    <p className="font-semibold text-foreground">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-foreground">
                        $
                        {(
                          item.product.price * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
