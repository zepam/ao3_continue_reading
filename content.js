const workIdMatch = window.location.pathname.match(/\/works\/(\d+)/);
if (!workIdMatch) {
  console.log('[AO3 Script] Not on a work page');
}

const workId = workIdMatch[1];
const storageKey = `ao3_last_chapter_${workId}`;

const currentUrl = window.location.href;
const chapterIdMatch = currentUrl.match(/\/chapters\/(\d+)/);
const currentChapterId = chapterIdMatch ? chapterIdMatch[1] : null;

console.log('[AO3 Script] URL:', currentUrl);
console.log('[AO3 Script] Work ID:', workId, 'Storage key:', storageKey);

if (currentChapterId) {
  chrome.storage.local.get([storageKey], (result) => {
    chrome.storage.local.set({ [storageKey]: currentChapterId });
    console.log('[AO3 Script] Saving chapter:', currentChapterId);
  });
} else {
  chrome.storage.local.get([storageKey], (result) => {
    const savedChapterId = result[storageKey];
    console.log('[AO3 Script] Saved chapter ID:', savedChapterId);

    if (!savedChapterId) {
      console.log('[AO3 Script] No saved chapter for this work');
      return;
    }

    const chapterSelect = document.querySelector('select[id*="chapter"]');
    if (!chapterSelect) {
      console.log('[AO3 Script] Could not find chapter dropdown');
      return;
    }

    const firstOption = chapterSelect.options[0];
    const firstChapterId = firstOption.value;

    console.log('[AO3 Script] First chapter ID:', firstChapterId, 'Is first?', currentChapterId === firstChapterId);

    if (currentChapterId === firstChapterId) {
      const userConfirmed = confirm('Resume from your last read chapter?');
      if (userConfirmed && savedChapterId !== firstChapterId) {
        const savedUrl = window.location.href.replace(/\/chapters\/\d+/, `/chapters/${savedChapterId}`);
        console.log('[AO3 Script] Redirecting to:', savedUrl);
        window.location.href = savedUrl;
      }
    }
  });
}
