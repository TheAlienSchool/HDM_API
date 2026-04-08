const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../explorers');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
<!-- ── FRAGMENTARY NAVIGATION & STILLNESS NODE ── -->
<style>
.orbital-hub { position: fixed; top: 24px; left: 24px; z-index: 10000; }
.orbital-hub a { text-decoration: none; color: var(--copper, #C4622D); font-size: 1.2rem; opacity: 0.4; transition: all 0.3s ease; font-family: sans-serif; }
.orbital-hub a:hover { opacity: 1; transform: scale(1.1); color: var(--parchment, #F0E6D2); text-shadow: 0 0 12px var(--copper, #C4622D); }

.stillness-node { position: fixed; top: 24px; right: 24px; z-index: 10001; color: var(--ash, #8B7D6B); font-size: 1.2rem; cursor: pointer; opacity: 0.4; transition: all 0.3s ease; font-family: sans-serif; }
.stillness-node:hover { opacity: 1; color: var(--copper, #C4622D); text-shadow: 0 0 12px var(--copper, #C4622D); transform: scale(1.1); }

body.stillness-active > *:not(.stillness-countdown):not(.orbital-hub):not(script):not(style) { opacity: 0 !important; pointer-events: none !important; transition: opacity 3s ease-in-out !important; }
body.stillness-active { background-color: #050403 !important; transition: background-color 3s ease-in-out !important; }

.stillness-countdown { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Space Mono', 'Inconsolata', monospace; font-size: 0.8rem; letter-spacing: 0.4em; color: var(--ash, #8B7D6B); opacity: 0; pointer-events: none; transition: opacity 2s ease; z-index: 10000; }
body.stillness-active .stillness-countdown { opacity: 0.6 !important; }
body.stillness-active .stillness-node { opacity: 0 !important; pointer-events: none !important; }
</style>
`;

const htmlToAdd = `
<!-- FRAGMENTARY NAVIGATION & STILLNESS NODE -->
<div class="orbital-hub">
  <a href="../index.html" title="Return to Hub">⎈</a>
</div>
<div class="stillness-node" onclick="initiateStillness()" title="Tea on the Moon Protocol">⊙</div>
<div class="stillness-countdown" id="stillnessTracker">TEA ON THE MOON :: 60</div>
`;

const jsToAdd = `
<!-- TEA ON THE MOON PROTOCOL -->
<script>
  let _isStillnessActivating = false;
  window.initiateStillness = async function() {
    if(_isStillnessActivating) return;
    _isStillnessActivating = true;
    
    if(typeof window.initAudio === 'function') await window.initAudio();
    else if(typeof window.initAtmosphericAudio === 'function') await window.initAtmosphericAudio();
    else if(typeof window.ensureAudioContext === 'function') await window.ensureAudioContext();
    else if(typeof Tone !== 'undefined') await Tone.start();
    
    document.body.classList.add('stillness-active');
    
    let stillnessDrone;
    if(typeof Tone !== 'undefined') {
        stillnessDrone = new Tone.FMSynth({
        harmonicity: 0.5, modulationIndex: 1.2,
        oscillator: { type: "sine" }, modulation: { type: "sine" },
        envelope: { attack: 4, decay: 0, sustain: 1, release: 8 }
        }).toDestination();
        stillnessDrone.volume.value = -12;
        stillnessDrone.triggerAttack("E2");
    }

    let count = 60;
    const cdEl = document.getElementById('stillnessTracker');
    if(cdEl) cdEl.innerText = "TEA ON THE MOON :: 60";
    
    const interval = setInterval(() => {
      count--;
      if(cdEl) cdEl.innerText = "TEA ON THE MOON :: " + count;
      if(count <= 0) {
        clearInterval(interval);
        document.body.classList.remove('stillness-active');
        if(stillnessDrone) stillnessDrone.triggerRelease();
        setTimeout(() => { if(stillnessDrone) stillnessDrone.dispose(); _isStillnessActivating = false; }, 8000);
      }
    }, 1000);
  };
</script>
`;

files.forEach(file => {
  if (['architecture-of-resonance.html', 'atmospheric-records.html'].includes(file)) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('stillness-node')) {
    console.log('Skipping ' + file + ' as it already has stillness-node');
    return;
  }
  
  // Try to remove generic return navs if they exist specifically targeting the old breadcrumb or nav return that just goes to index
  content = content.replace(/<nav[^>]*class="[^"]*nav-return[^"]*"[^>]*>[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<nav[^>]*class="[^"]*breadcrumb-nav[^"]*"[^>]*>[\s\S]*?<\/nav>/gi, '');
  // For other navs, we leave them but we make sure they hide. 

  // Inject CSS
  content = content.replace('</head>', cssToAdd + '\n</head>');
  // Inject HTML right after body
  content = content.replace(/<body[^>]*>/i, '$&\n' + htmlToAdd);
  
  // Inject JS right before </body> or at the end if </body> is missing
  if (content.includes('</body>')) {
    content = content.replace('</body>', jsToAdd + '\n</body>');
  } else {
    content += jsToAdd;
  }

  fs.readFileSync(filePath, 'utf8'); // check
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
console.log('Done mapping protocols.');
