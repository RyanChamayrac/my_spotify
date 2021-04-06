const colors = require('tailwindcss/colors')

module.exports = {
    // ...
    theme: {
        extend: {
            colors: {
                black: colors.black,
            }
        }
    },
    plugins: [
        // ...
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography')
    ]
}