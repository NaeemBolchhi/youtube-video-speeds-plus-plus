export default defineUnlistedScript(() => {


    // Available speed options
    const speeds = [
        [0.25, 0.5, 0.75, 1],
        [1.25, 1.5, 1.75, 2],
        [2.25, 2.5, 2.75, 3],
        [3.25, 3.5, 3.75, 4],
        [8, 10, 14, 16]
    ];

    // Create speed control
    function createSpeedOptions() {
        // Click hold variable for '+' and '-'
        let holdTimeout:number, holdInterval:number;
        const stopHolds = () => {
            clearInterval(holdInterval);
            clearTimeout(holdTimeout);
        };

        const speedContainer = document.createElement('div');
        speedContainer.classList.add('ytp-speed-container','hidden','invisible');

        // Speed display and buttons
        const speedDisplay = document.createElement('div');
        speedDisplay.classList.add('ytp-speed-display');

        const speedDisplaySpan = document.createElement('span');
        speedDisplaySpan.classList.add('ytp-speed-insert');

        const speedDisplayDecrease = document.createElement('button');
        speedDisplayDecrease.classList.add('ytp-speed-decrease');
        speedDisplayDecrease.title = 'Decrease playback speed\nCtrl + , (Comma)';
        speedDisplayDecrease.addEventListener('mousedown', () => {
            changeSpeed('-');
            holdTimeout = window.setTimeout(() => {
                holdInterval = window.setInterval(() => {changeSpeed('-')}, 70);
            }, 500);
        });
        speedDisplayDecrease.addEventListener('mouseup', stopHolds);
        speedDisplayDecrease.addEventListener('mouseleave', stopHolds);

        const speedDisplayIncrease = document.createElement('button');
        speedDisplayIncrease.classList.add('ytp-speed-increase');
        speedDisplayIncrease.title = 'Increase playback speed\nCtrl + . (Period)';
        speedDisplayIncrease.addEventListener('mousedown', () => {
            changeSpeed('+');
            holdTimeout = window.setTimeout(() => {
                holdInterval = window.setInterval(() => {changeSpeed('+')}, 70);
            }, 500);
        });
        speedDisplayIncrease.addEventListener('mouseup', stopHolds);
        speedDisplayIncrease.addEventListener('mouseleave', stopHolds);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === ',') {
                e.preventDefault();
                changeSpeed('-');

            } else if (e.ctrlKey && e.key === '.') {
                changeSpeed('+');

            }
        });

        const speedDisplayDecreaseSpan = document.createElement('span');
        speedDisplayDecreaseSpan.textContent = '–';

        const speedDisplayIncreaseSpan = document.createElement('span');
        speedDisplayIncreaseSpan.textContent = '+';

        speedDisplayDecrease.appendChild(speedDisplayDecreaseSpan);
        speedDisplayIncrease.appendChild(speedDisplayIncreaseSpan);
        speedDisplay.appendChild(speedDisplayDecrease);
        speedDisplay.appendChild(speedDisplaySpan);
        speedDisplay.appendChild(speedDisplayIncrease);

        speedContainer.appendChild(speedDisplay);

        // Add speed options
        for (let x = 0; x < speeds.length; x++) {
            const speedRow = document.createElement('div');
            speedRow.classList.add('ytp-speed-row');

            for (let y = 0; y < speeds[x].length; y++) {
                const speedOption = document.createElement('span');
                speedOption.classList.add('ytp-speed-option');
                speedOption.textContent = speeds[x][y].toString();
                speedOption.addEventListener('click', () => {
                    const video = document.querySelector('video');
                    if (video) {
                        // video.playbackRate = speeds[x][y];
                        setSpeedValue(speedOption.textContent);
                    }
                });
                speedRow.appendChild(speedOption);
            }

            speedContainer.appendChild(speedRow);
        }

        return speedContainer;
    }

    // Create speed button in chromeBottom
    function createSpeedButton() {
        const settingsButton = document.querySelector('.ytp-chrome-bottom .ytp-settings-button');
        const speedContainer = document.querySelector('.ytp-speed-container');

        const speedButton = document.createElement('button');
        speedButton.classList.add('ytp-button', 'ytp-speed-button');

        if (settingsButton) {speedButton.appendChild(settingsButton.children[0].cloneNode(true));}
        speedButton.querySelector('path')?.setAttribute('d', "M12 1c1.44 0 2.87.28 4.21.83a11 11 0 0 1 3.45 2.27l-1.81 1.05c-3.78-3.23-9.46-2.79-12.69.99A8.986 8.986 0 0 0 3 12a9 9 0 0 0 18 0v-.44c-.03-.4-.08-.8-.15-1.2l1.81-1.05c1.49 5.89-2.08 11.87-7.98 13.36-1.36.34-2.78.42-4.17.23-6.02-.82-10.24-6.36-9.42-12.38C1.83 5.06 6.49.99 12 1Zm7.08 6.25-7.96 3.25a1.75 1.75 0 0 0-.92 2.28c.38.88 1.4 1.29 2.28.92.13-.06.25-.13.36-.21l6.8-5.26c.25-.19.29-.55.1-.8a.579.579 0 0 0-.66-.18h-.01Z");

        const speedButtonTooltip = document.createElement('div');
        speedButtonTooltip.classList.add('ytp-tooltip','ytp-bottom','ytp-speed-tooltip');
        const speedButtonTooltip2 = document.createElement('div');
        speedButtonTooltip2.classList.add('ytp-tooltip-text-wrapper');
        const speedButtonTooltip3 = document.createElement('div');
        speedButtonTooltip3.classList.add('ytp-tooltip-bottom-text');
        const speedButtonTooltip4 = document.createElement('span');
        speedButtonTooltip4.classList.add('ytp-tooltip-text');
        speedButtonTooltip4.textContent = 'Playback speed';

        speedButtonTooltip3.appendChild(speedButtonTooltip4);
        speedButtonTooltip2.appendChild(speedButtonTooltip3);
        speedButtonTooltip.appendChild(speedButtonTooltip2);

        speedButton.appendChild(speedButtonTooltip);

        speedButton.addEventListener('click', () => {
            if (speedContainer?.classList.contains('hidden')) {
                speedContainer?.classList.remove('hidden');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        speedContainer?.classList.remove('invisible');

                        setTimeout(() => {
                            speedButton.classList.add('opened');
                        }, 100);
                    });
                });
            } else {
                speedContainer?.classList.add('invisible');
                speedButton.classList.remove('opened');

                setTimeout(() => {
                    speedContainer?.classList.add('hidden');
                }, 100);
            }
        });

        document.body.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.ytp-speed-button.ytp-button') || (e.target as HTMLElement).closest('.ytp-speed-container') || speedContainer?.classList.contains('hidden')) {return;}

            speedContainer?.classList.add('invisible');
            speedButton.classList.remove('opened');

            setTimeout(() => {
                speedContainer?.classList.add('hidden');
            }, 100);
        });

        function hoverState() {
            speedButtonTooltip.classList.add('hover');
        }
        function hoverStateGone() {
            speedButtonTooltip.classList.remove('hover');
        }

        speedButton.addEventListener('mouseenter', () => {
            hoverState();
        });
        speedButton.addEventListener('mouseleave', () => {
            hoverStateGone();
        });
        speedButton.addEventListener('focus', () => {
            hoverState();
        });
        speedButton.addEventListener('blur', () => {
            hoverStateGone();
        });

        settingsButton?.parentElement?.insertBefore(speedButton, settingsButton);
    }

    // Deal with it when an option is clicked
    function setSpeedValue(speedValue:string) {
        const displayTextSpan = document.querySelector('.ytp-speed-insert');
        const video = document.querySelector('video');

        if (!displayTextSpan || !video) {return;}

        displayTextSpan.textContent = parseFloat(speedValue).toFixed(2);
        video.playbackRate = parseFloat(speedValue);

        bezelSpeedValue(speedValue);
    }

    // Display speed value in bezel
    function bezelSpeedValue(speedValue:string) {
        const bezel = document.querySelector('.ytp-bezel-text-wrapper');
        const videoSpeed = parseFloat(speedValue).toFixed(2);
        const dateNow = Date.now().toString();

        if (!bezel || !bezel.parentElement) {return;}

        bezel.children[0].textContent = videoSpeed + 'x';
        bezel.parentElement.classList.add('visible-' + dateNow);

        setTimeout(() => {
            bezel.parentElement?.classList.remove('visible-' + dateNow)
        }, 1000);
    }

    // Insert speed options into the player
    function insertSpeedOptions() {
        const chromeBottom = document.querySelector('.ytp-chrome-bottom');
        if (!chromeBottom || document.querySelector('.ytp-speed-container')) {return;}

        // Add speed menu
        chromeBottom.appendChild(createSpeedOptions());

        // Add speed button
        createSpeedButton();

        // Set initial highlight
        setInitialSpeed();
    }

    // Initialize highlight speed options
    function setInitialSpeed() {
        const currentSpeed = document.querySelector('video')?.playbackRate || 1;
        setSpeedValue(currentSpeed.toString());
    }

    // Hide internal speed settings
    function hideInternalSpeed() {
        const chromeBottom = document.querySelector('.ytp-chrome-bottom');
        if (!chromeBottom || document.querySelector('.ytp-internal-speed')) {return;}

        const labels = document.querySelectorAll('#ytp-id-5 .ytp-menuitem-label');

        for (let x = 0; x < labels.length; x++) {
            if (labels[x].textContent.match(/playback speed/i)) {
                labels[x].closest('.ytp-menuitem')?.classList.add('ytp-internal-speed');
            }
        }
    }

    // Change video speed
    function changeSpeed(key:string) {
        const changeRate = 0.05;
        const currentSpeed = document.querySelector('video')?.playbackRate || 1;
        let newSpeed:number = 0;

        if (key === '-') {
            newSpeed = currentSpeed - changeRate;
        } else if (key === '+') {
            newSpeed = currentSpeed + changeRate;
        }

        if (newSpeed < 0.05) {
            newSpeed = 0.05;
        }

        if (newSpeed > 16) {
            newSpeed = 16;
        }

        setSpeedValue(newSpeed.toString());
    }

    // Use MutationObserver to listen for player changes
    const observer = new MutationObserver(() => {
        insertSpeedOptions();
        try {hideInternalSpeed()} catch {}
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Execute after page loads
    window.addEventListener('load', insertSpeedOptions);


});
