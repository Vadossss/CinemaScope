export async function FindUserByName(name){
    try{
        const response = await fetch(`http://localhost:8085/admin/findByName?name=${name}`,{
            method: "GET",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
            },

        });
        
        if (!response.ok) {
                    throw new Error("Ошибка при поиске пользователя");
                }

                const result = await response.json();
                return result;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
    
}