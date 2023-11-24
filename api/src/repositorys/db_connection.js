try {
    const config = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB,
        typeCast: function(field, next) {
            if(field.type === 'TINY' && field.length === 1) {
                return field.string() === '1';
            } else {
                return next();
            }
        }
    });
    
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
    
} catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
}
export default config;
  