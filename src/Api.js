const BASE_URL = "http://localhost:8080";

const APIs = {
    // Admin APIs
    admin: {
        create: `${BASE_URL}/admin/create`,
        get: (id) => `${BASE_URL}/admin/get/${id}`,
        login: `${BASE_URL}/admin/login`,
    },

    // Reader APIs
    reader: {
        create: `${BASE_URL}/reader/create`,
        get: (id) => `${BASE_URL}/reader/get/${id}`,
        getList: `${BASE_URL}/reader/getList`,
        update: (id) => `${BASE_URL}/reader/update/${id}`,
        delete: (id) => `${BASE_URL}/reader/delete/${id}`,
    },

    // Books APIs
    books: {
        create: `${BASE_URL}/books/create`,
        get: (id) => `${BASE_URL}/books/get/${id}`,
        getList: `${BASE_URL}/books/getList`,
        update: (id) => `${BASE_URL}/books/update/${id}`,
        delete: (id) => `${BASE_URL}/books/delete/${id}`,
        downloadPDF: (id) => `${BASE_URL}/books/downloadPDF`,// to get the PDF file only
    },
};

export default APIs