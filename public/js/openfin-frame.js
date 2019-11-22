import { html, render } from 'https://unpkg.com/lit-html@1.0.0/lit-html.js';

export const closeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" style=" fill:RGB(143, 142, 145);"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 11.6875 10.3125 L 10.28125 11.71875 L 14.5625 16 L 10.21875 20.34375 L 11.625 21.75 L 15.96875 17.40625 L 20.28125 21.71875 L 21.6875 20.3125 L 17.375 16 L 21.625 11.75 L 20.21875 10.34375 L 15.96875 14.59375 Z "></path></g></svg>`;
export const minimizeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" style=" fill:RGB(143, 142, 145);"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 9 20 L 9 22 L 23 22 L 23 20 Z "></path></g></svg>`;
export const maximizeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" style=" fill:RGB(143, 142, 145);"><g id="surface1"><path style=" " d="M 6 6 L 6 18 C 5.996094 18.359375 6.183594 18.695313 6.496094 18.878906 C 6.808594 19.058594 7.191406 19.058594 7.503906 18.878906 C 7.816406 18.695313 8.003906 18.359375 8 18 L 8 8 L 18 8 C 18.359375 8.003906 18.695313 7.816406 18.878906 7.503906 C 19.058594 7.191406 19.058594 6.808594 18.878906 6.496094 C 18.695313 6.183594 18.359375 5.996094 18 6 Z M 32 6 C 31.460938 5.996094 31.015625 6.425781 30.996094 6.964844 C 30.976563 7.503906 31.390625 7.960938 31.929688 8 C 31.953125 8 31.976563 8 32 8 L 42 8 L 42 18 C 41.992188 18.523438 42.394531 18.964844 42.917969 19.011719 C 42.949219 19.011719 42.980469 19.015625 43.015625 19.015625 C 43.566406 19.003906 44.007813 18.550781 44 18 L 44 6 Z M 6.984375 31.984375 C 6.433594 31.996094 5.992188 32.449219 6 33 L 6 45 L 18 45 C 18.035156 45 18.066406 45 18.097656 44.996094 C 18.632813 44.949219 19.035156 44.484375 19.007813 43.949219 C 18.980469 43.414063 18.535156 42.996094 18 43 L 8 43 L 8 33 C 8.003906 32.730469 7.898438 32.46875 7.707031 32.277344 C 7.515625 32.085938 7.253906 31.980469 6.984375 31.984375 Z M 42.984375 31.984375 C 42.433594 31.996094 41.992188 32.449219 42 33 L 42 43 L 32 43 C 31.640625 42.996094 31.304688 43.183594 31.121094 43.496094 C 30.941406 43.808594 30.941406 44.191406 31.121094 44.503906 C 31.304688 44.816406 31.640625 45.003906 32 45 L 44 45 L 44 33 C 44.003906 32.730469 43.898438 32.46875 43.707031 32.277344 C 43.515625 32.085938 43.253906 31.980469 42.984375 31.984375 Z "></path></g></svg>`;

export default class OpenfinFrame extends HTMLElement {
    constructor() {
        super();
        this.buildButtons();
        this.render = this.render.bind(this);
        this.render();
    }

    buildButtons () {
        const win = fin.Window.getCurrentSync();
        const closeClick = e => win.close();
        const minimizeClick = e => win.minimize();
        const maximizeClick = async e => win.getState().then(state => state === 'maximized'? win.restore() : win.maximize());

        this.closeButton = html`<div class="button" @click=${closeClick}}>${closeIcon}</div>`;
        this.minimizeButton = html`<div class="button" @click=${minimizeClick}>${minimizeIcon}</div>`;
        this.maximizeButton = html`<div class="button" @click=${maximizeClick}>${maximizeIcon}</div>`;
    }

    async render() {
        const frame = html`
        <div class="container">
            <div class="buttonsWrapper">
                ${this.closeButton}
                ${this.maximizeButton}
                ${this.minimizeButton}
            </div>
        </div>
        `;
        render(frame, this);
    }
}

customElements.define('openfin-frame', OpenfinFrame);