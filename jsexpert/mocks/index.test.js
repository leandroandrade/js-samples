const { rejects, deepStrictEqual } = require('assert');
const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/invalid-header.csv';
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }

    {
        Date.prototype.getFullYear = () => 2020;

        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                name: 'Paul',
                id: 123,
                profession: 'Javacript Developer',
                birthDay: 1995,
            },
            {
                name: 'John',
                id: 321,
                profession: 'Javascript Expert',
                birthDay: 1940,
            },
            {
                name: 'Alex',
                id: 231,
                profession: 'Go Developer',
                birthDay: 1990,
            },
        ];
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();
