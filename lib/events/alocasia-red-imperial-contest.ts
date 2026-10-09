export const alocasiaContestPath = '/evenements/concours-alocasia-red-imperial-octobre-2026';
export const alocasiaContestUrl = `https://jungle.tibaldo.fr${alocasiaContestPath}`;
export const alocasiaContestEnd = '2026-10-11T13:00:00+02:00';
export const alocasiaContestInstagramUrl = 'https://www.instagram.com/reel/DeR6tUBiHj5/?cplk=anIwbHAwOGl6ZnF0';
export const alocasiaContestFacebookUrl = 'https://www.facebook.com/share/r/1CMS5hX36t/';
export const alocasiaContestState = (now:number) => now >= Date.parse(alocasiaContestEnd) ? 'ended' : 'active';
