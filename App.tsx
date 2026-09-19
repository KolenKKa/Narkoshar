--- src/App.tsx (原始)
export default function App() {
  return (
    <div/>
  );
}


+++ src/App.tsx (修改后)
import { useEffect, useRef, useState } from 'react';

// Компонент падающих лепестков сакуры
function SakuraPetals() {
  const petals = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 12 + 8,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C10 0 12 4 14 6C16 8 20 10 20 10C20 10 16 12 14 14C12 16 10 20 10 20C10 20 8 16 6 14C4 12 0 10 0 10C0 10 4 8 6 6C8 4 10 0 10 0Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

// Хук для анимации при скролле
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

// Слайдер работ
function ProjectSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: 'SakuraShop Bot',
      description: 'Telegram-бот на aiogram — SakuraShop. Макет магазина с удобным интерфейсом, навигацией и интеграцией. Разработан с использованием современных подходов к разработке ботов.',
      tech: ['Python', 'Aiogram', 'Telegram Bot API'],
      link: 'https://t.me/gt1337a_bot',
      linkText: '@gt1337a_bot',
    },
    {
      title: 'Веб-верстка',
      description: 'Создание адаптивных и стильных веб-страниц с использованием HTML и CSS. Чистый семантический код, внимание к деталям и современный дизайн.',
      tech: ['HTML', 'CSS', 'Адаптивный дизайн'],
      link: null,
      linkText: null,
    },
    {
      title: 'Python-скрипты',
      description: 'Разработка автоматизаций и утилит на Python. Парсинг данных, работа с API, обработка информации и создание полезных инструментов.',
      tech: ['Python', 'Автоматизация', 'API'],
      link: null,
      linkText: null,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="slider-container rounded-2xl overflow-hidden">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div key={index} className="min-w-full p-2">
              <div className="glass-card rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-white/80"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full border border-white/20 text-sm text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.8-1.58 4.59-1.86 5.1-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                    </svg>
                    {project.linkText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Навигация слайдера */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all hover:border-white/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      <SakuraPetals />

      {/* Хедер - Кто я? */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* Фоновое свечение */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-on-scroll">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Портфолио
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Кто{' '}
              <span className="relative inline-block">
                я?
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
            </h1>
          </div>

          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="glass-card rounded-2xl p-8 md:p-12 mt-8">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Мне 13 лет, учусь в 7 классе. Увлечён разработкой — пишу на{' '}
                <span className="text-white font-semibold">Python</span>, работаю с{' '}
                <span className="text-white font-semibold">Aiogram</span>, занимаюсь{' '}
                <span className="text-white font-semibold">HTML-вёрсткой</span>.
              </p>
              <div className="w-16 h-[1px] bg-white/20 mx-auto my-6"></div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Стремлюсь выйти на стабильный заработок и реализовать свои мечты.
                Каждый день учусь новому и совершенствую свои навыки, чтобы создавать
                качественные проекты и расти как разработчик.
              </p>
            </div>
          </div>

          {/* Навыки */}
          <div className="animate-on-scroll flex flex-wrap justify-center gap-3 mt-8" style={{ transitionDelay: '0.4s' }}>
            {['Python', 'Aiogram', 'HTML', 'CSS', 'Telegram Bots'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-all"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Скролл индикатор */}
          <div className="animate-on-scroll mt-16" style={{ transitionDelay: '0.6s' }}>
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-xs uppercase tracking-widest">Листай вниз</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Боди - Мои работы */}
      <section className="min-h-screen py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Портфолио
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Мои{' '}
              <span className="text-gray-400">работы</span>
            </h2>
          </div>

          <div className="animate-on-scroll scale" style={{ transitionDelay: '0.2s' }}>
            <ProjectSlider />
          </div>
        </div>
      </section>

      {/* Футер - Контакты */}
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-on-scroll">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
              Связаться
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              Контакты
            </h2>
          </div>

          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-xl mx-auto">
              <p className="text-gray-400 mb-8 text-lg">
                Готов к сотрудничеству и новым проектам. Свяжитесь со мной:
              </p>

              <div className="space-y-4">
                {/* Telegram */}
                <a
                  href="https://t.me/Narko62"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.8-1.58 4.59-1.86 5.1-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">@Narko62</p>
                    <p className="text-gray-500 text-sm">Личный Telegram</p>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Telegram канал */}
                <a
                  href="https://t.me/Narkoshar2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                      <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">Канал</p>
                    <p className="text-gray-500 text-sm">t.me/Narkoshar2</p>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Копирайт */}
          <div className="animate-on-scroll mt-16" style={{ transitionDelay: '0.4s' }}>
            <div className="w-24 h-[1px] bg-white/10 mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm">
              © 2025 — Создано с 🤍
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
