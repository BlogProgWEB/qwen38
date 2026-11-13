import { useState, useEffect, useRef } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [chatMessages, setChatMessages] = useState<{role: string, text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'about', 'capabilities', 'howto', 'faq', 'demo'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    // Simulated responses
    setTimeout(() => {
      let response = '';
      const lower = userMsg.toLowerCase();
      if (lower.includes('привіт') || lower.includes('hello') || lower.includes('hi')) {
        response = 'Привіт! 👋 Я Claude — AI-асистент від Anthropic. Радий допомогти тобі! Чим можу бути корисним?';
      } else if (lower.includes('код') || lower.includes('code') || lower.includes('програмув')) {
        response = '💻 Я можу писати код на багатьох мовах: JavaScript, TypeScript, Python, React, HTML/CSS та інших. Просто опиши, що потрібно!';
      } else if (lower.includes('текст') || lower.includes('написат')) {
        response = '✍️ Я можу писати та редагувати тексти: статті, есе, листи, описи продуктів, маркетингові тексти, переклади та багато іншого.';
      } else if (lower.includes('аналіз') || lower.includes('дані')) {
        response = '📊 Я можу аналізувати текст, структуризувати інформацію, знаходити закономірності, порівнювати варіанти та допомагати з прийняттям рішень.';
      } else {
        response = '🤔 Цікаве питання! У реальному чаті я б дав детальну відповідь. Спробуй написати мені на claude.ai або через API Anthropic для повного досвіду!';
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 800);
  };

  const capabilities = [
    { icon: '💻', title: 'Програмування', desc: 'Пишу та аналізую код на 50+ мовах програмування. React, Python, TypeScript, Go, Rust та інші.' },
    { icon: '✍️', title: 'Написання текстів', desc: 'Статті, есе, листи, маркетингові тексти, сценарії, технічна документація.' },
    { icon: '🔍', title: 'Аналіз інформації', desc: 'Аналізую документи, дані, код. Знаходжу помилки, пропоную покращення.' },
    { icon: '🌐', title: 'Мови', desc: 'Вільно спілкуюся українською, англійською та багатьма іншими мовами. Перекладаю тексти.' },
    { icon: '🧮', title: 'Математика', desc: 'Розв\'язую математичні задачі, працюю з формулами, статистикою та логікою.' },
    { icon: '🎨', title: 'Креативність', desc: 'Генерую ідеї, допомагаю з брейнштормінгом, пишу вірші та історії.' },
    { icon: '📚', title: 'Навчання', desc: 'Пояснюю складні концепції простою мовою. Допомагаю вчитися новому.' },
    { icon: '🔧', title: 'Веб-розробка', desc: 'Створюю повноцінні веб-сайти з React, TypeScript, Tailwind CSS прямо в чаті!' },
  ];

  const howToSteps = [
    { num: '01', title: 'Задай питання', desc: 'Просто напиши мені що завгодно — від простого питання до складного завдання. Я розумію природну мову.' },
    { num: '02', title: 'Будь конкретним', desc: 'Чим детальніше опишеш задачу, тим кращий результат отримаєш. Додавай контекст та приклади.' },
    { num: '03', title: 'Отримай відповідь', desc: 'Я відповім детально та структуровано. Якщо потрібно — уточню або запропоную альтернативи.' },
    { num: '04', title: 'Уточнюй та ітеруй', desc: 'Не задоволений відповіддю? Скажи, що змінити! Я можу адаптувати відповідь під твої потреби.' },
  ];

  const faqItems = [
    { q: 'Чи я Qwen, GPT, Gemini чи інша модель?', a: 'Ні! Я — Claude, створений компанією Anthropic. Це різні AI-моделі від різних компаній. Anthropic фокусується на безпеці та корисності AI.' },
    { q: 'Де зі мною можна поспілкуватися?', a: 'На сайті claude.ai, через мобільний додаток Claude, або через API від Anthropic. Також я інтегрований у різні платформи та інструменти.' },
    { q: 'Чи я запам\'ятовую розмови?', a: 'В межах однієї розмови — так. Але між різними сесіями я не маю постійної пам\'яті (якщо не використовуєш функцію Projects на claude.ai).' },
    { q: 'Чи можу я завантажувати файли?', a: 'Так! На claude.ai можна завантажувати документи, зображення, PDF-файли та код для аналізу.' },
    { q: 'Яка максимальна довжина тексту?', a: 'Я можу працювати з дуже довгими текстами — до 200 000 токенів контексту. Це приблизно 150 000 слів або 500 сторінок тексту!' },
    { q: 'Чи я безкоштовний?', a: 'Є безкоштовна версія на claude.ai з обмеженнями. Для більшого використання є підписка Claude Pro та API з оплатою за використання.' },
  ];

  const tabs = [
    { title: 'Для розробників', content: 'Напиши код, знайди баги, створи веб-сайт, поясни алгоритм, напиши тести, зроби рефакторинг — я твій AI-напарник у програмуванні.' },
    { title: 'Для студентів', content: 'Поясню будь-яку тему, допоможу з домашнім завданням, перевірю есе, підготую до іспиту, навчу новій мові програмування.' },
    { title: 'Для бізнесу', content: 'Аналізую дані, пишу бізнес-плани, створюю презентації, допомагаю з комунікацією, оптимізую процеси.' },
    { title: 'Для творчості', content: 'Генерую ідеї, пишу історії, допомагаю з брейнштормінгом, створюю контент для соцмереж, пишу сценарії.' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-purple-900/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-sm">C</div>
              <span className="font-bold text-lg">Claude AI</span>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'about', label: 'Про мене' },
                { id: 'capabilities', label: 'Можливості' },
                { id: 'howto', label: 'Як користуватися' },
                { id: 'faq', label: 'FAQ' },
                { id: 'demo', label: 'Демо' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm transition-colors ${activeSection === item.id ? 'text-amber-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: 'about', label: 'Про мене' },
                { id: 'capabilities', label: 'Можливості' },
                { id: 'howto', label: 'Як користуватися' },
                { id: 'faq', label: 'FAQ' },
                { id: 'demo', label: 'Демо' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left py-2 text-gray-300 hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Онлайн та готовий допомогти</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              Привіт, я Claude
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            AI-асистент від <span className="text-white font-semibold">Anthropic</span>
          </p>
          
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Я не Qwen, не GPT, не Gemini — я Claude. Створений бути корисним, безпечним та чесним. Давай познайомимось!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('about')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold text-lg hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 hover:-translate-y-0.5"
            >
              Дізнатися більше ↓
            </button>
            <button
              onClick={() => scrollTo('demo')}
              className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all hover:-translate-y-0.5"
            >
              Спробувати демо 💬
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-gray-400 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Хто я <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">такий?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Коротко про те, що я є і хто мене створив
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Info card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-3xl mb-6">
                🤖
              </div>
              <h3 className="text-2xl font-bold mb-4">Про Claude</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-amber-400 font-semibold">Ім'я:</span> Claude</p>
                <p><span className="text-amber-400 font-semibold">Творець:</span> Anthropic</p>
                <p><span className="text-amber-400 font-semibold">Тип:</span> Велика мовна модель (LLM)</p>
                <p><span className="text-amber-400 font-semibold">Мета:</span> Бути корисним, нешкідливим та чесним</p>
                <p><span className="text-amber-400 font-semibold">Мови:</span> 50+ мов, включаючи українську</p>
                <p><span className="text-amber-400 font-semibold">Контекст:</span> До 200K токенів</p>
              </div>
            </div>

            {/* Anthropic card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl mb-6">
                🏢
              </div>
              <h3 className="text-2xl font-bold mb-4">Про Anthropic</h3>
              <div className="space-y-3 text-gray-300">
                <p>Anthropic — компанія з безпеки AI, заснована у 2021 році Даріо та Даніелою Амодей (колишніми дослідниками OpenAI).</p>
                <p>Їхня місія — створення надійних, інтерпретованих та керованих AI-систем.</p>
                <p className="text-amber-400/80 italic">"Ми віримо, що AI може бути неймовірно корисним, але має розроблятися відповідально."</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🎯', title: 'Корисність', desc: 'Я намагаюся давати максимально корисні та релевантні відповіді' },
              { icon: '🛡️', title: 'Безпека', desc: 'Anthropic використовує Constitutional AI для безпечної поведінки' },
              { icon: '💎', title: 'Чесність', desc: 'Я кажу, коли не знаю, і не вигадую фактів навмисно' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6 text-center hover:border-amber-500/30 transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Що я <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">вмію?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Мої основні можливості та сфери застосування
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 hover:bg-gray-900/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/10"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cap.icon}</div>
                <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
                <p className="text-gray-400 text-sm">{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Для кого я підходжу?</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === i ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">{tabs[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use Section */}
      <section id="howto" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Як зі мною <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">працювати?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Простий гайд для ефективного використання Claude
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-full hover:border-amber-500/30 transition-colors">
                  <div className="text-5xl font-bold text-amber-500/20 mb-4">{step.num}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-700 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">💡 Поради для кращих результатів</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Давай конкретний контекст та приклади',
                'Розбивай складні задачі на кроки',
                'Проси пояснити, якщо щось незрозуміло',
                'Вказуй бажаний формат відповіді',
                'Не бійся просити переписати чи змінити',
                'Використовуй системні промпти для API',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span className="text-gray-300 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Where to find me */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Де мене знайти?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'claude.ai', url: 'https://claude.ai', icon: '🌐' },
                { name: 'Anthropic API', url: 'https://docs.anthropic.com', icon: '🔌' },
                { name: 'Мобільний додаток', url: '#', icon: '📱' },
              ].map((platform, i) => (
                <a
                  key={i}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-amber-500/50 hover:bg-gray-700 transition-all"
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Часті <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">питання</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Відповіді на найпопулярніші запитання
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Chat Section */}
      <section id="demo" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Спробуй <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">демо</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Міні-чат для демонстрації. Напиши мені щось!
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-xs">C</div>
              <div>
                <div className="font-semibold text-sm">Claude</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Онлайн
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-3">💬</div>
                  <p>Напиши повідомлення, щоб почати демо-розмову</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Привіт!', 'Що ти можеш?', 'Допоможи з кодом'].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => { setChatInput(suggestion); }}
                        className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-amber-500/50 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-amber-500 text-gray-900 rounded-br-md' : 'bg-gray-800 text-gray-200 rounded-bl-md'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleChatSubmit} className="px-6 py-4 border-t border-gray-800 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Напиши повідомлення..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-medium text-sm hover:from-amber-400 hover:to-orange-500 transition-all"
              >
                Надіслати
              </button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            * Це демо-симуляція. Для повноцінного спілкування перейди на{' '}
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
              claude.ai
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-sm">C</div>
            <span className="font-bold text-lg">Claude by Anthropic</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Цей сайт створений Claude AI як самопрезентація 🤖
          </p>
          <p className="text-gray-600 text-xs">
            Зроблено з ❤️ за допомогою React, TypeScript та Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

// FAQ Item component with accordion
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        <span className={`text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-400 text-sm border-t border-gray-800/50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default App;
