{
    // em caso de erro, nao aparece a funcao returnWithoutAwait() na stacktrace
    async function throwAsync(msg) {
        await null;
        throw Error(msg);
    }

    async function returnWithoutAwait() {
        return throwAsync('missing returnWithoutAwait in the stacktrace');
    }
    returnWithoutAwait().catch(console.log);
}

{
    // agora a funcao returnWithoutAwait() na stacktrace adicionando await
    async function throwAsync(msg) {
        await null;
        throw Error(msg);
    }

    async function returnWithoutAwait() {
        return await throwAsync('missing returnWithoutAwait in the stacktrace');
    }
    returnWithoutAwait().catch(console.log);
}

// ------------------------------------------------------------------------------------------------------
{
    // a funcao syncFn nao retorna o erro porque nao foi marcada como async e retorna uma promise
    async function throwAsync() {
        await null; // need to await at least something to be truly async (see note #2)
        throw Error('missing syncFn in the stacktrace');
    }

    // deveria ser marcada aqui
    function syncFn() {
        return throwAsync();
    }

    async function asyncFn() {
        return await syncFn();
    }

    // 👎 syncFn would be missing in the stacktrace because it returns a promise while been sync
    asyncFn().catch(console.log);
}

{
    // agora funcao syncFn aparece erro porque foi marcada como async e retorna uma promise
    async function throwAsync() {
        await null; // need to await at least something to be truly async (see note #2)
        throw Error('missing syncFn in the stacktrace');
    }

    // marcada aqui
    async function syncFn() {
        return await throwAsync();
    }

    async function asyncFn() {
        return await syncFn();
    }

    // 👎 syncFn would be missing in the stacktrace because it returns a promise while been sync
    asyncFn().catch(console.log);
}
// ------------------------------------------------------------------------------------------------------
{
    // nao e apresentado onde a funcao getUser e chamada
    async function getUser(id) {
        await null;
        if (!id)
            throw Error(
                'stacktrace is missing the place where getUser has been called'
            );
        return { id };
    }

    const userIds = [1, 2, 0, 3];

    // 👎 the stacktrace would include getUser function but would give no clue on where it has been called
    Promise.all(userIds.map(getUser)).catch(console.log);
}

{
    // agora a funcao getUser e apresentada no log mostrando onde foi chamada
    async function getUser(id) {
        await null;
        if (!id)
            throw Error(
                'stacktrace is missing the place where getUser has been called'
            );
        return { id };
    }

    const userIds = [1, 2, 0, 3];

    // 👎 the stacktrace would include getUser function but would give no clue on where it has been called
    Promise.all(userIds.map(async id => await getUser(id))).catch(console.log);
}
// ------------------------------------------------------------------------------------------------------
