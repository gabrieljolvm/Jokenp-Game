class Game {

    constructor() {
        this.buttonsEvents();
        this.onChoose();
        this.score = 0;
    }


    buttonsEvents() {

        const modal = document.querySelector("#modal-opacity");

        document.querySelector("#rules-box button").addEventListener("click", () => {

            modal.style.display = "flex";

        })

        document.querySelectorAll("#close,#close-mobile").forEach((button) => {
            button.addEventListener("click", () => {

                modal.style.display = "none";
            })
        })

        const pick = document.querySelector("#game");
        const match = document.querySelector("#match")

        document.querySelector("#new-game").addEventListener("click", () => {

            pick.classList.add("visible");
            pick.classList.remove("hidden");

            match.classList.add("hidden");
            match.classList.remove("visible");

            document.querySelectorAll(".chooses").forEach(e => {
                e.removeChild(e.firstChild);
            })
        })

    }

    onChoose() {

        const pick = document.querySelector("#game");
        const match = document.querySelector("#match")

        return new Promise((resolve, reject) => {

            document.querySelectorAll("#rock,#paper,#scissor,#lizard,#spock").forEach(obj => {
                obj.addEventListener("click", () => {

                    this.result = [];

                    this.housePick = Math.floor(1 + (Math.random() * 5));

                    pick.classList.add("hidden");
                    pick.classList.remove("visible");

                    match.classList.add("visible");
                    match.classList.remove("hidden");

                    let newObj = obj.cloneNode(true);
                    document.querySelector("#chosen-object").appendChild(newObj);

                    this.result.push(Number(newObj.dataset.result));

                    resolve(this);

                    this.houseChoose();

                    this.isWin();
                });

            });

        });


    }


    houseChoose() {

        let newObj2;

        document.querySelectorAll("#rock,#paper,#scissor,#lizard,#spock").forEach(obj => {

            if (obj.dataset.result == this.housePick) {

                newObj2 = obj.cloneNode(true);

            };

        });

        this.result.push(Number(newObj2.dataset.result));

        document.querySelector("#house-chosen-object").appendChild(newObj2);



    }

    isWin() {

        let winner = false;
        let draw = false;

        const conditions = [
            [1, 2],
            [1, 4],
            [2, 3],
            [2, 5],
            [3, 4],
            [3, 1],
            [4, 5],
            [4, 2],
            [5, 1],
            [5, 3]
        ]

        const textResult = document.querySelector("#match-result h1");

        conditions.forEach(condition => {

            for (let i = 0; i < 2; i++) {

                if (condition[0] == this.result[0] && condition[1] == this.result[1]) winner = true;

                if (this.result[0] == this.result[1]) draw = true;

            };

        });

        if (winner) {

            this.score++;
            document.querySelector("#score").textContent = this.score;

            textResult.textContent = "YOU WIN";


        } else if (draw) {

            textResult.textContent = "DRAW";

        } else {

            textResult.textContent = "YOU LOSE";

        }


    }



}






const game = new Game();