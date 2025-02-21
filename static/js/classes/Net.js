class Net {

    static getTestPages() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/getTestPages",
                data: {},
                type: "POST",
                success: data => {
                    resolve(data.testPages)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }

    static getModels() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/getModels",
                data: {},
                type: "POST",
                success: data => {
                    resolve(data.models)
                },
                error: (xhr, status, error) => {
                    console.log(xhr);
                    reject(new Error("promise rejected"))
                },
            });
        })
    }
}