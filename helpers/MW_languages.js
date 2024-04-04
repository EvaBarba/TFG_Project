// helpers/MW_languages.js

const iso6391 = require('iso-639-1');

// Obtener todos los idiomas disponibles
async function obtainLanguages() {
    // Obtener todos los códigos de idioma
    const languageCodes = iso6391.getAllCodes();

    // Obtener todos los nombres de idioma
    const languageNames = iso6391.getAllNames();

    // Combina los códigos y los nombres en un objeto
    const languages = languageCodes.map((code, index) => ({
        code,
        name: languageNames[index]
    }));

    const sortedLanguages = languages.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    // console.log(sortedLanguages);

    return sortedLanguages;
}

// Middleware para obtener y establecer los idiomas globales
const getGlobalLanguages = async (req, res, next) => {
    try {
        const allLanguages = await obtainLanguages();
        res.locals.allLanguages = allLanguages;
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = getGlobalLanguages;

