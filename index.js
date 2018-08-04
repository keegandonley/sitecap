#! /usr/bin/env node
const program = require('commander');
const puppeteer = require('puppeteer');
const readline = require('readline');
const package = require('./package.json');

function log(message) {
	if (program.verbose) {
		console.log(message);
	}
}

function askQuestion(q) {
	if (!program.interactive) {
		return;
	}
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve, reject) => {
		try {
			rl.question(q, (answer) => {
				rl.close();
				resolve(answer);
			})
		} catch (e) {
			reject();
		}
	});
}

async function runProcess(website, output) {
	try {
			const b = await puppeteer.launch({ headless: !program.interactive });
			const p = await b.newPage();
			p.setViewport({
				width: parseInt(program.width) || 800,
				height: parseInt(program.height) || 600,
				deviceScaleFactor: program.retina ? 2 : 1,
			});
			log('loading site');
			await p.goto(website);
			await askQuestion('Interact with the site, and press enter to continue when ready');
			log('taking screenshot');
			await p.screenshot({ path: output });
			log(`screenshot saved as ${output}`);
			await b.close();
	} catch (e) {
			console.log(e);
			return;
	}
}

program
	.version(package.version)
	.option('-s, --site <site>', 'The website to capture')
	.option('-W, --width <width>', 'The viewport width')
	.option('-H, --height <height>', 'The viewport height')
	.option('-o, --output <output>', 'The output file name')
	.option('-r, --retina', 'Render in retina resolution')
	.option('-i, --interactive', 'Open an interactive browser before saving')
	.option('-v, --verbose', 'Turn on verbose output')
	.parse(process.argv);

if (!program.site) {
	console.log('No site was provided');
	return 1;
}

if (typeof program.width !== typeof program.height) {
	console.log('Either no dimensions or both a width and height are required');
	return 1;
}

runProcess(program.site, program.output || 'out.png');
