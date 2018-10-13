#! /usr/bin/env node
const program = require('commander');
const puppeteer = require('puppeteer');
const readline = require('readline');
const npackage = require('../package.json');

function log(message) {
	if (program.verbose) {
		console.log(message);
	}
}

function askQuestion(q, override) {
	if (!program.interactive && !override) {
		return 0;
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
			});
		} catch (e) {
			reject();
		}
	});
}

async function verifySite() {
	if (!program.site) {
		const site = await askQuestion('Please enter a site URL to continue: ', true);
		if (!site) {
			process.exit(1);
		}
		return site;
	}
	return program.site;
}

async function runProcess(output) {
	try {
		const site = await verifySite();
		const b = await puppeteer.launch({ headless: !program.interactive });
		const p = await b.newPage();
		p.setViewport({
			width: parseInt(program.width, 10) || 800,
			height: parseInt(program.height, 10) || 600,
			deviceScaleFactor: program.retina ? 2 : 1,
		});
		log('loading site');
		await p.goto(site);
		log('finished loading');
		await askQuestion('Interact with the site, and press enter to continue when ready');
		if (program.pdf) {
			// Create a PDF
			log('creating PDF');
			await p.pdf({ path: output, format: 'letter' });
		} else {
			// Create a screenshot
			log('taking screenshot');
			await p.screenshot({ path: output });
		}
		log(`screenshot saved as ${output}`);
		await b.close();
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}

program
	.version(npackage.version)
	.option('-s, --site <site>', 'The website to capture')
	.option('-W, --width <width>', 'The viewport width')
	.option('-H, --height <height>', 'The viewport height')
	.option('-o, --output <output>', 'The output file name')
	.option('-r, --retina', 'Render in retina resolution')
	.option('-i, --interactive', 'Open an interactive browser before saving')
	.option('-v, --verbose', 'Turn on verbose output')
	.option('-p, --pdf', 'Output as a pdf file')
	.parse(process.argv);

if (typeof program.width !== typeof program.height) {
	console.log('Either no dimensions or both a width and height are required');
	process.exit(1);
}

runProcess(program.output || program.pdf ? 'out.pdf' : 'out.png');
