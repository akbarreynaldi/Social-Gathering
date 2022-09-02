const Response = () => {
    const successMessage = (code, message, data) => ({
        code: code,
        message: message,
        data: data
    })

    const errorMessage = (code, message) => ({
        code: code,
        message: message,
    })

    const paginationMessage = (code, message, page, size, count, rows, sortBy, sortType, keyword) => ({
        code: code,
        message: message,
        data: rows,
        keyword: keyword,
        paging: {
            page: page,
            totalPages: Math.ceil(count / size),
            totalRows: count,
            rowsPerPage: size
        },
        sorting: {
            sortBy: sortBy,
            sortType: sortType
        }
    })

    return { successMessage, errorMessage, paginationMessage };
}

module.exports = Response;