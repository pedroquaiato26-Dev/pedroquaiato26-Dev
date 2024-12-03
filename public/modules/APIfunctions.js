export async function APIsendData(idname, API, dados){
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                "Content-type": "application/json;"
            },
            body: JSON.stringify(dados)
        })
    } catch (error) {
        console.error(`Erro ao enviar dados para as API com o nome de ${idname} `, error)
    }
}

export async function APIreciveData(idname, API){
    try {
        const response = await fetch(API, {
            method: 'GET',
            headers: {
                "Content-type": "application/json;"
            }
        })

        if(!response.ok){
            let dados = await response.json()
            return dados
        }
        
    } catch (error) {
        console.error(`Erro ao enviar dados para as API com o nome de ${idname} `, error)
    }
}

export const API = {
    loginUser: '/api/send/dados/login'
}