const jsConfetti = new JSConfetti()

function shuffle(array) {
	let n = array.length
	while (n > 0) {
		let k = Math.floor(Math.random() * n)
		n--
		[array[n], array[k]] = [array[k], array[n]]
	}
}

const scoreElement = document.getElementById('score')
const answers = document.getElementById('answers')
answers.style.display = 'none'
const video = document.getElementById('video')
video.style.display = 'none'

let score = 0
let answered = 0

quiz = [
	{
		Q: '1 + 1',
		A: '2'
	},
	{
		Q: '1 + \'1\'',
		A: '11'
	},
	{
		Q: '1 == \'1\'',
		A: 'true',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: '1 === \'1\'',
		A: 'false',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: '{} + 1',
		A: '[object Object]1',
		options: [
			'{1}',
			'{}1',
			'[object Object]1'
		]
	},
	{
		Q: 'Math.min() > Math.max()',
		A: 'true',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: '0.1 + 0.2',
		A: (0.1 + 0.2).toString()
	},
	{
		Q: 'null >= 0',
		A: 'true',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: 'typeof NaN',
		A: 'number',
		options: [
			'NaN',
			'null',
			'object',
			'number',
		]
	},
	{
		Q: '[] == ![]',
		A: 'true',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: 'typeof null',
		A: 'object',
		options: [
			'null',
			'NaN',
			'object',
			'number',
		]
	},
	{
		Q: '9999999999999999',
		A: '10000000000000000'
	},
	{
		Q: 'parseInt(null, 24)',
		A: '23'
	},
	{
		Q: '(![]+[])[+[]]+([][[]]+[])[+[]]+([][[]]+[])[+!![]]',
		A: 'fun'
	},
	{
		Q: 'parseInt(0.0000005)',
		A: '5'
	},
	{
		Q: 'NaN === NaN',
		A: 'false',
		options: [
			'true',
			'false'
		]
	},
	{
		Q: '[,,,].toString()',
		A: ',,'
	},
	{
		Q: 'parseInt(Infinity, 30)',
		A: '13693557269'
	},
	{
		Q: '[\'1\', \'7\', \'11\'].map(parseInt)',
		A: '[ 1, NaN, 3 ]'
	},
]

shuffle(quiz)

for (let i in quiz) {
	let label = document.createElement('label')
	label.textContent = `Q${parseInt(i) + 1}) ${quiz[i]['Q']}`

	let input
	if ('options' in quiz[i]) {
		input = document.createElement('div')
		input.className = 'd-flex flex-column align-items-start form-check w-100'
		shuffle(quiz[i]['options'])
		for (option of quiz[i]['options']) {
			let div = optionsDiv = document.createElement('div')
			div.className = 'd-flex flex-row'

			optionElement = document.createElement('input')
			optionElement.type = 'radio'
			optionElement.className = 'form-check-input mx-1'
			optionElement.name = i
			optionElement.value = option

			optionLabel = document.createElement('label')
			optionLabel.textContent = option

			div.appendChild(optionElement)
			div.appendChild(optionLabel)
			input.appendChild(div)
			input.appendChild(document.createElement('br'))
		}
	} else {
		input = document.createElement('input')
		input.type = 'text'
	}
	input.classList.add('my-1')
	let button = document.createElement('button')
	button.textContent = 'Submit'
	button.className = 'btn btn-primary mb-3'
	button.onclick = () => {
		let correct = ('options' in quiz[i]) ? document.querySelector(`input[name='${i}']:checked`).value == quiz[i]['A'] : input.value.toLowerCase().trim() == quiz[i]['A'].toString().toLowerCase().trim()
		if (correct) {
			jsConfetti.addConfetti({
				emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
			})
			scoreElement.textContent = `Score: ${++score}`
		} else {
			alert(`The correct answer was ${quiz[i]['A']}`)
		}
		button.className = 'btn btn-secondary mb-3'
		button.onclick = null
		if (++answered == quiz.length) {
			answers.style.display = 'block'
			video.style.display = 'block'
		}
	}
	body.insertBefore(label, answers)
	body.insertBefore(input, answers)
	body.insertBefore(button, answers)
}

