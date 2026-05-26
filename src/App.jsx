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
    customers: "Customers",
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
  },
  my: {
    home: "မူလ",
    sell: "ရောင်း",
    products: "ပစ္စည်းများ",
    customers: "ဖောက်သည်များ",
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
  },
};

const initialData = {
  products: [
    { id: crypto.randomUUID(), name: "Battery", sellPrice: 160000, cost: 120000, stock: 2, lowStockAlert: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  customers: [
    { id: crypto.randomUUID(), name: "MayMyatThu", phone: "", note: "", debtReceivable: 0, debtPayable: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  sales: [],
  expenses: [],
  settings: { language: "my", appName: "Hein's Inventory", currency: "ကျပ်" },
};

function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatMoney(value) { return `${Number(value || 0).toLocaleString("en-US")} ကျပ်`; }
function isInRange(dateString, start, end) {
  const d = new Date(dateString);
  return d >= new Date(`${start}T00:00:00`) && d <= new Date(`${end}T23:59:59`);
}
function receiptText(sale) {
  return `Hein's Inventory\nReceipt #${sale.receiptNo}\n${new Date(sale.createdAt).toLocaleString()}\nCustomer: ${sale.customerName}\n\n${sale.items.map((i) => `${i.productName} x ${i.quantity} = ${formatMoney(i.total)}`).join("\n")}\n\nTotal: ${formatMoney(sale.totalAmount)}\nCash: ${formatMoney(sale.cashReceived)}\nChange: ${formatMoney(sale.change)}`;
}

function Card({ children, className = "" }) { return <div className={`rounded-[28px] border border-blue-100 bg-white/90 shadow-[0_16px_40px_rgba(37,99,235,0.08)] ${className}`}>{children}</div>; }
function IconBox({ children, tone = "blue" }) {
  const tones = { blue: "bg-blue-50 text-blue-600", amber: "bg-amber-50 text-amber-500", red: "bg-red-50 text-red-500" };
  return <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tones[tone]}`}>{children}</div>;
}
function Field({ label, value, onChange, placeholder, type = "text" }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-500">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /></label>;
}
function AppHeader() {
  return <div className="mb-8 flex items-center justify-between"><div className="flex items-center gap-4"><div className="relative flex h-16 w-16 items-center justify-center text-blue-600"><House size={58} strokeWidth={2.7} /><span className="absolute bottom-3 text-lg font-black tracking-tight">Hein</span></div><div><h1 className="text-3xl font-black tracking-tight text-slate-950">Hein&apos;s Inventory</h1><p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500"><span className="h-2 w-2 rounded-full bg-blue-500" /> Offline mode</p></div></div></div>;
}
function Modal({ title, onClose, children }) {
  return <AnimatePresence><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"><motion.div initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, scale: 0.96, opacity: 0 }} className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-[30px] border border-blue-100 bg-white p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><h2 className="text-3xl font-black tracking-tight text-slate-950">{title}</h2><button onClick={onClose} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 font-bold text-blue-700"><X size={20} /> Close</button></div>{children}</motion.div></motion.div></AnimatePresence>;
}

export default function HeinsInventoryApp() {
  const [tab, setTab] = useState("home");
  const [data, setData] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("heins_inventory_offline_pos_v1");
      if (!s) return initialData;
      const parsed = JSON.parse(s);
      const rawLang = parsed.settings?.language;
      const fixedLang = rawLang === "English" || rawLang === "en" ? "en" : "my";
      return { ...initialData, ...parsed, settings: { ...initialData.settings, ...(parsed.settings || {}), language: fixedLang } };
    } catch {
      return initialData;
    }
  });
  const currentLang = data.settings.language === "English" || data.settings.language === "en" ? "en" : "my";
  const t = (key) => (dict[currentLang]?.[key] || dict.en[key] || key);

  const [productModal, setProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [customerModal, setCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [addItemsModal, setAddItemsModal] = useState(false);
  const [receiptSale, setReceiptSale] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
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
    const revenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const profit = sales.reduce((sum, s) => sum + s.totalProfit, 0);
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
    const revenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const profit = sales.reduce((sum, s) => sum + s.totalProfit, 0);
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
    const sale = { id: crypto.randomUUID(), receiptNo: data.sales.length + 1, items: cart.map((i) => ({ ...i, total: i.sellPrice * i.quantity, profit: (i.sellPrice - i.cost) * i.quantity })), customerId: customer?.id || "", customerName: customer?.name || t("noCustomer"), totalAmount: cartTotal, cashReceived: Number(cashReceived), change, totalProfit: cartProfit, createdAt: new Date().toISOString() };
    setData((prev) => ({ ...prev, products: prev.products.map((p) => { const c = cart.find((i) => i.productId === p.id); return c ? { ...p, stock: p.stock - c.quantity, updatedAt: new Date().toISOString() } : p; }), sales: [sale, ...prev.sales] }));
    setCart([]); setCashReceived(""); setSelectedCustomerId(""); setReceiptSale(sale);
  };
  const saveProduct = (form) => { const p = { id: editingProduct?.id || crypto.randomUUID(), name: form.name.trim(), sellPrice: Number(form.sellPrice || 0), cost: Number(form.cost || 0), stock: Number(form.stock || 0), lowStockAlert: Number(form.lowStockAlert || 0), createdAt: editingProduct?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() }; if (!p.name) return alert("Product name ထည့်ပါ။"); setData((prev) => ({ ...prev, products: editingProduct ? prev.products.map((x) => x.id === editingProduct.id ? p : x) : [p, ...prev.products] })); setProductModal(false); setEditingProduct(null); };
  const saveCustomer = (form) => { const c = { id: editingCustomer?.id || crypto.randomUUID(), name: form.name.trim(), phone: form.phone.trim(), note: form.note.trim(), debtReceivable: Number(editingCustomer?.debtReceivable || 0), debtPayable: Number(editingCustomer?.debtPayable || 0), createdAt: editingCustomer?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() }; if (!c.name) return alert("Customer name ထည့်ပါ။"); setData((prev) => ({ ...prev, customers: editingCustomer ? prev.customers.map((x) => x.id === editingCustomer.id ? c : x) : [c, ...prev.customers] })); setCustomerModal(false); setEditingCustomer(null); };
  const deleteProduct = (id) => { if (!window.confirm("ဒီ product ကိုဖျက်မှာ သေချာလား?")) return; setData((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id), sales: prev.sales })); };
  const deleteCustomer = (id) => { if (!window.confirm("ဒီ customer ကိုဖျက်မှာ သေချာလား?")) return; setData((prev) => ({ ...prev, customers: prev.customers.filter((c) => c.id !== id) })); };
  const addExpense = () => { if (!expenseTitle.trim() || !Number(expenseAmount)) return alert("Expense title နဲ့ amount ထည့်ပါ။"); setData((prev) => ({ ...prev, expenses: [{ id: crypto.randomUUID(), title: expenseTitle.trim(), amount: Number(expenseAmount), createdAt: new Date().toISOString() }, ...prev.expenses] })); setExpenseTitle(""); setExpenseAmount(""); };
  const setLanguage = (language) => setData((prev) => ({ ...prev, settings: { ...prev.settings, language } }));

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
  const restore = (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(String(reader.result)); if (!parsed.products || !parsed.customers || !parsed.sales || !parsed.expenses) throw new Error(); if (!confirm("Restore လုပ်ရင် လက်ရှိ data တွေ replace ဖြစ်နိုင်ပါတယ်။ ဆက်လုပ်မလား?")) return; setData({ ...initialData, ...parsed, settings: { ...initialData.settings, ...(parsed.settings || {}) } }); alert("Restore completed."); } catch { alert("Backup file မှားနေပါတယ်။"); } }; reader.readAsText(file); event.target.value = ""; };

  const navItems = [["home", Home, t("home")], ["sell", ShoppingCart, t("sell")], ["products", Package, t("products")], ["customers", Users, t("customers")], ["reports", BarChart3, t("reports")], ["settings", Settings, t("settings")]];

  return <div className="min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-white font-sans text-slate-950"><div className="mx-auto max-w-3xl px-5 pb-28 pt-8"><AppHeader />{tab === "home" && <HomePage t={t} setTab={setTab} todayReport={todayReport} lowStockCount={lowStockCount} products={data.products} sales={data.sales} openReceipt={setReceiptSale} />}{tab === "sell" && <SellPage t={t} customers={data.customers} cart={cart} updateQty={updateQty} cartTotal={cartTotal} cashReceived={cashReceived} setCashReceived={setCashReceived} change={change} completeSale={completeSale} setAddItemsModal={setAddItemsModal} selectedCustomerId={selectedCustomerId} setSelectedCustomerId={setSelectedCustomerId} />}{tab === "products" && <ProductsPage t={t} products={data.products} search={productSearch} setSearch={setProductSearch} openAdd={() => { setEditingProduct(null); setProductModal(true); }} openEdit={(p) => { setEditingProduct(p); setProductModal(true); }} deleteProduct={deleteProduct} />}{tab === "customers" && <CustomersPage t={t} customers={data.customers} search={customerSearch} setSearch={setCustomerSearch} openAdd={() => { setEditingCustomer(null); setCustomerModal(true); }} openEdit={(c) => { setEditingCustomer(c); setCustomerModal(true); }} deleteCustomer={deleteCustomer} />}{tab === "reports" && <ReportsPage t={t} report={report} reportStart={reportStart} reportEnd={reportEnd} setReportStart={setReportStart} setReportEnd={setReportEnd} expenseTitle={expenseTitle} setExpenseTitle={setExpenseTitle} expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount} addExpense={addExpense} openReceipt={setReceiptSale} />}{tab === "settings" && <SettingsPage t={t} language={data.settings.language} setLanguage={setLanguage} backup={backup} restoreInputRef={restoreInputRef} openAbout={() => setAboutOpen(true)} />}</div><nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-100 bg-white/95 px-3 py-3 shadow-[0_-14px_40px_rgba(37,99,235,0.08)] backdrop-blur-xl"><div className="mx-auto grid max-w-3xl grid-cols-6 gap-1">{navItems.map(([key, Icon, label]) => <button key={key} onClick={() => setTab(key)} className={`flex flex-col items-center justify-center rounded-2xl px-1 py-2 text-xs font-semibold transition ${tab === key ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}><Icon size={25} strokeWidth={tab === key ? 3 : 2.5} /><span className="mt-1 truncate">{label}</span></button>)}</div></nav><input ref={restoreInputRef} type="file" accept="application/json" onChange={restore} className="hidden" />{productModal && <ProductModal t={t} product={editingProduct} onClose={() => { setProductModal(false); setEditingProduct(null); }} onSave={saveProduct} />}{customerModal && <CustomerModal t={t} customer={editingCustomer} onClose={() => { setCustomerModal(false); setEditingCustomer(null); }} onSave={saveCustomer} />}{addItemsModal && <AddItemsModal t={t} products={data.products} onClose={() => setAddItemsModal(false)} addToCart={addToCart} />}{receiptSale && <ReceiptModal t={t} sale={receiptSale} onClose={() => setReceiptSale(null)} />}{aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}</div>;
}

function HomePage({ t, setTab, todayReport, lowStockCount, products, sales, openReceipt }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><Card className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6"><div className="flex items-center justify-between gap-4"><div><p className="font-bold text-blue-600">{t("today")}</p><h2 className="mt-3 text-5xl font-black tracking-tight text-slate-950">{formatMoney(todayReport.revenue)}</h2><p className="mt-3 text-lg font-medium text-slate-500">{todayReport.sales.length} {t("ordersCompleted")}</p></div><button onClick={() => setTab("sell")} className="flex shrink-0 items-center gap-3 rounded-[26px] bg-blue-600 px-7 py-5 text-xl font-black text-white shadow-lg shadow-blue-200"><ShoppingCart /> {t("sell")}</button></div></Card><div className="grid grid-cols-2 gap-4 sm:grid-cols-3"><Stat icon={<ClipboardList />} label="Orders" value={todayReport.sales.length} sub="completed" /><Stat icon={<TrendingUp />} label={t("profit")} value={formatMoney(todayReport.profit)} /><Stat icon={<Wallet />} label={t("net")} value={formatMoney(todayReport.net)} /><Stat icon={<FileText />} label={t("expenses")} value={formatMoney(todayReport.expenseTotal)} /><Stat icon={<Package />} label={t("products")} value={products.length} sub="items" /><Stat icon={<AlertCircle />} label="Low stock" value={lowStockCount} sub="items" tone="amber" /></div><Card className="p-6"><h3 className="text-2xl font-black">Needs attention</h3><div className="mt-5 flex items-center gap-4 rounded-3xl bg-blue-50 p-5"><CheckCircle2 className="text-blue-600" size={34} /><div><p className="text-xl font-bold">{lowStockCount ? `${lowStockCount} low stock items` : "Inventory looks healthy"}</p><p className="mt-1 text-slate-500">{lowStockCount ? "Please check Products page." : "Great! All items are well stocked."}</p></div></div></Card><ReceiptList title={t("recentSales")} sales={sales.slice(0, 4)} openReceipt={openReceipt} empty="No sales yet" /></motion.div>;
}
function Stat({ icon, label, value, sub, tone = "blue" }) { return <Card className="p-5"><IconBox tone={tone}>{icon}</IconBox><p className="mt-4 font-bold text-slate-500">{label}</p><p className="mt-3 text-2xl font-black tracking-tight">{value}</p>{sub && <p className="mt-1 text-slate-500">{sub}</p>}</Card>; }
function SellPage({ t, customers, cart, updateQty, cartTotal, cashReceived, setCashReceived, change, completeSale, setAddItemsModal, selectedCustomerId, setSelectedCustomerId }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><h2 className="text-4xl font-black">{t("sell")}</h2><button onClick={() => setAddItemsModal(true)} className="flex h-16 w-full items-center justify-center gap-3 rounded-[24px] border border-blue-100 bg-white text-xl font-black text-blue-700 shadow-sm"><Search /> {t("addItems")}</button><Card className="p-5"><label className="mb-2 block font-bold text-slate-500">{t("customer")}</label><select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)} className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg font-bold outline-none"><option value="">{t("noCustomer")}</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Card><Card className="p-5"><div className="mb-5 flex items-center justify-between"><h3 className="text-3xl font-black">{t("currentSale")}</h3><span className="font-bold text-slate-500">{cart.length} item types</span></div>{cart.length === 0 ? <div className="rounded-3xl border border-dashed border-blue-200 p-8 text-center text-slate-500"><ShoppingCart className="mx-auto mb-3" /><p className="text-xl font-bold">{t("cartEmpty")}</p></div> : cart.map((item) => <div key={item.productId} className="mb-3 flex items-center justify-between rounded-2xl border border-blue-100 p-4"><div><p className="font-black">{item.productName}</p><p className="text-sm text-slate-500">{formatMoney(item.sellPrice)} x {item.quantity}</p></div><div className="flex items-center gap-2"><button onClick={() => updateQty(item.productId, -1)} className="rounded-xl bg-blue-50 p-2 text-blue-700"><Minus size={18} /></button><span className="w-8 text-center font-black">{item.quantity}</span><button onClick={() => updateQty(item.productId, 1)} className="rounded-xl bg-blue-50 p-2 text-blue-700"><Plus size={18} /></button></div></div>)}<div className="mt-5 flex items-center justify-between"><p className="text-xl font-bold text-slate-500">{t("total")}</p><p className="text-4xl font-black">{formatMoney(cartTotal)}</p></div><input value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} type="number" placeholder={t("cashReceived")} className="mt-5 h-16 w-full rounded-2xl border border-slate-200 px-5 text-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /><div className="mt-5 flex items-center justify-between"><p className="text-xl font-bold text-slate-500">{t("change")}</p><p className="text-3xl font-black">{formatMoney(change)}</p></div><button onClick={completeSale} className="mt-6 flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-100"><CheckCircle2 /> {t("completeSale")}</button></Card></motion.div>;
}
function ProductsPage({ t, products, search, setSearch, openAdd, openEdit, deleteProduct }) { const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())); return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><h2 className="text-4xl font-black">{t("products")}</h2><div className="flex items-center gap-4"><p className="flex-1 text-xl font-bold text-slate-500">{products.length} products</p><button onClick={openAdd} className="flex items-center gap-3 rounded-[24px] bg-blue-600 px-6 py-4 text-lg font-black text-white"><PlusCircle /> {t("addItem")}</button></div><SearchBox value={search} onChange={setSearch} placeholder={t("searchProducts")} />{filtered.map((p) => <Card key={p.id} className="p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-2xl font-black">{p.name}</p><p className="mt-2 text-slate-500">{formatMoney(p.sellPrice)} - {t("cost")} {formatMoney(p.cost)}</p></div><div className="text-right"><span className={`inline-flex rounded-2xl px-4 py-2 font-black ${p.stock <= p.lowStockAlert ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-700"}`}>{p.stock} left</span><div className="mt-3 flex gap-2"><button onClick={() => openEdit(p)} className="rounded-2xl bg-blue-50 p-3 text-blue-700"><Edit3 /></button><button onClick={() => deleteProduct(p.id)} className="rounded-2xl bg-red-50 p-3 text-red-500"><Trash2 /></button></div></div></div></Card>)}</motion.div>; }
function CustomersPage({ t, customers, search, setSearch, openAdd, openEdit, deleteCustomer }) { const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())); return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><h2 className="text-4xl font-black">{t("customers")}</h2><div className="flex gap-4"><SearchBox value={search} onChange={setSearch} placeholder={t("searchCustomers")} /><button onClick={openAdd} className="flex shrink-0 items-center gap-2 rounded-[24px] bg-blue-600 px-5 py-4 text-lg font-black text-white"><Users /> Add</button></div>{filtered.map((c) => <Card key={c.id} className="p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-2xl font-black">{c.name}</p><p className="mt-1 text-slate-500">{c.debtReceivable || c.debtPayable ? `Debt: ${formatMoney(c.debtReceivable - c.debtPayable)}` : t("noDebt")}</p>{c.phone && <p className="mt-1 text-sm text-slate-500">{c.phone}</p>}</div><div className="flex gap-2"><button onClick={() => openEdit(c)} className="rounded-2xl bg-blue-50 p-3 text-blue-700"><Edit3 /></button><button onClick={() => deleteCustomer(c.id)} className="rounded-2xl bg-red-50 p-3 text-red-500"><Trash2 /></button></div></div></Card>)}</motion.div>; }
function ReportsPage({ t, report, reportStart, reportEnd, setReportStart, setReportEnd, expenseTitle, setExpenseTitle, expenseAmount, setExpenseAmount, addExpense, openReceipt }) { return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><h2 className="text-4xl font-black">{t("reports")}</h2><Card className="p-5"><p className="mb-3 font-bold text-slate-500">{t("dateRange")}</p><div className="grid grid-cols-2 gap-3"><input type="date" value={reportStart} onChange={(e) => setReportStart(e.target.value)} className="h-14 rounded-2xl border border-slate-200 px-3 font-bold" /><input type="date" value={reportEnd} onChange={(e) => setReportEnd(e.target.value)} className="h-14 rounded-2xl border border-slate-200 px-3 font-bold" /></div><p className="mt-3 text-right font-bold text-slate-500">{report.sales.length} {t("salesInRange")}</p></Card><div className="grid grid-cols-2 gap-4"><Stat icon={<Wallet />} label="Revenue" value={formatMoney(report.revenue)} /><Stat icon={<TrendingUp />} label={t("profit")} value={formatMoney(report.profit)} /><Stat icon={<FileText />} label={t("expenses")} value={formatMoney(report.expenseTotal)} tone="amber" /><Stat icon={<TrendingUp />} label={t("debtReceivable")} value={formatMoney(report.debtReceivable)} /><Stat icon={<TrendingUp />} label={t("debtPayable")} value={formatMoney(report.debtPayable)} tone="red" /><Stat icon={<Wallet />} label={t("net")} value={formatMoney(report.net)} /></div><Card className="p-5"><h3 className="mb-4 text-2xl font-black">{t("addExpense")}</h3><input value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} placeholder={t("expenseTitle")} className="mb-3 h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg" /><input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} type="number" placeholder={t("amount")} className="mb-4 h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg" /><button onClick={addExpense} className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 font-black text-white"><FileText /> {t("saveExpense")}</button></Card><ReceiptList title={t("transactionHistory")} sales={report.sales} openReceipt={openReceipt} empty="No transactions" /><ReportList title={t("bestSellers")} items={report.bestSellers.map((i, idx) => ({ id: idx, left: i.name, sub: `${i.qty} sold`, right: formatMoney(i.total) }))} empty="No best sellers" /><ReportList title={t("recentExpenses")} items={report.expenses.map((e) => ({ id: e.id, left: e.title, sub: new Date(e.createdAt).toLocaleString(), right: formatMoney(e.amount) }))} empty="No expenses" /></motion.div>; }
function SettingsPage({ t, language, setLanguage, backup, restoreInputRef, openAbout }) { const [openLang, setOpenLang] = useState(false); return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5"><h2 className="text-4xl font-black">{t("settings")}</h2><button onClick={() => setOpenLang(!openLang)} className="w-full text-left"><Card className="flex items-center justify-between p-6"><div className="flex items-center gap-5"><IconBox><Languages /></IconBox><div><p className="text-2xl font-black">{t("language")}</p><p className="mt-1 text-slate-500">{language === "my" ? "မြန်မာ" : "English"}</p></div></div><ChevronRight className="text-blue-600" /></Card></button>{openLang && <Card className="overflow-hidden p-2"><button onClick={() => { setLanguage("my"); setOpenLang(false); }} className="w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-blue-50">မြန်မာ</button><button onClick={() => { setLanguage("en"); setOpenLang(false); }} className="w-full rounded-2xl px-4 py-4 text-left font-bold hover:bg-blue-50">English</button></Card>}<SettingRow icon={<Download />} title={t("backup")} sub={t("backupSub")} onClick={backup} /><SettingRow icon={<Upload />} title={t("restore")} sub={t("restoreSub")} onClick={() => restoreInputRef.current?.click()} /><SettingRow icon={<Info />} title={t("about")} sub={t("aboutSub")} onClick={openAbout} /></motion.div>; }
function SettingRow({ icon, title, sub, onClick }) { return <button onClick={onClick} className="w-full text-left"><Card className="flex items-center justify-between p-6"><div className="flex items-center gap-5"><IconBox>{icon}</IconBox><div><p className="text-2xl font-black">{title}</p><p className="mt-1 text-slate-500">{sub}</p></div></div><ChevronRight className="text-blue-600" /></Card></button>; }
function SearchBox({ value, onChange, placeholder }) { return <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-16 w-full rounded-[24px] border border-blue-100 bg-white pl-12 pr-4 text-lg outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100" /></div>; }
function ProductModal({ t, product, onClose, onSave }) { const [form, setForm] = useState({ name: product?.name || "", sellPrice: product?.sellPrice || "", cost: product?.cost || "", stock: product?.stock || "", lowStockAlert: product?.lowStockAlert ?? 5 }); const set = (k, v) => setForm((p) => ({ ...p, [k]: v })); return <Modal title={product ? t("editItem") : t("addItem")} onClose={onClose}><div className="space-y-4"><Field label={t("productName")} value={form.name} onChange={(v) => set("name", v)} placeholder={t("productName")} /><div className="grid grid-cols-2 gap-4"><Field label={t("sellPrice")} value={form.sellPrice} onChange={(v) => set("sellPrice", v)} placeholder={t("sellPrice")} type="number" /><Field label={t("cost")} value={form.cost} onChange={(v) => set("cost", v)} placeholder={t("cost")} type="number" /></div><div className="grid grid-cols-2 gap-4"><Field label={t("stock")} value={form.stock} onChange={(v) => set("stock", v)} placeholder={t("stock")} type="number" /><Field label={t("lowStockAlert")} value={form.lowStockAlert} onChange={(v) => set("lowStockAlert", v)} placeholder="5" type="number" /></div><button onClick={() => onSave(form)} className="mt-4 flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-xl font-black text-white"><PlusCircle /> {product ? "Save" : t("addItem")}</button></div></Modal>; }
function CustomerModal({ t, customer, onClose, onSave }) { const [form, setForm] = useState({ name: customer?.name || "", phone: customer?.phone || "", note: customer?.note || "" }); const set = (k, v) => setForm((p) => ({ ...p, [k]: v })); return <Modal title={customer ? t("editCustomer") : t("addCustomer")} onClose={onClose}><div className="space-y-4"><Field label={t("name")} value={form.name} onChange={(v) => set("name", v)} placeholder={t("name")} /><Field label={t("phone")} value={form.phone} onChange={(v) => set("phone", v)} placeholder={t("phone")} /><Field label={t("note")} value={form.note} onChange={(v) => set("note", v)} placeholder={t("note")} /><button onClick={() => onSave(form)} className="mt-4 flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-blue-600 text-xl font-black text-white"><Users /> {customer ? "Save" : t("addCustomer")}</button></div></Modal>; }
function AddItemsModal({ t, products, onClose, addToCart }) { const [search, setSearch] = useState(""); const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())); return <Modal title={t("addItems")} onClose={onClose}><SearchBox value={search} onChange={setSearch} placeholder={t("addItems")} /><div className="mt-5 space-y-3">{filtered.map((p) => <button key={p.id} onClick={() => addToCart(p)} className="w-full rounded-2xl border border-blue-100 p-4 text-left transition hover:bg-blue-50"><div className="flex items-center justify-between"><div><p className="text-xl font-black">{p.name}</p><p className="text-slate-500">{formatMoney(p.sellPrice)} · Stock {p.stock}</p></div><PlusCircle className="text-blue-600" /></div></button>)}</div></Modal>; }
function ReceiptModal({ t, sale, onClose }) { const printIt = () => window.print(); const shareIt = async () => { const text = receiptText(sale); if (navigator.share) await navigator.share({ title: "Hein's Inventory Receipt", text }); else { await navigator.clipboard.writeText(text); alert("Receipt copied."); } }; return <Modal title={t("receipt")} onClose={onClose}><ReceiptCard sale={sale} /><button onClick={printIt} className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 font-black text-white"><Printer /> {t("printReceipt")}</button><button onClick={shareIt} className="mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-50 font-black text-blue-700"><Share2 /> {t("shareReceipt")}</button></Modal>; }
function ReceiptCard({ sale }) { return <Card className="p-5 shadow-none"><h3 className="text-2xl font-black">Hein&apos;s Inventory</h3><p className="mt-3 text-slate-500">Receipt #{sale.receiptNo} - {new Date(sale.createdAt).toLocaleString()}</p><p className="mt-2 text-slate-500">Customer: {sale.customerName}</p><div className="my-4 border-t border-slate-200" />{sale.items.map((i) => <div key={i.productId} className="mb-3 flex justify-between"><div><p className="font-black">{i.productName}</p><p className="text-slate-500">{i.quantity} x {formatMoney(i.sellPrice)}</p></div><p className="font-black">{formatMoney(i.total)}</p></div>)}<div className="mt-4 space-y-3 border-t border-slate-200 pt-4"><div className="flex justify-between"><span className="text-slate-500">စုစုပေါင်း</span><b className="text-2xl">{formatMoney(sale.totalAmount)}</b></div><div className="flex justify-between"><span className="text-slate-500">အပ်ငွေ</span><b>{formatMoney(sale.cashReceived)}</b></div><div className="flex justify-between"><span className="text-slate-500">ပြန်အမ်းငွေ</span><b>{formatMoney(sale.change)}</b></div></div></Card>; }
function ReceiptList({ title, sales, openReceipt, empty }) { return <Card className="p-5"><h3 className="mb-4 text-2xl font-black">{title}</h3>{sales.length === 0 ? <p className="rounded-2xl border border-dashed border-blue-200 p-5 text-center text-slate-500">{empty}</p> : sales.map((sale) => <button key={sale.id} onClick={() => openReceipt(sale)} className="mb-3 flex w-full items-center justify-between rounded-2xl border border-blue-100 p-4 text-left last:mb-0"><div><p className="font-black">Receipt #{sale.receiptNo}</p><p className="text-sm text-slate-500">{sale.customerName} · {new Date(sale.createdAt).toLocaleString()}</p></div><p className="font-black">{formatMoney(sale.totalAmount)}</p></button>)}</Card>; }
function ReportList({ title, items, empty }) { return <Card className="p-5"><h3 className="mb-4 text-2xl font-black">{title}</h3>{items.length === 0 ? <p className="rounded-2xl border border-dashed border-blue-200 p-5 text-center text-slate-500">{empty}</p> : items.slice(0, 6).map((item) => <div key={item.id} className="mb-3 flex items-center justify-between rounded-2xl border border-blue-100 p-4 last:mb-0"><div><p className="font-black">{item.left}</p><p className="text-sm text-slate-500">{item.sub}</p></div><p className="font-black">{item.right}</p></div>)}</Card>; }
function AboutModal({ onClose }) { return <Modal title="About" onClose={onClose}><div className="space-y-5"><Card className="p-5 shadow-none"><h3 className="text-2xl font-black">Hein&apos;s Inventory</h3><p className="mt-4 leading-8 text-slate-500">Hein&apos;s Inventory is an offline point-of-sale app for small shops. It keeps products, stock, sales, expenses, reports, backups, and receipts on your device.</p></Card><Card className="p-5 shadow-none"><h3 className="text-2xl font-black">Contact</h3><a href={`tel:${PHONE_NUMBER}`} className="mt-4 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 font-black text-blue-700"><Phone /> Phone: {PHONE_NUMBER}</a><a href={`viber://chat?number=${encodeURIComponent(VIBER_NUMBER)}`} className="mt-3 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 font-black text-blue-700"><MessageCircle /> Viber: {PHONE_NUMBER}</a></Card></div></Modal>; }
