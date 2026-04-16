export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-preset-env": {
            features: {
                "nesting-rules": true,
                "custom-properties": true,
                "custom-media-queries": true,
            },
        },
    },
};
