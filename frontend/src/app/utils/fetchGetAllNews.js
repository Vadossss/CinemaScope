export async function getNews(page, size = 40) {
  try {
    const res = await fetch(`http://localhost:8085/news/getNews?page=${page}&size=${size}&sortDirection=desc`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return [await res.json(), null]; // ✔️ success
    } else if (res.status === 404) {
      console.log("Ошибка 404");
      return [null, new Error("Новости не найдены")];
    } else {
      console.log(`Ошибка: ${res.status}`);
      return [null, new Error(`Ошибка: ${res.status}`)];
    }
  } catch (error) {
    console.log("Ошибка при запросе:", error);
    return [null, error]; // ✔️ error object
  }
}