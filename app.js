
window.addEventListener('DOMContentLoaded', () => {   // ფუნქცია რომელიც იტვირთება ფანჯრის გახსნისას 
    const titles = Array.from(document.querySelectorAll('.title')); // ვინახავთ დივებს მასივში 
    const playerDisplay = document.querySelector('.display-player'); // მოთამაშის ცვლადი 
    const resetButton = document.querySelector('#reset'); // თამაშის ხელახლა  დაწყების ღიკალი
    const announcer = document.querySelector('.announcer'); // ცვლადი რომელიც გვატყობინებს თუ ვისი სვლაა 

    let board = ['', '', '', '', '', '', '', '', '']; // სათამაშო დაფა
    let currentPlayer = 'X'; // მოთამაშე ამ შემთხვევაში X
    let isGameActive = true; 

    const PLAYERX_WON = 'PLAYERX_WON';  // ცვლადი X-ს მოგების შემთხვევაში
    const PLAYERO_WON = 'PLAYERO_WON';  // ცვლადი O-ს მოგების შემთხვევაში
    const TIE = 'TIE';


   

    const winningConditions = [      // შესაძლო მოგებების ვარიანტები მასივში
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (title) => {
        if (title.innerText === 'X' || title.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (title, index) => {
        if(isValidAction(title) && isGameActive) {
            title.innerText = currentPlayer;
            title.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        titles.forEach(title => {
            title.innerText = '';
            title.classList.remove('playerX');
            title.classList.remove('playerO');
        });
    }

    titles.forEach( (title, index) => {
        title.addEventListener('click', () => userAction(title, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
