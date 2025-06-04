export default function App() {
    return (
        <footer className="bg-white text-gray-700 text-sm py-6 mt-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="text-center md:text-left">
                    <p className="text-black font-bold">CinemaScope</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-4">
                    <a href="#" className="hover:text-gray-500 transition-colors">О проекте</a>
                    <a href="#" className="hover:text-gray-500 transition-colors">Реклама</a>
                    <a href="#" className="hover:text-gray-500 transition-colors">Соглашение</a>
                    <a href="#" className="hover:text-gray-500 transition-colors">Конфиденциальность</a>
                </div>
            </div>
            <div className="border-t border-gray-300 pt-6 text-center text-gray-700 text-sm">
                <p>© 2025 CinemaScope. Все права защищены.</p>
            </div>
        </footer>
    )
}

