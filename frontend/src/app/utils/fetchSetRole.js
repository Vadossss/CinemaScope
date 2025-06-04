export async function setUserRole(userId, role) {
  try {
    const response = await fetch("http://localhost:8085/admin/setRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: userId,
        role: role,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Ошибка при установке роли: " + errorText);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    } else {
      const text = await response.text();
      return { message: text };
    }
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}