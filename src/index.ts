import colors from 'colors';
import server from './server';

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.green.bold('==============================='));
    console.log(colors.green.bold(' 📖 BIBLIOTECA API Server 📖 '));
    console.log(colors.green.bold('==============================='));
    console.log(colors.cyan.bold(` Environment: ${process.env.NODE_ENV || 'Development'}`));
    console.log(colors.cyan.bold(` Server is running on port: ${port}`));
    console.log(colors.cyan.bold(` Started at: ${new Date().toLocaleString()}`));
});