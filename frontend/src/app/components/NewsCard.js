function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function NewsCard({ item, index }) {
  const isWideCard = [0, 13, 22, 35].includes(index);

  return (
    <>
    {isWideCard ? (
         <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg col-span-2`}
    >
        <div className="relative h-full">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="relative w-full h-full object-cover"
      />
      <div className="absolute left-1 p-4 bottom-5 flex flex-col items-center px-10  ">
        <h3 className="font-bold text-gray-800 mb-2 text-white font-bold text-[32px] text-center">
          {item.title}
        </h3>
        {/* <p className="text-sm text-gray-600 mb-3 line-clamp-3 text-white">
          {item.description}
        </p> */}
        <span className="text-xs text-gray-500 text-white font-bold text-center opacity-80 ">
          {formatDate(item.publishedAt)}
        </span>
      </div>
      </div>
    </a>
    ): ( <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg col-span-1`}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {item.description}
        </p>
        <span className="text-xs text-gray-500">
          {formatDate(item.publishedAt)}
        </span>
      </div>
    </a>)}
    </>
   
  );
}
