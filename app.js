// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];


addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    let newFriendName = friendInputEl.value;
    if (newFriendName === '') {
        newFriendName = 'Stranger';
    }
    
    const newFriend = {
        name: newFriendName,
        satisfaction: 1
    };
    friendData.push(newFriend);
    friendInputEl.value = '';
    displayFriends();
    // create a new friend object
    // push it into the friends state array, passed in as an argument
    // reset the input
    // display all the friends (use a function here)
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        friendEl.addEventListener('click', () => {
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomCount--;
                displayFriends();
                displayMushrooms();
            } else if (mushroomCount === 0) {
                alert('You need to forage more mushrooms!');
            }
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        mushroomsEl.append(renderMushroom());
    }
}

displayFriends();
displayMushrooms();
