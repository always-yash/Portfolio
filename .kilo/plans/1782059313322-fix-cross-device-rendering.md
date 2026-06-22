# Fix Cross-Device Rendering for Netlify Deployment

## Root Causes

1. **Case-sensitive path mismatch**: `projects.js` references `assets/` (lowercase) but the actual directory is `Assets/`. Netlify (Linux) is case-sensitive → all modal images 404.
2. **Broken VanillaTilt init in `app.js`**: Lines 117-123 have a config object but no `VanillaTilt.init()` call → JS error on all devices.
3. **Invalid CSS variable**: `.project-visual` border uses `var(--background)` which doesn't exist in `:root`. Should be `--border`.
4. **Non-standard `display: ruby`**: `.project-grid::-webkit-scrollbar` uses `display: ruby` — not supported in most browsers. Should be `display: none`.
5. **Missing `max()` fallbacks**: Carousel button positioning removed `max()` safety net, causing overlap on narrow screens.

## Fixes

### Fix 1: `js/projects.js` — Fix image paths (lines 6, 28, 50, 72, 94)
Change all `assets/` to `Assets/`:
- `assets/artisaan-thumbnail.png` → `Assets/artisaan-thumbnail.png`
- `assets/pravasa-keralam-thumbnail.png` → `Assets/pravasa-keralam-thumbnail.png`
- `assets/intent-tab-thumbnail.png` → `Assets/intent-tab-thumbnail.png`
- `assets/skytel-solutions-thumbnail.png` → `Assets/skytel-solutions-thumbnail.png`
- `assets/fleeca-thumbnail.png` → `Assets/fleeca-thumbnail.png`

### Fix 2: `js/app.js` — Fix VanillaTilt initialization (lines 117-123)
Replace the broken block:
```js
if (window.VanillaTilt && !prefersReducedMotion) {
        max: 7,
        speed: 700,
        glare: true,
        "max-glare": 0.12
    });
}
```
With:
```js
if (window.VanillaTilt && !prefersReducedMotion) {
    document.querySelectorAll("[data-tilt-card]").forEach((el) => {
        VanillaTilt.init(el, {
            max: 7,
            speed: 700,
            glare: true,
            "max-glare": 0.12
        });
    });
}
```

### Fix 3: `css/style.css` — Fix invalid variable (line 1011)
Change:
```css
border-bottom: 1px solid var(--background);
```
To:
```css
border-bottom: 1px solid var(--border);
```

### Fix 4: `css/style.css` — Fix scrollbar display (line 1000)
Change:
```css
display: ruby;
```
To:
```css
display: none;
```

### Fix 5: `css/style.css` — Restore carousel button safety fallbacks (lines 923-928)
Change `.side-left` from:
```css
left: calc((100vw - min(calc(100vw - 3rem), 1180px)) / 2 + 1.5rem);
```
To:
```css
left: max(1rem, calc((100vw - 1180px) / 2 + 1rem));
```

Change `.side-right` from:
```css
right: calc((100vw - min(calc(100vw - 3rem), 1180px)) / 2 + 1.5rem);
```
To:
```css
right: max(1rem, calc((100vw - 1180px) / 2 + 1rem));
```

### Fix 6: `css/style.css` — Restore edge-carousel-wrap margin (line 885)
Change `/ -2` to `/ -1.75`:
```css
margin-inline: calc((100vw - min(calc(100vw - 3rem), 1180px)) / -1.75);
```

## Files Changed
1. `js/projects.js` — 5 image path fixes
2. `js/app.js` — 1 VanillaTilt init fix
3. `css/style.css` — 4 fixes (variable, scrollbar, button positioning, carousel margin)

## NOT Changing
- `index.html` — `Assets/` paths are correct
- `css/responsive.css` — responsive overrides are fine
- `js/theme.js` — no issues
- `js/interactions.js` — no issues
- `css/animations.css` — no issues

## Validation
1. Open site on mobile — verify no JS errors in console
2. Verify project cards have tilt effect on hover
3. Verify carousel scrolls horizontally with snap
4. Verify filter buttons (All/Core/Sandbox) work — grid layout appears, carousel hidden
5. Click a project card — verify modal opens with correct image
6. Verify carousel nav buttons don't overlap cards on narrow screens
