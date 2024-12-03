export function modelMensager(id, text) {
    try {
        const mensagem = document.getElementById(id);
        if (mensagem) {
            mensagem.innerHTML = text;
            return mensagem;
        } else {
            console.error(`Elemento com ID "${id}" não encontrado.`);
        }
    } catch (error) {
        console.error('Erro ao iniciar o modelo de mensagens: ', error);
    }
}

export function modelGetValues(id) {
    try {
        const element = document.getElementById(id);
        if (element) {
            return element.value.trim(); // Remove espaços em branco
        } else {
            console.error(`Elemento com ID "${id}" não encontrado.`);
            return null;
        }
    } catch (error) {
        console.error('Erro ao iniciar o modelo de captura de dados: ', error);
    }
}

export function eventDOMaddList(id, events, callback) {
    try {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(events, callback);
        } else {
            console.error(`Elemento com ID "${id}" não encontrado.`);
        }
    } catch (error) {
        console.error('Erro ao iniciar o modelo de eventos: ', error);
    }
}

//------------------------------------------------------------------------------------------------------//

export const API = {
    loginUser: '/api/send/dados/login'
};

async function getDados() {
    try {
        const email = modelGetValues('femail');
        const password = modelGetValues('Ppassword');

        if (!email || !password) {
            modelMensager('mensagem', 'Por favor, preencha todos os campos.');
            return;
        }

        const dadosUser = { email, password };

        console.log('Dados capturados:', dadosUser);

        console.log('Enviando dados...')
        const response = await APIsendData('loginUser', API.loginUser, dadosUser);
        console.log('Dados Enviados');
       
        if (response.ok) {
            const data = await response.json();
            console.log('Resposta da API:', data);

            
            modelMensager('mensagem', 'Login realizado com sucesso!');

            
            window.location.href = '/dashboard';  
        } else {
            console.error('Erro ao enviar dados:', response.status);
            modelMensager('mensagem', 'Erro no login. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro ao coletar ou enviar os dados:', error);
        modelMensager('mensagem', 'Ocorreu um erro inesperado. Tente novamente.');
    }
}

export async function APIsendData(idname, API, dados) {
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        return response; 
    } catch (error) {
        console.error(`Erro ao enviar dados para a API (${idname}):`, error);
        throw error; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Verificando o elemento "send":', document.getElementById("send"));
    eventDOMaddList("send", "click", getDados);
});
