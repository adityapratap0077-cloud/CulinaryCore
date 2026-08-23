module.exports = {
    PORT: process.env.PORT || 3001,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@host:port/database'
};