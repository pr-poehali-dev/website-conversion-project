import { useState } from 'react';
import Icon from '@/components/ui/icon';


const CLINIC_IMG = 'https://cdn.poehali.dev/projects/7b4028d6-c2bf-4eeb-ac81-1ac147528750/files/eedd8241-6148-4a92-a383-607aee328abe.jpg';
const DOCTOR_IMG = 'https://cdn.poehali.dev/projects/7b4028d6-c2bf-4eeb-ac81-1ac147528750/files/5dc7e688-6183-4752-a59b-2082205bfda7.jpg';

type Tab = 'home' | 'booking' | 'doctors' | 'chat' | 'profile';

const services = [
  { icon: 'Sparkles', name: 'Биоревитализация', price: 'от 9 500 ₽' },
  { icon: 'Syringe', name: 'Контурная пластика', price: 'от 18 000 ₽' },
  { icon: 'Droplets', name: 'Мезотерапия', price: 'от 7 000 ₽' },
  { icon: 'Zap', name: 'Лазерное омоложение', price: 'от 12 000 ₽' },
  { icon: 'Flower2', name: 'Ботулинотерапия', price: 'от 8 500 ₽' },
  { icon: 'Gem', name: 'Чистка лица', price: 'от 5 000 ₽' },
];

const doctors = [
  { name: 'Елена Соколова', role: 'Врач-косметолог, дерматолог', exp: '14 лет опыта', rating: 4.9, reviews: 247, img: DOCTOR_IMG },
  { name: 'Мария Воронцова', role: 'Пластический хирург', exp: '11 лет опыта', rating: 5.0, reviews: 189, img: DOCTOR_IMG },
  { name: 'Анна Дмитриева', role: 'Дерматолог-эстетист', exp: '9 лет опыта', rating: 4.8, reviews: 156, img: DOCTOR_IMG },
];

const visits = [
  { date: '12 июня 2026', service: 'Биоревитализация', doctor: 'Елена Соколова', status: 'Завершено' },
  { date: '28 мая 2026', service: 'Чистка лица', doctor: 'Анна Дмитриева', status: 'Завершено' },
  { date: '14 мая 2026', service: 'Мезотерапия', doctor: 'Елена Соколова', status: 'Завершено' },
];



function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={13} className={s <= Math.round(rating) ? 'text-gold fill-gold' : 'text-muted-foreground/30'} />
      ))}
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'doc', text: 'Здравствуйте! Я администратор клиники Клиник Эстетик. Чем могу помочь?' },
  ]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((m) => [...m, { from: 'me', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'doc', text: 'Спасибо за обращение! Специалист скоро ответит вам.' }]);
    }, 800);
  };

  const nav: { id: Tab; icon: string; label: string }[] = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'booking', icon: 'CalendarPlus', label: 'Запись' },
    { id: 'doctors', icon: 'Stethoscope', label: 'Врачи' },
    { id: 'chat', icon: 'MessageCircle', label: 'Чат' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[440px] min-h-screen bg-background relative shadow-luxe flex flex-col">
        {/* Top bar */}
        <header className="glass sticky top-0 z-20 px-6 pt-6 pb-4 flex items-center justify-between border-b border-border/40">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold font-medium">КЛИНИК ЭСТЕТИК</p>
            <h1 className="font-display text-2xl font-semibold leading-tight">
              {tab === 'home' && 'Эстетика красоты'}
              {tab === 'booking' && 'Онлайн-запись'}
              {tab === 'doctors' && 'Специалисты'}
              {tab === 'chat' && 'Консультация'}
              {tab === 'profile' && 'Личный кабинет'}
            </h1>
          </div>
          <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center relative">
            <Icon name="Bell" size={20} className="text-foreground" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-gold" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-28">
          {/* HOME */}
          {tab === 'home' && (
            <div className="animate-fade-in">
              <div className="px-6 pt-5">
                <div className="relative rounded-3xl overflow-hidden h-52 shadow-luxe">
                  <img src={CLINIC_IMG} alt="Клиника" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-white/80 text-xs tracking-widest mb-1">ПРЕМИУМ КЛИНИКА</p>
                    <p className="font-display text-white text-2xl font-semibold leading-tight">Ваша красота —<br />наша забота</p>
                  </div>
                </div>
              </div>

              <div className="px-6 mt-6">
                <button onClick={() => setTab('booking')} className="w-full bg-gold-gradient text-white rounded-2xl p-5 flex items-center justify-between shadow-gold hover-scale transition-transform">
                  <div className="text-left">
                    <p className="font-display text-xl font-semibold">Записаться онлайн</p>
                    <p className="text-white/85 text-sm">Реальное расписание врачей клиники</p>
                  </div>
                  <Icon name="ArrowRight" size={24} />
                </button>
              </div>

              <div className="px-6 mt-7">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-xl font-semibold">Популярные услуги</h2>
                  <button onClick={() => setTab('booking')} className="text-gold text-sm font-medium">Все</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {services.slice(0, 4).map((s) => (
                    <div key={s.name} className="bg-card rounded-2xl p-4 shadow-luxe border border-border/40">
                      <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-3">
                        <Icon name={s.icon} size={20} className="text-gold-dark" />
                      </div>
                      <p className="font-medium text-sm leading-tight">{s.name}</p>
                      <p className="text-gold-dark text-sm font-semibold mt-1">{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 mt-7">
                <h2 className="font-display text-xl font-semibold mb-3">Ведущие специалисты</h2>
                {doctors.slice(0, 2).map((d) => (
                  <div key={d.name} className="bg-card rounded-2xl p-3 shadow-luxe border border-border/40 flex items-center gap-3 mb-3">
                    <img src={d.img} alt={d.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-muted-foreground text-xs">{d.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Stars rating={d.rating} />
                        <span className="text-xs text-muted-foreground ml-1">{d.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKING — реальный виджет YClients */}
          {tab === 'booking' && (
            <div className="animate-fade-in flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>
              <div className="px-6 pt-4 pb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="CalendarCheck" size={15} className="text-gold-dark" />
                Выберите услугу, врача и удобное время
              </div>
              <iframe
                src="https://n1376727.yclients.com/company/1142189/personal/menu?o="
                className="flex-1 w-full border-0"
                title="Онлайн-запись Клиник Эстетик"
                allow="payment"
              />
            </div>
          )}

          {/* DOCTORS + booking */}
          {tab === 'doctors' && (
            <div className="px-6 pt-5 animate-fade-in space-y-4">
              {doctors.map((d) => (
                <div key={d.name} className="bg-card rounded-3xl overflow-hidden shadow-luxe border border-border/40">
                  <div className="flex gap-4 p-4">
                    <img src={d.img} alt={d.name} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-lg font-semibold leading-tight">{d.name}</p>
                      <p className="text-muted-foreground text-xs">{d.role}</p>
                      <p className="text-gold-dark text-xs mt-1">{d.exp}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Stars rating={d.rating} />
                        <span className="text-xs font-medium">{d.rating}</span>
                        <span className="text-xs text-muted-foreground">· {d.reviews} отзывов</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => setTab('booking')}
                      className="w-full bg-gold-gradient text-white rounded-xl py-3 font-medium shadow-gold hover-scale transition-transform flex items-center justify-center gap-2"
                    >
                      <Icon name="CalendarPlus" size={18} />
                      Записаться на приём
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}
          {tab === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in">
              <div className="flex-1 overflow-y-auto px-6 pt-5 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.from === 'me'
                        ? 'bg-gold-gradient text-white rounded-br-md shadow-gold'
                        : 'bg-card border border-border/40 rounded-bl-md shadow-luxe'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-border/40 glass flex items-center gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Напишите сообщение…"
                  className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button onClick={sendMessage} className="w-11 h-11 rounded-full bg-gold-gradient text-white flex items-center justify-center shrink-0 shadow-gold">
                  <Icon name="Send" size={18} />
                </button>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {tab === 'profile' && (
            <div className="px-6 pt-5 animate-fade-in">
              <div className="bg-gold-gradient rounded-3xl p-6 text-white shadow-gold flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-display text-2xl font-semibold">АК</div>
                <div>
                  <p className="font-display text-xl font-semibold">Анастасия Климова</p>
                  <p className="text-white/85 text-sm">+7 (921) 555-12-34</p>
                  <p className="text-white/85 text-xs mt-1 flex items-center gap-1"><Icon name="Crown" size={13} /> Премиум-клиент</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[{ n: '12', l: 'визитов' }, { n: '4.9', l: 'ваш рейтинг' }, { n: '3 200', l: 'бонусов' }].map((s) => (
                  <div key={s.l} className="bg-card rounded-2xl p-3 text-center shadow-luxe border border-border/40">
                    <p className="font-display text-2xl font-semibold text-gold-dark">{s.n}</p>
                    <p className="text-xs text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-xl font-semibold mt-7 mb-3">История посещений</h2>
              <div className="space-y-3">
                {visits.map((v, i) => (
                  <div key={i} className="bg-card rounded-2xl p-4 shadow-luxe border border-border/40">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{v.service}</p>
                      <span className="text-[11px] bg-accent text-gold-dark px-2 py-0.5 rounded-full font-medium">{v.status}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1"><Icon name="Stethoscope" size={12} /> {v.doctor}</p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5"><Icon name="Calendar" size={12} /> {v.date}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                {[{ i: 'Settings', t: 'Настройки профиля' }, { i: 'CreditCard', t: 'Способы оплаты' }, { i: 'LogOut', t: 'Выйти' }].map((r) => (
                  <button key={r.t} className="w-full bg-card rounded-2xl p-4 shadow-luxe border border-border/40 flex items-center gap-3 text-left">
                    <Icon name={r.i} size={18} className="text-gold-dark" />
                    <span className="text-sm font-medium flex-1">{r.t}</span>
                    <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 w-full max-w-[440px] glass border-t border-border/40 px-2 py-2 flex items-center justify-around z-20">
          {nav.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors">
              <Icon name={n.icon} size={22} className={tab === n.id ? 'text-gold-dark' : 'text-muted-foreground'} />
              <span className={`text-[10px] ${tab === n.id ? 'text-gold-dark font-medium' : 'text-muted-foreground'}`}>{n.label}</span>
            </button>
          ))}
        </nav>


      </div>
    </div>
  );
}