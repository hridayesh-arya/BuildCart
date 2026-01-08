import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const API_BASE = "http://localhost:5000/api";

const Cart = () => {
  const { items, itemCount, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place an order.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      toast({
        title: "Order placed successfully!",
        description: `Your order of $${totalPrice.toFixed(
          2
        )} has been received.`,
      });

      clearCart();
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "Something went wrong while placing your order.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Shopping Cart
          </h1>
          <span className="text-muted-foreground">
            {itemCount} items
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 shadow-sm">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">
                      Total
                    </span>
                    <span className="font-bold text-lg text-foreground">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4" />
                Checkout
              </Button>

              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  <Link to="/login" className="text-primary hover:underline">
                    Log in
                  </Link>{" "}
                  to place your order
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
