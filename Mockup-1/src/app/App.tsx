import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Bell,
  Star,
  Clock,
  Heart,
  Home,
  Compass,
  Package,
  User,
  Leaf,
  ChevronRight,
  Zap,
  Check,
  ArrowLeft,
  X,
  List,
  Map as MapIcon,
  Store,
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Tab = "home" | "explore" | "orders" | "profile";

interface Bag {
  id: number;
  restaurant: string;
  category: string;
  type: string;
  description: string;
  image: string;
  price: number;
  originalValue: number;
  rating: number;
  reviews: number;
  distance: string;
  pickup: string;
  remaining: number;
  tags: string[];
  co2Saved: number;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "Todos", emoji: "🍽️" },
  { id: "bakery", label: "Panadería", emoji: "🥖" },
  { id: "restaurant", label: "Restaurantes", emoji: "🍳" },
  { id: "cafe", label: "Cafeterías", emoji: "☕" },
  { id: "market", label: "Mercados", emoji: "🛒" },
  { id: "sushi", label: "Sushi", emoji: "🍱" },
];

const BAGS: Bag[] = [
  {
    id: 1,
    restaurant: "Panadería La Espiga",
    category: "bakery",
    type: "Bolsa Sorpresa de Pan",
    description:
      "Pan artesanal, croissants, galletas y bollería variada del día. Siempre algo delicioso para llevar a casa y no desperdiciar.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&auto=format",
    price: 3990,
    originalValue: 11990,
    rating: 4.8,
    reviews: 234,
    distance: "0.3 km",
    pickup: "18:00 – 20:00",
    remaining: 3,
    tags: ["Pan", "Croissants", "Pasteles"],
    co2Saved: 0.8,
  },
  {
    id: 2,
    restaurant: "Nori Sushi Bar",
    category: "sushi",
    type: "Bolsa Sorpresa de Sushi",
    description:
      "Nigiri, maki, temaki y entrantes varios. Fresco y preparado cada día para no desperdiciar nada. Una experiencia sorpresa.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format",
    price: 6990,
    originalValue: 21990,
    rating: 4.9,
    reviews: 412,
    distance: "0.8 km",
    pickup: "21:00 – 22:30",
    remaining: 5,
    tags: ["Sushi", "Maki", "Nigiri"],
    co2Saved: 1.2,
  },
  {
    id: 3,
    restaurant: "Café Lumière",
    category: "cafe",
    type: "Bolsa Sorpresa de Café",
    description:
      "Sándwiches, wraps, pasteles y una bebida sorpresa. El mejor rescate del día en el corazón del barrio.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format",
    price: 4490,
    originalValue: 13990,
    rating: 4.7,
    reviews: 178,
    distance: "1.1 km",
    pickup: "17:00 – 19:00",
    remaining: 2,
    tags: ["Sándwich", "Café", "Postre"],
    co2Saved: 0.6,
  },
  {
    id: 4,
    restaurant: "Trattoria Bella Roma",
    category: "restaurant",
    type: "Bolsa Sorpresa Italiana",
    description:
      "Pasta fresca, pizza, entrantes y alguna sorpresa dulce. La auténtica cocina italiana sin desperdicios, directo a tu mesa.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format",
    price: 5990,
    originalValue: 17990,
    rating: 4.6,
    reviews: 321,
    distance: "1.4 km",
    pickup: "22:00 – 23:00",
    remaining: 7,
    tags: ["Pasta", "Pizza", "Italiano"],
    co2Saved: 1.0,
  },
  {
    id: 5,
    restaurant: "Mercado Verde",
    category: "market",
    type: "Bolsa Sorpresa de Frutas",
    description:
      "Frutas, verduras, zumos y productos orgánicos variados. Directo del mercado local, de temporada y sin conservantes.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format",
    price: 3490,
    originalValue: 9990,
    rating: 4.5,
    reviews: 89,
    distance: "0.6 km",
    pickup: "19:00 – 20:30",
    remaining: 10,
    tags: ["Frutas", "Verduras", "Orgánico"],
    co2Saved: 0.9,
  },
  {
    id: 6,
    restaurant: "BurgerLab 34",
    category: "restaurant",
    type: "Bolsa Sorpresa Premium",
    description:
      "Hamburguesas gourmet, papas fritas, salsas caseras y bebida. Para los amantes de la buena burger sin desperdiciar ni un gramo.",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format",
    price: 5490,
    originalValue: 16990,
    rating: 4.8,
    reviews: 567,
    distance: "2.0 km",
    pickup: "21:30 – 23:00",
    remaining: 4,
    tags: ["Burger", "Papas fritas", "Gourmet"],
    co2Saved: 1.1,
  },
];

const ORDERS = [
  {
    id: "ORD-2847",
    restaurant: "Panadería La Espiga",
    date: "Hoy, 18:30",
    status: "Listo para retirar",
    price: 3990,
    donated: 0,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop&auto=format",
    active: true,
  },
  {
    id: "ORD-2831",
    restaurant: "Nori Sushi Bar",
    date: "Ayer, 21:15",
    status: "Retirado",
    price: 6990,
    donated: 699,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=80&h=80&fit=crop&auto=format",
    active: false,
  },
  {
    id: "ORD-2819",
    restaurant: "Café Lumière",
    date: "17 Mayo, 17:45",
    status: "Retirado",
    price: 4490,
    donated: 0,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop&auto=format",
    active: false,
  },
];

// Bag positions on stylized map (% of container width/height)
const MAP_POSITIONS: Record<number, { x: number; y: number }> =
  {
    1: { x: 35, y: 58 },
    2: { x: 63, y: 28 },
    3: { x: 22, y: 40 },
    4: { x: 76, y: 63 },
    5: { x: 50, y: 74 },
    6: { x: 83, y: 42 },
  };

const REVIEWS: Record<
  number,
  { user: string; rating: number; text: string; date: string }[]
> = {
  1: [
    {
      user: "Ana P.",
      rating: 5,
      text: "Variedad increíble. El pan de centeno estaba para llorar de bueno.",
      date: "hace 2 días",
    },
    {
      user: "Carlos M.",
      rating: 5,
      text: "El croissant estaba perfecto. Vale cada peso.",
      date: "hace 4 días",
    },
  ],
  2: [
    {
      user: "María L.",
      rating: 5,
      text: "Sushi muy fresco y abundante. Mejor compra del mes.",
      date: "ayer",
    },
    {
      user: "Diego R.",
      rating: 4,
      text: "Muy buena relación precio-calidad, faltó algo más de variedad.",
      date: "hace 3 días",
    },
  ],
  3: [
    {
      user: "Sofía B.",
      rating: 5,
      text: "El sándwich de pavo estaba increíble. Repetiré sin duda.",
      date: "hace 1 día",
    },
  ],
  4: [
    {
      user: "Ignacio T.",
      rating: 4,
      text: "Buena pasta, un poco de todo. La bolsa fue muy original.",
      date: "hace 5 días",
    },
    {
      user: "Valentina C.",
      rating: 5,
      text: "La pizza de la sorpresa era la mejor del menú. ¡Gracias!",
      date: "hace 1 semana",
    },
  ],
  5: [
    {
      user: "René O.",
      rating: 5,
      text: "Frutas frescas y de temporada. El palto era perfecto.",
      date: "ayer",
    },
  ],
  6: [
    {
      user: "Camila V.",
      rating: 5,
      text: "La hamburguesa gourmet no tenía nada que envidiar al menú regular.",
      date: "hace 2 días",
    },
    {
      user: "Matías F.",
      rating: 4,
      text: "Muy buena sorpresa. Las papas crujientes y las salsas increíbles.",
      date: "hace 3 días",
    },
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const savingsPct = (price: number, original: number) =>
  Math.round((1 - price / original) * 100);

const fmt = (n: number) =>
  `$${n.toLocaleString("es-CL", { maximumFractionDigits: 0 })}`;

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useCountdown(hoursFromNow: number) {
  const target = useRef(Date.now() + hoursFromNow * 3_600_000);
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, target.current - Date.now());
      setT({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`;
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 mb-3">
      <h2
        className="font-bold text-base text-foreground"
        style={{ fontFamily: "'Righteous', sans-serif" }}
      >
        {title}
      </h2>
      {action && (
        <button className="text-xs text-primary font-semibold">
          {action}
        </button>
      )}
    </div>
  );
}

function SearchBar({
  placeholder = "Buscar restaurantes...",
}: {
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center gap-3 bg-card rounded-2xl px-4 h-12 border border-border">
      <Search
        size={18}
        className="text-muted-foreground shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
    </div>
  );
}

// ─── HOME COMPONENTS ─────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <div>
        <p className="text-[10px] text-muted-foreground font-semibold tracking-widest uppercase">
          Tu ubicación
        </p>
        <button className="flex items-center gap-1 mt-0.5">
          <MapPin size={13} className="text-primary" />
          <span className="font-bold text-sm text-foreground">
            Santiago, Providencia
          </span>
          <ChevronRight
            size={13}
            className="text-muted-foreground"
          />
        </button>
      </div>
      <button className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
        <Bell size={18} className="text-foreground" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
      </button>
    </div>
  );
}

function FlashDeal({
  bag,
  onSelect,
}: {
  bag: Bag;
  onSelect: (b: Bag) => void;
}) {
  const countdown = useCountdown(1.8);
  const pct = savingsPct(bag.price, bag.originalValue);

  return (
    <div
      onClick={() => onSelect(bag)}
      className="mx-5 mb-5 rounded-3xl overflow-hidden cursor-pointer relative select-none"
      style={{ background: "#FF4422" }}
    >
      <div className="absolute top-3 right-16 w-14 h-14 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -top-1 right-10 w-5 h-5 rounded-full bg-yellow-300/30 pointer-events-none" />
      <div className="absolute bottom-6 right-24 w-3 h-3 bg-white/20 rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1 w-10 h-10 rounded-full bg-white/5 pointer-events-none" />

      <div className="flex items-stretch">
        <div className="flex-1 p-4 z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <Zap
              size={11}
              fill="currentColor"
              className="text-yellow-300"
            />
            <span className="text-[9px] font-black tracking-widest text-yellow-300 uppercase">
              Oferta Relámpago
            </span>
          </div>
          <p className="text-white font-bold text-[15px] leading-tight mb-0.5">
            {bag.restaurant}
          </p>
          <p className="text-white/70 text-[11px] mb-3">
            {bag.type}
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-white text-2xl font-black">
              {fmt(bag.price)}
            </span>
            <span className="text-white/55 text-xs line-through">
              {fmt(bag.originalValue)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/25 rounded-full px-2.5 py-1 w-fit">
            <Clock size={9} className="text-yellow-300" />
            <span className="text-yellow-300 text-[11px] font-black font-mono tracking-wider">
              {countdown}
            </span>
          </div>
        </div>
        <div className="w-28 relative shrink-0">
          <img
            src={bag.image}
            alt={`Bolsa sorpresa de ${bag.restaurant}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FF4422]/50" />
          <div className="absolute top-2 right-2 bg-secondary rounded-full px-1.5 py-0.5 shadow-sm">
            <span className="text-[10px] font-black text-foreground">
              -{pct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPills({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all shrink-0 ${
            active === cat.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card border border-border text-foreground"
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

function BagCard({
  bag,
  onSelect,
  saved,
  onSave,
}: {
  bag: Bag;
  onSelect: (b: Bag) => void;
  saved: boolean;
  onSave: () => void;
}) {
  const pct = savingsPct(bag.price, bag.originalValue);
  return (
    <div
      className="bg-card rounded-2xl overflow-hidden border border-border cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => onSelect(bag)}
    >
      <div className="relative h-32 bg-muted">
        <img
          src={bag.image}
          alt={`Bolsa sorpresa de ${bag.restaurant}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart
            size={13}
            className={
              saved
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            }
          />
        </button>
        <div className="absolute top-2 left-2 bg-secondary rounded-full px-2 py-0.5 shadow-sm">
          <span className="text-[9px] font-black text-foreground">
            -{pct}%
          </span>
        </div>
        {bag.remaining <= 3 && (
          <div className="absolute bottom-2 left-2 bg-primary/90 rounded-full px-2 py-0.5">
            <span className="text-[9px] font-bold text-white">
              ¡Solo {bag.remaining}!
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-xs text-foreground truncate">
          {bag.restaurant}
        </p>
        <p className="text-[10px] text-muted-foreground mb-2 truncate">
          {bag.type}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-primary font-black text-[15px]">
              {fmt(bag.price)}
            </span>
            <span className="text-muted-foreground text-[9px] line-through">
              {fmt(bag.originalValue)}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star
              size={10}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-[10px] font-bold text-foreground">
              {bag.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-0.5">
            <Clock size={9} className="text-muted-foreground" />
            <span className="text-[9px] text-muted-foreground">
              {bag.pickup}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <MapPin
              size={9}
              className="text-muted-foreground"
            />
            <span className="text-[9px] text-muted-foreground">
              {bag.distance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAP VIEW ────────────────────────────────────────────────────────────────

function MapView({
  bags,
  onSelect,
}: {
  bags: Bag[];
  onSelect: (b: Bag) => void;
}) {
  const [activePin, setActivePin] = useState<number | null>(
    null,
  );

  return (
    <div
      className="mx-5 rounded-2xl overflow-hidden border border-border relative"
      style={{ height: 340 }}
      onClick={() => setActivePin(null)}
    >
      {/* Stylized map background */}
      <div
        className="absolute inset-0"
        style={{ background: "#EDE5D3" }}
      />
      {/* Street grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Main avenues */}
      <div
        className="absolute bg-[#D0C0A0]"
        style={{ top: "42%", left: 0, right: 0, height: 10 }}
      />
      <div
        className="absolute bg-[#D0C0A0]"
        style={{ left: "28%", top: 0, bottom: 0, width: 8 }}
      />
      <div
        className="absolute bg-[#D0C0A0]"
        style={{ left: "64%", top: 0, bottom: 0, width: 6 }}
      />
      {/* Secondary streets */}
      <div
        className="absolute bg-[#D8CEB8]"
        style={{ top: "22%", left: 0, right: 0, height: 4 }}
      />
      <div
        className="absolute bg-[#D8CEB8]"
        style={{ top: "70%", left: 0, right: 0, height: 4 }}
      />
      <div
        className="absolute bg-[#D8CEB8]"
        style={{ left: "46%", top: 0, bottom: 0, width: 4 }}
      />
      {/* Park */}
      <div
        className="absolute bg-[#BDD9A4] rounded-sm"
        style={{
          left: "48%",
          top: "46%",
          width: "14%",
          height: "20%",
        }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-50">
          <span className="text-[10px]">🌳</span>
        </div>
      </div>
      {/* City blocks */}
      {[
        { l: "29%", t: "23%", w: "17%", h: "18%" },
        { l: "47%", t: "23%", w: "16%", h: "18%" },
        { l: "65%", t: "23%", w: "18%", h: "18%" },
        { l: "29%", t: "47%", w: "17%", h: "22%" },
        { l: "65%", t: "47%", w: "18%", h: "22%" },
        { l: "0%", t: "23%", w: "27%", h: "18%" },
        { l: "0%", t: "47%", w: "27%", h: "22%" },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute bg-[#D9CEB8] rounded-sm opacity-60"
          style={{
            left: b.l,
            top: b.t,
            width: b.w,
            height: b.h,
          }}
        />
      ))}

      {/* User location */}
      <div
        className="absolute"
        style={{ left: "50%", top: "50%", zIndex: 10 }}
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/20 absolute -translate-x-1/2 -translate-y-1/2" />
        <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg absolute -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Restaurant pins */}
      {bags.map((bag) => {
        const pos = MAP_POSITIONS[bag.id];
        if (!pos) return null;
        const isActive = activePin === bag.id;
        const pct = savingsPct(bag.price, bag.originalValue);

        return (
          <div
            key={bag.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: isActive ? 30 : 20,
            }}
          >
            {/* Popup card */}
            {isActive && (
              <div
                className="absolute z-30 bg-card rounded-2xl shadow-xl border border-border overflow-hidden w-44"
                style={{
                  bottom: "calc(100% + 6px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-20 bg-muted relative">
                  <img
                    src={bag.image}
                    alt={bag.restaurant}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-secondary rounded-full px-1.5 py-0.5">
                    <span className="text-[9px] font-black text-foreground">
                      -{pct}%
                    </span>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="font-bold text-xs text-foreground truncate">
                    {bag.restaurant}
                  </p>
                  <p className="text-[9px] text-muted-foreground mb-1.5">
                    {bag.distance} · {bag.pickup}
                  </p>
                  <button
                    onClick={() => {
                      onSelect(bag);
                      setActivePin(null);
                    }}
                    className="w-full bg-primary text-white text-xs font-bold py-1.5 rounded-xl"
                  >
                    {fmt(bag.price)} — Ver bolsa
                  </button>
                </div>
              </div>
            )}

            {/* Pin button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePin(isActive ? null : bag.id);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-black shadow-lg transition-all -translate-x-1/2 -translate-y-full block ${
                isActive
                  ? "bg-primary text-white scale-110"
                  : "bg-white text-foreground border border-border"
              }`}
            >
              {fmt(bag.price)}
            </button>
          </div>
        );
      })}

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 bg-white/70 rounded px-1.5 py-0.5 z-10">
        <span className="text-[8px] text-muted-foreground">
          Providencia, Santiago
        </span>
      </div>
    </div>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function HomeScreen({
  category,
  setCategory,
  onSelectBag,
  savedBags,
  onToggleSave,
}: {
  category: string;
  setCategory: (c: string) => void;
  onSelectBag: (b: Bag) => void;
  savedBags: Set<number>;
  onToggleSave: (id: number) => void;
}) {
  const filtered =
    category === "all"
      ? BAGS
      : BAGS.filter((b) => b.category === category);

  return (
    <div className="pb-6">
      <TopBar />
      <div className="px-5 pb-4">
        <SearchBar />
      </div>
      <FlashDeal bag={BAGS[1]} onSelect={onSelectBag} />
      <SectionHeader title="Categorías" />
      <CategoryPills active={category} onChange={setCategory} />
      <SectionHeader title="Cerca de ti" action="Ver todo" />
      <div className="grid grid-cols-2 gap-3 px-5">
        {filtered.map((bag) => (
          <BagCard
            key={bag.id}
            bag={bag}
            onSelect={onSelectBag}
            saved={savedBags.has(bag.id)}
            onSave={() => onToggleSave(bag.id)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 px-5">
          <span className="text-4xl mb-3">🍽️</span>
          <p className="text-sm text-muted-foreground text-center">
            No hay bolsas disponibles en esta categoría ahora
            mismo.
          </p>
        </div>
      )}
    </div>
  );
}

function ExploreScreen({
  onSelectBag,
  savedBags,
  onToggleSave,
}: {
  onSelectBag: (b: Bag) => void;
  savedBags: Set<number>;
  onToggleSave: (id: number) => void;
}) {
  const [sortBy, setSortBy] = useState<
    "price" | "distance" | "rating"
  >("price");
  const [viewMode, setViewMode] = useState<"list" | "map">(
    "list",
  );

  const sorted = [...BAGS].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <div className="pb-6">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1
            className="font-black text-2xl text-foreground"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            Explorar
          </h1>
          {/* List / Map toggle */}
          <div className="flex bg-muted rounded-xl p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "list"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <List size={13} />
              Lista
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "map"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <MapIcon size={13} />
              Mapa
            </button>
          </div>
        </div>
        <SearchBar placeholder="Buscar por zona o restaurante..." />
      </div>

      {viewMode === "map" ? (
        <>
          <MapView bags={BAGS} onSelect={onSelectBag} />
          <div className="px-5 mt-4">
            <p className="text-xs text-muted-foreground text-center">
              Toca un pin para ver la bolsa disponible
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2 px-5 pb-4">
            {(["price", "distance", "rating"] as const).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    sortBy === s
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card border-border text-foreground"
                  }`}
                >
                  {s === "price"
                    ? "💰 Precio"
                    : s === "distance"
                      ? "📍 Distancia"
                      : "⭐ Valoración"}
                </button>
              ),
            )}
          </div>

          <div className="px-5 flex flex-col gap-3">
            {sorted.map((bag) => {
              const pct = savingsPct(
                bag.price,
                bag.originalValue,
              );
              return (
                <div
                  key={bag.id}
                  onClick={() => onSelectBag(bag)}
                  className="bg-card rounded-2xl flex overflow-hidden border border-border cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <div className="w-28 shrink-0 relative bg-muted">
                    <img
                      src={bag.image}
                      alt={`Bolsa de ${bag.restaurant}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-secondary rounded-full px-1.5 py-0.5">
                      <span className="text-[9px] font-black text-foreground">
                        -{pct}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">
                      {bag.restaurant}
                    </p>
                    <p className="text-[11px] text-muted-foreground mb-1 truncate">
                      {bag.type}
                    </p>
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star
                        size={10}
                        className="fill-yellow-400 text-yellow-400 shrink-0"
                      />
                      <span className="text-[10px] font-bold">
                        {bag.rating}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        ({bag.reviews})
                      </span>
                      <span className="text-muted-foreground text-[10px] mx-0.5">
                        ·
                      </span>
                      <MapPin
                        size={9}
                        className="text-muted-foreground shrink-0"
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {bag.distance}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-primary font-black text-lg">
                        {fmt(bag.price)}
                      </span>
                      <span className="text-muted-foreground text-[10px] line-through">
                        {fmt(bag.originalValue)}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Clock
                        size={9}
                        className="text-muted-foreground"
                      />
                      <span className="text-[9px] text-muted-foreground">
                        {bag.pickup}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(bag.id);
                    }}
                    className="flex items-center justify-center w-12 border-l border-border shrink-0"
                  >
                    <Heart
                      size={16}
                      className={
                        savedBags.has(bag.id)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function OrdersScreen() {
  const active = ORDERS.filter((o) => o.active);
  const past = ORDERS.filter((o) => !o.active);
  const totalDonated = ORDERS.reduce(
    (sum, o) => sum + o.donated,
    0,
  );

  return (
    <div className="pb-6">
      <div className="px-5 pt-5 pb-4">
        <h1
          className="font-black text-2xl text-foreground"
          style={{ fontFamily: "'Righteous', sans-serif" }}
        >
          Mis Pedidos
        </h1>
      </div>

      {active.length > 0 && (
        <>
          <SectionHeader title="En curso" />
          <div className="px-5 mb-5">
            {active.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl p-4 relative overflow-hidden"
                style={{ background: "#FF4422" }}
              >
                <div className="absolute top-2 right-8 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 pointer-events-none" />
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/20 shrink-0">
                    <img
                      src={order.image}
                      alt={order.restaurant}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      {order.restaurant}
                    </p>
                    <p className="text-white/60 text-xs mb-2">
                      {order.id}
                    </p>
                    <div className="flex items-center gap-1.5 bg-black/20 rounded-full px-2.5 py-1 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-white text-xs font-bold">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-black text-base">
                      {fmt(order.price)}
                    </p>
                    <p className="text-white/60 text-[10px]">
                      {order.date}
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden h-16 bg-black/15 flex items-center justify-center relative z-10">
                  <div className="text-white/60 text-xs flex items-center gap-2">
                    <MapPin size={13} />
                    <span>
                      Av. Providencia 1234 — a 2 min caminando
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <SectionHeader title="Historial" />
      <div className="px-5 flex flex-col gap-3 mb-5">
        {past.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-2xl flex items-center gap-3 p-3 border border-border"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
              <img
                src={order.image}
                alt={order.restaurant}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground truncate">
                {order.restaurant}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {order.date}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <div className="flex items-center gap-1">
                  <Check size={10} className="text-accent" />
                  <span className="text-[10px] text-muted-foreground">
                    {order.status}
                  </span>
                </div>
                {order.donated > 0 && (
                  <div className="flex items-center gap-1">
                    <Leaf size={9} className="text-accent" />
                    <span className="text-[10px] text-accent font-semibold">
                      {fmt(order.donated)} donado
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-black text-sm text-foreground">
                {fmt(order.price)}
              </p>
              <button className="text-[10px] text-primary font-bold mt-0.5">
                Repetir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Food bank donations */}
      {totalDonated > 0 && (
        <div className="mx-5 mb-4 bg-accent/10 border border-accent/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf size={14} className="text-accent" />
            <p className="font-bold text-sm text-foreground">
              Donaciones a Banco de Alimentos
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Has donado{" "}
            <span className="font-black text-accent">
              {fmt(totalDonated)}
            </span>{" "}
            a familias vulnerables. Deducible de impuestos (Ley
            20.241).
          </p>
          <button className="text-xs text-accent font-bold">
            Descargar certificado →
          </button>
        </div>
      )}

      {/* Impact this month */}
      <div className="mx-5 bg-muted rounded-2xl p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-primary" />
          <p className="font-bold text-sm text-foreground">
            Tu impacto este mes
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Bolsas rescatadas", value: "12" },
            { label: "Dinero ahorrado", value: "$47.600" },
            { label: "CO₂ evitado", value: "9.8 kg" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-black text-lg text-primary">
                {stat.value}
              </p>
              <p className="text-[9px] text-muted-foreground leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({
  onOpenMerchant,
}: {
  onOpenMerchant: () => void;
}) {
  return (
    <div className="pb-6">
      <div className="px-5 pt-5 pb-4">
        <h1
          className="font-black text-2xl text-foreground"
          style={{ fontFamily: "'Righteous', sans-serif" }}
        >
          Mi Perfil
        </h1>
      </div>

      <div
        className="mx-5 mb-5 rounded-3xl p-5 relative overflow-hidden"
        style={{ background: "#1C0800" }}
      >
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-6 left-6 w-20 h-20 bg-secondary/15 rotate-45 pointer-events-none" />
        <div className="absolute top-8 right-12 w-4 h-4 rounded-full bg-primary/40 pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-black shrink-0">
            M
          </div>
          <div>
            <p className="text-white font-bold text-lg">
              Marta García
            </p>
            <p className="text-white/50 text-sm">
              marta.garcia@email.com
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star
                size={11}
                fill="#FFD600"
                className="text-secondary"
              />
              <span className="text-secondary text-xs font-bold">
                Héroe del Rescate
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionHeader title="Mi Impacto Total" />
      <div className="grid grid-cols-3 gap-3 px-5 mb-5">
        {[
          {
            emoji: "🛍️",
            value: "58",
            label: "Bolsas rescatadas",
          },
          { emoji: "💰", value: "$214.000", label: "Ahorrado" },
          { emoji: "🌱", value: "46 kg", label: "CO₂ evitado" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-2xl p-3 border border-border text-center"
          >
            <p className="text-2xl mb-1">{s.emoji}</p>
            <p className="font-black text-sm text-foreground">
              {s.value}
            </p>
            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Merchant CTA */}
      <div className="px-5 mb-5">
        <button
          onClick={onOpenMerchant}
          className="w-full bg-secondary rounded-2xl p-4 flex items-center gap-3 border-2 border-foreground/10 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
            <Store size={18} className="text-background" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-black text-sm text-foreground">
              ¿Eres un comercio?
            </p>
            <p className="text-[10px] text-foreground/60">
              Publica tu bolsa sorpresa en 3 toques
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-foreground/50"
          />
        </button>
      </div>

      <SectionHeader title="Configuración" />
      <div className="px-5 flex flex-col gap-2">
        {[
          {
            emoji: "🔔",
            label: "Notificaciones",
            desc: "Alertas de nuevas bolsas",
          },
          {
            emoji: "📍",
            label: "Ubicaciones",
            desc: "Casa, Trabajo...",
          },
          {
            emoji: "💳",
            label: "Métodos de pago",
            desc: "Visa ···· 4242",
          },
          {
            emoji: "🎁",
            label: "Código de referido",
            desc: "Invita y gana créditos",
          },
          {
            emoji: "🧾",
            label: "Certificado tributario",
            desc: "Donaciones deducibles 2025",
          },
        ].map((item) => (
          <button
            key={item.label}
            className="bg-card rounded-2xl flex items-center gap-3 p-3.5 border border-border w-full text-left"
          >
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {item.label}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {item.desc}
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-muted-foreground shrink-0"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BAG DETAIL SHEET ────────────────────────────────────────────────────────

function BagDetailSheet({
  bag,
  onClose,
  onOpenPayment,
  saved,
  onToggleSave,
}: {
  bag: Bag;
  onClose: () => void;
  onOpenPayment: () => void;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const pct = savingsPct(bag.price, bag.originalValue);
  const savedMoney = (
    bag.originalValue - bag.price
  ).toLocaleString("es-CL", {
    maximumFractionDigits: 0,
  });
  const bagReviews = REVIEWS[bag.id] ?? [];

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ zIndex: 50 }}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl overflow-hidden flex flex-col max-h-[92%]">
        {/* Image header */}
        <div className="relative h-52 bg-muted shrink-0">
          <img
            src={bag.image}
            alt={`Bolsa sorpresa de ${bag.restaurant}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <button
            onClick={onToggleSave}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center"
          >
            <Heart
              size={18}
              className={
                saved
                  ? "fill-primary text-primary"
                  : "text-white"
              }
            />
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                {bag.restaurant}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star
                  size={11}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-white text-xs font-bold">
                  {bag.rating}
                </span>
                <span className="text-white/60 text-xs">
                  ({bag.reviews} reseñas)
                </span>
              </div>
            </div>
            <div className="bg-secondary rounded-full px-2.5 py-0.5 shadow-sm">
              <span className="font-black text-sm text-foreground">
                -{pct}%
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Price */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] text-muted-foreground mb-0.5">
                {bag.type}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-primary font-black text-3xl">
                  {fmt(bag.price)}
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  {fmt(bag.originalValue)}
                </span>
              </div>
              <p className="text-accent text-xs font-bold mt-0.5">
                Ahorras ${savedMoney}
              </p>
            </div>
            <div className="bg-primary/10 rounded-2xl px-3 py-2 text-center">
              <p className="text-primary font-black text-xl leading-none">
                {bag.remaining}
              </p>
              <p className="text-primary/60 text-[10px] mt-0.5">
                disponibles
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {bag.description}
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            {bag.tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Pickup & distance */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted rounded-2xl p-3">
              <p className="text-[10px] text-muted-foreground mb-1.5">
                Horario de retiro
              </p>
              <div className="flex items-center gap-1.5">
                <Clock
                  size={13}
                  className="text-foreground shrink-0"
                />
                <span className="text-sm font-bold text-foreground">
                  {bag.pickup}
                </span>
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-3">
              <p className="text-[10px] text-muted-foreground mb-1.5">
                Distancia
              </p>
              <div className="flex items-center gap-1.5">
                <MapPin
                  size={13}
                  className="text-foreground shrink-0"
                />
                <span className="text-sm font-bold text-foreground">
                  {bag.distance}
                </span>
              </div>
            </div>
          </div>

          {/* Eco impact */}
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-3.5 mb-5">
            <div className="flex items-center gap-2.5">
              <Leaf
                size={16}
                className="text-accent shrink-0"
              />
              <div>
                <p className="text-xs font-bold text-foreground">
                  Impacto ambiental
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Rescatando esta bolsa evitas {bag.co2Saved} kg
                  de CO₂ y salvas{" "}
                  {(bag.co2Saved * 1.3).toFixed(1)} kg de
                  alimento
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          {bagReviews.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-bold text-sm text-foreground"
                  style={{
                    fontFamily: "'Righteous', sans-serif",
                  }}
                >
                  Reseñas recientes
                </p>
                <div className="flex items-center gap-1">
                  <Star
                    size={11}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="text-xs font-black text-foreground">
                    {bag.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / 5
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-4">
                {bagReviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-muted rounded-2xl p-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black">
                          {r.user[0]}
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          {r.user}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map(
                          (_, j) => (
                            <Star
                              key={j}
                              size={9}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ),
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                    <p className="text-[9px] text-muted-foreground/60 mt-1">
                      {r.date}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="px-5 pb-6 pt-3 border-t border-border shrink-0">
          <button
            onClick={onOpenPayment}
            className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-base active:scale-[0.98] transition-transform"
          >
            Reservar por {fmt(bag.price)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT SHEET ───────────────────────────────────────────────────────────

function PaymentSheet({
  bag,
  onBack,
  onConfirm,
}: {
  bag: Bag;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [donate, setDonate] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const donationAmount =
    Math.round((bag.price * 0.1) / 10) * 10;
  const total = donate ? bag.price + donationAmount : bag.price;

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(?=\d)/, "$1/");

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(onConfirm, 1600);
    }, 1400);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ zIndex: 60 }}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onBack}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl overflow-hidden flex flex-col max-h-[94%]">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-border shrink-0">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h2
            className="font-bold text-base text-foreground"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            Pago seguro
          </h2>
          <div className="ml-auto flex items-center gap-1 bg-accent/10 rounded-full px-2 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-bold text-accent">
              SSL
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Order summary */}
          <div className="bg-muted rounded-2xl p-4">
            <p className="text-[10px] text-muted-foreground mb-2 font-bold uppercase tracking-widest">
              Resumen
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-card shrink-0">
                <img
                  src={bag.image}
                  alt={bag.restaurant}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground truncate">
                  {bag.restaurant}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {bag.type}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock
                    size={9}
                    className="text-muted-foreground"
                  />
                  <span className="text-[9px] text-muted-foreground">
                    Retiro: {bag.pickup}
                  </span>
                </div>
              </div>
              <p className="font-black text-primary shrink-0">
                {fmt(bag.price)}
              </p>
            </div>
          </div>

          {/* Donation toggle */}
          <button
            onClick={() => setDonate(!donate)}
            className={`w-full rounded-2xl p-4 border-2 text-left transition-all ${
              donate
                ? "border-accent bg-accent/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                  donate ? "bg-accent" : "bg-muted"
                }`}
              >
                {donate && (
                  <Check size={13} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm text-foreground">
                    Donar al Banco de Alimentos
                  </p>
                  <span className="bg-accent/20 text-accent text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    Deducible de impuesto
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Agrega {fmt(donationAmount)} para ayudar a
                  familias vulnerables. Certificado tributario
                  según Ley 20.241.
                </p>
              </div>
            </div>
          </button>

          {/* Card input */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Datos de la tarjeta
            </p>
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">
                  Número de tarjeta
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCard(e.target.value))
                  }
                  className="w-full bg-transparent text-sm font-mono outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="border-t border-border" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    Vencimiento
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) =>
                      setCardExpiry(
                        formatExpiry(e.target.value),
                      )
                    }
                    className="w-full bg-transparent text-sm font-mono outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    CVC
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) =>
                      setCardCvc(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 3),
                      )
                    }
                    className="w-full bg-transparent text-sm font-mono outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Chilean payment methods */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground px-1">
                o paga con
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-card border border-border rounded-xl py-2.5 flex items-center justify-center">
                <span className="text-sm font-black text-[#1A73E8]">
                  Web
                </span>
                <span className="text-sm font-black text-[#E94E34]">
                  pay
                </span>
              </button>
              <button className="bg-card border border-border rounded-xl py-2.5 flex items-center justify-center">
                <span className="text-xs font-black text-[#009ee3]">
                  Mercado Pago
                </span>
              </button>
            </div>
          </div>

          {/* Total breakdown */}
          <div className="bg-muted rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Bolsa sorpresa
              </span>
              <span className="font-semibold">
                {fmt(bag.price)}
              </span>
            </div>
            {donate && (
              <div className="flex justify-between text-sm">
                <span className="text-accent">
                  Donación banco de alimentos
                </span>
                <span className="font-semibold text-accent">
                  {fmt(donationAmount)}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold text-foreground">
                Total a pagar
              </span>
              <span className="font-black text-lg text-primary">
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pb-6 pt-3 border-t border-border shrink-0">
          <button
            onClick={handleConfirm}
            disabled={processing || success}
            className={`w-full h-14 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
              success
                ? "bg-accent text-white"
                : "bg-primary text-white active:scale-[0.98]"
            }`}
          >
            {success ? (
              <>
                <Check size={18} />
                ¡Pago confirmado!
              </>
            ) : processing ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Procesando...
              </>
            ) : (
              `Pagar ${fmt(total)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MERCHANT PANEL ──────────────────────────────────────────────────────────

const MERCHANT_CATEGORIES = [
  { id: "bakery", label: "Panadería", emoji: "🥖" },
  { id: "restaurant", label: "Restaurante", emoji: "🍳" },
  { id: "cafe", label: "Cafetería", emoji: "☕" },
  { id: "market", label: "Mercado", emoji: "🛒" },
  { id: "sushi", label: "Sushi / Asiático", emoji: "🍱" },
];

function MerchantPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [published, setPublished] = useState(false);
  const [data, setData] = useState({
    category: "",
    name: "",
    price: "",
    originalPrice: "",
    quantity: "5",
    pickupStart: "19:00",
    pickupEnd: "21:00",
  });

  const update = (key: string, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const pctOfOriginal =
    data.price && data.originalPrice
      ? Math.round(
          (parseInt(data.price) /
            parseInt(data.originalPrice)) *
            100,
        )
      : null;

  const handlePublish = () => {
    setPublished(true);
    setTimeout(onClose, 2000);
  };

  const canContinue = [
    data.category !== "" && data.name !== "",
    data.price !== "" && data.originalPrice !== "",
    true,
  ][step];

  return (
    <div
      className="absolute inset-0 bg-background flex flex-col"
      style={{ zIndex: 70 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
          >
            <X size={18} className="text-foreground" />
          </button>
          <h2
            className="font-bold text-base text-foreground"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            Publicar Bolsa Sorpresa
          </h2>
        </div>
        {/* Step indicators */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < step
                  ? "bg-accent w-5"
                  : i === step
                    ? "bg-primary w-7"
                    : "bg-muted w-4"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Step 0: Category & name */}
        {step === 0 && (
          <div>
            <h3
              className="font-black text-2xl mb-1 text-foreground"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              ¿Qué tipo de bolsa?
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Selecciona la categoría de tu comercio
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {MERCHANT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => update("category", cat.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    data.category === cat.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-3xl">{cat.emoji}</span>
                  <span className="text-xs font-bold text-foreground">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-2">
                Nombre de tu bolsa
              </p>
              <input
                type="text"
                placeholder="Ej: Bolsa Sorpresa de Repostería"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full bg-card border border-border rounded-2xl px-4 h-12 text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        )}

        {/* Step 1: Price & quantity */}
        {step === 1 && (
          <div>
            <h3
              className="font-black text-2xl mb-1 text-foreground"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              Precio y cantidad
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              El precio de venta debe ser 30–50% del valor
              original
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">
                  Valor original (CLP)
                </p>
                <div className="flex items-center bg-card border border-border rounded-2xl px-4 h-12 gap-2">
                  <span className="font-black text-muted-foreground text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="10000"
                    value={data.originalPrice}
                    onChange={(e) =>
                      update("originalPrice", e.target.value)
                    }
                    className="flex-1 bg-transparent text-sm outline-none text-foreground"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">
                  Precio de venta (CLP)
                </p>
                <div className="flex items-center bg-card border border-border rounded-2xl px-4 h-12 gap-2">
                  <span className="font-black text-muted-foreground text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="3990"
                    value={data.price}
                    onChange={(e) =>
                      update("price", e.target.value)
                    }
                    className="flex-1 bg-transparent text-sm outline-none text-foreground"
                  />
                </div>
                {pctOfOriginal !== null && (
                  <p
                    className={`text-xs mt-1.5 font-bold ${
                      pctOfOriginal <= 50
                        ? "text-accent"
                        : "text-primary"
                    }`}
                  >
                    {pctOfOriginal}% del valor original
                    {pctOfOriginal <= 50
                      ? " ✓ Cumple el requisito"
                      : " — intenta reducir el precio"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-3">
                  Bolsas disponibles
                </p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() =>
                      update(
                        "quantity",
                        String(
                          Math.max(
                            1,
                            parseInt(data.quantity) - 1,
                          ),
                        ),
                      )
                    }
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground"
                  >
                    −
                  </button>
                  <span className="text-3xl font-black text-foreground w-8 text-center">
                    {data.quantity}
                  </span>
                  <button
                    onClick={() =>
                      update(
                        "quantity",
                        String(parseInt(data.quantity) + 1),
                      )
                    }
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pickup time & preview */}
        {step === 2 && (
          <div>
            <h3
              className="font-black text-2xl mb-1 text-foreground"
              style={{ fontFamily: "'Righteous', sans-serif" }}
            >
              Ventana de retiro
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Define cuándo pueden retirar los clientes
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">
                  Hora inicio
                </p>
                <input
                  type="time"
                  value={data.pickupStart}
                  onChange={(e) =>
                    update("pickupStart", e.target.value)
                  }
                  className="w-full bg-card border border-border rounded-2xl px-4 h-12 text-sm outline-none text-foreground"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">
                  Hora fin
                </p>
                <input
                  type="time"
                  value={data.pickupEnd}
                  onChange={(e) =>
                    update("pickupEnd", e.target.value)
                  }
                  className="w-full bg-card border border-border rounded-2xl px-4 h-12 text-sm outline-none text-foreground"
                />
              </div>
            </div>

            {/* Preview card */}
            <div className="bg-muted rounded-2xl p-4 mb-4">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-3">
                Vista previa de tu bolsa
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-2xl shrink-0">
                  {MERCHANT_CATEGORIES.find(
                    (c) => c.id === data.category,
                  )?.emoji ?? "🛍️"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {data.name || "Nombre de tu bolsa"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {data.pickupStart} – {data.pickupEnd} ·{" "}
                    {data.quantity} uds.
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-primary font-black">
                      $
                      {parseInt(
                        data.price || "0",
                      ).toLocaleString("es-CL")}
                    </span>
                    <span className="text-muted-foreground text-[9px] line-through">
                      $
                      {parseInt(
                        data.originalPrice || "0",
                      ).toLocaleString("es-CL")}
                    </span>
                    {pctOfOriginal !== null && (
                      <span className="text-[9px] font-bold bg-secondary rounded-full px-1.5 py-0.5">
                        -{100 - pctOfOriginal}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental estimate */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <Leaf
                  size={14}
                  className="text-accent shrink-0"
                />
                <p className="text-xs font-bold text-foreground">
                  Impacto estimado al publicar {data.quantity}{" "}
                  bolsa(s)
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground ml-5">
                ≈ {(parseInt(data.quantity) * 0.9).toFixed(1)}{" "}
                kg CO₂ evitado · ≈{" "}
                {(parseInt(data.quantity) * 1.2).toFixed(1)} kg
                de alimento rescatado
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-3 border-t border-border shrink-0">
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-12 h-14 rounded-2xl bg-muted flex items-center justify-center shrink-0"
            >
              <ArrowLeft
                size={18}
                className="text-foreground"
              />
            </button>
          )}
          <button
            onClick={() => {
              if (step < 2) setStep((s) => s + 1);
              else handlePublish();
            }}
            disabled={!canContinue || published}
            className={`flex-1 h-14 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
              published
                ? "bg-accent text-white"
                : canContinue
                  ? "bg-primary text-white active:scale-[0.98]"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {published ? (
              <>
                <Check size={18} />
                ¡Bolsa publicada!
              </>
            ) : step < 2 ? (
              "Continuar →"
            ) : (
              "Publicar ahora"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────

function BottomNav({
  activeTab,
  onChange,
}: {
  activeTab: Tab;
  onChange: (t: Tab) => void;
}) {
  const tabs = [
    { id: "home" as Tab, icon: Home, label: "Inicio" },
    { id: "explore" as Tab, icon: Compass, label: "Explorar" },
    { id: "orders" as Tab, icon: Package, label: "Pedidos" },
    { id: "profile" as Tab, icon: User, label: "Perfil" },
  ];
  return (
    <div className="border-t border-border bg-card flex items-center shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3"
          >
            <Icon
              size={22}
              className={
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className={`text-[9px] font-bold ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedBag, setSelectedBag] = useState<Bag | null>(
    null,
  );
  const [showPayment, setShowPayment] = useState(false);
  const [showMerchant, setShowMerchant] = useState(false);
  const [savedBags, setSavedBags] = useState<Set<number>>(
    new Set([2, 5]),
  );
  const [category, setCategory] = useState("all");

  const toggleSave = (id: number) => {
    setSavedBags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePaymentConfirm = () => {
    setShowPayment(false);
    setSelectedBag(null);
    setActiveTab("orders");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-0 sm:py-8"
      style={{
        background: "#C8BEB4",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="relative w-full sm:w-[390px] h-screen sm:h-[844px] bg-background sm:rounded-[3rem] overflow-hidden sm:shadow-[0_48px_128px_rgba(0,0,0,0.4)] sm:border-[7px] sm:border-[rgba(0,0,0,0.15)]">
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activeTab === "home" && (
              <HomeScreen
                category={category}
                setCategory={setCategory}
                onSelectBag={setSelectedBag}
                savedBags={savedBags}
                onToggleSave={toggleSave}
              />
            )}
            {activeTab === "explore" && (
              <ExploreScreen
                onSelectBag={setSelectedBag}
                savedBags={savedBags}
                onToggleSave={toggleSave}
              />
            )}
            {activeTab === "orders" && <OrdersScreen />}
            {activeTab === "profile" && (
              <ProfileScreen
                onOpenMerchant={() => setShowMerchant(true)}
              />
            )}
          </div>
          <BottomNav
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Bag detail — hidden when payment is open */}
        {selectedBag && !showPayment && (
          <BagDetailSheet
            bag={selectedBag}
            onClose={() => setSelectedBag(null)}
            onOpenPayment={() => setShowPayment(true)}
            saved={savedBags.has(selectedBag.id)}
            onToggleSave={() => toggleSave(selectedBag.id)}
          />
        )}

        {/* Payment sheet */}
        {selectedBag && showPayment && (
          <PaymentSheet
            bag={selectedBag}
            onBack={() => setShowPayment(false)}
            onConfirm={handlePaymentConfirm}
          />
        )}

        {/* Merchant panel */}
        {showMerchant && (
          <MerchantPanel
            onClose={() => setShowMerchant(false)}
          />
        )}
      </div>
    </div>
  );
}