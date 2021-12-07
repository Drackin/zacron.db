# zacron.db

## A JSON Database Module

```cmd
npm install zacron.db
```

* EN | zacron.db is easy to use, useful, new and faster Json based database module.

# Releases (v5.1.0)

### Set Data With Using APIs.
If you want to save a data from API, there is an easy method for this.
Use ".setFromAPI()" for save data from API.
Example:
```js
zdb.setFromAPI("https://api.example.com/data", "test_data", { headers: {...} });
// First parameter: Request URL
// Second parameter: Data Name
// (OPTIONAL) Third parameter: Request Options
```
### Auto Open Database File
Database file is now opening automaticly! You must only enter file name.

## Definition
**There are 3 different definitions:**

```javascript
// Default
const { Database } = require("zacron.db");
const zdb = new Database("<DatabaseFileName>")

// ES6 import
import { Database } from "zacron.db";
const zdb = new Database("<DatabaseFileName>")
```
## Note:
Database File Name Is Optional. If Filename Is Not Specified, Default Filename Is Will Be "database.json". If You Specify A File Name, You Must Open File Manually.

# Examples
**For Set A Data To Database:**
```javascript
const { Database } = require("zacron.db");
const zdb = new Database("<DatabaseFileName>")

zdb.set("data", "value")
```

**For Fetch A Data From Database:**
```javascript
const { Database } = require("zacron.db");
const zdb = new Database("<DatabaseFileName>")

// zdb.set("data_name", "zacron")

console.log(zdb.fetch("data_name")) //Output: 'zacron'
```

---
# Methods
> Set A Data:
> 
> set("data", "value") <br>
> save("data", "value") <br>
> setFromAPI("reqURL", "data_name", {})

> Fetch A Data:
> 
> get("data") <br>
> fetch("data")

> Math:
> 
> add("data", number) - Addition <br>
> subtract("data", number) - Subtraction <br>
> multiply("data", number) - Multiplication <br>
> divide("data", number) - Division

> Delete A Data - All Datas - Backup Database:
> 
> delete("data")
>
> all(limit) - Limit Is Optional.
>
> backup("backup_file_name")

> Delete All Datas - Delete Database File:
> 
> deleteAll() <br>
> clear()
>
> destroy()

> Type of Value of Data Name - Push Value To Array - Delete Value From Array:
> 
> type("data")
>
> push("data", "value")
>
> pull("data", "value")
---
# [Discord Server](https://discord.gg/xMN4d33NTe)