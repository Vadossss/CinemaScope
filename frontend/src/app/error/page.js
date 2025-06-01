import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="bg-white flex justify-center items-center rounded">
            <div className="flex pt-60 pb-80 flex-col md:flex-row gap-10 px-72 max-w-[1600px]">
                <div className="flex flex-col justify-center">
                    <h1 className="font-bold text-5xl">404. Страница не найдена</h1>
                    <span className="mt-4 text-lg font-bold opacity-85">
                        Мы всё ещё дополняем материалы на нашем сайте. Спасибо за понимание.
                    </span>
                    <div className="mt-6">
                        <Link href="/" className="text-gray-800 font-bold text-lg opacity-85 hover:text-orange-500 transition duration-150 ease-in-out">
                            На главную
                        </Link>
                    </div>
                </div>
                <div className="">
                    <video src="/error_video.mp4" autoPlay muted loop className="w-full rounded" />
                </div>
            </div>
        </div>
    );
}