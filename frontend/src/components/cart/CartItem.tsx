import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const subtotal = product.price * quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-border animate-fade-in">
      {/* Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            ${product.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                quantity === 1
                  ? removeFromCart(product._id)
                  : updateQuantity(product._id, quantity - 1)
              }
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center font-medium text-sm">
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
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Subtotal & Remove */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-foreground">
              ${subtotal.toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeFromCart(product._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
