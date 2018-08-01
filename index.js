#! /usr/bin/env node
const program = require('commander');
const puppeteer = require('puppeteer');
const package = require('./package.json');

async function runProcess(website, output) {
	try {
			const b = await puppeteer.launch();
			const p = await b.newPage();
			p.setViewport({
				width: parseInt(program.width) || 800,
				height: parseInt(program.height) || 600,
				deviceScaleFactor: program.retina ? 2 : 1,
			});
			await p.goto(website);
			await p.screenshot({ path: output });
	 		await b.close();
	} catch (e) {
			console.log(e);
			return;
	}
}

program
	.version(package.version)
	.option('-s, --site <site>', 'The website to capture')
	.option('-w, --width <width>', 'The viewport width')
	.option('-h, --height <height>', 'The viewport height')
	.option('-o, --output <output>', 'The output file name')
	.option('-r, --retina', 'Render in retina resolution')
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

