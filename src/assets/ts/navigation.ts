// ## GIVEN ##

import { getRandomNumber } from './utils.js';
import { initBoostersPage } from './pages/boosters.js';
import { initDeckBuildingPage } from './pages/deck.js';
import { initStatsPage } from './pages/stats.js';
import { initThankYouPage } from './pages/thanks.js';

const NR_OF_BACKGROUNDS = 3;

type PageInitializers =
    Record<string, () => void>

const initPages: PageInitializers = {
	boosters: initBoostersPage,
	'deck-building': initDeckBuildingPage,
	stats: initStatsPage,
	thanks: initThankYouPage
};

function initNavigation() {
	randomBackground();
	document.querySelectorAll('.nav').forEach((button) => {
		button.addEventListener('click', e => navigate(e));
	});
}

function navigate(e: Event) {
	e.preventDefault();
	const target = (e.target as HTMLElement).dataset.target ?? '';
	navigateToPage(target);
}

function navigateToPage(targetId: string) {

	document.querySelectorAll('.page').forEach(page => {
		if (page.id === targetId) {
			page.classList.remove('hidden');
			initPages[targetId]?.();
		}
		else {
			page.classList.add('hidden');
		}
	});
	randomBackground();
}

export { initNavigation, navigateToPage };

// ## YOUR ADDED FUNCTIONS ##


function randomBackground() {
	const $body = document.querySelector('body');
    $body!.className = '';
    $body!.classList.add(`background-0${getRandomNumber(NR_OF_BACKGROUNDS, 1)}`);
}
