// ==UserScript==
// @name         AO3 Continue Reading
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically load the last chapter you were reading
// @author       You
// @match        https://archiveofourown.org/works/*
// @grant        GM.setValue
// @grant        GM.getValue
// @run-at       document-start
// ==/UserScript==

(async function() {
  'use strict';

  const url = window.location.href;
  console.log('[AO3 Script] URL:', url);
  
  const workMatch = url.match(/\/works\/(\d+)/);
  
  if (!workMatch) {
    console.log('[AO3 Script] No work ID found');
    return;
  }
  
  const workId = workMatch[1];
  const storageKey = `ao3_last_chapter_${workId}`;
  console.log('[AO3 Script] Work ID:', workId, 'Storage key:', storageKey);
  
  // Check if we're on a specific chapter
  const chapterMatch = url.match(/\/chapters\/(\d+)/);
  
  if (chapterMatch) {
    // On a chapter page
    const currentChapterId = chapterMatch[1];
    console.log('[AO3 Script] Current chapter:', currentChapterId);
    
    // Check if there's a saved chapter for this work
    const savedData = await GM.getValue(storageKey);
    const savedChapter = savedData ? JSON.parse(savedData) : null;
    
    // Detect if this is chapter 1 by checking if it's the first in the chapter list
    let isFirstChapter = false;
    try {
      const chapterSelect = document.querySelector('select[name="selected_id"]');
      if (chapterSelect) {
        const firstOption = chapterSelect.querySelector('option');
        if (firstOption) {
          const firstChapterId = firstOption.value;
          isFirstChapter = (currentChapterId === firstChapterId);
          console.log('[AO3 Script] First chapter ID:', firstChapterId, 'Is first?', isFirstChapter);
        }
      }
    } catch (e) {
      console.log('[AO3 Script] Could not detect chapter order:', e);
    }
    
    if (savedChapter && savedChapter.chapterId !== currentChapterId && isFirstChapter) {
      // We're on the first chapter (AO3's auto-redirect) and have a different saved chapter - ask before redirect
      console.log('[AO3 Script] Found saved chapter:', savedChapter.chapterId);
      const userConfirmed = confirm(`Resume from your last read chapter?`);
      if (userConfirmed) {
        console.log('[AO3 Script] ↻ Redirecting to last chapter:', savedChapter.chapterId);
        window.location.href = savedChapter.url;
      }
      return;
    }
    
    // Save this chapter as the current one
    console.log('[AO3 Script] Saving chapter:', currentChapterId);
    await GM.setValue(storageKey, JSON.stringify({
      chapterId: currentChapterId,
      url: url,
      timestamp: Date.now()
    }));
  }
})();
