import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    isInCart,
    getItemQuantity,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const inCart = isInCart(product._id);
  const quantity = getItemQuantity(product._id);

  const getStockStatus = () => {
    if (product.stock === 0)
      return { label: "Out of Stock", className: "stock-out" };
    if (product.stock <= 5)
      return {
        label: `Only ${product.stock} left`,
        className: "stock-low",
      };
    return { label: "In Stock", className: "stock-available" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="product-card group animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`stock-badge absolute top-3 right-3 ${stockStatus.className}`}
        >
          {stockStatus.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <span className="price-tag">${product.price.toFixed(2)}</span>

          {product.stock === 0 ? (
            <Button disabled variant="secondary">
              Sold Out
            </Button>
          ) : inCart ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (quantity === 1) {
                    removeFromCart(product._id);
                  } else {
                    updateQuantity(product._id, quantity - 1);
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-8 text-center font-medium">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(product._id, quantity + 1)
                }
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => addToCart(product)}
              className="flex-shrink-0 gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
