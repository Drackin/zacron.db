// zacron.db @ 5.1.1

const fs = require("graceful-fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

if (!fs.existsSync(`./database.json`)) {
    fs.writeFileSync("database.json", '{}', function (err) {
        if (err) throw err;
    })
}

let file;
let dataFileName;

class Database {

    /**
     * @param { String } dataFile Data File Name for Database
     * @example new Database("database.json")
     */
    constructor(dataFile) {
        if (dataFile && typeof dataFile !== "string") {
            throw new SyntaxError("You Must Enter A Database File Name Type Of String.")
        }
        dataFile = dataFile ? dataFile : 'database.json'
        dataFileName = dataFile.endsWith(".json") ? dataFile : `${dataFile}.json`
        if (!fs.existsSync(`./${dataFileName}`)) {
            fs.writeFileSync(dataFileName, '{}', function (err) {
                if (err) throw err;
            })
        }
        file = JSON.parse(fs.readFileSync(dataFileName, "utf8"));
    }

    /**
     * Set A Data
     * @param { String } data Data Name
     * @param { any } value Value of Data
     */
    set(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        } else {
            file[data] = value
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Save A Data
     * @param { String } data Data Name
     * @param { any } value Value of Data
     */
    save(data, value) {
        return this.set(data, value)
    }

    /**
     * Fetch A Data
     * @param { String } data Data Name
     */
    fetch(data) {
        if (!file[data]) {
            throw new TypeError("Entered Data Not Found.")
        } else if (!data) {
            throw new TypeError("You Must Enter A Data Name.")
        } else {
            return file[data]
        }
    }

    /**
     * Get A Data
     * @param { String } data Data Name
     */
    get(data) {
        return this.fetch(data)
    }

    /**
     * Check If There Is Data Entered In The Database
     * @param { String } data Data Name
     * @returns Boolean
     */
    has(data) {
        if (!data) {
            throw new TypeError("You Must Enter A Data Name.")
        }
        if (file[data]) {
            return true
        } else {
            return false
        }
    }

    /**
     * Delete A Data
     * @param { String } data Data Name
     */
    delete(data) {
        if (!data) {
            throw new TypeError("You Must Enter A Data Name.")
        }
        delete file[data]
        return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
    }

    /**
     * Backup Your Data File
     * @param { String } backupFile 
     */
    backup(backupFile) {
        const fn = backupFile.endsWith(".json") ? backupFile : `${backupFile}.json`
        if (!backupFile) {
            throw new TypeError("You Must Enter A File Name For Backup.")
        } else if (fn == dataFileName) {
            throw new TypeError("The Name of The Backup File Must Not Be The Same As The File Where The Data is Kept.")
        } else {
            return fs.writeFileSync(fn, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Addition
     * @param { String } data 
     * @param { Number } value 
     */
    add(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        } else if (typeof value !== "number") {
            throw new SyntaxError("The Value To Be Add Must Be A Number.")
        } else if (!this.has(data)) {
            throw new TypeError("Entered Data Has Not Found.")
        } else if (typeof this.fetch(data) !== "number") {
            throw new TypeError("Value To Add Number Is Not A Number.")
        } else {
            file[data] += value
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Substraction
     * @param { String } data 
     * @param { Number } value 
     */
    subtract(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        } else if (typeof value !== "number") {
            throw new SyntaxError("The Value To Be Subtract Must Be A Number.")
        } else if (!this.has(data)) {
            throw new TypeError("Entered Data Has Not Found.")
        } else if (typeof this.fetch(data) !== "number") {
            throw new TypeError("Value To Subtract Number Is Not A Number.")
        } else {
            file[data] -= value
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Multiplication
     * @param { String } data 
     * @param { Number } value 
     */
    multiply(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        } else if (typeof value !== "number") {
            throw new SyntaxError("The Value To Be Multiply Must Be A Number.")
        } else if (!this.has(data)) {
            throw new TypeError("Entered Data Has Not Found.")
        } else if (typeof this.fetch(data) !== "number") {
            throw new TypeError("Value To Multiply Number Is Not A Number.")
        } else {
            file[data] *= value
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Division
     * @param { String } data Data Name
     * @param { Number } value Value for Division
     */
    divide(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        } else if (typeof value !== "number") {
            throw new SyntaxError("The Value To Be Divide Must Be A Number.")
        } else if (!this.has(data)) {
            throw new TypeError("Entered Data Has Not Found.")
        } else if (typeof this.fetch(data) !== "number") {
            throw new TypeError("Value To Divide Number Is Not A Number.")
        } else {
            file[data] /= value
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        }
    }

    /**
     * Delete All Data
     */
    deleteAll() {
        return fs.writeFileSync(dataFileName, JSON.stringify({}, null, 2))
    }

    /**
     * Delete All Data
     */
    clear() {
        return this.deleteAll()
    }

    /**
     * Fetch All Data or Fetch Size
     * @param { Number } fetchSize 
     * @example <Database>.all()
     * @example <Database>.all(5)
     */
    all(fetchSize) {
        if (typeof fetchSize !== "number") {
            throw new SyntaxError("The Number of Data To Be Fetched Must Be A Number.")
        }
        if (fetchSize < 1) fetchSize = 0;
        let arr = [];
        for (const key in file) {
            const obj = {
                ID: key,
                data: file[key]
            };
            arr.push(obj);
        }
        if (fetchSize) arr = arr.slice(0, fetchSize);
        return arr.map((item) => ({
            ID: item.ID,
            data: item.data
        }));
    }

    /**
     * Type of Value
     * @param { String } data 
     */
    type(data) {
        if (!data) {
            throw new TypeError("You Must Enter A Data Name.")
        }
        const dataType = this.fetch(data);
        if (Array.isArray(dataType)) {
            return "array";
        } else {
            return typeof dataType;
        }
    }

    /**
     * Push Value To Array
     * @param { String } data 
     * @param { any } value 
     */
    push(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data Name.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value To Push Array.")
        }
        if (!this.has(data)) {
            file[data] = [];
            this.set(data, [])
        }

        if (Array.isArray(this.fetch(data))) {
            file[data].push(value)
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2))
        } else {
            this.set(data, [this.fetch(data), value])
        }
    }

    /**
     * Delete Value From Array
     * @param { String} data 
     * @param { any } value 
     */
    pull(data, value) {
        if (!data) {
            throw new TypeError("You Must Enter A Data.")
        } else if (!value) {
            throw new TypeError("You Must Enter A Value.")
        }
        if (!this.has(data)) {
            throw new TypeError("Entered Data Not Found.")
        }

        if (!this.fetch(data).some((item) => item === value)) {
            throw new TypeError("Entered Value Not Found in Array.")
        }

        if (Array.isArray(this.fetch(data))) {
            return this.set(data, this.fetch(data).filter(z => z !== value))
        } else {
            throw new TypeError("Value in Data Entered Is Not 'Array'.")
        }
    }

    /**
     * Delete Database File
     * @returns 
     */
    destroy() {
        fs.unlinkSync(dataFileName);
        return;
    }

    /**
     * Use API To Save Data
     * @param { String } fetchUrl 
     * @param { String } dataName 
     * @param { Object } options 
     * @returns 
     */
    async setFromAPI(fetchUrl, dataName, options) {
        if(options && options["method"] && options["method"] !== "GET") {
            throw new TypeError("Request Method is Not GET.")
        } else if (!fetchUrl) {
            throw new TypeError("Please Enter A Fetch URL.")
        } else if (!dataName) {
            throw new TypeError("Please Enter A Data Name.")
        }

        try {
            const response = options && options.length > 0 ?
                await fetch(fetchUrl, options)
            :
                await fetch(fetchUrl, { method: "GET" });

            const json = await response.json();

            file[dataName] = json;
            return fs.writeFileSync(dataFileName, JSON.stringify(file, null, 2));
        } catch (error) {
            console.error(error);
        }

    }
}

module.exports.Database = Database;
module.exports = Database;
module.exports = { Database };