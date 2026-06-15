import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Wallet,
  TrendingUp,
  ClipboardList,
  AlertCircle,
  Download,
  Upload,
  Info,
  Languages,
  FileText,
  ChevronRight,
  Minus,
  Plus,
  House,
  Menu,
  Printer,
  Share2,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

const STORAGE_KEY = "heins_inventory_offline_pos_v2";
const PHONE_NUMBER = "09661919266";
const VIBER_NUMBER = "+959661919266";

const dict = {
  en: {
    home: "Home",
    sell: "Sell",
    products: "Products",
    categories: "Categories",
    category: "Category",
    addCategory: "Add category",
    editCategory: "Edit category",
    categoryName: "Category name",
    searchCategories: "Search categories",
    noCategories: "No categories yet",
    noProductsInCategory: "No products in this category",
    customers: "Customers",
    salesHistory: "Sales History",
    receipts: "Receipts",
    searchReceipts: "Search receipt or customer",
    allCustomers: "All customers",
    allStatuses: "All statuses",
    fromDate: "From date",
    toDate: "To date",
    reports: "Reports",
    settings: "Settings",
    today: "Today",
    ordersCompleted: "orders completed",
    profit: "Profit",
    net: "Net",
    expenses: "Expenses",
    recentSales: "Recent sales",
    addItems: "Add items",
    customer: "Customer",
    noCustomer: "No customer",
    currentSale: "Current sale",
    cartEmpty: "Cart is empty",
    total: "Total",
    cashReceived: "Cash received",
    change: "Change",
    completeSale: "Complete sale",
    addItem: "Add item",
    editItem: "Edit item",
    searchProducts: "Search products",
    productName: "Product name",
    sellPrice: "Sell price",
    cost: "Cost",
    stock: "Stock",
    lowStockAlert: "Low stock alert",
    addCustomer: "Add customer",
    editCustomer: "Edit customer",
    searchCustomers: "Search customers",
    name: "Name",
    phone: "Phone",
    note: "Note",
    noDebt: "No debt",
    dateRange: "Date range",
    salesInRange: "sales in range",
    debtReceivable: "Debt receivable",
    debtPayable: "Debt payable",
    transactionHistory: "Transaction history",
    addExpense: "Add expense",
    expenseTitle: "Expense title",
    amount: "Amount",
    saveExpense: "Save expense",
    bestSellers: "Best sellers",
    recentExpenses: "Recent expenses",
    language: "Language",
    backup: "Backup",
    restore: "Restore",
    about: "About",
    chooseLanguage: "Choose language",
    backupSub: "Save your data to a local JSON file",
    restoreSub: "Restore data from a local JSON file",
    aboutSub: "App information and contact",
    receipt: "Receipt",
    printReceipt: "Print receipt",
    shareReceipt: "Share receipt",
    back: "Back",
    shopInfo: "Shop info",
    shopInfoSub: "Name, phone, address and receipt footer",
    shopName: "Shop name",
    shopPhone: "Shop phone",
    shopAddress: "Shop address",
    receiptFooter: "Receipt footer",
    cancelSale: "Cancel sale",
    returnItems: "Return items",
    saleStatus: "Status",
  },
  my: {
    home: "မူလ",
    sell: "ရောင်း",
    products: "ပစ္စည်းများ",
    categories: "အမျိုးအစားများ",
    category: "အမျိုးအစား",
    addCategory: "အမျိုးအစားထည့်မည်",
    editCategory: "အမျိုးအစားပြင်မည်",
    categoryName: "အမျိုးအစားအမည်",
    searchCategories: "အမျိုးအစားရှာရန်",
    noCategories: "အမျိုးအစားမရှိသေးပါ",
    noProductsInCategory: "ဤအမျိုးအစားတွင် ပစ္စည်းမရှိသေးပါ",
    customers: "ဖောက်သည်များ",
    salesHistory: "အရောင်းမှတ်တမ်း",
    receipts: "ဘောင်ချာများ",
    searchReceipts: "ဘောင်ချာ/ဖောက်သည်ရှာရန်",
    allCustomers: "ဖောက်သည်အားလုံး",
    allStatuses: "အခြေအနေအားလုံး",
    fromDate: "စရက်",
    toDate: "ဆုံးရက်",
    reports: "အစီရင်ခံစာ",
    settings: "ဆက်တင်",
    today: "ယနေ့",
    ordersCompleted: "အော်ဒါပြီးပါပြီ",
    profit: "အမြတ်",
    net: "အသားတင်",
    expenses: "အသုံးစရိတ်",
    recentSales: "နောက်ဆုံးရောင်းချမှုများ",
    addItems: "ပစ္စည်းထည့်ရန်",
    customer: "ဖောက်သည်",
    noCustomer: "ဖောက်သည်မရှိ",
    currentSale: "လက်ရှိရောင်းချမှု",
    cartEmpty: "Cart ဗလာဖြစ်နေသည်",
    total: "စုစုပေါင်း",
    cashReceived: "လက်ခံငွေ",
    change: "ပြန်အမ်းငွေ",
    completeSale: "ရောင်းချမှု ပြီးဆုံးမည်",
    addItem: "ပစ္စည်းထည့်မည်",
    editItem: "ပစ္စည်းပြင်မည်",
    searchProducts: "ပစ္စည်းရှာရန်",
    productName: "ပစ္စည်းအမည်",
    sellPrice: "ရောင်းဈေး",
    cost: "ဝယ်ဈေး",
    stock: "လက်ကျန်",
    lowStockAlert: "လက်ကျန်နည်း သတိပေးချက်",
    addCustomer: "ဖောက်သည်ထည့်မည်",
    editCustomer: "ဖောက်သည်ပြင်မည်",
    searchCustomers: "ဖောက်သည်ရှာရန်",
    name: "အမည်",
    phone: "ဖုန်း",
    note: "မှတ်ချက်",
    noDebt: "အကြွေးမရှိ",
    dateRange: "ရက်စွဲအပိုင်းအခြား",
    salesInRange: "ရောင်းချမှုရှိသည်",
    debtReceivable: "ရရန်ရှိအကြွေး",
    debtPayable: "ပေးရန်ရှိအကြွေး",
    transactionHistory: "ဘောင်ချာမှတ်တမ်း",
    addExpense: "အသုံးစရိတ်ထည့်ရန်",
    expenseTitle: "အသုံးစရိတ်ခေါင်းစဉ်",
    amount: "ပမာဏ",
    saveExpense: "အသုံးစရိတ်သိမ်းမည်",
    bestSellers: "အရောင်းရဆုံးများ",
    recentExpenses: "နောက်ဆုံးအသုံးစရိတ်များ",
    language: "ဘာသာစကား",
    backup: "Backup",
    restore: "Restore",
    about: "အကြောင်း",
    chooseLanguage: "ဘာသာစကားရွေးပါ",
    backupSub: "Data ကို local JSON file အဖြစ်သိမ်းမည်",
    restoreSub: "Local JSON file မှ data ပြန်သွင်းမည်",
    aboutSub: "App အချက်အလက်နှင့် ဆက်သွယ်ရန်",
    receipt: "ဘောင်ချာ",
    printReceipt: "ဘောင်ချာ ပရင့်ထုတ်မည်",
    shareReceipt: "ဘောင်ချာ ရှယ်မည်",
    back: "နောက်သို့",
    shopInfo: "ဆိုင်အချက်အလက်",
    shopInfoSub: "ဆိုင်အမည်၊ ဖုန်း၊ လိပ်စာနှင့် ဘောင်ချာစာသား",
    shopName: "ဆိုင်အမည်",
    shopPhone: "ဆိုင်ဖုန်း",
    shopAddress: "ဆိုင်လိပ်စာ",
    receiptFooter: "ဘောင်ချာအောက်ခြေစာသား",
    cancelSale: "Sale ပယ်ဖျက်မည်",
    returnItems: "ပစ္စည်းပြန်အမ်းမည်",
    saleStatus: "အခြေအနေ",
  },
};

const DEFAULT_CATEGORY_ID = "default-battery-category";

const initialData = {
  categories: [
    {
      id: DEFAULT_CATEGORY_ID,
      name: "Battery",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  products: [
    {
      id: crypto.randomUUID(),
      categoryId: DEFAULT_CATEGORY_ID,
      name: "Battery",
      sellPrice: 160000,
      cost: 120000,
      stock: 2,
      lowStockAlert: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  customers: [
    {
      id: crypto.randomUUID(),
      name: "MayMyatThu",
      phone: "",
      note: "",
      debtReceivable: 0,
      debtPayable: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  sales: [],
  expenses: [],
  settings: {
    language: "my",
    appName: "Hein's Inventory",
    currency: "ကျပ်",
    nextReceiptNumber: 1001,
    shopName: "Hein's Inventory",
    shopPhone: PHONE_NUMBER,
    shopAddress: "",
    receiptFooter: "Thank you for shopping with us.",
  },
};

function migrateData(parsed) {
  const rawCategories = Array.isArray(parsed?.categories) ? parsed.categories : [];
  const rawProducts = Array.isArray(parsed?.products) ? parsed.products : [];

  let categories = rawCategories;
  if (categories.length === 0 && rawProducts.length > 0) {
    categories = [
      {
        id: "migrated-uncategorized",
        name: "Uncategorized",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  const fallbackCategoryId = categories[0]?.id || "";
  const products = rawProducts.map((product) => ({
    ...product,
    categoryId: product.categoryId || fallbackCategoryId,
  }));

  return {
    ...initialData,
    ...parsed,
    categories,
    products,
    settings: {
      ...initialData.settings,
      ...(parsed?.settings || {}),
      language:
        parsed?.settings?.language === "English" ||
        parsed?.settings?.language === "en"
          ? "en"
          : "my",
    },
  };
}

function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatMoney(value) { return `${Number(value || 0).toLocaleString("en-US")} ကျပ်`; }
function isInRange(dateString, start, end) {
  const d = new Date(dateString);
  return d >= new Date(`${start}T00:00:00`) && d <= new Date(`${end}T23:59:59`);
}
function getItemReturnedQty(item) { return Number(item.returnedQty || 0); }
function getSaleReturnedAmount(sale) { return (sale.items || []).reduce((sum, item) => sum + getItemReturnedQty(item) * Number(item.sellPrice || 0), 0); }
function getSaleReturnedProfit(sale) { return (sale.items || []).reduce((sum, item) => sum + getItemReturnedQty(item) * (Number(item.sellPrice || 0) - Number(item.cost || 0)), 0); }
function getSaleNetTotal(sale) { return sale.status === "cancelled" ? 0 : Math.max(0, Number(sale.totalAmount || 0) - getSaleReturnedAmount(sale)); }
function getSaleNetProfit(sale) { return sale.status === "cancelled" ? 0 : Math.max(0, Number(sale.totalProfit || 0) - getSaleReturnedProfit(sale)); }
function getSaleStatusLabel(sale) {
  if (sale.status === "cancelled") return "Cancelled";
  if (sale.status === "returned") return "Returned";
  if (sale.status === "partial_returned") return "Partial return";
  return "Completed";
}
function receiptText(sale) {
  const shop = sale.shopInfo || {};
  const lines = [];
  lines.push(shop.shopName || "Hein's Inventory");
  if (shop.shopPhone) lines.push(`Phone: ${shop.shopPhone}`);
  if (shop.shopAddress) lines.push(shop.shopAddress);
  lines.push(`Receipt ${sale.receiptNo}`);
  lines.push(new Date(sale.createdAt).toLocaleString());
  lines.push(`Customer: ${sale.customerName}`);
  lines.push(`Status: ${getSaleStatusLabel(sale)}`);
  lines.push("");
  (sale.items || []).forEach((item) => {
    const returned = getItemReturnedQty(item);
    lines.push(`${item.productName} x ${item.quantity}${returned ? ` (returned ${returned})` : ""} = ${formatMoney(item.total)}`);
  });
  lines.push("");
  lines.push(`Total: ${formatMoney(sale.totalAmount)}`);
  lines.push(`Returned: ${formatMoney(getSaleReturnedAmount(sale))}`);
  lines.push(`Net total: ${formatMoney(getSaleNetTotal(sale))}`);
  lines.push(`Cash: ${formatMoney(sale.cashReceived)}`);
  lines.push(`Change: ${formatMoney(sale.change)}`);
  if (shop.receiptFooter) {
    lines.push("");
    lines.push(shop.receiptFooter);
  }
  return lines.join("\n");
}

function Card({ children, className = "" }) { return <div className={`rounded-2xl border border-blue-100 bg-white/90 shadow-[0_16px_40px_rgba(37,99,235,0.08)] ${className}`}>{children}</div>; }
function IconBox({ children, tone = "blue" }) {
  const tones = { blue: "bg-blue-50 text-blue-600", amber: "bg-amber-50 text-amber-500", red: "bg-red-50 text-red-500" };
  return <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone]}`}>{children}</div>;
}
function Field({ label, value, onChange, placeholder, type = "text" }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-500">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /></label>;
}
function AppHeader({ onOpenMenu }) {
  return (
    <header className="mb-5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <House size={25} strokeWidth={2.4} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-extrabold tracking-tight text-slate-950">
            Hein&apos;s Inventory
          </h1>

          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Offline mode
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-slate-700 shadow-sm transition active:scale-95"
      >
        <Menu size={22} strokeWidth={2.4} />
      </button>
    </header>
  );
}
function SideMenu({ open, onClose, items, activeTab, onSelect }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed bottom-0 right-0 top-0 z-[60] w-[82%] max-w-[310px] overflow-y-auto border-l border-blue-100 bg-white p-4 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <House size={22} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-950">Hein&apos;s Inventory</p>
                  <p className="text-[10px] text-slate-500">Navigation</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <nav className="space-y-1.5">
              {items.map(([key, Icon, label]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => onSelect(key)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
                    activeTab === key
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={20} strokeWidth={activeTab === key ? 2.7 : 2.2} />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={17} className={activeTab === key ? "text-white/80" : "text-slate-400"} />
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Modal({ title, onClose, children }) {
  return <AnimatePresence><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"><motion.div initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, scale: 0.96, opacity: 0 }} className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-2xl border border-blue-100 bg-white p-4 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2><button onClick={onClose} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 font-bold text-blue-700"><X size={20} /> Close</button></div>{children}</motion.div></motion.div></AnimatePresence>;
}

export default function HeinsInventoryApp() {
  const [tab, setTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(() => {
    try {
      const s =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("heins_inventory_offline_pos_v1");
      if (!s) return initialData;
      return migrateData(JSON.parse(s));
    } catch {
      return initialData;
    }
  });
  const currentLang = data.settings.language === "English" || data.settings.language === "en" ? "en" : "my";
  const t = (key) => (dict[currentLang]?.[key] || dict.en[key] || key);

  const [categoryModal, setCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [customerModal, setCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [addItemsModal, setAddItemsModal] = useState(false);
  const [receiptSale, setReceiptSale] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shopInfoOpen, setShopInfoOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cashReceived, setCashReceived] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [reportStart, setReportStart] = useState(todayISO());
  const [reportEnd, setReportEnd] = useState(todayISO());
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const restoreInputRef = useRef(null);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data]);

  const report = useMemo(() => {
    const sales = data.sales.filter((s) => isInRange(s.createdAt, reportStart, reportEnd));
    const expenses = data.expenses.filter((e) => isInRange(e.createdAt, reportStart, reportEnd));
    const revenue = sales.reduce((sum, s) => sum + getSaleNetTotal(s), 0);
    const profit = sales.reduce((sum, s) => sum + getSaleNetProfit(s), 0);
    const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
    const debtReceivable = data.customers.reduce((sum, c) => sum + Number(c.debtReceivable || 0), 0);
    const debtPayable = data.customers.reduce((sum, c) => sum + Number(c.debtPayable || 0), 0);
    const map = {};
    sales.forEach((s) => s.items.forEach((i) => { if (!map[i.productId]) map[i.productId] = { name: i.productName, qty: 0, total: 0 }; map[i.productId].qty += i.quantity; map[i.productId].total += i.total; }));
    return { sales, expenses, revenue, profit, expenseTotal, debtReceivable, debtPayable, net: profit - expenseTotal, bestSellers: Object.values(map).sort((a, b) => b.qty - a.qty) };
  }, [data, reportStart, reportEnd]);

  const todayReport = useMemo(() => {
    const today = todayISO();
    const sales = data.sales.filter((s) => isInRange(s.createdAt, today, today));
    const expenses = data.expenses.filter((e) => isInRange(e.createdAt, today, today));
    const revenue = sales.reduce((sum, s) => sum + getSaleNetTotal(s), 0);
    const profit = sales.reduce((sum, s) => sum + getSaleNetProfit(s), 0);
    const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
    return { sales, expenses, revenue, profit, expenseTotal, net: profit - expenseTotal };
  }, [data]);

  const lowStockCount = data.products.filter((p) => p.stock <= p.lowStockAlert).length;
  const cartTotal = cart.reduce((sum, i) => sum + i.sellPrice * i.quantity, 0);
  const cartProfit = cart.reduce((sum, i) => sum + (i.sellPrice - i.cost) * i.quantity, 0);
  const change = Math.max(Number(cashReceived || 0) - cartTotal, 0);

  const addToCart = (product) => {
    if (product.stock <= 0) return alert("Stock မရှိတော့ပါ။");
    setCart((prev) => {
      const current = prev.find((i) => i.productId === product.id);
      if (current) return prev.map((i) => i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) } : i);
      return [...prev, { productId: product.id, productName: product.name, sellPrice: product.sellPrice, cost: product.cost, quantity: 1 }];
    });
    setAddItemsModal(false);
  };
  const updateQty = (productId, delta) => {
    const product = data.products.find((p) => p.id === productId);
    setCart((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: Math.max(0, Math.min(i.quantity + delta, product?.stock || 0)) } : i).filter((i) => i.quantity > 0));
  };
  const completeSale = () => {
    if (!cart.length) return alert("Cart ထဲ item ထည့်ပါ။");
    if (Number(cashReceived || 0) < cartTotal) return alert("Cash received မလောက်ပါ။");
    for (const i of cart) { const p = data.products.find((x) => x.id === i.productId); if (!p || p.stock < i.quantity) return alert(`${i.productName} stock မလောက်ပါ။`); }
    const customer = data.customers.find((c) => c.id === selectedCustomerId);
    const receiptNumber = Number(data.settings.nextReceiptNumber || 1001);
    const sale = {
      id: crypto.randomUUID(),
      receiptNo: `INV-${receiptNumber}`,
      status: "completed",
      items: cart.map((i) => ({ ...i, returnedQty: 0, total: i.sellPrice * i.quantity, profit: (i.sellPrice - i.cost) * i.quantity })),
      customerId: customer?.id || "",
      customerName: customer?.name || t("noCustomer"),
      totalAmount: cartTotal,
      cashReceived: Number(cashReceived),
      change,
      totalProfit: cartProfit,
      shopInfo: {
        shopName: data.settings.shopName || "Hein's Inventory",
        shopPhone: data.settings.shopPhone || PHONE_NUMBER,
        shopAddress: data.settings.shopAddress || "",
        receiptFooter: data.settings.receiptFooter || "",
      },
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, nextReceiptNumber: receiptNumber + 1 },
      products: prev.products.map((p) => { const c = cart.find((i) => i.productId === p.id); return c ? { ...p, stock: p.stock - c.quantity, updatedAt: new Date().toISOString() } : p; }),
      sales: [sale, ...prev.sales],
    }));
    setCart([]); setCashReceived(""); setSelectedCustomerId(""); setReceiptSale(sale);
  };

  const cancelSale = (saleId) => {
    const sale = data.sales.find((item) => item.id === saleId);
    if (!sale || sale.status === "cancelled") return;
    if (!window.confirm("ဒီ sale ကို cancel လုပ်မလား? Stock ပြန်တိုးပေးပါမယ်။")) return;
    const restoreMap = {};
    sale.items.forEach((item) => {
      const remainingQty = Math.max(0, Number(item.quantity || 0) - getItemReturnedQty(item));
      restoreMap[item.productId] = (restoreMap[item.productId] || 0) + remainingQty;
    });
    const updatedSale = { ...sale, status: "cancelled", cancelledAt: new Date().toISOString() };
    setData((prev) => ({
      ...prev,
      products: prev.products.map((product) => restoreMap[product.id] ? { ...product, stock: Number(product.stock || 0) + restoreMap[product.id], updatedAt: new Date().toISOString() } : product),
      sales: prev.sales.map((item) => item.id === saleId ? updatedSale : item),
    }));
    setReceiptSale(updatedSale);
  };

  const returnSaleItems = (saleId, returnQtyMap) => {
    const sale = data.sales.find((item) => item.id === saleId);
    if (!sale || sale.status === "cancelled") return;
    const cleanMap = {};
    sale.items.forEach((item) => {
      const qty = Math.max(0, Number(returnQtyMap[item.productId] || 0));
      const maxQty = Math.max(0, Number(item.quantity || 0) - getItemReturnedQty(item));
      cleanMap[item.productId] = Math.min(qty, maxQty);
    });
    const totalReturnQty = Object.values(cleanMap).reduce((sum, qty) => sum + qty, 0);
    if (!totalReturnQty) return alert("Return quantity ထည့်ပါ။");
    const updatedItems = sale.items.map((item) => ({ ...item, returnedQty: getItemReturnedQty(item) + (cleanMap[item.productId] || 0) }));
    const allReturned = updatedItems.every((item) => getItemReturnedQty(item) >= Number(item.quantity || 0));
    const updatedSale = { ...sale, items: updatedItems, status: allReturned ? "returned" : "partial_returned", returnedAt: new Date().toISOString() };
    setData((prev) => ({
      ...prev,
      products: prev.products.map((product) => cleanMap[product.id] ? { ...product, stock: Number(product.stock || 0) + cleanMap[product.id], updatedAt: new Date().toISOString() } : product),
      sales: prev.sales.map((item) => item.id === saleId ? updatedSale : item),
    }));
    setReceiptSale(updatedSale);
  };
  const saveProduct = (form) => { const p = { id: editingProduct?.id || crypto.randomUUID(), categoryId: editingProduct?.categoryId || selectedCategoryId || form.categoryId, name: form.name.trim(), sellPrice: Number(form.sellPrice || 0), cost: Number(form.cost || 0), stock: Number(form.stock || 0), lowStockAlert: Number(form.lowStockAlert || 0), createdAt: editingProduct?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() }; if (!p.name) return alert("Product name ထည့်ပါ။"); if (!p.categoryId) return alert("Category ကိုအရင်ရွေးပါ။"); setData((prev) => ({ ...prev, products: editingProduct ? prev.products.map((x) => x.id === editingProduct.id ? p : x) : [p, ...prev.products] })); setProductModal(false); setEditingProduct(null); };
  const saveCategory = (form) => {
    const category = {
      id: editingCategory?.id || crypto.randomUUID(),
      name: form.name.trim(),
      createdAt: editingCategory?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!category.name) return alert("Category name ထည့်ပါ။");
    setData((prev) => ({
      ...prev,
      categories: editingCategory
        ? prev.categories.map((item) =>
            item.id === editingCategory.id ? category : item
          )
        : [category, ...prev.categories],
    }));
    setCategoryModal(false);
    setEditingCategory(null);
  };

  const deleteCategory = (id) => {
    const productsInCategory = data.products.filter(
      (product) => product.categoryId === id
    );
    if (productsInCategory.length > 0) {
      alert("ဒီ category ထဲမှာ product ရှိနေသေးလို့ ဖျက်လို့မရပါ။ Product တွေကို အရင်ဖျက်ပါ။");
      return;
    }
    if (!window.confirm("ဒီ category ကိုဖျက်မှာ သေချာလား?")) return;
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category.id !== id),
    }));
    if (selectedCategoryId === id) setSelectedCategoryId("");
  };

  const saveCustomer = (form) => { const c = { id: editingCustomer?.id || crypto.randomUUID(), name: form.name.trim(), phone: form.phone.trim(), note: form.note.trim(), debtReceivable: Number(editingCustomer?.debtReceivable || 0), debtPayable: Number(editingCustomer?.debtPayable || 0), createdAt: editingCustomer?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() }; if (!c.name) return alert("Customer name ထည့်ပါ။"); setData((prev) => ({ ...prev, customers: editingCustomer ? prev.customers.map((x) => x.id === editingCustomer.id ? c : x) : [c, ...prev.customers] })); setCustomerModal(false); setEditingCustomer(null); };
  const deleteProduct = (id) => { if (!window.confirm("ဒီ product ကိုဖျက်မှာ သေချာလား?")) return; setData((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id), sales: prev.sales })); };
  const deleteCustomer = (id) => { if (!window.confirm("ဒီ customer ကိုဖျက်မှာ သေချာလား?")) return; setData((prev) => ({ ...prev, customers: prev.customers.filter((c) => c.id !== id) })); };
  const addExpense = () => { if (!expenseTitle.trim() || !Number(expenseAmount)) return alert("Expense title နဲ့ amount ထည့်ပါ။"); setData((prev) => ({ ...prev, expenses: [{ id: crypto.randomUUID(), title: expenseTitle.trim(), amount: Number(expenseAmount), createdAt: new Date().toISOString() }, ...prev.expenses] })); setExpenseTitle(""); setExpenseAmount(""); };
  const setLanguage = (language) => setData((prev) => ({ ...prev, settings: { ...prev.settings, language } }));
  const saveShopInfo = (form) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        shopName: form.shopName.trim() || "Hein's Inventory",
        shopPhone: form.shopPhone.trim(),
        shopAddress: form.shopAddress.trim(),
        receiptFooter: form.receiptFooter.trim(),
      },
    }));
    setShopInfoOpen(false);
  };

  const backup = async () => {
    const fileName = `heins-inventory-backup-${todayISO()}.json`;
    const json = JSON.stringify(data, null, 2);
    try {
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({ suggestedName: fileName, types: [{ description: "JSON Backup", accept: { "application/json": [".json"] } }] });
        const writable = await handle.createWritable(); await writable.write(json); await writable.close(); alert("Backup saved."); return;
      }
    } catch (e) { if (e?.name === "AbortError") return; }
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const restore = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (
          !Array.isArray(parsed.products) ||
          !Array.isArray(parsed.customers) ||
          !Array.isArray(parsed.sales) ||
          !Array.isArray(parsed.expenses)
        ) {
          throw new Error();
        }
        if (
          !confirm(
            "Restore လုပ်ရင် လက်ရှိ data တွေ replace ဖြစ်နိုင်ပါတယ်။ ဆက်လုပ်မလား?"
          )
        )
          return;
        setData(migrateData(parsed));
        alert("Restore completed.");
      } catch {
        alert("Backup file မှားနေပါတယ်။");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const navItems = [["home", Home, t("home")], ["sell", ShoppingCart, t("sell")], ["categories", Package, t("categories")], ["customers", Users, t("customers")], ["salesHistory", ClipboardList, t("salesHistory")], ["reports", BarChart3, t("reports")], ["settings", Settings, t("settings")]];

  return <div className="min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-white font-sans text-sm text-slate-950"><div className="mx-auto max-w-3xl px-4 pb-8 pt-4"><AppHeader onOpenMenu={() => setMenuOpen(true)} />{tab === "home" && <HomePage t={t} setTab={setTab} todayReport={todayReport} lowStockCount={lowStockCount} products={data.products} sales={data.sales} openReceipt={setReceiptSale} />}{tab === "sell" && <SellPage t={t} customers={data.customers} cart={cart} updateQty={updateQty} cartTotal={cartTotal} cashReceived={cashReceived} setCashReceived={setCashReceived} change={change} completeSale={completeSale} setAddItemsModal={setAddItemsModal} selectedCustomerId={selectedCustomerId} setSelectedCustomerId={setSelectedCustomerId} />}{tab === "categories" && <CategoriesPage
  t={t}
  categories={data.categories}
  products={data.products}
  categorySearch={categorySearch}
  setCategorySearch={setCategorySearch}
  productSearch={productSearch}
  setProductSearch={setProductSearch}
  selectedCategoryId={selectedCategoryId}
  setSelectedCategoryId={setSelectedCategoryId}
  openAddCategory={() => { setEditingCategory(null); setCategoryModal(true); }}
  openEditCategory={(category) => { setEditingCategory(category); setCategoryModal(true); }}
  deleteCategory={deleteCategory}
  openAddProduct={(categoryId) => { setSelectedCategoryId(categoryId); setEditingProduct(null); setProductModal(true); }}
  openEditProduct={(product) => { setSelectedCategoryId(product.categoryId); setEditingProduct(product); setProductModal(true); }}
  deleteProduct={deleteProduct}
/>}{tab === "customers" && <CustomersPage t={t} customers={data.customers} search={customerSearch} setSearch={setCustomerSearch} openAdd={() => { setEditingCustomer(null); setCustomerModal(true); }} openEdit={(c) => { setEditingCustomer(c); setCustomerModal(true); }} deleteCustomer={deleteCustomer} />}{tab === "salesHistory" && <SalesHistoryPage t={t} sales={data.sales} customers={data.customers} openReceipt={setReceiptSale} />}{tab === "reports" && <ReportsPage t={t} report={report} reportStart={reportStart} reportEnd={reportEnd} setReportStart={setReportStart} setReportEnd={setReportEnd} expenseTitle={expenseTitle} setExpenseTitle={setExpenseTitle} expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount} addExpense={addExpense} openReceipt={setReceiptSale} />}{tab === "settings" && <SettingsPage t={t} language={data.settings.language} setLanguage={setLanguage} backup={backup} restoreInputRef={restoreInputRef} openShopInfo={() => setShopInfoOpen(true)} openAbout={() => setAboutOpen(true)} />}</div><SideMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  items={navItems}
  activeTab={tab}
  onSelect={(nextTab) => {
    setTab(nextTab);
    setMenuOpen(false);
  }}
/><input ref={restoreInputRef} type="file" accept="application/json" onChange={restore} className="hidden" />{categoryModal && <CategoryModal t={t} category={editingCategory} onClose={() => { setCategoryModal(false); setEditingCategory(null); }} onSave={saveCategory} />}{productModal && <ProductModal t={t} product={editingProduct} categoryId={selectedCategoryId} onClose={() => { setProductModal(false); setEditingProduct(null); }} onSave={saveProduct} />}{customerModal && <CustomerModal t={t} customer={editingCustomer} onClose={() => { setCustomerModal(false); setEditingCustomer(null); }} onSave={saveCustomer} />}{addItemsModal && <AddItemsModal t={t} categories={data.categories} products={data.products} onClose={() => setAddItemsModal(false)} addToCart={addToCart} />}{receiptSale && <ReceiptModal t={t} sale={receiptSale} onCancelSale={cancelSale} onReturnItems={returnSaleItems} onClose={() => setReceiptSale(null)} />}{shopInfoOpen && <ShopInfoModal t={t} settings={data.settings} onClose={() => setShopInfoOpen(false)} onSave={saveShopInfo} />}{aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}</div>;
}

function HomePage({ t, setTab, todayReport, lowStockCount, products, sales, openReceipt }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><Card className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 p-4"><div className="flex items-center justify-between gap-4"><div><p className="font-bold text-blue-600">{t("today")}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{formatMoney(todayReport.revenue)}</h2><p className="mt-3 text-sm font-medium text-slate-500">{todayReport.sales.length} {t("ordersCompleted")}</p></div><button onClick={() => setTab("sell")} className="flex shrink-0 items-center gap-3 rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-blue-200"><ShoppingCart /> {t("sell")}</button></div></Card><div className="grid grid-cols-2 gap-4 sm:grid-cols-3"><Stat icon={<ClipboardList />} label="Orders" value={todayReport.sales.length} sub="completed" /><Stat icon={<TrendingUp />} label={t("profit")} value={formatMoney(todayReport.profit)} /><Stat icon={<Wallet />} label={t("net")} value={formatMoney(todayReport.net)} /><Stat icon={<FileText />} label={t("expenses")} value={formatMoney(todayReport.expenseTotal)} /><Stat icon={<Package />} label={t("products")} value={products.length} sub="items" /><Stat icon={<AlertCircle />} label="Low stock" value={lowStockCount} sub="items" tone="amber" /></div><Card className="p-4"><h3 className="text-lg font-black">Needs attention</h3><div className="mt-5 flex items-center gap-4 rounded-3xl bg-blue-50 p-4"><CheckCircle2 className="text-blue-600" size={34} /><div><p className="text-base font-bold">{lowStockCount ? `${lowStockCount} low stock items` : "Inventory looks healthy"}</p><p className="mt-1 text-slate-500">{lowStockCount ? "Please check Products page." : "Great! All items are well stocked."}</p></div></div></Card><ReceiptList title={t("recentSales")} sales={sales.slice(0, 4)} openReceipt={openReceipt} empty="No sales yet" /></motion.div>;
}
function Stat({ icon, label, value, sub, tone = "blue" }) { return <Card className="p-4"><IconBox tone={tone}>{icon}</IconBox><p className="mt-4 font-bold text-slate-500">{label}</p><p className="mt-3 text-lg font-black tracking-tight">{value}</p>{sub && <p className="mt-1 text-slate-500">{sub}</p>}</Card>; }
function SellPage({ t, customers, cart, updateQty, cartTotal, cashReceived, setCashReceived, change, completeSale, setAddItemsModal, selectedCustomerId, setSelectedCustomerId }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><h2 className="text-2xl font-black">{t("sell")}</h2><button onClick={() => setAddItemsModal(true)} className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white text-base font-black text-blue-700 shadow-sm"><Search /> {t("addItems")}</button><Card className="p-4"><label className="mb-2 block font-bold text-slate-500">{t("customer")}</label><select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)} className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm font-bold outline-none"><option value="">{t("noCustomer")}</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Card><Card className="p-4"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-black">{t("currentSale")}</h3><span className="font-bold text-slate-500">{cart.length} item types</span></div>{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 p-4 text-center text-slate-500"><ShoppingCart className="mx-auto mb-3" /><p className="text-base font-bold">{t("cartEmpty")}</p></div> : cart.map((item) => <div key={item.productId} className="mb-3 flex items-center justify-between rounded-2xl border border-blue-100 p-4"><div><p className="font-black">{item.productName}</p><p className="text-sm text-slate-500">{formatMoney(item.sellPrice)} x {item.quantity}</p></div><div className="flex items-center gap-2"><button onClick={() => updateQty(item.productId, -1)} className="rounded-xl bg-blue-50 p-2 text-blue-700"><Minus size={18} /></button><span className="w-8 text-center font-black">{item.quantity}</span><button onClick={() => updateQty(item.productId, 1)} className="rounded-xl bg-blue-50 p-2 text-blue-700"><Plus size={18} /></button></div></div>)}<div className="mt-5 flex items-center justify-between"><p className="text-base font-bold text-slate-500">{t("total")}</p><p className="text-2xl font-black">{formatMoney(cartTotal)}</p></div><input value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} type="number" placeholder={t("cashReceived")} className="mt-5 h-12 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /><div className="mt-5 flex items-center justify-between"><p className="text-base font-bold text-slate-500">{t("change")}</p><p className="text-xl font-black">{formatMoney(change)}</p></div><button onClick={completeSale} className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-base font-black text-white shadow-lg shadow-blue-100"><CheckCircle2 /> {t("completeSale")}</button></Card></motion.div>;
}
function CategoriesPage({
  t,
  categories,
  products,
  categorySearch,
  setCategorySearch,
  productSearch,
  setProductSearch,
  selectedCategoryId,
  setSelectedCategoryId,
  openAddCategory,
  openEditCategory,
  deleteCategory,
  openAddProduct,
  openEditProduct,
  deleteProduct,
}) {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  if (selectedCategory) {
    const categoryProducts = products.filter(
      (product) =>
        product.categoryId === selectedCategory.id &&
        product.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <button
          onClick={() => {
            setSelectedCategoryId("");
            setProductSearch("");
          }}
          className="flex items-center gap-2 font-black text-blue-700"
        >
          <ArrowLeft size={20} /> {t("categories")}
        </button>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">{selectedCategory.name}</h2>
            <p className="mt-2 text-slate-500">
              {categoryProducts.length} {t("products")}
            </p>
          </div>
          <button
            onClick={() => openAddProduct(selectedCategory.id)}
            className="flex items-center gap-3 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <PlusCircle /> {t("addItem")}
          </button>
        </div>

        <SearchBox
          value={productSearch}
          onChange={setProductSearch}
          placeholder={t("searchProducts")}
        />

        {categoryProducts.length === 0 ? (
          <Card className="p-4 text-center text-slate-500">
            {t("noProductsInCategory")}
          </Card>
        ) : (
          categoryProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-black">{product.name}</p>
                  <p className="mt-2 text-slate-500">
                    {formatMoney(product.sellPrice)} - {t("cost")}{" "}
                    {formatMoney(product.cost)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-2xl px-4 py-2 font-black ${
                      product.stock <= product.lowStockAlert
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {product.stock} left
                  </span>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openEditProduct(product)}
                      className="rounded-2xl bg-blue-50 p-3 text-blue-700"
                    >
                      <Edit3 />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-2xl bg-red-50 p-3 text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </motion.div>
    );
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-black">{t("categories")}</h2>

      <div className="flex items-center gap-4">
        <p className="flex-1 text-base font-bold text-slate-500">
          {categories.length} {t("categories")}
        </p>
        <button
          onClick={openAddCategory}
          className="flex items-center gap-3 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white"
        >
          <PlusCircle /> {t("addCategory")}
        </button>
      </div>

      <SearchBox
        value={categorySearch}
        onChange={setCategorySearch}
        placeholder={t("searchCategories")}
      />

      {filteredCategories.length === 0 ? (
        <Card className="p-4 text-center text-slate-500">
          {t("noCategories")}
        </Card>
      ) : (
        filteredCategories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id
          );
          const lowStock = categoryProducts.filter(
            (product) => product.stock <= product.lowStockAlert
          ).length;

          return (
            <Card key={category.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setProductSearch("");
                  }}
                  className="flex flex-1 items-center gap-4 text-left"
                >
                  <IconBox>
                    <Package />
                  </IconBox>
                  <div>
                    <p className="text-lg font-black">{category.name}</p>
                    <p className="mt-1 text-slate-500">
                      {categoryProducts.length} {t("products")}
                      {lowStock > 0 ? ` · ${lowStock} low stock` : ""}
                    </p>
                  </div>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditCategory(category)}
                    className="rounded-2xl bg-blue-50 p-3 text-blue-700"
                  >
                    <Edit3 />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="rounded-2xl bg-red-50 p-3 text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </motion.div>
  );
}
function CustomersPage({ t, customers, search, setSearch, openAdd, openEdit, deleteCustomer }) { const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())); return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><h2 className="text-2xl font-black">{t("customers")}</h2><div className="flex gap-4"><SearchBox value={search} onChange={setSearch} placeholder={t("searchCustomers")} /><button onClick={openAdd} className="flex shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white"><Users /> Add</button></div>{filtered.map((c) => <Card key={c.id} className="p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-lg font-black">{c.name}</p><p className="mt-1 text-slate-500">{c.debtReceivable || c.debtPayable ? `Debt: ${formatMoney(c.debtReceivable - c.debtPayable)}` : t("noDebt")}</p>{c.phone && <p className="mt-1 text-sm text-slate-500">{c.phone}</p>}</div><div className="flex gap-2"><button onClick={() => openEdit(c)} className="rounded-2xl bg-blue-50 p-3 text-blue-700"><Edit3 /></button><button onClick={() => deleteCustomer(c.id)} className="rounded-2xl bg-red-50 p-3 text-red-500"><Trash2 /></button></div></div></Card>)}</motion.div>; }

function SalesHistoryPage({ t, sales, customers, openReceipt }) {
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredSales = sales.filter((sale) => {
    const receipt = String(sale.receiptNo || "").toLowerCase();
    const customerName = String(sale.customerName || "").toLowerCase();
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || receipt.includes(query) || customerName.includes(query);
    const matchesCustomer = !customerId || sale.customerId === customerId;
    const matchesStatus = !status || (sale.status || "completed") === status;
    const matchesStart = !startDate || new Date(sale.createdAt) >= new Date(`${startDate}T00:00:00`);
    const matchesEnd = !endDate || new Date(sale.createdAt) <= new Date(`${endDate}T23:59:59`);
    return matchesSearch && matchesCustomer && matchesStatus && matchesStart && matchesEnd;
  });

  const totalNet = filteredSales.reduce((sum, sale) => sum + getSaleNetTotal(sale), 0);
  const cancelledCount = filteredSales.filter((sale) => sale.status === "cancelled").length;
  const returnedCount = filteredSales.filter((sale) => sale.status === "returned" || sale.status === "partial_returned").length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <h2 className="text-2xl font-black">{t("salesHistory")}</h2>
        <p className="mt-1 text-xs text-slate-500">View old receipts, cancel sales, and return items.</p>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <SearchBox value={search} onChange={setSearch} placeholder={t("searchReceipts")} />
          </div>
          <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none">
            <option value="">{t("allCustomers")}</option>
            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none">
            <option value="">{t("allStatuses")}</option>
            <option value="completed">Completed</option>
            <option value="partial_returned">Partial returned</option>
            <option value="returned">Returned</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input aria-label={t("fromDate")} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none" />
          <input aria-label={t("toDate")} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none" />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3">
          <p className="text-[11px] font-bold text-slate-500">Receipts</p>
          <p className="mt-1 text-lg font-black">{filteredSales.length}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] font-bold text-slate-500">Returned</p>
          <p className="mt-1 text-lg font-black">{returnedCount}</p>
        </Card>
        <Card className="p-3">
          <p className="text-[11px] font-bold text-slate-500">Cancelled</p>
          <p className="mt-1 text-lg font-black">{cancelledCount}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-black">{t("receipts")}</h3>
          <p className="text-xs font-black text-blue-700">{formatMoney(totalNet)}</p>
        </div>
        {filteredSales.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-blue-200 p-4 text-center text-slate-500">No receipts found</p>
        ) : (
          filteredSales.map((sale) => (
            <button key={sale.id} onClick={() => openReceipt(sale)} className="mb-3 w-full rounded-2xl border border-blue-100 p-4 text-left last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black">Receipt {sale.receiptNo}</p>
                  <p className="mt-1 text-xs text-slate-500">{sale.customerName} · {new Date(sale.createdAt).toLocaleString()}</p>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-black ${sale.status === "cancelled" ? "bg-red-50 text-red-600" : sale.status === "returned" || sale.status === "partial_returned" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{getSaleStatusLabel(sale)}</span>
                </div>
                <div className="text-right">
                  <p className="font-black">{formatMoney(getSaleNetTotal(sale))}</p>
                  {getSaleReturnedAmount(sale) > 0 && <p className="mt-1 text-[11px] text-amber-600">Returned {formatMoney(getSaleReturnedAmount(sale))}</p>}
                </div>
              </div>
            </button>
          ))
        )}
      </Card>
    </motion.div>
  );
}

function ReportsPage({ t, report, reportStart, reportEnd, setReportStart, setReportEnd, expenseTitle, setExpenseTitle, expenseAmount, setExpenseAmount, addExpense, openReceipt }) { return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><h2 className="text-2xl font-black">{t("reports")}</h2><Card className="p-4"><p className="mb-3 font-bold text-slate-500">{t("dateRange")}</p><div className="grid grid-cols-2 gap-3"><input type="date" value={reportStart} onChange={(e) => setReportStart(e.target.value)} className="h-11 rounded-2xl border border-slate-200 px-3 font-bold" /><input type="date" value={reportEnd} onChange={(e) => setReportEnd(e.target.value)} className="h-11 rounded-2xl border border-slate-200 px-3 font-bold" /></div><p className="mt-3 text-right font-bold text-slate-500">{report.sales.length} {t("salesInRange")}</p></Card><div className="grid grid-cols-2 gap-4"><Stat icon={<Wallet />} label="Revenue" value={formatMoney(report.revenue)} /><Stat icon={<TrendingUp />} label={t("profit")} value={formatMoney(report.profit)} /><Stat icon={<FileText />} label={t("expenses")} value={formatMoney(report.expenseTotal)} tone="amber" /><Stat icon={<TrendingUp />} label={t("debtReceivable")} value={formatMoney(report.debtReceivable)} /><Stat icon={<TrendingUp />} label={t("debtPayable")} value={formatMoney(report.debtPayable)} tone="red" /><Stat icon={<Wallet />} label={t("net")} value={formatMoney(report.net)} /></div><Card className="p-4"><h3 className="mb-4 text-lg font-black">{t("addExpense")}</h3><input value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} placeholder={t("expenseTitle")} className="mb-3 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm" /><input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} type="number" placeholder={t("amount")} className="mb-4 h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm" /><button onClick={addExpense} className="flex h-11 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 font-black text-white"><FileText /> {t("saveExpense")}</button></Card><ReceiptList title={t("transactionHistory")} sales={report.sales} openReceipt={openReceipt} empty="No transactions" /><ReportList title={t("bestSellers")} items={report.bestSellers.map((i, idx) => ({ id: idx, left: i.name, sub: `${i.qty} sold`, right: formatMoney(i.total) }))} empty="No best sellers" /><ReportList title={t("recentExpenses")} items={report.expenses.map((e) => ({ id: e.id, left: e.title, sub: new Date(e.createdAt).toLocaleString(), right: formatMoney(e.amount) }))} empty="No expenses" /></motion.div>; }
function SettingsPage({ t, language, setLanguage, backup, restoreInputRef, openShopInfo, openAbout }) { const [openLang, setOpenLang] = useState(false); return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><h2 className="text-2xl font-black">{t("settings")}</h2><button onClick={() => setOpenLang(!openLang)} className="w-full text-left"><Card className="flex items-center justify-between p-4"><div className="flex items-center gap-4"><IconBox><Languages /></IconBox><div><p className="text-lg font-black">{t("language")}</p><p className="mt-1 text-slate-500">{language === "my" ? "မြန်မာ" : "English"}</p></div></div><ChevronRight className="text-blue-600" /></Card></button>{openLang && <Card className="overflow-hidden p-2"><button onClick={() => { setLanguage("my"); setOpenLang(false); }} className="w-full rounded-2xl px-4 py-3 text-left font-bold hover:bg-blue-50">မြန်မာ</button><button onClick={() => { setLanguage("en"); setOpenLang(false); }} className="w-full rounded-2xl px-4 py-3 text-left font-bold hover:bg-blue-50">English</button></Card>}<SettingRow icon={<House />} title={t("shopInfo")} sub={t("shopInfoSub")} onClick={openShopInfo} /><SettingRow icon={<Download />} title={t("backup")} sub={t("backupSub")} onClick={backup} /><SettingRow icon={<Upload />} title={t("restore")} sub={t("restoreSub")} onClick={() => restoreInputRef.current?.click()} /><SettingRow icon={<Info />} title={t("about")} sub={t("aboutSub")} onClick={openAbout} /></motion.div>; }
function SettingRow({ icon, title, sub, onClick }) { return <button onClick={onClick} className="w-full text-left"><Card className="flex items-center justify-between p-4"><div className="flex items-center gap-4"><IconBox>{icon}</IconBox><div><p className="text-lg font-black">{title}</p><p className="mt-1 text-slate-500">{sub}</p></div></div><ChevronRight className="text-blue-600" /></Card></button>; }
function SearchBox({ value, onChange, placeholder }) { return <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-12 w-full rounded-2xl border border-blue-100 bg-white pl-12 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /></div>; }
function CategoryModal({ t, category, onClose, onSave }) {
  const [name, setName] = useState(category?.name || "");
  return (
    <Modal
      title={category ? t("editCategory") : t("addCategory")}
      onClose={onClose}
    >
      <div className="space-y-4">
        <Field
          label={t("categoryName")}
          value={name}
          onChange={setName}
          placeholder={t("categoryName")}
        />
        <button
          onClick={() => onSave({ name })}
          className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-base font-black text-white"
        >
          <PlusCircle /> {category ? "Save" : t("addCategory")}
        </button>
      </div>
    </Modal>
  );
}

function ProductModal({ t, product, categoryId, onClose, onSave }) { const [form, setForm] = useState({ categoryId: product?.categoryId || categoryId || "", name: product?.name || "", sellPrice: product?.sellPrice || "", cost: product?.cost || "", stock: product?.stock || "", lowStockAlert: product?.lowStockAlert ?? 5 }); const set = (k, v) => setForm((p) => ({ ...p, [k]: v })); return <Modal title={product ? t("editItem") : t("addItem")} onClose={onClose}><div className="space-y-4"><Field label={t("productName")} value={form.name} onChange={(v) => set("name", v)} placeholder={t("productName")} /><div className="grid grid-cols-2 gap-4"><Field label={t("sellPrice")} value={form.sellPrice} onChange={(v) => set("sellPrice", v)} placeholder={t("sellPrice")} type="number" /><Field label={t("cost")} value={form.cost} onChange={(v) => set("cost", v)} placeholder={t("cost")} type="number" /></div><div className="grid grid-cols-2 gap-4"><Field label={t("stock")} value={form.stock} onChange={(v) => set("stock", v)} placeholder={t("stock")} type="number" /><Field label={t("lowStockAlert")} value={form.lowStockAlert} onChange={(v) => set("lowStockAlert", v)} placeholder="5" type="number" /></div><button onClick={() => onSave(form)} className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-base font-black text-white"><PlusCircle /> {product ? "Save" : t("addItem")}</button></div></Modal>; }
function CustomerModal({ t, customer, onClose, onSave }) { const [form, setForm] = useState({ name: customer?.name || "", phone: customer?.phone || "", note: customer?.note || "" }); const set = (k, v) => setForm((p) => ({ ...p, [k]: v })); return <Modal title={customer ? t("editCustomer") : t("addCustomer")} onClose={onClose}><div className="space-y-4"><Field label={t("name")} value={form.name} onChange={(v) => set("name", v)} placeholder={t("name")} /><Field label={t("phone")} value={form.phone} onChange={(v) => set("phone", v)} placeholder={t("phone")} /><Field label={t("note")} value={form.note} onChange={(v) => set("note", v)} placeholder={t("note")} /><button onClick={() => onSave(form)} className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-base font-black text-white"><Users /> {customer ? "Save" : t("addCustomer")}</button></div></Modal>; }
function AddItemsModal({
  t,
  categories,
  products,
  onClose,
  addToCart,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [search, setSearch] = useState("");

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  if (!selectedCategory) {
    return (
      <Modal title={t("addItems")} onClose={onClose}>
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder={t("searchCategories")}
        />
        <div className="mt-5 space-y-3">
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((category) => {
              const count = products.filter(
                (product) => product.categoryId === category.id
              ).length;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setSearch("");
                  }}
                  className="w-full rounded-2xl border border-blue-100 p-4 text-left transition hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-black">{category.name}</p>
                      <p className="text-slate-500">
                        {count} {t("products")}
                      </p>
                    </div>
                    <ChevronRight className="text-blue-600" />
                  </div>
                </button>
              );
            })}
        </div>
      </Modal>
    );
  }

  const filteredProducts = products.filter(
    (product) =>
      product.categoryId === selectedCategory.id &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal title={selectedCategory.name} onClose={onClose}>
      <button
        onClick={() => {
          setSelectedCategoryId("");
          setSearch("");
        }}
        className="mb-4 flex items-center gap-2 font-black text-blue-700"
      >
        <ArrowLeft size={20} /> {t("categories")}
      </button>
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder={t("searchProducts")}
      />
      <div className="mt-5 space-y-3">
        {filteredProducts.length === 0 ? (
          <Card className="p-4 text-center text-slate-500">
            {t("noProductsInCategory")}
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="w-full rounded-2xl border border-blue-100 p-4 text-left transition hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-black">{product.name}</p>
                  <p className="text-slate-500">
                    {formatMoney(product.sellPrice)} · Stock {product.stock}
                  </p>
                </div>
                <PlusCircle className="text-blue-600" />
              </div>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
function ReceiptModal({ t, sale, onCancelSale, onReturnItems, onClose }) {
  const [returnOpen, setReturnOpen] = useState(false);
  const printIt = () => window.print();
  const shareIt = async () => {
    const text = receiptText(sale);
    if (navigator.share) await navigator.share({ title: "Hein's Inventory Receipt", text });
    else { await navigator.clipboard.writeText(text); alert("Receipt copied."); }
  };
  const canChange = sale.status !== "cancelled" && sale.status !== "returned";
  return <Modal title={t("receipt")} onClose={onClose}>
    <ReceiptCard sale={sale} />
    {canChange && <div className="mt-4 grid grid-cols-2 gap-2">
      <button onClick={() => setReturnOpen(true)} className="flex h-11 items-center justify-center rounded-2xl bg-amber-50 px-3 text-xs font-black text-amber-700">{t("returnItems")}</button>
      <button onClick={() => onCancelSale(sale.id)} className="flex h-11 items-center justify-center rounded-2xl bg-red-50 px-3 text-xs font-black text-red-600">{t("cancelSale")}</button>
    </div>}
    <button onClick={printIt} className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 font-black text-white"><Printer /> {t("printReceipt")}</button>
    <button onClick={shareIt} className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-2xl bg-blue-50 font-black text-blue-700"><Share2 /> {t("shareReceipt")}</button>
    {returnOpen && <ReturnItemsModal t={t} sale={sale} onClose={() => setReturnOpen(false)} onSubmit={(qtyMap) => { onReturnItems(sale.id, qtyMap); setReturnOpen(false); }} />}
  </Modal>;
}
function ReturnItemsModal({ t, sale, onClose, onSubmit }) {
  const [qtyMap, setQtyMap] = useState({});
  return <Modal title={t("returnItems")} onClose={onClose}>
    <div className="space-y-3">
      {sale.items.map((item) => {
        const maxQty = Math.max(0, Number(item.quantity || 0) - getItemReturnedQty(item));
        return <div key={item.productId} className="rounded-2xl border border-blue-100 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div><p className="font-black">{item.productName}</p><p className="text-xs text-slate-500">Sold {item.quantity} · Available to return {maxQty}</p></div>
            <p className="font-black">{formatMoney(item.sellPrice)}</p>
          </div>
          <input type="number" min="0" max={maxQty} value={qtyMap[item.productId] || ""} onChange={(e) => setQtyMap((prev) => ({ ...prev, [item.productId]: e.target.value }))} placeholder="Return qty" className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" />
        </div>;
      })}
      <button onClick={() => onSubmit(qtyMap)} className="flex h-11 w-full items-center justify-center rounded-2xl bg-blue-600 font-black text-white">Save return</button>
    </div>
  </Modal>;
}
function ReceiptCard({ sale }) {
  const shop = sale.shopInfo || {};
  const returnedAmount = getSaleReturnedAmount(sale);
  const netTotal = getSaleNetTotal(sale);
  return <Card className="p-4 shadow-none">
    <div className="text-center">
      <h3 className="text-lg font-black">{shop.shopName || "Hein's Inventory"}</h3>
      {shop.shopPhone && <p className="mt-1 text-xs text-slate-500">Phone: {shop.shopPhone}</p>}
      {shop.shopAddress && <p className="mt-1 text-xs text-slate-500">{shop.shopAddress}</p>}
    </div>
    <div className="my-4 border-t border-slate-200" />
    <div className="space-y-1 text-xs text-slate-500">
      <p>Receipt: <b className="text-slate-900">{sale.receiptNo}</b></p>
      <p>Date: {new Date(sale.createdAt).toLocaleString()}</p>
      <p>Customer: {sale.customerName}</p>
      <p>Status: <b className={sale.status === "cancelled" ? "text-red-600" : sale.status === "returned" || sale.status === "partial_returned" ? "text-amber-600" : "text-blue-600"}>{getSaleStatusLabel(sale)}</b></p>
    </div>
    <div className="my-4 border-t border-slate-200" />
    {sale.items.map((i) => <div key={i.productId} className="mb-3 flex justify-between gap-3"><div><p className="font-black">{i.productName}</p><p className="text-slate-500">{i.quantity} x {formatMoney(i.sellPrice)}{getItemReturnedQty(i) ? ` · returned ${getItemReturnedQty(i)}` : ""}</p></div><p className="font-black">{formatMoney(i.total)}</p></div>)}
    <div className="mt-4 space-y-3 border-t border-slate-200 pt-4"><div className="flex justify-between"><span className="text-slate-500">စုစုပေါင်း</span><b className="text-lg">{formatMoney(sale.totalAmount)}</b></div><div className="flex justify-between"><span className="text-slate-500">Returned</span><b>{formatMoney(returnedAmount)}</b></div><div className="flex justify-between"><span className="text-slate-500">Net total</span><b>{formatMoney(netTotal)}</b></div><div className="flex justify-between"><span className="text-slate-500">အပ်ငွေ</span><b>{formatMoney(sale.cashReceived)}</b></div><div className="flex justify-between"><span className="text-slate-500">ပြန်အမ်းငွေ</span><b>{formatMoney(sale.change)}</b></div></div>
    {shop.receiptFooter && <p className="mt-4 border-t border-slate-200 pt-3 text-center text-xs text-slate-500">{shop.receiptFooter}</p>}
  </Card>;
}
function ReceiptList({ title, sales, openReceipt, empty }) { return <Card className="p-4"><h3 className="mb-4 text-lg font-black">{title}</h3>{sales.length === 0 ? <p className="rounded-2xl border border-dashed border-blue-200 p-4 text-center text-slate-500">{empty}</p> : sales.map((sale) => <button key={sale.id} onClick={() => openReceipt(sale)} className="mb-3 flex w-full items-center justify-between rounded-2xl border border-blue-100 p-4 text-left last:mb-0"><div><p className="font-black">Receipt {sale.receiptNo}</p><p className="text-sm text-slate-500">{sale.customerName} · {getSaleStatusLabel(sale)} · {new Date(sale.createdAt).toLocaleString()}</p></div><p className="font-black">{formatMoney(getSaleNetTotal(sale))}</p></button>)}</Card>; }
function ReportList({ title, items, empty }) { return <Card className="p-4"><h3 className="mb-4 text-lg font-black">{title}</h3>{items.length === 0 ? <p className="rounded-2xl border border-dashed border-blue-200 p-4 text-center text-slate-500">{empty}</p> : items.slice(0, 6).map((item) => <div key={item.id} className="mb-3 flex items-center justify-between rounded-2xl border border-blue-100 p-4 last:mb-0"><div><p className="font-black">{item.left}</p><p className="text-sm text-slate-500">{item.sub}</p></div><p className="font-black">{item.right}</p></div>)}</Card>; }
function ShopInfoModal({ t, settings, onClose, onSave }) {
  const [form, setForm] = useState({
    shopName: settings.shopName || "Hein's Inventory",
    shopPhone: settings.shopPhone || PHONE_NUMBER,
    shopAddress: settings.shopAddress || "",
    receiptFooter: settings.receiptFooter || "",
  });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return <Modal title={t("shopInfo")} onClose={onClose}>
    <div className="space-y-4">
      <Field label={t("shopName")} value={form.shopName} onChange={(v) => set("shopName", v)} placeholder="Hein's Inventory" />
      <Field label={t("shopPhone")} value={form.shopPhone} onChange={(v) => set("shopPhone", v)} placeholder="09661919266" />
      <Field label={t("shopAddress")} value={form.shopAddress} onChange={(v) => set("shopAddress", v)} placeholder="Shop address" />
      <Field label={t("receiptFooter")} value={form.receiptFooter} onChange={(v) => set("receiptFooter", v)} placeholder="Thank you" />
      <button onClick={() => onSave(form)} className="mt-4 flex h-12 w-full items-center justify-center rounded-3xl bg-blue-600 text-base font-black text-white">Save shop info</button>
    </div>
  </Modal>;
}
function AboutModal({ onClose }) { return <Modal title="About" onClose={onClose}><div className="space-y-4"><Card className="p-4 shadow-none"><h3 className="text-lg font-black">Hein&apos;s Inventory</h3><p className="mt-4 leading-8 text-slate-500">Hein&apos;s Inventory is an offline point-of-sale app for small shops. It keeps products, stock, sales, expenses, reports, backups, and receipts on your device.</p></Card><Card className="p-4 shadow-none"><h3 className="text-lg font-black">Contact</h3><a href={`tel:${PHONE_NUMBER}`} className="mt-4 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 font-black text-blue-700"><Phone /> Phone: {PHONE_NUMBER}</a><a href={`viber://chat?number=${encodeURIComponent(VIBER_NUMBER)}`} className="mt-3 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 font-black text-blue-700"><MessageCircle /> Viber: {PHONE_NUMBER}</a></Card></div></Modal>; }
