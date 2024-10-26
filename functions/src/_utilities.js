exports.getIpAddress = (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
};

exports.generateLobbyCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
