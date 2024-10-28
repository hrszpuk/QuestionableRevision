
async function uploadPDF(data) {
    try {
        const res = await fetch('../function/uploadpdf?filename=quiz.pdf', { // Change URL to actual endpoint that accepts file uploads
            method: 'POST',
            body: data,
        });

        // Check if the response is OK before parsing it as JSON
        if (res.ok) {
            return await res.json();
        } else {
            console.log(`Error: ${res.status} ${res.statusText}`);
            return undefined;
        }

    } catch (err) {
        console.log(err.message);
        return undefined;
    }
}

async function processPDF(filename) {
    try {
        let data = {
            filename: filename
        }
        const res = await fetch('../function/processPdf', { // Change URL to actual endpoint that accepts file uploads
            method: 'POST',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(data),
        });

        // Check if the response is OK before parsing it as JSON
        if (res.ok) {
            return await res.json();
        } else {
            console.log(`Error: ${res.status} ${res.statusText}`);
            return undefined;
        }

    } catch (err) {
        console.log(err.message);
        return undefined;
    }
}

async function StartLobby(questions) {
    try {
        const res = await fetch('../function/lobbyStart', { // Change URL to actual endpoint that accepts file uploads
            method: 'POST',
            body: questions,
        });

        // Check if the response is OK before parsing it as JSON
        if (res.ok) {
            return await res.json();
        } else {
            console.log(`Error: ${res.status} ${res.statusText}`);
            return undefined;
        }

    } catch (err) {
        console.log(err.message);
        return undefined;
    }
}

async function JoinLobby(lobbyCode, userName) {
    try {
        let data = {
            lobbyCode: lobbyCode,
            userName: userName
        }
        const res = await fetch('../function/lobbyJoin', { // Change URL to actual endpoint that accepts file uploads
            method: 'POST',
            body: JSON.stringify(data),
        });

        // Check if the response is OK before parsing it as JSON
        if (res.ok) {
            return await res.json();
        } else {
            console.log(`Error: ${res.status} ${res.statusText}`);
            return undefined;
        }

    } catch (err) {
        console.log(err.message);
        return undefined;
    }
}