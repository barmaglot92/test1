const glob = require("glob")
const fs = require("fs")
const processMessages = require("intl-messages-loader/processMessages")
const path = require("path")

const parseFile = fileName => {
    try {
        return JSON.parse(fs.readFileSync(fileName))
    } catch (err) {
        console.error(err.toString(), fileName)
    }
}

const pack = (dirs, langs, defaultLang, targetDir) => {
    let defaultLocaleFile = {}
    dirs.map(dir => {
        glob.sync(path.join(dir, "**", "lang.json")).forEach(fileName => {
            const file = processMessages(parseFile(fileName))
            Object.keys(file).forEach(fileKey => {
                const descriptor = file[fileKey]
                const id = descriptor.id
                if (!defaultLocaleFile[id]) {
                    defaultLocaleFile[id] = {
                        id: id,
                        message: descriptor.defaultMessage.trim(),
                    }
                }
            })
        })
    })

    const langFiles = {}
    langs.forEach(lang => {
        const fileName = path.join(targetDir, "translate", lang + "_locale.json")
        langFiles[lang] = {
            lang: lang,
            fileName: fileName,
            file: fs.existsSync(fileName) ? parseFile(fileName) : {},
        }
    })

    const changedIds = {}
    const deletedIds = {}
    const changedLanguages = {}
    Object.keys(langFiles[defaultLang].file).forEach(id => {
        const text = langFiles[defaultLang].file[id].message
        if (defaultLocaleFile[id]) {
            const currentText = defaultLocaleFile[id].message
            if (text.replace(/w+/, "") !== currentText.replace(/w+/, "")) {
                changedIds[id] = true
                changedLanguages[defaultLang] = true
            }
        } else {
            deletedIds[id] = true
            changedLanguages[defaultLang] = true
        }
    })

    if (Object.keys(defaultLocaleFile).length !== Object.keys(langFiles[defaultLang].file).length) {
        changedLanguages[defaultLang] = true
    }

    if (changedLanguages[defaultLang] !== true) {
        return "Lang files not modified"
    }

    let ret = ""
    Object.keys(langFiles).forEach(lang => {
        Object.keys(defaultLocaleFile).forEach(id => {
            if (!(langFiles[lang].file[id] && !changedIds[id])) {
                langFiles[lang].file[id] = defaultLocaleFile[id]
            }
        })
        Object.keys(deletedIds).forEach(id => {
            delete langFiles[lang].file[id]
        })
        fs.writeFileSync(langFiles[lang].fileName, JSON.stringify(langFiles[lang].file, null, " "), "utf8")
        ret = ret + langFiles[lang].fileName + " wrote\n"
    })
    return ret
}

var WebpackPackLocales = (module.exports = function(dirs, langs, defaultLang, targetDir) {
    this.dirs = dirs
    this.langs = langs
    this.defaultLang = defaultLang
    this.targetDir = targetDir
})

WebpackPackLocales.prototype.apply = function(compiler) {
    compiler.plugin("compilation", () => {
        console.log("Executing pack locales")
        try {
            const log = pack(this.dirs, this.langs, this.defaultLang, this.targetDir)
            console.log(log)
        } catch (e) {
            console.error(e)
        }
    })
}
