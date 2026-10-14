// Docs chrome preferences (light / dark chrome, side menu hidden), kept in localStorage.
// DOCS_PREFS_SCRIPT runs in <head> before paint so the page never flashes the wrong theme.
export const THEME_KEY = "ds-docs-theme"
export const SIDEBAR_KEY = "ds-docs-sidebar"

export const DOCS_PREFS_SCRIPT = `try{var d=document.documentElement;if(!location.pathname.startsWith('/preview')&&localStorage.getItem('${THEME_KEY}')==='light')d.setAttribute('data-docs-theme','light');if(localStorage.getItem('${SIDEBAR_KEY}')==='hidden')d.setAttribute('data-docs-sidebar','hidden')}catch(e){}`
