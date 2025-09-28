'use client';
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, MapPin, CreditCard, Check } from 'lucide-react';

const BulkFarmCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'बासमती चावल / Basmati Rice',
      category: 'अनाज / Grains',
      price: 120,
      unit: 'प्रति किलो / per kg',
      minOrder: 50,
      quantity: 50,
      image: '🌾',
      description: 'Premium quality basmati rice'
    },
    {
      id: 2,
      name: 'गेहूं / Wheat',
      category: 'अनाज / Grains',
      price: 25,
      unit: 'प्रति किलो / per kg',
      minOrder: 100,
      quantity: 100,
      image: '🌾',
      description: 'Fresh harvested wheat'
    },
    {
      id: 3,
      name: 'आलू / Potato',
      category: 'सब्जी / Vegetables',
      price: 15,
      unit: 'प्रति किलो / per kg',
      minOrder: 200,
      quantity: 200,
      image: '🥔',
      description: 'Grade A quality potatoes'
    },
    {
      id: 4,
      name: 'प्याज / Onion',
      category: 'सब्जी / Vegetables',
      price: 30,
      unit: 'प्रति किलो / per kg',
      minOrder: 100,
      quantity: 150,
      image: '🧅',
      description: 'Fresh red onions'
    },
    {
      id: 5,
      name: 'सेब / Apple',
      category: 'फल / Fruits',
      price: 80,
      unit: 'प्रति किलो / per kg',
      minOrder: 50,
      quantity: 75,
      image: '🍎',
      description: 'Kashmir apples premium quality'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    business: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const coupons = {
    'BULK10': 10,
    'VENDOR20': 20,
    'FARM15': 15,
    'थोक25': 25
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const qty = Math.max(item.minOrder, newQuantity);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode in coupons) {
      setDiscount(coupons[couponCode as keyof typeof coupons]);
    } else {
      setDiscount(0);
      alert('अमान्य कूपन कोड / Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = subtotal > 5000 ? 0 : 200;
  const total = subtotal - discountAmount + deliveryFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryAddress.name && deliveryAddress.phone && deliveryAddress.address) {
      setShowPayment(true);
    }
  };

  const simulateBlockchainPayment = async () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        setCartItems([]);
        setShowCheckout(false);
        setShowPayment(false);
        setPaymentStatus('');
        alert('ऑर्डर सफल! / Order Successful! Transaction ID: 0x' + Math.random().toString(16).substr(2, 8));
      }, 2000);
    }, 3000);
  };

  // ---- PAYMENT SCREEN ----
  if (showPayment) {
    return (
      <div className="min-h-screen bg-black text-gray-100 p-4">
        <div className="max-w-md mx-auto bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">ब्लॉकचेन पेमेंट / Blockchain Payment</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-green-400">भुगतान विवरण / Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>कुल राशि / Total Amount:</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>गैस फीस / Gas Fee:</span>
                  <span>₹50</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                  <span>कुल भुगतान / Total Payment:</span>
                  <span>₹{(total + 50).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-purple-400">स्मार्ट कॉन्ट्रैक्ट पता / Smart Contract Address</h4>
              <div className="bg-black p-2 rounded border border-gray-700 font-mono text-xs break-all text-gray-300">
                0x742d35Cc6634C0532925a3b8D2759Fc71B31f5E8
              </div>
            </div>

            {paymentStatus === 'processing' && (
              <div className="text-center py-6">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-blue-400 font-semibold">
                  लेनदेन प्रक्रिया में... / Transaction Processing...
                </p>
                <p className="text-sm text-gray-400 mt-2">कृपया प्रतीक्षा करें / Please wait</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-400 font-semibold text-lg">भुगतान सफल! / Payment Successful!</p>
                <p className="text-sm text-gray-400 mt-2">आपका ऑर्डर कन्फर्म हो गया है / Your order is confirmed</p>
              </div>
            )}

            {paymentStatus === '' && (
              <div className="space-y-4">
                <button
                  onClick={simulateBlockchainPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  भुगतान करें / Pay Now
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="w-full border border-gray-700 text-gray-300 font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  वापस जाएं / Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- CHECKOUT SCREEN ----
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-black text-gray-100 p-4">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-2xl font-bold text-white">डिलीवरी पता / Delivery Address</h2>
          </div>

          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="संपर्क व्यक्ति का नाम / Contact Person Name *"
                value={deliveryAddress.name}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="व्यापार का नाम / Business Name"
                value={deliveryAddress.business}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, business: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <input
              type="tel"
              placeholder="फोन नंबर / Phone Number *"
              value={deliveryAddress.phone}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <textarea
              placeholder="पूरा पता / Complete Address *"
              value={deliveryAddress.address}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="शहर / City *"
                value={deliveryAddress.city}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="पिनकोड / Pincode *"
                value={deliveryAddress.pincode}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="राज्य / State *"
                value={deliveryAddress.state}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-3 text-yellow-400">ऑर्डर सारांश / Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>उप-योग / Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>छूट / Discount ({discount}%):</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>डिलीवरी फीस / Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'मुफ्त / Free' : `₹${deliveryFee}`}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-lg">
                  <span>कुल राशि / Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="flex-1 border border-gray-700 text-gray-300 font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                वापस जाएं / Go Back
              </button>
              <button
                type="button"
                onClick={handleAddressSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                भुगतान करें / Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---- MAIN CART SCREEN ----
  return (
    <div className="min-h-screen bg-black text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-green-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">थोक खरीदारी कार्ट / Bulk Shopping Cart</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">कुल आइटम / Total Items</div>
              <div className="text-2xl font-bold text-green-400">{cartItems.length}</div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl text-gray-400">आपका कार्ट खाली है / Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="border border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-800">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.category}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-green-400">₹{item.price}</span>
                        <span className="text-sm text-gray-400 ml-1">{item.unit}</span>
                      </div>
                      <p className="text-xs text-orange-400 mt-1">न्यूनतम ऑर्डर / Min Order: {item.minOrder} किलो</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 10)}
                          className="p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors text-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="text-center min-w-[80px]">
                          <div className="font-semibold">{item.quantity}</div>
                          <div className="text-xs text-gray-400">किलो / kg</div>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 10)}
                          className="p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors text-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              <div className="bg-gray-800 rounded-xl p-4 mt-6">
                <h3 className="font-semibold mb-3 text-blue-400">कूपन कोड / Coupon Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="कूपन कोड दर्ज करें / Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    लागू करें / Apply
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-4 mt-6">
                <h3 className="font-semibold mb-3 text-yellow-400">ऑर्डर सारांश / Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>उप-योग / Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>छूट / Discount ({discount}%):</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>डिलीवरी फीस / Delivery Fee:</span>
                    <span>{deliveryFee === 0 ? 'मुफ्त / Free' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-lg">
                    <span>कुल राशि / Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  चेकआउट करें / Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkFarmCart;
