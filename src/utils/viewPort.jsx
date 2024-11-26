export const viewPort = () => {
    const mobileMediaQuery = '(max-width: 1224px)';

    return window.matchMedia(mobileMediaQuery).matches;

}
