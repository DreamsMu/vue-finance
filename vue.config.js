module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8090",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }
    }
}

