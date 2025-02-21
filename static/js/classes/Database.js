class Database {
    constructor(filename) {
        if (!filename.endsWith(".db")) filename += ".db"
        this.filename = filename
        this.id
    }

    // gets database id from server required for other operations
    create() {
        // console.log("initialazing database on server");
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_create",
                data: {
                    filename: this.filename
                },
                type: "POST",
                success: data => {
                    this.id = data.id
                    resolve(data.msg)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // inserts object as database entry
    insert(entry) {
        // console.log(`inserting to db: `, entry);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_insert",
                data: {
                    id: this.id,
                    entry: entry
                },
                type: "POST",
                success: data => {
                    resolve(data.msg)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // returns first matching entry (returns null if no entry found)
    findOne(match) {
        // console.log(`finding entry matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_findOne",
                data: {
                    id: this.id,
                    match: match
                },
                type: "POST",
                success: data => {
                    resolve(data.entry)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // returns all matching entries (returns null if no entries found)
    find(match) {
        // console.log(`finding entries matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_find",
                data: {
                    id: this.id,
                    match: match
                },
                type: "POST",
                success: data => {
                    resolve(data.entries)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // returns whole database
    findAll() {
        return this.find({})
    }

    // counts all matching entries
    count(match) {
        // console.log(`counting entries matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_count",
                data: {
                    id: this.id,
                    match: match
                },
                type: "POST",
                success: data => {
                    resolve(data.count)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // counts all entries
    countAll() {
        return this.count({})
    }

    // removes first matching entry, returns count of removed entries
    removeOne(match) {
        // console.log(`removing entry matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_remove",
                data: {
                    id: this.id,
                    match: match,
                    params: {},
                },
                type: "POST",
                success: data => {
                    resolve(data.count)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // removes all matching entries, returns count of removed entries
    remove(match) {
        // console.log(`removing entries matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_remove",
                data: {
                    id: this.id,
                    match: match,
                    params: { multi: true },
                },
                type: "POST",
                success: data => {
                    resolve(data.count)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    // updates matching entries with values given in entry obj, adds keys if needed. match by _id to update one
    update(match, entry) {
        // console.log(`replacing entries matching: `, match);
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/database_update",
                data: {
                    id: this.id,
                    match: match,
                    entry: entry
                },
                type: "POST",
                success: data => {
                    resolve(data.count)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }



    //aliases
    requestAll() {
        return this.find({})
    }
    getAll() {
        return this.find({})
    }
}