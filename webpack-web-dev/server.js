// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const express = require('express');

const app = express();

app.use(express.static('public'));

var listener = app.listen(process.env.PORT, function () {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
