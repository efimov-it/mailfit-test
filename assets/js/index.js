document.addEventListener('DOMContentLoaded', () => {
    // Drop down menu
    (function () {
        const dropDownMenuButton = document.querySelector('#dropDownMenuButton');
        const dropDownMenu = document.querySelector('#dropDownMenu');
        
        if (!dropDownMenu || !dropDownMenu) {
            return;
        }

        const icon = dropDownMenuButton.querySelector('.mft-horizontalMenu_dropsownIcon');

        if (!icon) {
            return;
        }

        const hideDropDown = () => {
            icon.classList.remove('mft-horizontalMenu_dropsownIcon__active');
            dropDownMenu.classList.remove('mft-dropdownMenu__active');

            setTimeout(() => {
                dropDownMenu.style.display = 'none';
            }, 310);
        }

        dropDownMenuButton.onclick = () => {
            if (!dropDownMenu.classList.contains('mft-dropdownMenu__active')) {
                icon.classList.add('mft-horizontalMenu_dropsownIcon__active');
                dropDownMenu.style.display = null;
                
                setTimeout(() => {
                    dropDownMenu.classList.add('mft-dropdownMenu__active');
                }, 10);
            }
        }
    
        document.addEventListener('click', (e) => {
            if (dropDownMenu.classList.contains('mft-dropdownMenu__active')) {
                if (!dropDownMenu.contains(e.target)) {
                    hideDropDown();
                }
            }
        });

        dropDownMenu.querySelectorAll('li').forEach(menuItem => {
            menuItem.onclick = hideDropDown;
        });
    })();

    // Accordion
    (function () {
        document.querySelectorAll('.mft-accrodion').forEach(accordion => {
            accordion.querySelectorAll('.mft-accrodion_head').forEach(accordionHead => {
                accordionHead.onclick = () => {
                    if (accordionHead.parentElement.classList.contains('mft-accrodion_item__active')) {
                        accordionHead.parentElement.classList.remove('mft-accrodion_item__active');
                    }
                    else {
                        const last = accordion.querySelector('.mft-accrodion_item__active');
                        if (last) {
                            if (last.classList.contains('mft-accrodion_item__active')) {
                                last.classList.remove('mft-accrodion_item__active');
                            }
                        }
    
                        accordionHead.parentElement.classList.add('mft-accrodion_item__active');
                    }
                }
            });
        });
    })();

    // Action button scroll
    (function () {
        const sections = document.querySelectorAll('section');
        const header = document.querySelector('.mft-header');
        const actionButton = document.querySelector('#actionButton');

        if (!actionButton) return;

        if (sections.length !== 3) return;
        if (!header) header = {offsetHeight: 0};

        window.onscroll = () => {
            if (window.innerWidth < 920) return;

            let diff = 1;

            if (window.innerWidth < 1440) diff = (window.innerWidth / 1440);

            const styles = [
                {
                    'width': 1360 * diff,
                    'height': 90 * diff,
                    'left': 0,
                    'bottom': 41 * diff
                },
                {
                    'width': 250 * diff,
                    'height': 250 * diff,
                    'left': 0,
                    'bottom': 0
                },
                {
                    'width': 400 * diff,
                    'height': 150 * diff,
                    'left': 480 * diff,
                    'bottom': 0
                }
            ];

            let currentSection = null;
            sections.forEach((section, i) => {
                if (section.offsetTop - header.offsetHeight < window.scrollY) currentSection = i;
            });

            if (currentSection === null) return;

            const progress = (window.scrollY - sections[currentSection].offsetTop + header.offsetHeight) / sections[currentSection].offsetHeight;

            if (currentSection === 0) {
                if (progress > 0.1) {
                    let transform = 'translate3d(';

                    transform += Math.abs(Math.round(styles[currentSection].left + (styles[currentSection + 1].left - styles[currentSection].left) * (progress - 0.1))) + "px";
                    transform += ",-";
                    transform += Math.round(styles[currentSection].bottom + (styles[currentSection + 1].bottom - styles[currentSection].bottom) * (progress - 0.1)) + "px";
                    transform += ", 0px)";

                    actionButton.style.width = Math.round(styles[currentSection].width + (styles[currentSection + 1].width - styles[currentSection].width) * (progress - 0.1)) + "px";
                    actionButton.style.height = Math.round(styles[currentSection].height + (styles[currentSection + 1].height - styles[currentSection].height) * (progress - 0.1)) + "px";

                    actionButton.style.transform = transform;
                }
                else {
                    actionButton.style.width = styles[0].width + 'px';
                    actionButton.style.height = styles[0].height + 'px';
                    actionButton.style.transform = 'translate3d(' + styles[0].left + 'px,-' + styles[0].bottom + 'px' + ')';
                }
            }
            else {
                if (progress <= 0.1) {
                    let transform = 'translate3d(';

                    transform += Math.abs(Math.round(styles[currentSection - 1].left - (styles[currentSection - 1].left - styles[currentSection].left) * (progress + 0.9))) + "px";
                    transform += ",-";
                    transform += Math.round(styles[currentSection].bottom - (styles[currentSection - 1].bottom - styles[currentSection].bottom) * (progress + 0.9)) + "px";
                    transform += ", 0px)";

                    actionButton.style.width = Math.round(styles[currentSection - 1].width - (styles[currentSection - 1].width - styles[currentSection].width) * (progress + 0.9)) + "px";
                    actionButton.style.height = Math.round(styles[currentSection - 1].height - (styles[currentSection - 1].height - styles[currentSection].height) * (progress + 0.9)) + "px";

                    actionButton.style.transform = transform;
                }
                else {
                    let transform = 'translate3d(';

                    if (!styles[currentSection + 1]) return;

                    transform += Math.abs(Math.round(styles[currentSection].left + (styles[currentSection + 1].left - styles[currentSection].left) * (progress - 0.1))) + "px";
                    transform += ",-";
                    transform += Math.round(styles[currentSection].bottom + (styles[currentSection + 1].bottom - styles[currentSection].bottom) * (progress - 0.1)) + "px";
                    transform += ", 0px)";

                    actionButton.style.width = Math.round(styles[currentSection].width + (styles[currentSection + 1].width - styles[currentSection].width) * (progress - 0.1)) + "px";
                    actionButton.style.height = Math.round(styles[currentSection].height + (styles[currentSection + 1].height - styles[currentSection].height) * (progress - 0.1)) + "px";

                    actionButton.style.transform = transform;
                }
            }
        }
    })();
});