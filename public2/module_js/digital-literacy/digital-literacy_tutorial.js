const nextPageURL = 'tut_guide';

const stepsList = [
  {
    element: '#step1A',
    intro: `NOTE: Most browsers require users to interact with the page before
    audio can play, so this step will not have a voiceover. Its purpose is to
    get the user to interact with the page. Text would be added later.`,
    position: 'left',
    scrollTo: 'tooltip',
    audioFile: ''
  },
  {
    element: '#step1A',
    intro: `Fake news articles use <b>shocking and exaggerated headlines and
    images</b> to get you to click on them. Often, the headline will try to make
    you curious and lure you like bait to click on it.`,
    position: 'left',
    scrollTo: 'tooltip',
    audioFile: ''
  },
  {
    element: '.post',
    intro: `Does the article <b>use wild or sensational images</b> that are
    trying to make you feel a strong emotion? <br>This is another strategy of
    <b>clickbait articles.</b>`,
    position: 'left',
    scrollTo: "tooltip",
    audioFile: ''
  },
  {
    element: '#step3',
    intro: `If you find <b>unusual web addresses or site names</b>, including
    those that end with '.com.co' this is a sign of fake news. These sites may
    appear like real news websites but most often are not.`,
    position: 'bottom',
    scrollTo: "tooltip",
    audioFile: ''
  },
  {
    element: '#step1',
    intro: `Are there many spelling errors, lots of ALL CAPS, or dramatic
    punctuation?!?!???? These are all signs that the article
    <b>may not be credible.</b>`,
    position: 'bottom',
    scrollTo: "tooltip",
    audioFile: ''
  }
];
