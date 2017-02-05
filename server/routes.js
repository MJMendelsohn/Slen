import path from 'path';

export const route = (app) => {
    app.get('/', (req, res) => {
        if (process.env.NODE_ENV === 'production') {
            console.log('derp')
            res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
        } else {
            res.sendFile(path.resolve(__dirname, '..', 'public-dev', 'index.html'));
        }
    })
}
