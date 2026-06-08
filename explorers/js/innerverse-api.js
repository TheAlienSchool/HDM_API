/**
 * THE INNERVERSE API :: HDM LABORATORY INTEGRATION LAYER
 * ═══════════════════════════════════════════════════════════════
 * 
 * The subatomic plumbing system of the Innerverse.
 * This global API acts as the single source of absolute somatic truth.
 * 
 * Rules:
 *   - Affirmative grammar ONLY (eliminate negations completely)
 *   - Double colon (::) transition hinges
 *   - Spelling markers: Å, ï, and MåGNET
 */

(function() {
    // Safe storage fallback wrapper to prevent crashes when localStorage is blocked
    const localStorage = (function() {
        const mem = {};
        try {
            const testKey = '__storage_test__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return window.localStorage;
        } catch (e) {
            console.warn(":: Innerverse API :: localStorage is blocked. Falling back to memory-based storage.");
            return {
                getItem(key) { return key in mem ? mem[key] : null; },
                setItem(key, val) { mem[key] = String(val); },
                removeItem(key) { delete mem[key]; },
                clear() { for (let k in mem) delete mem[k]; }
            };
        }
    })();

    // Ensure the API remains a single instance
    if (typeof window.HDM_Innerverse_API === 'undefined') {
        class InnerverseAPI {
            constructor() {
                // ── 1. ATTUNEMENT STATE (Coherence Coordinates)
                this.coherence = {
                    heart: 0.5,
                    brain: 0.5,
                    breath: 0.5,
                    coherenceScore: 0.5,
                    isCoherent: false
                };

                // ── 2. DIAGNOSTIC TELEMETRY
                this.telemetry = {
                    activeAngle: 0,
                    motionIntensity: 0,
                    panningLatencyMs: 0
                };

                // ── 3. STATE OBSERVERS
                this.listeners = [];

                // Retrieve existing attunement parameters if present
                const savedMagnet = localStorage.getItem('active_magnet');
                this.activeMagnet = savedMagnet || 'ellian';
            }

            // Calibrate active somatic waves
            setCoherence(heart, brain, breath) {
                this.coherence.heart = Math.max(0.0, Math.min(1.0, heart));
                this.coherence.brain = Math.max(0.0, Math.min(1.0, brain));
                this.coherence.breath = Math.max(0.0, Math.min(1.0, breath));

                // Calculate active alignment score
                // Perfect alignment requires all three waves to converge harmoniously
                const diff1 = Math.abs(this.coherence.heart - this.coherence.brain);
                const diff2 = Math.abs(this.coherence.brain - this.coherence.breath);
                const variance = (diff1 + diff2) / 2;

                this.coherence.coherenceScore = Math.max(0.0, Math.min(1.0, 1.0 - variance));
                
                // Coherence threshold is locked at 0.85 stability
                this.coherence.isCoherent = (this.coherence.coherenceScore >= 0.85);

                this.notify();
                return this.coherence;
            }

            // Retrieve current coherence metrics
            getCoherence() {
                return { ...this.coherence };
            }

            // Update real-time interaction metrics
            updateTelemetry(angle, motion, latency) {
                this.telemetry.activeAngle = angle;
                this.telemetry.motionIntensity = Math.max(0.0, Math.min(1.0, motion));
                this.telemetry.panningLatencyMs = latency;

                this.notify();
                return this.telemetry;
            }

            // Retrieve active telemetry data
            getTelemetry() {
                return { ...this.telemetry };
            }

            // Retrieve full state of the Innerverse
            getState() {
                return {
                    coherence: { ...this.coherence },
                    telemetry: { ...this.telemetry },
                    activeMagnet: this.activeMagnet
                };
            }

            // Set active MåGNET validation signature
            setActiveMagnet(signature) {
                this.activeMagnet = signature;
                localStorage.setItem('active_magnet', signature);
                this.notify();
                console.log(`:: Active MåGNET calibrated to signature: ${signature}`);
            }

            // Subscribe to state modifications
            subscribe(callback) {
                this.listeners.push(callback);
                
                // Return callback for easy removal
                const api = this;
                return function() {
                    api.listeners = api.listeners.filter(function(cb) {
                        return cb !== callback;
                    });
                };
            }

            // Broadcast active state updates to all subscribed explorers
            notify() {
                const payload = {
                    coherence: { ...this.coherence },
                    telemetry: { ...this.telemetry },
                    activeMagnet: this.activeMagnet
                };
                this.listeners.forEach(function(callback) {
                    callback(payload);
                });
            }

            // ── 4. PELLET CHAMBER SOMATIC DATABASE
            get pellets() {
                const api = this;
                return {
                    save(day, lineage, equationId, equationName, reflection, coordinate) {
                        const saveKey = `tas_theater_day_${day}`;
                        const record = {
                            day: day,
                            timestamp: Date.now(),
                            lineage: lineage,
                            equationId: equationId,
                            equationName: equationName,
                            reflection: reflection,
                            coordinate: { ...coordinate }
                        };

                        localStorage.setItem(saveKey, JSON.stringify(record));

                        // Add to completed registry
                        const completedDays = api.pellets.getCompletedDays();
                        const dayNumber = parseInt(day, 10);
                        if (completedDays.includes(dayNumber) === false) {
                            completedDays.push(dayNumber);
                            localStorage.setItem('tas_theater_completed_days', JSON.stringify(completedDays));
                        }

                        console.log(`:: Pellet digested successfully for day: ${day} :: AEquatïon: ${equationName}`);
                        return record;
                    },

                    get(day) {
                        const data = localStorage.getItem(`tas_theater_day_${day}`);
                        if (data) {
                            return JSON.parse(data);
                        }
                        return null;
                    },

                    getAll() {
                        const completions = {};
                        const completedDays = api.pellets.getCompletedDays();
                        completedDays.forEach(function(day) {
                            const data = localStorage.getItem(`tas_theater_day_${day}`);
                            if (data) {
                                completions[day] = JSON.parse(data);
                            }
                        });
                        return completions;
                    },

                    getCompletedDays() {
                        const raw = localStorage.getItem('tas_theater_completed_days');
                        if (raw) {
                            return JSON.parse(raw);
                        }
                        return [];
                    },

                    clearAll() {
                        const completedDays = api.pellets.getCompletedDays();
                        completedDays.forEach(function(day) {
                            localStorage.removeItem(`tas_theater_day_${day}`);
                        });
                        localStorage.removeItem('tas_theater_completed_days');
                        console.log(":: Pellet database cleared successfully");
                    }
                };
            }
        }

        // Instantiation in the global namespace
        window.HDM_Innerverse_API = new InnerverseAPI();
        console.log(":: HDM Innerverse API loaded successfully :: Prepared for subatomic interoperability");
    } else {
        console.log(":: HDM Innerverse API already resides in the global scope");
    }
})();
