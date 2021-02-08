// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyAfkVIzXPqpVHpxfqlduGtaWsWJAtRYQlc',
    authDomain: 'guess-kitten-age.firebaseapp.com',
    databaseURL: 'https://guess-kitten-age.firebaseio.com',
    projectId: 'guess-kitten-age',
    storageBucket: 'guess-kitten-age.appspot.com',
    messagingSenderId: '368556986702',
};

firebase.initializeApp(config);

const favoritesRef = firebase.database().ref();
const kittiesList = document.getElementById('kitties');
let favoritesScores = [];

const ageInWeeks = birthDate => {
    const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
    const diff = Math.abs(new Date().getTime() - birthDate);

    return Math.floor(diff / WEEK_IN_MILLISECONDS);
};

const styleList = ['rubberBand', 'swing', 'tada', 'jello', 'flipInX'];
let lastTitleStyleApplied = 'bounceInDown';

favoritesRef.on('value', snapshot => {
    const { kitties, favorites, names, birthDates } = snapshot.val();
    favoritesScores = favorites;
    kittiesList.innerHTML = '';

    kittiesList.innerHTML = kitties.map(
        (kittiePic, index) =>
            `
      <li>
        <img id="kittie-id-${index}" src=${kittiePic} onclick="favKittie(${index})">
        <div class="extra">
          <div class="details">
            <p class="name">${names[index]}</p>
            <p class="age">${ageInWeeks(birthDates[index])} weeks old
          </div>
          <p id="kittie-score-${index}" class="score">${favorites[index]} ❤</p>
        </div>
      </li>
    `
    );
});

window.favKittie = kittieID => {
    // update scores and refresh kitties list
    const scoreRef = firebase.database().ref(`favorites/${kittieID}`);
    scoreRef.set(favoritesScores[kittieID] + 1);

    // animte fav action
    applyAnimation('main-title', lastTitleStyleApplied, getRandomTitleStyle());
    applyAnimation(`kittie-id-${kittieID}`, 'shake', 'shake');
    applyAnimation(`kittie-score-${kittieID}`, 'heartBeat', 'heartBeat');
};

var applyAnimation = (elemId, prevStyle, newStyle) => {
    const element = document.getElementById(elemId);
    element.classList.remove('animated', prevStyle);
    element.classList.add('animated', newStyle);
};

var getRandomTitleStyle = () => {
    const rand = Math.floor(Math.random() * styleList.length);
    lastTitleStyleApplied = styleList[rand];
    return lastTitleStyleApplied;
};
