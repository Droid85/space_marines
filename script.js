const maxTrainingTime = 1000;
const traininTime = 200;

const SpaceMarines = [
	{
		name: 'Jim Raynor',
        photo: 'img/jim_raynor.webp',
		timeSpended: 0,
	},
	{
		name: 'Sarah Kerrigan',
        photo: 'img/sarah_kerrigan.webp',
		timeSpended: 0,
	},
	{
		name: 'Tychus Findlay',
        photo: 'img/tychus_findlay.webp',
		timeSpended: 0,
	},
];

let battleShip = [];

marsAttacks(SpaceMarines);

function marsAttacks(marines) {
	marines.forEach((soldier, i) => {
		training(marines, soldier, i);
	});
}

function training(marines, soldier, index) {
	const a = new Promise((res, rej) => {
		setTimeout(() => {
			if (Math.random() < .6) {
				soldier.timeSpended += traininTime;
				if (soldier.timeSpended >= maxTrainingTime) {
					soldier.result = 'Failed!';
				}
				rej(soldier);
			} else {
				soldier.result = 'Rock & roll!';
				soldier.timeSpended += traininTime;
                battleShip.push(soldier);
				res(soldier);
			}
		}, traininTime);
	});
	a.then((r) => {
		marines[index] = r;
	})
	.catch((soldier) => {
		if (soldier.result === 'Failed!') {
			marines[index] = soldier;
		} else {
			training(marines, soldier, index);
		}
	})
	.finally((r) => console.log('FINAL', SpaceMarines));
}
