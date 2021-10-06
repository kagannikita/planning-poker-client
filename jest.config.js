module.exports={
    testEnvironment: 'jsdom',
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "^.+\\.(css|less|scss|svg|png|jpg)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    },
    collectCoverage: true,
    "coverageReporters": [
        "json",
        "html"
    ],
    coverageThreshold: {
        global: {
            'ts-jest': {
                isolatedModules: true,
            },
        }
    }
}
