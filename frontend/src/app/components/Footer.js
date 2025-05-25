export default function App() {
    return (
        <footer className="bg-gray-900 pt-12 mt-6 pb-6 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">CinemaScope</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    О проекте
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Реклама
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Пользовательское соглашение
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Политика конфиденциальности
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Фильмы</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Новинки кино
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Лучшие фильмы
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    По жанрам
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    По годам
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Сериалы</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Новые сериалы
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    Топ сериалов
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    По жанрам
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-500 transition-colors">
                                    По странам
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Подписка</h3>
                        <p className="text-gray-400 mb-4">
                            Получайте уведомления о новых фильмах и сериалах
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="bg-gray-800 rounded-l px-4 py-2 w-full focus:outline-none"
                            />
                            <button className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-r">
                                Подписаться
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    <p>© 2024 КиноПоиск. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}